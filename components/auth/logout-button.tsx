"use client";

import { CiLogout } from "react-icons/ci";
import { Button } from "../ui/button";
import { logOut } from "@/actions/logout";
import { toast } from "sonner";
import { ExitModal } from "@/modals/exit-modal";
import { useExit } from "@/hooks/use-exit";

export const LogoutButton = () => {
  const { onOpen, onClose } = useExit();
  const onClick = () => {
    onOpen();
    logOut()
      .then(() => {
        toast.success("Deslogado com sucesso");
        onClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocorreu um erro ao tentar sair");
      });
  };
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 my-2 w-full">
      <CiLogout className="text-lg" />
      <p>Sair</p>
    </button>
  );
};
