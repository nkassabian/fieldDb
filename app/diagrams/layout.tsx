"use client";

import { Spinner } from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navbar } from "./[diagramId]/_components/Navbar";
import { Metadata } from "next";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex h-full dark:bg-[#1f1f1f]">
      <Navbar />
      <main className="mt-[64px] h-full flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
