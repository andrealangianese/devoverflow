import { Button } from "@base-ui/react";
import Image from "next/image";
import React from "react";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 gap-2 px-4 py-3.5 flex-center";
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Button className={buttonClass}>
        <Image
          src="/icons/github.svg"
          alt="github logo"
          width={20}
          height={20}
          className="invert-colors mr-2 object-contain"
        />

        <span>Log in with GitHub</span>
      </Button>
      <Button className={buttonClass}>
        <Image src="/icons/google.svg" alt="google logo" width={20} height={20} className="mr-2 object-contain" />

        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
