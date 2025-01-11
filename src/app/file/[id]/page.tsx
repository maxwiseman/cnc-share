import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { files, users } from "@/server/db/schema";

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
    <Card>
      <CardHeader>
        <CardTitle>{fileData?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Description</h2>
            <ReactMarkdown>{fileData?.description}</ReactMarkdown>
          </div>
          {fileData?.images && fileData?.images.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold">Images</h2>
              <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-3">
                {fileData.images.map((imageUrl: string, index: number) => (
                  <div key={index} className="relative aspect-video">
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">File Details</h2>
            <p>Filename: {fileData?.title}</p>
            <p>
              Uploaded: {new Date(fileData?.uploadedAt ?? "").toLocaleString()}
            </p>
            <p>Uploaded by: {userData ? userData.name : "Unknown user"}</p>
          </div>
          <Button asChild>
            <a href={fileData?.fileUrl ?? ""} download>
              Download File
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
