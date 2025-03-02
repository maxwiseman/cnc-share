import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { baseMetadata } from "./base-metadata";

export const metadata: Metadata = {
  ...baseMetadata,
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
              <div className="min-h-screen bg-muted/40">
                <SidebarProvider className="contents">
                  <div className="flex h-10 w-full items-center justify-center font-bold [background-image:repeating-linear-gradient(45deg,rgb(234_179_8),rgb(234_179_8)_10px,rgb(250_204_21)_10px,rgb(250_204_21)_20px)]">
                    <div className="flex h-full items-center justify-center rounded-full bg-yellow-400 px-4 text-black">
                      🚧 Website under construction 🚧
                    </div>
                  </div>
                  <Navbar />
                  <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                      {children}
                    </div>
                  </main>
                </SidebarProvider>
              </div>
            </TRPCReactProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
