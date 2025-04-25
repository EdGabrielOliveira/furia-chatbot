import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "FURIA - Chatbot",
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
