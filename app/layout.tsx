import type { Metadata } from "next";
import { Geist, Geist_Mono, Kosugi_Maru } from "next/font/google";
import "./globals.css";

const geistSans = Kosugi_Maru({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Kosugi_Maru({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mahadi Dictionary",
  description: "Mahadi Dictionary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#044150]`}
      >
        {children}
      </body>
    </html>
  );
}
