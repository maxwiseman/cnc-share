"use client";

import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import AuthStatus from "@/components/auth-status";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "CNC Share",
  description: "By Max and William",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${GeistSans.variable}`}
    >
      <body>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <TRPCReactProvider>
              <div className="min-h-screen bg-gray-100">
                <nav className="sticky top-0 z-50 bg-white shadow">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                      <div className="flex items-center gap-6">
                        <Link href="/" className="flex-shrink-0">
                          <span className="text-2xl font-bold text-primary">
                            CNCShare
                          </span>
                        </Link>
                        <div className="flex items-center gap-4">
                          <Link
                            href="/"
                            className="rounded-md py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                          >
                            Files
                          </Link>
                          <Link
                            href="/upload"
                            className="rounded-md py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                          >
                            Upload
                          </Link>
                        </div>
                      </div>
                      <form
                        onSubmit={handleSearchSubmit}
                        className="flex gap-2"
                      >
                        <Input
                          type="text"
                          placeholder="Search CNC files..."
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          className="flex-grow bg-background"
                        />
                        <Button type="submit">Search</Button>
                      </form>
                      <AuthStatus />
                    </div>
                  </div>
                </nav>
                <main>
                  <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                  </div>
                </main>
              </div>
            </TRPCReactProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
