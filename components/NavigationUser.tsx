'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Hotel, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Navigation() {
  const pathname = usePathname();
  const links = [
    { href: "/Users/generate", label: "generate" },
    { href: "/Users/program", label: "Program" },
    { href: "/Users/trainerList", label: "Trainers" },
    { href: "/Users/notes", label: "Messages" },
    { href: "/logout", label: "Logout"},
  ];

  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-[#F8FAFC] shadow-sm w-full  "
    >
      <div className="container  px-4 border-b border-[#E2E8F0]">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-xl text-[#1E3A8A]"
          >
            <Hotel className="h-6 w-6 text-[#1E3A8A]" />
            <span>Trainify</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-[#C9A227] text-[#0F172A] hover:bg-[#A8871E]"
                      : "text-[#64748B] hover:bg-[#F8E77B] hover:text-[#0F172A]"
                  }`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-[#1E3A8A]">
                  {open ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-64 bg-[#F8FAFC]">
                <SheetHeader>
                  <SheetTitle className="text-[#1E3A8A] font-semibold">Menu</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col mt-4 space-y-2">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                      <Button
                        variant="ghost"
                        className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          pathname === link.href
                            ? "bg-[#C9A227] text-[#0F172A] hover:bg-[#A8871E]"
                            : "text-[#64748B] hover:bg-[#F8E77B] hover:text-[#0F172A]"
                        }`}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
