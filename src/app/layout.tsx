import type { Metadata } from "next";
import "./globals.css";
import RecoilContext from "@/lib/RecoilContext";
import ToastProvider from "@/lib/ToastProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilContext>
      <html lang="en">
        <body
        >
          <ToastProvider />
          {children}
        </body>
      </html>
    </RecoilContext>
  );
}
