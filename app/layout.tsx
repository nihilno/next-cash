import Header from "@/components/global/header";
import Providers from "@/components/global/providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Cash",
  description: "Finances managing app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={cn(inter.className, "flex min-h-dvh flex-col antialiased")}
        >
          <Header />
          <main className="container mx-auto mt-8 flex-1 px-6">{children}</main>
        </body>
      </html>
    </Providers>
  );
}
