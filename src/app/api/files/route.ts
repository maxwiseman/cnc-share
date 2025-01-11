import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { files } from "@/server/db/schema";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  const { title, description, cncFileUrl, imageUrls } = await request.json();

  if (!title || !cncFileUrl) {
    return NextResponse.json(
      { error: "Title and CNC file are required" },
      { status: 400 },
    );
  }

  try {
    const fileData = {
      id: cncFileUrl,
      title,
      description,
      url: cncFileUrl,
      images: JSON.stringify(imageUrls),
      uploadedAt: new Date().toISOString(),
      userId: session.user.id,
    };

    await db.insert(files).values(fileData);

    // Add file to user's uploaded files list.  This needs a better solution than just adding to a set. Consider a join table.
    // await kv.sadd(`user:${session.user.id}:files`, cncFileUrl)

    return NextResponse.json({ success: true, file: fileData });
  } catch (error) {
    console.error("Error saving file data:", error);
    return NextResponse.json(
      { error: "Failed to save file data" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const files = await db.query.files.findMany({ limit: 100 });
    return NextResponse.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 },
    );
  }
}
