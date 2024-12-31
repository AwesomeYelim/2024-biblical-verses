import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2025-biblical-verses",
  description: "2025 성구 뽑기",
  icons: {
    shortcut: "/images/top_img.svg",
  },
  openGraph: {
    title: "Biblical-verses",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
