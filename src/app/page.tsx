import FileList from "@/components/file-list";

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">CNC Files</h1>
      <FileList />
    </div>
  );
}
