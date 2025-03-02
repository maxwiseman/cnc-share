import { db } from "@/server/db";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const files = await db.query.files.findMany();

  return [
    {
      url: "https://cnc-share.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://cnc-share.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://cnc-share.com/legal/tos",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: "https://cnc-share.com/legal/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    ...files.map((file) => ({
      url: `https://cnc-share.com/file/${file.id}`,
      lastModified: new Date(file.uploadedAt ?? "").toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
