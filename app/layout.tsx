import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hair & Scalp Intake",
  description: "A considered hair and scalp intake for your care visit.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 selection:bg-stone-200">
        {children}
      </body>
    </html>
  );
}
