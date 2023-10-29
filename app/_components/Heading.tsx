"use client";

import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Design. Diagram. Database. Welcome to{" "}
        <span className="underline">FieldDB</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        FieldDB is the connected database platform where <br />
        efficient, organized data diagraming happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/diagrams">
            Enter FieldDB
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get FieldDB free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
