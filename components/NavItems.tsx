"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface navItems {
  label: string;
  href: string;
}

const navItems: navItems[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Companions",
    href: "/companions",
  },
  {
    label: "Quizzes",
    href:"/quiz"
  },
  {
    label: "My Journey",
    href: "/my-journey",
  }
];

const NavItems = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-4">
      {navItems.map((navItem: navItems, idx: number) => (
        <Link
          href={navItem.href}
          key={idx}
          className={cn(
            pathname === navItem.href && "text-primary font-semibold",
          )}
        >
          {navItem.label}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
