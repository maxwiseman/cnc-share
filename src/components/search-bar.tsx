"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirect(`/search?q=${query}`);
  };

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setQuery(query);
    }
  }, [searchParams]);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search CNC files..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow bg-background"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
