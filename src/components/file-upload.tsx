"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateUploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/lib/uploadthing";

export default function FileUpload() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{
    cncFile?: string;
    images: string[];
  }>({ images: [] });
  const UploadButton = generateUploadButton<OurFileRouter>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !uploadedFiles.cncFile || !session) return;

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          cncFileUrl: uploadedFiles.cncFile,
          imageUrls: uploadedFiles.images,
        }),
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        setTitle("");
        setDescription("");
        setUploadedFiles({ images: [] });
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
    }
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
            <UploadButton
              endpoint="cncFileUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  setUploadedFiles((prev) => ({
                    ...prev,
                    cncFile: res[0]?.url,
                  }));
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <div>
            <Label>Upload Images (optional, max 5)</Label>
            <UploadButton
              endpoint="cncFileUploader"
              onClientUploadComplete={(res) => {
                if (res) {
                  setUploadedFiles((prev) => ({
                    ...prev,
                    images: [...prev.images, ...res.map((file) => file.url)],
                  }));
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <Button type="submit" disabled={!title || !uploadedFiles.cncFile}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
