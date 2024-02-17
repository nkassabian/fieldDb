"use client";

// import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { useConvex, useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/Logo";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  // const scrolleed = useScrollTop();
  return (
    <div
      className={cn(
        "bg-background fixed top-0 z-50 flex w-full items-center px-6 py-3 dark:bg-[#1f1f1f]",
        // scrolleed && "border-b shadow-sm"
      )}
    >
      <Logo />

      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get FieldDB</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
