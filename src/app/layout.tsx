import type { Metadata } from "next";
import { Inter } from 'next/font/google'

import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from '@/components/query-provider'
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "TaskAPP",
  description: "Task App with nextjs",
  icons: '@/flavicon.ico'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn(inter.className, 'antialiased min-h-screen')}
      >
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
