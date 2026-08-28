import type { Metadata } from "next";

import { Inter } from "next/font/google";
import SessionWrapper from "./context/SessionWrapper";
import { ListProvider } from "./context/ListContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task-It",
  description: "Create and manage your to-do list.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen w-full antialiased`}>
        <div className="w-full md:bg-[url('/extras/dektop-background.png')] bg-[url('/extras/mobile-background.png')] bg-no-repeat bg-fixed bg-cover min-h-screen">
          <ListProvider>
            <SessionWrapper>{children}</SessionWrapper>
          </ListProvider>
          <ToastContainer position="top-right" />
        </div>
      </body>
    </html>
  );
}
