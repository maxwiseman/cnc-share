/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import SearchBar from "./search-bar";
import { api } from "@/trpc/react";
import type { files } from "@/server/db/schema";
import LikeButton from "./like-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function FileList() {
  const [filteredFiles, setFilteredFiles] = useState<
    (typeof files.$inferSelect)[]
  >([]);
  const { data, isFetched } = api.file.getFiles.useQuery();
  const { data: likesMap } = api.file.getLikesForFiles.useQuery(
    { fileIds: data?.map((f) => f.id) ?? [] },
    { enabled: (data?.length ?? 0) > 0 },
  );

  // filters
  const [minLikeCount, setMinLikeCount] = useState<number>(0);

  useEffect(() => {
    if (!data) return;
    let next = [...data];
    // filter by minimum like count
    if (likesMap && minLikeCount > 0) {
      next = next.filter((f) => (likesMap[f.id]?.count ?? 0) >= minLikeCount);
    }
    // always show newest first by default
    next.sort((a, b) => {
      const da = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
      const db = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
      return db - da;
    });
    setFilteredFiles(next);
  }, [data, likesMap, minLikeCount]);

  if (!isFetched) return <>Loading...</>;

  return (
    <>
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchBar />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filters</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="min-likes">Minimum likes</Label>
                  <Input
                    id="min-likes"
                    type="number"
                    min={0}
                    value={Number.isFinite(minLikeCount) ? minLikeCount : 0}
                    onChange={(e) =>
                      setMinLikeCount(Math.max(0, Number(e.target.value)))
                    }
                    className="bg-background"
                  />
                </div>
                <DropdownMenuSeparator />
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setMinLikeCount(0)}
                  >
                    Clear
                  </Button>
                  <Button type="button" variant="default">
                    Done
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-sm text-muted-foreground">
          {minLikeCount > 0 ? `Min likes: ${minLikeCount}` : "All files"}
        </div>
      </div>
      {filteredFiles.length === 0 ? (
        <p>No files available.</p>
      ) : (
        <ul className="grid auto-rows-max grid-cols-2 gap-6 lg:grid-cols-3">
          {filteredFiles.map((file) => (
            <li key={file.id}>
              <Link href={`/file/${encodeURIComponent(file.id)}`}>
                <Card className="group flex h-full flex-col items-center justify-between border-2 p-4">
                  {file.fileData.url && (
                    <img
                      alt="File Preview"
                      className="mb-4 grow object-center dark:invert"
                      src={file.fileData.url}
                    />
                  )}
                  <div className="w-full items-center justify-between gap-2">
                    <div className="text-lg font-medium group-hover:underline">
                      {file.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(file.uploadedAt ?? "").toLocaleDateString()}
                    </div>
                    <div className="mt-2">
                      <LikeButton
                        fileId={file.id}
                        size="sm"
                        initialCount={likesMap?.[file.id]?.count}
                        initialLiked={likesMap?.[file.id]?.liked}
                      />
                    </div>
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
