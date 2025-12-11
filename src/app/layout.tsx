import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Script from "next/script";
import ClaritySetup from "@/components/ClaritySetup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloudflare POC",
  description: "NextJS and Cloudflare CDN POC",
  manifest: "/manifest.json",
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ClaritySetup />
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER ? (
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}
          />
        ) : null}
      </body>
    </html>
  );
}
