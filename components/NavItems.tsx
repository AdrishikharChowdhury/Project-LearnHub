"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavItemsProps {
  isQuiz: boolean;
}

const NavItems = ({ isQuiz }: NavItemsProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const items = isQuiz
    ? [
        { label: "Home", href: "/" },
        { label: "Companions", href: "/companions" },
        { label: "Quizzes", href: "/quiz" },
        { label: "My Journey", href: "/my-journey" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Companions", href: "/companions" },
        { label: "My Journey", href: "/my-journey" },
      ];

  return (
    <>
      <div className="hidden sm:flex items-center gap-2">
        {items.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
            className={cn(
              "px-4 py-2 text-sm lg:text-base font-bold border-[3px] border-black rounded transition-all",
              pathname === item.href
                ? "bg-primary text-white shadow-brutal"
                : "bg-white text-black shadow-brutal hover:shadow-brutal-hover",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <button
        onClick={() => setOpen(true)}
        className="sm:hidden p-2 cursor-pointer"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative ml-auto w-3/4 max-w-xs h-full bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b-[3px] border-black">
              <span className="font-extrabold text-lg">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="p-1 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 pt-4">
              {items.map((item, idx) => (
                <Link
                  href={item.href}
                  key={idx}
                  className={cn(
                    "px-4 py-3 rounded text-base font-bold transition-colors border-[3px] border-black",
                    pathname === item.href
                      ? "bg-primary text-white shadow-brutal"
                      : "hover:bg-gray-100",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
