import React from "react";
import Container from "./core/components/container/Container";
import Chat from "./core/components/chat/Chat";

export default function Chatbot() {
  return (
    <div className="flex items-center justify-center overflow-hidden h-screen min-h-screen chatBG">
      <Container>
        <div className="h-[80%]" />
        <Chat />
      </Container>
    </div>
  );
}
