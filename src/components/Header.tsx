import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "../utils/api";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Avatar } from "./Avatar";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { BsImageFill } from "react-icons/bs";

export function Header() {
  const session = useSession();
  const user = api.user.getUser.useQuery(undefined, {
    enabled: !!session.data,
    refetchOnWindowFocus: false,
  });

  const isLoggedIn = !!session.data;

  const [isMobileMenuDisplayed, setIsMobileMenuDisplayed] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { deleteAccount } = useDeleteAccount();

  useClickAway(mobileMenuRef, (e: Event) => {
    if (!e.target) return;
    if (!menuButtonRef.current?.contains(e.target as Node)) {
      setIsMobileMenuDisplayed(false);
    }
  });

  return (
    <header className="relative">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-8 sm:gap-6 lg:gap-8">
          <Link href="/" className="mr-12 flex items-center gap-4">
            <img
              className="rounded-lg"
              src="/static/icon.png"
              width="50"
              height="50"
              alt="clay angry chicken"
            />
            <span className="inline-block md:hidden xl:inline-block">
              BackgroundCutter.com
            </span>
          </Link>

          <Link
            className="link-primary link hidden items-center gap-2 md:flex"
            href="/remove"
          >
            <BsImageFill /> Upload Image
          </Link>
        </div>

        {isLoggedIn ? (
          <fieldset className="hidden items-center gap-4 md:flex">
            <button
              aria-label="Refresh Credits"
              onClick={() => {
                user.refetch().catch(console.error);
              }}
              className="h4 w-4 hover:text-blue-400"
            >
              <ArrowPathIcon />
            </button>
            {user.data?.credits} credits left{" "}
            <Link className="btn-primary btn" href="/buy">
              Buy Credits
            </Link>
            <Avatar />
          </fieldset>
        ) : (
          <button
            className="btn-primary btn hidden md:block"
            onClick={() => {
              signIn("google").catch(console.error);
            }}
          >
            Sign In
          </button>
        )}

        <button
          ref={menuButtonRef}
          className="p-4 md:hidden"
          onClick={(e) => {
            setIsMobileMenuDisplayed((isOpen) => !isOpen);
          }}
        >
          {isMobileMenuDisplayed ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {isMobileMenuDisplayed && (
        <div
          ref={mobileMenuRef}
          className="absolute top-14 z-10 w-full p-4 md:block md:w-auto"
        >
          <ul
            onClick={() => setIsMobileMenuDisplayed(false)}
            className="dark:bg-cyan4-400 rounded-lg bg-white p-4 text-slate-800 dark:bg-gray-900 dark:text-slate-200"
          >
            {isLoggedIn && (
              <li>
                <Link className="block p-4 hover:text-primary-blue" href="/buy">
                  Buy Credits ({user.data?.credits} credits left)
                </Link>
              </li>
            )}
            <li>
              <Link className="link-primary link block p-4" href="/remove">
                Upload Image
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <button
                    onClick={deleteAccount}
                    className="block p-4 text-red-400 hover:text-primary-blue"
                  >
                    Delete Account
                  </button>
                </li>

                <li>
                  <button
                    className="p-4"
                    onClick={() => {
                      signOut().catch(console.error);
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <button
                  className="p-4"
                  onClick={() => {
                    signIn("google").catch(console.error);
                  }}
                >
                  Sign In
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
