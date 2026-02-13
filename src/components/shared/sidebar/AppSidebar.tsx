"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navItems } from "@/components/shared/sidebar/navItems";
import Typography from "@/components/ui/typography";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";

export default function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar className="shadow-md">
      <SidebarHeader>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "min-h-fit justify-start gap-2 px-6 text-2xl font-bold hover:bg-transparent",
          )}
        >
          <Image
            src="/assets/icons/swappr-logo-filled.png"
            alt="Swappr"
            width={120}
            height={40}
            priority
            className="h-8 w-auto"
          />
          <Typography component="span">Swappr</Typography>
        </Link>
      </SidebarHeader>

      <SidebarContent className="relative">
        <SidebarGroup>
          <ul className="flex flex-col gap-y-2 pt-6">
            {navItems.map((navItem, index) => (
              <li key={`nav-item-${index}`}>
                <Link
                  onClick={isMobile ? () => setOpenMobile(false) : undefined}
                  href={navItem.url}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "focus-visible:bg-accent focus-visible:text-accent-foreground relative w-full justify-start gap-x-2.5 px-5 py-4 text-base font-medium [&_svg]:size-6 [&_svg]:shrink-0",
                    pathname === navItem.url &&
                      "bg-accent text-accent-foreground after:bg-primary after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:rounded-r-lg after:content-['']",
                  )}
                >
                  {navItem.icon} {navItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <form action="/auth/sign-out" method="post">
          <Button
            type="submit"
            className="w-full py-3 text-base whitespace-nowrap"
          >
            <LogOut className="mr-3 size-6 shrink-0" />
            Log out
          </Button>
        </form>
        {/* <div className="absolute right-0 bottom-0 left-0 w-full border-t px-6 py-4"></div> */}
      </SidebarFooter>
    </Sidebar>
  );
}
