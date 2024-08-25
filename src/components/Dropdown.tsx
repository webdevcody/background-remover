import { type ReactNode, useState, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useClickAway } from "react-use";

export function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsOpen(false);
  });

  return (
    <div
      ref={ref}
      className="absolute -top-2 -right-2 flex items-end justify-center rounded-xl bg-black p-2 text-xl"
    >
      <button
        className="text-white hover:text-cyan-300"
        onClick={() => setIsOpen((prevOpen) => !prevOpen)}
      >
        <AiOutlineMenu />
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute left-1 top-10 z-10 flex w-max flex-col gap-4 rounded-lg bg-dark-gray p-4 text-base"
        >
          {children}
        </div>
      )}
    </div>
  );
}
