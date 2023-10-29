import Image from "next/image";
import Heading from "./_components/Heading";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col  pt-40">
      <div
        className="flex flex-col items-center justify-center
      md:justify-start dark:bg-[#1f1f1f] text-center gap-y-8 flex-1 px-6 pb-10"
      >
        <Heading />
        <Image
          height={"400"}
          width={"400"}
          src={"/reading.svg"}
          alt="office"
          className="dark:hidden"
        />
        <Image
          height={"400"}
          width={"400"}
          src={"/reading-dark.svg"}
          alt="office"
          className="dark:block hidden"
        />
      </div>
      <Footer />
    </div>
  );
}
