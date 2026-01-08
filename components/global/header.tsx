import { navLinks } from "@/lib/navLinks";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { LucideHome } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  return (
    <header className="border-muted-foreground flex h-20 flex-col justify-center border-b border-dashed">
      <nav className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href={"/"} aria-label="Home">
            <LucideHome />
          </Link>
          <SignedIn>
            {navLinks.map(({ label, href, icon }) => (
              <Link key={href} href={href} aria-label={label}>
                {icon}
              </Link>
            ))}
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
