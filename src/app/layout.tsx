import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import { FavoritesProvider } from "../context/FavoritesContext";
import { Header } from "./components";
import { GlobalStyles } from "../styles/GlobalStyles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather app",
  description: "Mirai technical test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <GlobalStyles />
          <div
            style={{
              width: "100vw",
            }}
          >
            <Header />
          </div>
          <div
            style={{
              display: "flex",
              width: "100vw",
              height: "100vh",
              justifyContent: "center",
            }}
          >
            <FavoritesProvider>
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </FavoritesProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
