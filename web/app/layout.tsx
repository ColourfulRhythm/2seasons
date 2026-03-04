import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2 Seasons Nigeria - Africa's First Regenerative Innovation Village",
  description: "Welcome to 2 Seasons in Kobape, Abeokuta, Ogun State. Africa's first regenerative innovation and lifestyle village.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
