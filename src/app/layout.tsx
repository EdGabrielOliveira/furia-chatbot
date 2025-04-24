import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FURIA - Chatbot com IA",
  description: "Chatbot com IA para o nosso time Furioso!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
