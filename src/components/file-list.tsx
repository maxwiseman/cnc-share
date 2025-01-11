"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchBar from "./search-bar";
import { api } from "@/trpc/react";
import { files } from "@/server/db/schema";

export default function FileList() {
  const [filteredFiles, setFilteredFiles] = useState<
    (typeof files.$inferSelect)[]
  >([]);
  const { data, isFetched } = api.file.getFiles.useQuery();

  if (!isFetched) return <>Loading...</>;

  const handleSearch = (query: string) => {
    if (!isFetched || !data) return;
    const lowercaseQuery = query.toLowerCase();
    const filtered = data.filter((file) =>
      file.title?.toLowerCase().includes(lowercaseQuery),
    );
    setFilteredFiles(filtered);
  };

  useEffect(() => {
    if (data) setFilteredFiles(data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available CNC Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        {filteredFiles.length === 0 ? (
          <p>No files available.</p>
        ) : (
          <ul className="space-y-2">
            {filteredFiles.map((file) => (
              <li key={file.id} className="flex items-center justify-between">
                <Link
                  href={`/file/${encodeURIComponent(file.id)}`}
                  className="hover:underline"
                >
                  {file.title}
                </Link>
                <Button asChild>
                  <a href={file.fileUrl ?? ""} download>
                    Download
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
