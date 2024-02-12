"use client";

import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PartyPopper } from "lucide-react";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="relative flex h-[80dvh] max-w-6xl flex-row space-x-52 space-y-4">
      <div className="flex flex-col gap-10 space-y-4 text-start">
        <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
          Design. Diagram. Database. Welcome to{" "}
          <span className="underline">FieldDB</span>
        </h1>
        <h3 className="font-medium sm:text-xl md:text-2xl">
          FieldDB is the connected database platform where efficient, organized
          data diagraming happens.
        </h3>
        {isLoading && (
          <div className="flex w-full items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <Button asChild>
            <Link href="/diagrams">
              Enter FieldDB
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button>
              Get FieldDB free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SignInButton>
        )}
      </div>
      <div className="h-[50%] w-[100%] rounded-xl bg-red-500"></div>
    </div>
  );
};

export default Heading;
