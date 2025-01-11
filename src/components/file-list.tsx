"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchBar from "./search-bar";

interface FileInfo {
  id: string;
  name: string;
  title: string;
  url: string;
}

export default function FileList() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files");
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
        setFilteredFiles(data);
      } else {
        throw new Error("Failed to fetch files");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = files.filter((file) =>
      file.title.toLowerCase().includes(lowercaseQuery),
    );
    setFilteredFiles(filtered);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available CNC Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        {filteredFiles.length === 0 ? (
          <p>No files available.</p>
        ) : (
          <ul className="space-y-2">
            {filteredFiles.map((file) => (
              <li key={file.id} className="flex items-center justify-between">
                <Link
                  href={`/file/${encodeURIComponent(file.id)}`}
                  className="hover:underline"
                >
                  {file.title}
                </Link>
                <Button asChild>
                  <a href={file.url} download>
                    Download
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
