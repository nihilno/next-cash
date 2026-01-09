import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkProvider>
        {children}
        <Toaster />
      </ClerkProvider>
    </>
  );
}

export default Providers;
