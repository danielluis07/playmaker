"use client";

import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MenuMobile } from "@/components/header/menu-mobile";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [top, setTop] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleScroll = useCallback(() => {
    setTop(window.scrollY === 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleMouseEnter = useCallback(
    (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
      setOpen(true);
    },
    []
  );

  const handleMouseLeave = useCallback(
    (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
      setOpen(false);
    },
    []
  );

  const handleClick = useCallback(
    (url: string) => {
      router.push(url);
      setIsOpen(false);
    },
    [router]
  );

  return (
    <div className="maxlg:hidden">
      <div
        className={cn(
          !top && "hidden",
          "relative border-t border-gray-400 w-full"
        )}>
        <nav className="w-full px-3 md:px-0">
          <div className="w-full py-4 border-b">
            <div className="flex items-center justify-center max-w-[1200px] mx-auto maxmd:hidden">
              <ul className="flex items-center justify-between text-sm px-3 w-[70%] navbar-font">
                <li
                  onMouseEnter={() => handleMouseEnter(setIsOpen)}
                  onMouseLeave={() => handleMouseLeave(setIsOpen)}
                  className="flex items-center cursor-pointer">
                  <span>Esportes</span>
                  <MdKeyboardArrowDown className="text-lg" />
                </li>
                <li>
                  <Link href="/">Colunas</Link>
                </li>
                <li>
                  <Link href="/about">Sobre Nós</Link>
                </li>
                <li>
                  <Link href="/">Contato</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {/* NBA */}
      <div
        onMouseEnter={() => handleMouseEnter(setIsOpen)}
        onMouseLeave={() => handleMouseLeave(setIsOpen)}
        className={cn(
          !isOpen
            ? "hidden"
            : "absolute top-[110px] flex justify-center items-center w-full p-10 bg-slate-50"
        )}>
        <div className="inline-flex justify-between basis-4/6 h-56 navbar-font">
          <div className="space-y-3 w-full">
            <Link href="/nba">
              <h2 className="text-lg underline">NBA</h2>
            </Link>
            <div
              onClick={() => handleClick("/nba/teams")}
              className="hover:underline cursor-pointer">
              Times
            </div>
            <div
              onClick={() => handleClick("/nba/standings")}
              className="hover:underline cursor-pointer">
              Classificação
            </div>
            <div
              onClick={() => handleClick("/nba/schedule")}
              className="hover:underline cursor-pointer">
              Calendário
            </div>
            <div
              onClick={() => handleClick("/nba/stats")}
              className="hover:underline cursor-pointer">
              Estatísticas
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="pl-3 space-y-3 w-full">
            <Link href="/nfl">
              <h2 className="text-lg underline">NFL</h2>
            </Link>
            <div
              onClick={() => handleClick("/nba/standings")}
              className="hover:underline cursor-pointer">
              Times
            </div>
            <div
              onClick={() => handleClick("/nfl/standings")}
              className="hover:underline cursor-pointer">
              Classificação
            </div>
            <div
              onClick={() => handleClick("/nfl/schedule")}
              className="hover:underline cursor-pointer">
              Calendário
            </div>
            <div
              onClick={() => handleClick("/nfl/stats")}
              className="hover:underline cursor-pointer">
              Estatísticas
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="pl-3 space-y-3 w-full">
            <h2 className="text-lg underline">MLB</h2>
            <span>Em breve</span>
          </div>
          <Separator orientation="vertical" />
          <div className="pl-3 space-y-3 w-full">
            <h2 className="text-lg underline">NHL</h2>
            <span>Em breve</span>
          </div>
        </div>
      </div>
    </div>
  );
};
