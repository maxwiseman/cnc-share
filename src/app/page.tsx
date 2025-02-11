import FileList from "@/components/file-list";

export default function Home() {
  return (
    <div className="mt-8 space-y-8">
      <h1 className="text-center text-5xl font-bold">Files</h1>
      <FileList />
    </div>
  );
}
