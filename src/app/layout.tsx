import type { Metadata } from "next";
import "./globals.css";
import RecoilContext from "@/lib/RecoilContext";
import ToastProvider from "@/lib/ToastProvider";
import { ConfigProvider } from "antd";

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
    <ConfigProvider theme={{
      token: {
        colorPrimary: "#000",
        controlOutlineWidth: 1,
      
      }
    }}>
      <RecoilContext>
        <html lang="en">
          <body>
            <ToastProvider />
            {children}
          </body>
        </html>
      </RecoilContext>
    </ConfigProvider>
  );
}
