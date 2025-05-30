import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import ThemeRegistry from "../mui/ThemeRegistry";
import Providers from "./Providers";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "토목퀴즈",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={noto.className}>
      <body>
        <Providers>
          <ThemeRegistry>{children}</ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
