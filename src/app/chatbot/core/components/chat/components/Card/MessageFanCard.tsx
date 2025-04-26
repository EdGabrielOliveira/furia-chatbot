import { Message } from "../.././../../hooks/useChat";
import { FanCardForm } from "./FanCardForm";

interface MessageFanCardProps {
  message: Message;
  onSubmit: (data: { name: string; nickname: string; jogador: string; since: string }) => void;
  onCancel: () => void;
}

export function MessageFanCard({ message, onSubmit, onCancel }: MessageFanCardProps) {
  if (!message.isFanCard) {
    return null;
  }

  return <FanCardForm onSubmit={onSubmit} onCancel={onCancel} timestamp={message.timestamp} />;
}
