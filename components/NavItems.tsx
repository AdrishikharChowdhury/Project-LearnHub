"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemsProps {
  isQuiz: boolean;
}

const NavItems = ({ isQuiz }: NavItemsProps) => {
  const pathname = usePathname();

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
    <div className="flex items-center gap-4">
      {items.map((item, idx) => (
        <Link
          href={item.href}
          key={idx}
          className={cn(
            pathname === item.href && "text-primary font-semibold",
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
