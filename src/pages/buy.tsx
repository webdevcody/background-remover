import { type NextPage } from "next";
import Head from "next/head";
import { useBuyCredits } from "../hooks/useBuyCredits";

function Card({
  credits,
  cost,
  image,
  background,
}: {
  credits: number;
  cost: number;
  image: string;
  background: string;
}) {
  const { buyCredits } = useBuyCredits();

  return (
    <div
      className="card w-full text-white shadow-xl"
      style={{ backgroundColor: background }}
    >
      <figure>
        <img className="mt-4 w-40" src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="mb-8 text-center text-xl md:text-2xl lg:text-3xl">
          {credits} Credits
        </h2>
        <h3 className="mb-8 text-center text-xl">
          ${(cost / credits).toFixed(2)} per image
        </h3>
        <div className="card-actions justify-center">
          <button
            className="btn-info btn"
            onClick={() => {
              buyCredits(credits).catch(console.error);
            }}
          >
            Buy for ${cost}
          </button>
        </div>
      </div>
    </div>
  );
}
const BuyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Buy Credits</title>
        <meta
          name="description"
          content="remove background from images with backgroundcutter.com"
        />
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <main className="container relative mx-auto flex min-h-screen flex-col items-center gap-8 text-center">
        <h1 className="mt-8 text-4xl">Buy Credits!</h1>

        <p className="w-96 text-lg">
          Each image you process requires 1 credit.
        </p>

        <section className="mb-12 grid grid-cols-1 gap-8 md:w-full md:grid-cols-3">
          <Card
            background="#0f1022"
            image="/static/silver-coin.jpg"
            credits={50}
            cost={5}
          />
          <Card
            background="#2e1920"
            image="/static/gold-coin.jpg"
            credits={100}
            cost={9}
          />
          <Card
            background="#15403d"
            image="/static/diamond-coin.jpg"
            credits={250}
            cost={20}
          />
        </section>
      </main>
    </>
  );
};

export default BuyPage;
