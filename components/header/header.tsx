import Link from "next/link";
import { Navbar } from "@/components/header/navbar";
import { MenuMobile } from "@/components/header/menu-mobile";
import { Search } from "@/components/header/search";
import { Social } from "./social";
import { Login } from "./login";

export const Header = () => {
  return (
    <div className="fixed top-0 bg-white z-30 w-full maxlg:border-b border-gray-300">
      <div className="flex justify-between items-center w-full px-3">
        <MenuMobile />
        <span className="logo">
          <Link href="/">Playmaker</Link>
        </span>
        <div className="flex gap-x-2">
          <Login />
          <Search />
        </div>
      </div>
      <Navbar />
    </div>
  );
};
