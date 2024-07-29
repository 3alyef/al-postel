import { Locale } from "@/i18n";
import type { Metadata } from "next";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale
    token: string
  }
}

export const metadata: Metadata = {
  title: "Login as guest", 
  description: "Chat",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  }
};

export default async function RootLayout({
  children,
  params: {
    locale
  }
}: Readonly<RootLayoutProps>) {
  metadata.title = metadata.title;
  
  return (
    <html lang={locale}>
      {children}
    </html>
  );
}
