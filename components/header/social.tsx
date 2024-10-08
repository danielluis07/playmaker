"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex flex-col sm:flex-row items-center w-full gap-x-2 gap-y-4">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
