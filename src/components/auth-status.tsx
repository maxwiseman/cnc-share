"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { IconLogout } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>
              {session.user.name
                ?.split(" ")
                .map((i) => i.at(0))
                .join("")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div>{session.user.name}</div>
            <div className="text-sm font-normal text-muted-foreground">
              {session.user.email}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuCheckboxItem
                onClick={() => {
                  setTheme("dark");
                }}
                checked={theme === "dark"}
              >
                Dark
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => {
                  setTheme("light");
                }}
                checked={theme === "light"}
              >
                Light
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => {
                  setTheme("system");
                }}
                checked={theme === "system"}
              >
                System
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem onSelect={() => signOut()}>
            <IconLogout className="h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <Button onClick={() => signIn()}>Sign in</Button>;
}
