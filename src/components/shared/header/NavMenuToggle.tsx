"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export default function NavMenuToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="default"
      size="icon"
      onClick={toggleSidebar}
      className="md:hidden justify-center flex"
    >
      <Menu />
    </Button>
  );
}
