import { type Metadata } from "next";

export const baseMetadata: Partial<Metadata> = {
  title: "CNC Share",
  description: "Share your CNC files with the world",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  applicationName: "CNC Share",
  openGraph: {
    siteName: "CNC Share",
    type: "website",
    locale: "en_US",
    title: "CNC Share",
    description: "Share your CNC files with the world",
  },
};
