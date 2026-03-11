import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Menu, X, Search } from "lucide-react";
import Link from "next/link";

export function MenuDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="!w-screen !max-w-full">
        <DrawerHeader>
          <DrawerTitle className="sr-only">Menu Navigasi</DrawerTitle>
          <DrawerDescription className="sr-only">
            Pilih menu login atau register untuk melanjutkan.
          </DrawerDescription>
          <div className="flex justify-end">
            {/* Tambahkan asChild di sini */}
            <DrawerClose asChild>
              <Button variant="ghost">
                <X />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex flex-col justify-center items-center gap-4">
          {/* PERBAIKAN: Gunakan asChild dan bungkus Button dengan Link */}
          <DrawerClose asChild>
            <Link href="/login">
              <Button className="w-45.5 h-11 rounded-full bg-neutral-900 text-primary font-bold">
                Login
              </Button>
            </Link>
          </DrawerClose>

          <DrawerClose asChild>
            <Link href="/register">
              <Button className="w-45.5 h-11 rounded-full bg-primary-300 text-primary font-bold">
                Register
              </Button>
            </Link>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
