import { Metadata } from "next/types";
import "./globals.css";

export const metadata: Metadata = {
  title: "FURIA - Chat integrado com IA",
  description: "Chatbot com IA para o nosso time Furioso!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
