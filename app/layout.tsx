import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Compliance Tracker",
  description: "Track compliance tasks per client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
