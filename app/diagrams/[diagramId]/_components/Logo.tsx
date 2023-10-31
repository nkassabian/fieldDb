import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

interface LogoProperties {
  onClick?: () => void;
  diagramTitle?: string;
}

export const Logo = ({ onClick, diagramTitle }: LogoProperties) => {
  return (
    <div className="hidden md:flex items-center gap-x-2" onClick={onClick}>
      <Image
        className="dark:hidden"
        src={"/logo.svg"}
        height={"30"}
        width={"30"}
        alt="Logo"
      />
      <Image
        className="hidden dark:block"
        src={"/logo-dark.svg"}
        height={"30"}
        width={"30"}
        alt="Logo"
      />
      <p className={cn("font-semibold", font.className)}>{diagramTitle}</p>
    </div>
  );
};
