import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scalable Full-Stack Setup: Next.js, Azure Functions, and PostgreSQL",
  description:
    "This example demonstrates deploying a Next.js app to Azure Functions. The architecture consists of a front-end, Azure Functions as middleware, and a PostgreSQL database (using Docker), forming the back-end. The front-end communicates with the back-end through the middleware, ensuring a detachable front-end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
