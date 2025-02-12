/* eslint-disable @next/next/no-img-element */
import SearchBar from "@/components/search-bar";
import { Card } from "@/components/ui/card";
import { db } from "@/server/db";
import { files } from "@/server/db/schema";
import { ilike, or } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = (await searchParams).q;
  if (!query) {
    return notFound();
  }
  const data = await db.query.files.findMany({
    where: or(
      ilike(files.title, `%${query}%`),
      ilike(files.description, `%${query}%`),
    ),
    limit: 30,
  });
  return (
    <div>
      <div className="mb-4">
        <SearchBar />
      </div>
      <ul className="grid auto-rows-max grid-cols-2 gap-6 lg:grid-cols-5">
        {data.map((file) => (
          <li key={file.id}>
            <Link href={`/file/${encodeURIComponent(file.id)}`}>
              <Card className="group flex h-full flex-col items-center justify-between p-4">
                {file.fileUrl && (
                  <img
                    alt="File Preview"
                    className="mb-4 grow object-center"
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
    </div>
  );
}
