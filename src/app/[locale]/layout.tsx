import type { Metadata } from "next";
import "./globals.css";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale
  }
}

export const metadata: Metadata = {
  title: "Al Postel", 
  description: "Chat",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  }
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const dictionary = await getDictionary(locale);
  metadata.title = dictionary?.Metadata?.title || metadata.title; // Exporta o title
  
  return (
    <html lang={locale}>
      {children}
    </html>
  );
}
