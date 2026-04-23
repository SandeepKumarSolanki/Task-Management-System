"use client";

import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

interface HeaderProps {
  onToggle: () => void;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
}

export default function Header({
  onToggle,
  searchTerm = "",
  setSearchTerm,
}: HeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const userName = session?.user?.name || "Anurag Sharma";
  const userEmail = session?.user?.email || "anurag@gmail.com";
  const initial = userName.charAt(0).toUpperCase();

  return (
    <header className="fixed top-0 right-0 left-0 md:left-60 h-14 bg-blue-700 z-50 flex items-center justify-between px-4 text-white shadow">
      <div className="flex items-center gap-4">
        <button onClick={onToggle} className="md:hidden text-2xl">
          ☰
        </button>

        {pathname === "/projects" ? (
          <div className="flex items-center bg-white/10 rounded-full px-4 py-2 w-72">
            <Search size={16} />

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm?.(e.target.value)}
              className="bg-transparent outline-none ml-2 w-full placeholder:text-white/70"
            />
          </div>
        ) : (
          <h1 className="text-xl font-semibold">Dashboard</h1>
        )}
      </div>

      <div className="relative">
  <div
    onClick={() => setOpen(!open)}
    className="flex h-11 items-center gap-3 rounded-full bg-white/10 px-3 py-1.5 cursor-pointer border border-white/10"
  >
    <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-lg font-semibold">
      {initial}
    </div>

    <div className="hidden sm:block leading-tight">
      <p className="text-base font-semibold">{userName}</p>
      <p className="text-xs text-white/80 truncate max-w-[140px]">
        {userEmail}
      </p>
    </div>
  </div>

  {open && (
    <div className="absolute right-0 mt-2 w-32 rounded-xl bg-white text-black shadow-lg p-2">
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-red-500 text-sm"
      >
        Logout
      </button>
    </div>
  )}
</div>
    </header>
  );
}