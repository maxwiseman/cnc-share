import FileUpload from "@/components/file-upload";
import { type Metadata } from "next";
import { baseMetadata } from "../base-metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Upload CNC File - CNC Share",
  description: "Upload your CNC files to share with the world",
};

export default function UploadPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Upload CNC File</h1>
      <FileUpload />
    </div>
  );
}
