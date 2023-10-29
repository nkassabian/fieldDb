"use client";

import { Navbar } from "@/components/Nabar";
import { Spinner } from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <Navbar />
      <main className="flex-1 h-full overflow-y-auto mt-[88px]">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
