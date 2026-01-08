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
        <Link href="/">
          <LucideHome className="cursor-pointer" />
        </Link>
        <div className="space-x-2">
          <SignedOut>
            <SignInButton>
              <Button size="sm">Sign in</Button>
            </SignInButton>
            <SignUpButton>
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
