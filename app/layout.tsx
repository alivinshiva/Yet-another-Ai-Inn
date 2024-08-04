import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"
import { Toaster } from "@/components/ui/sonner";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Script Gen AI",
  description: "A storytelling platform powered by AI, bringing your stories to life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body className='flex flex-col min-h-screen'>
        <Header/>
        {/* <SignInButton /> */}
        
        {children}
        <Toaster duration={8000} position="bottom-left" />
          </body>
    </html>
    </ClerkProvider>
  );
}
