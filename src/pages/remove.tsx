import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";
import { useRef, useState } from "react";
import { env } from "../env.mjs";
import { signIn, useSession } from "next-auth/react";
import { downloadImage } from "../utils/downloadImage";
import { BsDownload } from "react-icons/bs";
import classNames from "classnames";

function scrollToTop() {
  window.scrollTo({ top: 0 });
}

async function uploadFileToS3({
  presignedPost,
  file,
}: {
  presignedPost: {
    url: string;
    fields: Record<string, string>;
  };
  file: File;
}) {
  const { url, fields } = presignedPost;
  const data: Record<string, any> = {
    ...fields,
    "Content-Type": file.type,
    file,
  };
  const formData = new FormData();
  for (const name in data) {
    formData.append(name, data[name]);
  }
  await fetch(url, {
    method: "POST",
    body: formData,
  });
}

function getImageUrl(key: string) {
  return `${env.NEXT_PUBLIC_BUCKET_URL}/${key}`;
}

const RemovalPage: NextPage = () => {
  const [file, setFile] = useState<File | undefined>();
  const [newImageKey, setNewImageKey] = useState("");

  const createPresignedUrlMutation =
    api.images.createPresignedUrl.useMutation();
  const removeBackgroundMutation = api.images.removeBackground.useMutation();
  const user = api.user.getUser.useQuery();

  const [error, setError] = useState("");
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Head>
        <title>Remove Your Background</title>
        <meta
          name="description"
          content="Use ai to generate your icons by selecting a color, style, and type in a prompt."
        />
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <main
        className={classNames(
          "container m-auto grid min-h-screen grid-cols-1 gap-12 px-8 py-8",
          isInitial ? "md:grid-cols-1" : "md:grid-cols-2"
        )}
      >
        <div
          className={classNames(
            "mx-auto flex w-1/2 flex-col pt-4",
            isInitial ? "w-full md:w-1/2" : "w-full"
          )}
        >
          {error && (
            <div className="alert alert-error mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <h1 className="mb-4 text-4xl">Upload Your Image</h1>

          <p className="text-md mb-8">
            Select an image to have the background removed from the image.{" "}
            <br />
            You'll be left with a transparent image of the foreground object.
          </p>

          {file && (
            <img className="mb-4 w-1/2" src={URL.createObjectURL(file)} />
          )}

          <form
            className="mb-12 flex flex-col gap-4"
            onSubmit={async (event) => {
              function showError(error: string) {
                setIsLoading(false);
                setError(error);
                scrollToTop();
              }

              event.preventDefault();

              setNewImageKey("");
              setIsLoading(true);
              setError("");

              if (!file) {
                return;
              }

              const validExtensions = ["jpg", "jpeg", "png"];
              const fileExtension = file.name.split(".").pop()?.toLowerCase();
              if (!fileExtension || !validExtensions.includes(fileExtension)) {
                showError(
                  `Invalid file type. Only ${validExtensions.join(
                    ", "
                  )} are allowed`
                );
                return;
              }

              setIsInitial(false);

              try {
                const { image, presignedPost } =
                  await createPresignedUrlMutation.mutateAsync();

                await uploadFileToS3({
                  presignedPost,
                  file,
                });

                const newS3Key = await removeBackgroundMutation.mutateAsync({
                  imageId: image.id,
                });
                setNewImageKey(newS3Key!);
              } catch (err) {
                const e = err as Error;
                setError(e.message);
                scrollToTop();
              }

              user.refetch();
              setIsLoading(false);
            }}
          >
            <label htmlFor="file">Upload an Image</label>
            <input
              id="file"
              type="file"
              name="file"
              required
              ref={fileRef}
              onChange={(e) => {
                if (!e.target.files) return;
                setFile(e.target.files[0]);
              }}
            ></input>

            {session.data ? (
              <button
                className="btn-primary btn mt-4 self-start disabled:btn-outline"
                disabled={isLoading}
              >
                {isLoading && <span className="loading loading-spinner"></span>}
                Upload Image
              </button>
            ) : (
              <button
                className="btn-primary btn mt-4 self-start"
                onClick={() => signIn()}
              >
                Sign In to Start
              </button>
            )}
          </form>
        </div>

        <section>
          {isLoading && (
            <div className="">
              <h2 className="mb-8 text-3xl">Processing Your Image</h2>
              <div className="flex">
                <span className="loading loading-spinner ml-24 mt-24 w-32"></span>
              </div>
            </div>
          )}

          {newImageKey && (
            <>
              <h2 className="mb-8 text-3xl">Your New Image</h2>
              <img
                alt="your uploaded image"
                className="w-1/2"
                src={getImageUrl(newImageKey)}
              />
              <button
                className="btn-primary btn mt-4 self-start disabled:btn-outline"
                onClick={() =>
                  downloadImage(getImageUrl(newImageKey), newImageKey)
                }
              >
                <BsDownload /> Download Image
              </button>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default RemovalPage;
