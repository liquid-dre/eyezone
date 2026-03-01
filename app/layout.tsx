import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Eye Zone — Premier Eye Care in Harare",
  description:
    "Comprehensive ophthalmology services in Harare, Zimbabwe. Expert eye exams, cataract evaluation, glaucoma screening, and more. Book your appointment today.",
  keywords: [
    "eye clinic Harare",
    "ophthalmologist Zimbabwe",
    "eye exam Harare",
    "The Eye Zone",
    "cataract evaluation",
    "glaucoma screening",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
