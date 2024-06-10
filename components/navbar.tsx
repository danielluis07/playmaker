import Link from "next/link";
import { MdMenu } from "react-icons/md";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export const Navbar = () => {
  return (
    <nav className="w-full p-5 border-b">
      <div className="flex items-center justify-between maxmd:hidden">
        <span className="logo">
          <Link href="/">Playmaker</Link>
        </span>
        <ul className="flex items-center justify-between px-3 pt-2 w-5/6">
          <li>
            <Link href="/">NBA</Link>
          </li>
          <li>
            <Link href="/">NFL</Link>
          </li>
          <li>
            <Link href="/">Colunas</Link>
          </li>
          <li>
            <Link href="/">Calendário</Link>
          </li>
          <li>
            <Link href="/">Sobre Nós</Link>
          </li>
          <li>
            <Link href="/">Contato</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-between md:hidden">
        <span className="logo">
          <Link href="/">P</Link>
        </span>
        <Sheet>
          <SheetTrigger>
            <MdMenu className="text-4xl" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
