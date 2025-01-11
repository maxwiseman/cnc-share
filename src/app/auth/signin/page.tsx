"use client";

import { getProviders, signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { use } from "react";

export default function SignIn() {
  const session = useSession();

  if (session.status === "authenticated") {
    redirect("/");
  }

  const providers = use(getProviders());

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Sign in to CNCShare</h1>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name} className="mb-3">
              <Button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
