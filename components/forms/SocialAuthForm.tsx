"use client";

import ROUTES from "@/constants/route";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 gap-2 px-4 py-3.5 flex-center cursor-pointer";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
      });
    } catch (error) {
      console.log(error);

      toast.error("Sign in failed", {
        description: error instanceof Error ? error.message : "Please try again",
      });
    }
  };
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="github logo"
          width={20}
          height={20}
          className="invert-colors mr-2 object-contain"
        />

        <span>Log in with GitHub</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image src="/icons/google.svg" alt="google logo" width={20} height={20} className="mr-2 object-contain" />

        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
