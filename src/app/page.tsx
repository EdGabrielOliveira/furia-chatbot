import React from "react";
import Container from "./core/components/container/Container";
import Chat from "./core/components/chat/Chat";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Container>
        <div className="h-[80%]" />
        <Chat />
      </Container>
    </div>
  );
}
