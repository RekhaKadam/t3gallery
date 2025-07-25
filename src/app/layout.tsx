import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { PostHogProvider } from './_analytics/provider';


import "~/styles/globals.css";
import { TopNav } from "./_components/topnav";
import "@uploadthing/react/styles.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ourFileRouter } from './api/uploadthing/core';
import type React from 'react';

import { Toaster } from '~/components/ui/sonner';

export const metadata: Metadata = {
  title: "T3 Gallery",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
  modal,
}: { 
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <PostHogProvider>
      <html lang="en" className={`${geist.variable} flex flex-col gap-4`}>
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <body className={`font-sans ${geist.variable} dark`}>
          <div id="modal-root" />
          <div className="h-screen grid grid-rows-[auto-1fr]">
            <TopNav />
            <main className="overflow-y-scroll">{children}</main>
            {modal}
            <Toaster />
          </div>
        </body>
      </html>
      </PostHogProvider>
    </ClerkProvider>
  );
}