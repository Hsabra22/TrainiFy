import Providers from "@/Providers";
import "./globals.css";
import { Toaster } from "sonner";
import { Navigation } from "@/components/NavigationUser";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster duration={2000} position="top-right" style={{
          backgroundColor:"black"
        }}/>
        <Providers>
          <Navigation/>
          <Suspense fallback={<Loading/>}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
