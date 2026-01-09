"use client";

import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

function SignOut() {
  return (
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
  );
}

export default SignOut;
