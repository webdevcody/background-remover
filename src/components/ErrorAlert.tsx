import Link from "next/link";
import { useBuyCredits } from "../hooks/useBuyCredits";

export function ErrorAlert({ error }: { error: string }) {
  const { buyCredits } = useBuyCredits();

  return (
    <div className="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
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
        <ul className="list-disc pl-8">
          <li>
            {error}
            {error.includes("credit") && (
              <>
                ,{" "}
                <Link className="link" href="/buy">
                  click here{" "}
                </Link>
                to buy more
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
