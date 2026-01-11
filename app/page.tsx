import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function HomePage() {
  const { sessionStatus } = await auth();
  console.log(sessionStatus);

  return (
    <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-2 text-center">
      <h1 className="text-3xl font-bold tracking-wider sm:text-4xl">
        Homepage
      </h1>
      <p>Begin by logging in.</p>

      <SignedOut>
        <div className="mt-8 space-x-2">
          <SignInButton forceRedirectUrl={"/dashboard"}>
            <Button>Sign in</Button>
          </SignInButton>
          <SignUpButton forceRedirectUrl={"/dashboard"}>
            <Button>Sign up</Button>
          </SignUpButton>
        </div>
      </SignedOut>
    </section>
  );
}
