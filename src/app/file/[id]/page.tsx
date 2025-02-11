/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { files, users } from "@/server/db/schema";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IconDownload } from "@tabler/icons-react";
import Link from "next/link";

export async function generateStaticParams() {
  const fileData = await db.select().from(files).limit(10);
  return fileData.map((file) => ({ params: { id: file.id } }));
}

async function getFileData(id: string) {
  const fileData = await db
    .select()
    .from(files)
    .where(eq(files.id, id))
    .limit(1);
  if (fileData.length === 0) {
    notFound();
  }
  return fileData[0];
}

async function getUserData(userId: string) {
  const userData = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return userData.length > 0 ? userData[0] : null;
}

export default async function FilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const fileId = (await params).id;
  const fileData = await getFileData(fileId);
  const userData = await getUserData(fileData?.userId ?? "");

  return (
    <div className="mt-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold">{fileData?.title}</h1>
          <h2 className="inline-flex items-center gap-2 text-xl text-muted-foreground">
            <Avatar className="h-6 w-6">
              <AvatarImage src={userData?.image ?? ""} />
            </Avatar>
            {userData?.name}
          </h2>
        </div>
        <Link href={fileData?.fileUrl ?? ""} download tabIndex={-1}>
          <Button>
            <IconDownload />
            Download
          </Button>
        </Link>
      </div>
      <ScrollArea
      // className="overflow-y-hidden overflow-x-scroll"
      >
        <div className="flex flex-nowrap gap-4">
          {fileData?.fileUrl && (
            <Card className="h-96 w-max max-w-[32rem] overflow-hidden p-6 shadow-none">
              <img
                className="h-full"
                src={fileData.fileUrl}
                alt="File Preview"
              />
            </Card>
          )}
          {fileData?.images?.map((img, i) => (
            <Card
              className="h-96 w-max overflow-hidden p-0 shadow-none"
              key={img}
            >
              <img className="h-full" src={img} alt={`Image ${i}`} />
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Card className="shadow-none">
        <CardContent className="p-6">
          <ReactMarkdown>{fileData?.description}</ReactMarkdown>
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
