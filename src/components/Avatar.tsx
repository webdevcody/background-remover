import { signOut, useSession } from "next-auth/react";
import { useRef } from "react";
import { useClickAway, useToggle } from "react-use";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

export function Avatar() {
  const { deleteAccount } = useDeleteAccount();
  const session = useSession();
  const [isMenuOpen, toggleMenu] = useToggle(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    toggleMenu(false);
  });

  return (
    <div className="relative" ref={ref}>
      <img
        onClick={toggleMenu}
        className="h-10 w-10 cursor-pointer rounded-full"
        referrerPolicy="no-referrer"
        src={session.data?.user.image ?? "/static/person.png"}
        alt={`image of ${session.data?.user.name ?? "unknown"}`}
      />

      {isMenuOpen && (
        <div className="absolute -left-12 top-12 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{session.data?.user.name}</div>
            <div className="truncate font-medium">
              {session.data?.user.email}
            </div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <button
                onClick={deleteAccount}
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete Account
              </button>
            </li>
          </ul>
          <div className="py-1">
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                signOut().catch(console.error);
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
