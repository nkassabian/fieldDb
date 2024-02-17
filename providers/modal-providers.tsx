"use client";

import CreateDiagramModal from "@/components/modals/CreateDiagramModal";
import DigramInfoModal from "@/components/modals/DiagramInfoModal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateDiagramModal />
      <DigramInfoModal />
    </>
  );
};
