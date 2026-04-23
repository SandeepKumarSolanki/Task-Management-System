"use client";

import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
}

export default function DashboardLayout({
  children,
  searchTerm = "",
  setSearchTerm = () => {},
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <Header
        onToggle={() => setIsOpen(!isOpen)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="pt-24 md:ml-60 p-4 bg-gray-100 min-h-screen">
        {children}
      </main>
    </>
  );
}