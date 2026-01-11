"use client";

import { ModeToggle } from "@/components/global/mode-toggle";
import SignOut from "@/components/header/sign-out";
import { navLinks } from "@/lib/consts/navLinks";
import { cn } from "@/lib/utils";
import { SignedIn, useSession } from "@clerk/nextjs";
import { Loader2Icon, LucideHome } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  const session = useSession();

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
          {!session.isLoaded ? (
            <div className="border-muted-foreground flex items-center gap-3 border-l pl-3">
              <Loader2Icon
                className="text-muted-foreground h-5 w-5 animate-spin"
                aria-label="Loading navigation"
              />
            </div>
          ) : (
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
          )}
        </div>
        {!session.isLoaded ? (
          <Loader2Icon
            className="text-muted-foreground w-25 animate-spin"
            aria-label="Loading authentication"
          />
        ) : (
          <SignOut />
        )}
      </nav>
    </header>
  );
}

export default Header;
