import Image from "next/image";
import Heading from "./_components/Heading";
import { Footer } from "@/components/Footer";
import { Database } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col pt-40 px-6 pb-10">
      <div
        className="flex flex-col items-center justify-center
      md:justify-start dark:bg-[#1f1f1f] text-center gap-y-8 flex-1 mb-20"
      >
        <Heading />
      </div>
      <div className="flex flex-row justify-between items-center px-60 text-center gap-x-32">
        <div className="flex flex-col justify-center items-center">
          <Database />
          <h4 className="text-lg">Different Database Support</h4>
          <p className="text-sm font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            laborum deleniti fugit nisi, libero provident repellat soluta in
            eius ullam?
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Database />
          <h4 className="text-lg">Different Database Support</h4>
          <p className="text-sm font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            laborum deleniti fugit nisi, libero provident repellat soluta in
            eius ullam?
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Database />
          <h4 className="text-lg">Different Database Support</h4>
          <p className="text-sm font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            laborum deleniti fugit nisi, libero provident repellat soluta in
            eius ullam?
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
