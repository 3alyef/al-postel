import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string
  }
}

export default function RootLayout({
  children,
  params: {locale},
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </html>
  );
}
