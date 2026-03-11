"use client";
import { Home, Plus, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FloatingNav() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-14 bg-neutral-950 backdrop-blur-md border border-white/10 px-8 py-2 rounded-full shadow-2xl">
        {/* Menu Home */}
        <Link href="/" className="flex flex-col items-center gap-1 group">
          <Image src="/images/Home.svg" width={24} height={24} alt="Home" />
          <span className="text-xs font-bold text-primary-300">Home</span>
        </Link>

        {/* Tombol Plus (Center Action) */}
        <Link
          href="/add-post"
          className="bg-primary-300 hover:bg-purple-500 text-white p-3 rounded-full transition-all active:scale-95 shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-6 h-6" />
        </Link>

        {/* Menu Profile */}
        <Link href="/" className="flex flex-col items-center gap-1 group">
          <Image
            src="/images/Profile.svg"
            width={24}
            height={24}
            alt="Profile"
          />
          <span className="text-xs text-white font-medium">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
