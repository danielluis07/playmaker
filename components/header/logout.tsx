"use client";

import { CiLogout } from "react-icons/ci";
import { logOut } from "@/actions/logout";
import { useTransition } from "react";

export const Logout = () => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    logOut();
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-3 cursor-pointer">
      <span>Sair</span>
      <CiLogout />
    </div>
  );
};
