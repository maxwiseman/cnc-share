"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateUploadButton } from "@uploadthing/react";
import { type OurFileRouter } from "@/lib/uploadthing";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function FileUpload() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{
    cncFile: { id: string; url: string } | null;
    images: { id: string; url: string }[] | null;
  }>({ images: null, cncFile: null });
  const UploadButton = generateUploadButton<OurFileRouter>();
  const fileMutation = api.file.uploadFileMetadata.useMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !title ||
      !uploadedFiles.cncFile ||
      !session ||
      !uploadedFiles.cncFile ||
      !uploadedFiles.images
    )
      return;

    const data = await fileMutation.mutateAsync({
      title: title,
      fileData: uploadedFiles.cncFile,
      imageData: uploadedFiles.images,
      description,
    });
    router.push(`/file/${data?.[0]?.id}`);
  };

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please sign in to upload files.</p>
        </CardContent>
      </Card>
    );
  }

  console.log(uploadedFiles);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload CNC File</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">
              Description (Markdown supported)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <Label>Upload CNC File</Label>
            {uploadedFiles.cncFile ? (
              <div>File uploaded successfully!</div>
            ) : (
              <UploadButton
                endpoint="cncFileUploader"
                onClientUploadComplete={(res) => {
                  if (res?.[0]) {
                    setUploadedFiles((prev) => ({
                      ...prev,
                      cncFile: { ...res[0]!, id: res[0]!.key },
                    }));
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            )}
          </div>
          <div>
            <Label>Upload Images (optional, max 5)</Label>
            {uploadedFiles.images && uploadedFiles.images.length >= 1 ? (
              <div>File uploaded successfully!</div>
            ) : (
              <UploadButton
                endpoint="cncFileUploader"
                onClientUploadComplete={(res) => {
                  if (res) {
                    setUploadedFiles((prev) => ({
                      ...prev,
                      images: [
                        ...(prev.images ?? []),
                        ...res.map((file) => ({ id: file.key, url: file.url })),
                      ],
                    }));
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            )}
          </div>
          <Button
            type="submit"
            disabled={
              !title ||
              !uploadedFiles.cncFile ||
              !uploadedFiles.images ||
              fileMutation.isPending
            }
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
