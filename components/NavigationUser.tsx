'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/Users/generate", label: "Generate" },
    { href: "/Users/program", label: "Programs" },
    { href: "/Users/trainerList", label: "Trainers" },
    { href: "/Users/notes", label: "Messages" },
    { href: "/logout", label: "Logout" },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-white shadow-md">
              <Dumbbell className="h-5 w-5" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-foreground">
              Trainify
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={`relative px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}

                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-linear-to-r from-indigo-500 to-purple-500"
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {open ? <X size={22} /> : <Menu size={22} />}
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-72 bg-background/95 backdrop-blur-xl"
              >
                <SheetHeader>
                  <SheetTitle className="text-lg font-bold tracking-tight">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-2">
                  {links.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className={`w-full justify-start px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                            isActive
                              ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {link.label}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
