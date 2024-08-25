import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral pb-24 text-white">
      <div className="container mx-auto flex flex-col justify-between gap-4 px-2 pt-8 text-center md:flex-row">
        <div className="flex flex-col gap-2">
          <span>
            © 2023{" "}
            <a href="https://webdevcody.com" className="hover:underline">
              Seibert Software Solutions, LLC
            </a>
          </span>

          <a
            href="mailto:webdevcody@gmail.com"
            className="hover:text-primary-blue"
          >
            webdevcody@gmail.com
          </a>
        </div>
        <div className="flex justify-between gap-8 px-4">
          <Link className="link-primary link" href="cookies">
            Cookie Preferences
          </Link>
          <Link className="link-primary link" href="terms-of-service">
            Terms of Service
          </Link>
          <Link className="link-primary link" href="privacy-policy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
