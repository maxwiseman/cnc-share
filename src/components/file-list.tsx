/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import SearchBar from "./search-bar";
import { api } from "@/trpc/react";
import type { files } from "@/server/db/schema";

export default function FileList() {
  const [filteredFiles, setFilteredFiles] = useState<
    (typeof files.$inferSelect)[]
  >([]);
  const { data, isFetched } = api.file.getFiles.useQuery();

  useEffect(() => {
    if (data) setFilteredFiles(data);
  }, [data]);

  if (!isFetched) return <>Loading...</>;

  const handleSearch = (query: string) => {
    if (!isFetched || !data) return;
    const lowercaseQuery = query.toLowerCase();
    const filtered = data.filter((file) =>
      file.title?.toLowerCase().includes(lowercaseQuery),
    );
    setFilteredFiles(filtered);
  };

  return (
    <>
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      {filteredFiles.length === 0 ? (
        <p>No files available.</p>
      ) : (
        <ul className="grid grid-cols-5 gap-6">
          {filteredFiles.map((file) => (
            <li key={file.id}>
              <Link href={`/file/${encodeURIComponent(file.id)}`}>
                <Card className="group flex flex-col items-center justify-between p-4">
                  {file.fileUrl && (
                    <img
                      alt="File Preview"
                      className="aspect-square grow object-center"
                      src={file.fileUrl}
                    />
                  )}
                  <div className="flex w-full items-center justify-between gap-2">
                    <Link
                      href={`/file/${encodeURIComponent(file.id)}`}
                      className="text-lg group-hover:underline"
                    >
                      {file.title}
                    </Link>
                    {/* TODO: Fix the hydration error with this button */}
                    {/* <Button
                      aria-label={`Download ${file.title}`}
                      asChild
                      size="icon"
                      variant="outline"
                    >
                      <a href={file.fileUrl ?? ""} download>
                        <span className="sr-only">Download {file.title}</span>
                        <IconDownload className="h-4 w-4" />
                      </a>
                    </Button> */}
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
