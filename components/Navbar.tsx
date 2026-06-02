import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import { UserButton, Show } from "@clerk/nextjs";

const Navbar = ({ isQuiz }: { isQuiz: boolean }) => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" width={56} height={54} className="size-10 sm:size-[56px]" />
        </div>
      </Link>
      <div className="flex items-center gap-4 sm:gap-8">
        <NavItems isQuiz={isQuiz} />
        <div className="flex items-center gap-2 sm:gap-4">
          <Show when="signed-out">
            <button className="btn-signin text-xs sm:text-sm px-3 sm:px-4">Sign in</button>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
