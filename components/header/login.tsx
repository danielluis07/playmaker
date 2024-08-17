import placeholder from "@/public/images/image-placeholder.jpg";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Social } from "./social";
import { auth } from "@/auth";
import { LogoutButton } from "../auth/logout-button";

export const Login = async () => {
  const session = await auth();
  return (
    <>
      {session ? (
        <Popover>
          <PopoverTrigger>
            <div className="relative size-10 rounded-full overflow-hidden">
              <Image
                src={session.user?.image || placeholder}
                alt="usuario"
                fill
                sizes="(max-width: 480px) 10vw, (max-width: 768px) 5vw, 2.5rem"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-24">
            <LogoutButton />
          </PopoverContent>
        </Popover>
      ) : (
        <Dialog>
          <DialogTrigger className="border border-gray-400 cursor-pointer px-3">
            Entrar
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center py-5">
                Seja Bem Vindo!
              </DialogTitle>
              <Social />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
