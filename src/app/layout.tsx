import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brand",
  description: "Your brand application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
