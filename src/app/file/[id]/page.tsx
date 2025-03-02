/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { files } from "@/server/db/schema";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";
import { ReportButton } from "./report-button";
import { Markdown } from "@/components/markdown";
import { type Metadata } from "next";
import { baseMetadata } from "@/app/base-metadata";

export async function generateStaticParams() {
  const fileData = await db.select().from(files).limit(10);
  return fileData.map((file) => ({ params: { id: file.id } }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata | null> {
  const fileId = (await params).id;
  const fileData = await db.query.files.findFirst({
    where: eq(files.id, fileId),
    with: { user: true },
  });
  if (fileData === undefined) {
    notFound();
  }

  return {
    ...baseMetadata,
    title: `${fileData.title} - CNC Share`,
    authors: [{ name: fileData.user?.name ?? "Unknown user" }],
    description: fileData.description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${fileData.title} - CNC Share`,
      description: fileData.description ?? "",
      images: [
        fileData.fileData.url,
        ...(fileData.imageData?.map((img) => img.url) ?? []),
      ],
    },
  };
}

async function getFileData(id: string) {
  const fileData = await db.query.files.findFirst({
    with: { user: true },
    where: eq(files.id, id),
  });
  if (fileData === undefined) {
    notFound();
  }
  return fileData;
}

export default async function FilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const fileId = (await params).id;
  const fileData = await getFileData(fileId);

  return (
    <div className="mt-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold">{fileData.title}</h1>
          <h2 className="inline-flex items-center gap-2 text-xl text-muted-foreground">
            <Avatar className="h-6 w-6">
              <AvatarImage src={fileData.user?.image ?? ""} />
            </Avatar>
            {fileData.user?.name}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <ReportButton fileId={fileData.id} />
          <DeleteButton authorId={fileData.userId ?? ""} fileId={fileData.id} />
          <Link href={fileData.fileData.url ?? ""} download tabIndex={-1}>
            <Button>
              <IconDownload />
              Download
            </Button>
          </Link>
        </div>
      </div>
      <ScrollArea
      // className="overflow-y-hidden overflow-x-scroll"
      >
        <div className="flex flex-nowrap gap-4">
          {fileData.fileData.url && (
            <Card className="h-56 w-max max-w-[32rem] overflow-hidden p-6 shadow-none lg:h-96">
              <img
                className="h-full"
                src={fileData.fileData.url}
                alt="File Preview"
              />
            </Card>
          )}
          {fileData.imageData?.map((img, i) => (
            <Card
              className="h-56 w-max overflow-hidden p-0 shadow-none lg:h-96"
              key={img.id}
            >
              <img className="h-full" src={img.url} alt={`Image ${i}`} />
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Card className="shadow-none">
        <CardContent className="p-6">
          <Markdown>{fileData.description ?? ""}</Markdown>
        </CardContent>
      </Card>
    </div>
  );

  // return (
  //   <Card>
  //     <CardHeader>
  //       <CardTitle>{fileData?.title}</CardTitle>
  //     </CardHeader>
  //     <CardContent>
  //       <div className="space-y-4">
  //         <div>
  //           <h2 className="text-lg font-semibold">Description</h2>
  //           <ReactMarkdown>{fileData?.description}</ReactMarkdown>
  //         </div>
  //         {fileData && (
  //           <div>
  //             <h2 className="text-lg font-semibold">Images</h2>
  //             <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-3">
  //               {fileData.fileUrl && (
  //                 <img
  //                   src={fileData.fileUrl}
  //                   alt="File Preview"
  //                   className="object-fit h-full w-full rounded-lg object-cover"
  //                 />
  //               )}
  //               {fileData.images?.map((imageUrl: string, index: number) => (
  //                 <img
  //                   key={index}
  //                   src={imageUrl}
  //                   alt={`Image ${index + 1}`}
  //                   className="h-full w-full rounded-lg object-cover"
  //                 />
  //               ))}
  //             </div>
  //           </div>
  //         )}
  //         <div>
  //           <h2 className="text-lg font-semibold">File Details</h2>
  //           <p>Filename: {fileData?.title}</p>
  //           <p>
  //             Uploaded: {new Date(fileData?.uploadedAt ?? "").toLocaleString()}
  //           </p>
  //           <p>Uploaded by: {userData ? userData.name : "Unknown user"}</p>
  //         </div>
  //         <Button asChild>
  //           <a href={fileData?.fileUrl ?? ""} download>
  //             Download File
  //           </a>
  //         </Button>
  //       </div>
  //     </CardContent>
  //   </Card>
  // );
}
