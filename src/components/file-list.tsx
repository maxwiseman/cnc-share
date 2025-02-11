/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { files } from "@/server/db/schema";

interface FileListProps {
  files: (typeof files.$inferSelect)[];
}

export default function FileList({ files }: FileListProps) {
  if (!files) return <>Loading...</>;

  return (
    <>
      {files.length === 0 ? (
        <p>No files available.</p>
      ) : (
        <ul className="grid auto-rows-max grid-cols-2 gap-6 lg:grid-cols-5">
          {files.map((file) => (
            <li key={file.id}>
              <Link href={`/file/${encodeURIComponent(file.id)}`}>
                <Card className="group flex h-full flex-col items-center justify-between p-4">
                  {file.fileUrl && (
                    <img
                      alt="File Preview"
                      className="grow object-center"
                      src={file.fileUrl}
                    />
                  )}
                  <div className="w-full items-center justify-between gap-2">
                    <div className="text-lg font-medium group-hover:underline">
                      {file.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(file.uploadedAt ?? "").toLocaleDateString()}
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
