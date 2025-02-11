"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import FileList from "@/components/file-list";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState([]);

  const { data, isLoading } = api.file.searchFiles.useQuery({ query });

  useEffect(() => {
    if (data) {
      setSearchResults(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 space-y-8">
      <h1 className="text-center text-5xl font-bold">Search Results</h1>
      <FileList files={searchResults} />
    </div>
  );
}
