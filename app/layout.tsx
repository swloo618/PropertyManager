import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Property Manager",
  description: "Manage your property listings and prospects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
