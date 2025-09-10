import Provider from "@/app/provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./layout.scss";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recording Tools",
  description: "Recording tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <body className={`${outfit.variable}`}>
          <Provider>{children}</Provider>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
