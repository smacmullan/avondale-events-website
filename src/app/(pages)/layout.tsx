import type { Metadata } from "next";
import { Noto_Sans } from 'next/font/google';
import "../globals.css";
import Navigation from "../components/navigation/navigation";

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Avondale Events",
  description: "Find local events in Avondale, Chicago.",
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased`}
      >
        <Navigation />
        <div className="flex-grow mt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
