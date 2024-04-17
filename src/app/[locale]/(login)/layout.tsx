export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
    className="min-h-[100vh] bg-black flex flex-col "
    >
        {children}
    </body>
  );
}
