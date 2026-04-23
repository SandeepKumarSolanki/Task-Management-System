"use client";

import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Members", path: "/members" },
  { label: "Member_project", path: "/member_project" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[240px] bg-[#022b53] text-white z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
        >
        <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
          <Image
            src="/logo/UK_LOGO.png"
            alt="UK Logo"
            width={45}
            height={45}
            className="object-contain flex-shrink-0"
        />

          <h3 className="text-2xl font-bold tracking-wide whitespace-nowrap flex-shrink-0">
          UKPMS
          </h3>
        </div>

        <nav className="mt-6 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="block rounded-xl px-4 py-3 mb-2 hover:bg-white/10 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}