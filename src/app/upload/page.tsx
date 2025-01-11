import FileUpload from "@/components/file-upload";

export default function UploadPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Upload CNC File</h1>
      <FileUpload />
    </div>
  );
}
