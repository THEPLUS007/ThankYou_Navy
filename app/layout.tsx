"use client";

import "./globals.css";
import Navigation from "@/components/Navigation";
import { CreativeProvider } from "@/context/CreativeContext";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return (
    <html lang="ko">
      <body className="bg-gray-50">
        <CreativeProvider>
          <div className="flex min-h-screen">
            {!isMainPage && <Navigation />}
            <main className={`${!isMainPage ? 'ml-64' : ''} flex-1`}>
              {children}
            </main>
          </div>
        </CreativeProvider>
      </body>
    </html>
  );
}
