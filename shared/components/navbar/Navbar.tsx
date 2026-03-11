import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";
import { MenuDrawer } from "../drawer/MenuDrawer";
import { cookies } from "next/headers";
import { Profile } from "@/features/auth/components/Profile";
import { SearchBar } from "../search-bar/SearchBar";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return (
    <nav className="flex items-center justify-between  md:px-30  py-5 px-6 lg:px-25 border-b border-neutral-500 ">
      <div className="flex gap-2 items-center">
        <Link href={"/"}>
          <Image src="/images/Logo.svg" alt="Logo" width={30} height={30} />
        </Link>
        <h1 className="text-display-xs font-bold">Sociality</h1>
      </div>
      <div className="w-100 hidden md:block">
        <SearchBar />
      </div>
      {!token ? (
        <>
          <div className="hidden md:block">
            <Button
              asChild
              className="w-32 h-11 rounded-full bg-neutral-900 mr-2"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="w-32 h-11 rounded-full bg-primary-300">
              <Link href="/register">Register</Link>
            </Button>
          </div>
          <div className="flex md:hidden items-center">
            <Button variant="ghost">
              <Search />
            </Button>
            <MenuDrawer />
          </div>
        </>
      ) : (
        <div className="flex gap-6 items-center">
          <Profile />
        </div>
      )}
    </nav>
  );
}
