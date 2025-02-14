"use client";

import AuthStatus from "@/components/auth-status";
import { Button } from "@/components/ui/button";
import { SheetTitle } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { IconLayoutSidebar } from "@tabler/icons-react";
import Link from "next/link";

export function Navbar() {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">CNCShare</span>
            </Link>
            {!isMobile && (
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
                <Link
                  href="/about"
                  className="rounded-md py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  About
                </Link>
              </div>
            )}
          </div>
          {!isMobile && <AuthStatus />}
          {isMobile && <AppSidebar />}
          {isMobile && (
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                setOpenMobile(true);
              }}
            >
              <IconLayoutSidebar className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar>
      <SheetTitle className="sr-only">Menu</SheetTitle>
      {/* <SidebarHeader>Title</SidebarHeader> */}
      <SidebarContent className="p-2">
        <Link href="/" className="flex-shrink-0 p-2">
          <span className="text-2xl font-bold text-primary">CNCShare</span>
        </Link>
        <SidebarMenuButton
          onClick={() => {
            setOpenMobile(false);
          }}
          asChild
        >
          <Link href="/">Files</Link>
        </SidebarMenuButton>
        <SidebarMenuButton
          onClick={() => {
            setOpenMobile(false);
          }}
          asChild
        >
          <Link href="/upload">Upload</Link>
        </SidebarMenuButton>
        <SidebarMenuButton
          onClick={() => {
            setOpenMobile(false);
          }}
          asChild
        >
          <Link href="/about">About</Link>
        </SidebarMenuButton>
      </SidebarContent>
    </Sidebar>
  );
}
