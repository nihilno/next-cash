"use client";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/consts/navLinks";
import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { LucideHome } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

function Header() {
  const path = usePathname();

  return (
    <header className="border-muted-foreground/50 flex h-20 flex-col justify-center border-b border-dashed">
      <nav className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href={"/"} aria-label="Home">
            <LucideHome
              className={cn(
                "cursor-pointer",
                path === "/" && "text-blue-700",
                "transition-colors hover:text-blue-600/70",
              )}
            />
          </Link>
          <ModeToggle />
          <SignedIn>
            <div className="border-muted-foreground flex items-center gap-3 border-l pl-3">
              {navLinks.map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href} aria-label={label}>
                  <Icon
                    className={cn(
                      "cursor-pointer",
                      path === href && "text-blue-700",
                      "transition-colors hover:text-blue-600/70",
                    )}
                  />
                </Link>
              ))}
            </div>
          </SignedIn>
        </div>
        <div className="space-x-2">
          <SignedOut>
            <SignInButton forceRedirectUrl={"/dashboard"}>
              <Button size="sm">Sign in</Button>
            </SignInButton>
            <SignUpButton forceRedirectUrl={"/dashboard"}>
              <Button size="sm">Sign up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;
