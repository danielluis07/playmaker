import placeholder from "@/public/images/image-placeholder.jpg";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Social } from "./social";
import { auth } from "@/auth";

export const Login = async () => {
  const session = await auth();
  return (
    <>
      {session ? (
        <div className="relative size-10 rounded-full overflow-hidden">
          <Image src={session.user?.image ?? placeholder} alt="usuario" fill />
        </div>
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
