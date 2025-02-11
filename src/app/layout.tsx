import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import AuthStatus from "@/components/auth-status";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "CNC Share",
  description: "By Max and William",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
                <nav className="sticky top-0 bg-white shadow">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                      <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                          <span className="text-2xl font-bold text-gray-900">
                            CNCShare
                          </span>
                        </Link>
                        <div className="ml-10 flex items-center space-x-4">
                          <Link
                            href="/"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                          >
                            Home
                          </Link>
                          <Link
                            href="/upload"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                          >
                            Upload
                          </Link>
                        </div>
                      </div>
                      <AuthStatus />
                    </div>
                  </div>
                </nav>
                <main>
                  <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
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
