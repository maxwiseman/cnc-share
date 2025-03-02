"use client";

import AuthStatus from "@/components/auth-status";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetTitle } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAdmin } from "@/hooks/use-admin";
import {
  IconLogin,
  IconLogout,
  IconMenu2,
  IconUser,
} from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { isMobile, setOpenMobile } = useSidebar();
  const { isAdmin } = useAdmin();

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
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="rounded-md py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Admin
                  </Link>
                )}
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
              <IconMenu2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const { data, status } = useSession();
  const { isAdmin } = useAdmin();

  return (
    <Sidebar>
      <SheetTitle className="sr-only">Menu</SheetTitle>
      {/* <SidebarHeader>Title</SidebarHeader> */}
      <SidebarContent className="max-h-full justify-between p-2">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex-shrink-0 p-2">
            <span className="text-2xl font-bold text-primary">CNCShare</span>
          </Link>
          {isAdmin && (
            <SidebarMenuButton
              onClick={() => {
                setOpenMobile(false);
              }}
              asChild
            >
              <Link href="/admin">Admin</Link>
            </SidebarMenuButton>
          )}
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
        </div>
        {status === "unauthenticated" && (
          <SidebarMenuButton
            onClick={async () => {
              await signIn();
            }}
            className="min-h-max"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage />
              <AvatarFallback>
                <IconLogin className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>Sign in</div>
          </SidebarMenuButton>
        )}
        {status === "authenticated" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="max-h-full min-h-max">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={data?.user.image ?? ""} />
                  <AvatarFallback>
                    <IconUser className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold">{data?.user.name}</div>
                  {status === "authenticated" && (
                    <div className="text-sm text-muted-foreground">
                      {data?.user.email}
                    </div>
                  )}
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="h-full">
              <DropdownMenuItem
                onClick={async () => {
                  await signOut();
                }}
              >
                <IconLogout className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
