/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { Message } from "../useChat";

export interface FanCardData {
  name: string;
  nickname: string;
  jogador: string;
  since: string;
  avatarUrl?: string;
}

export type FanCardStep = "none" | "form" | "complete";

interface UseFanCardProps {
  addBotMessage: (text: string) => Message;
  processMessage: (text: string) => void;
  setSuggestions: React.Dispatch<React.SetStateAction<any>>;
  defaultSuggestions: any;
  generateId: () => string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function useFanCard({
  addBotMessage,
  setSuggestions,
  defaultSuggestions,
  generateId,
  setMessages,
}: UseFanCardProps) {
  const [fanCardData, setFanCardData] = useState<FanCardData | null>(null);
  const [fanCardStep, setFanCardStep] = useState<FanCardStep>("none");
  const [currentFanCardId, setCurrentFanCardId] = useState<string | null>(null);

  const fanCardRegex = useMemo(() => /carteirinha|fã|fan|card/i, []);

  const startFanCardFlow = useCallback(() => {
    const cardMessageId = generateId();
    const fanCardMessage: Message = {
      id: cardMessageId,
      text: "Vamos criar sua carteirinha oficial de fã da FURIA!",
      sender: "bot",
      timestamp: new Date(),
      isFanCard: true,
    };

    setMessages((prev) => [...prev, fanCardMessage]);
    setCurrentFanCardId(cardMessageId);
    setSuggestions([]);
    setFanCardStep("form");
  }, [generateId, setMessages, setSuggestions]);

  const cancelFanCardFlow = useCallback(() => {
    if (currentFanCardId) {
      setMessages((prev) => prev.filter((msg) => msg.id !== currentFanCardId));
      setCurrentFanCardId(null);
    }

    setFanCardStep("none");
    setFanCardData(null);
    addBotMessage("Fluxo de criação da carteirinha cancelado. Em que mais posso ajudar?");
    setSuggestions(defaultSuggestions);
  }, [addBotMessage, setSuggestions, defaultSuggestions, currentFanCardId, setMessages]);

  const completeFanCard = useCallback(
    (data: FanCardData) => {
      if (currentFanCardId) {
        setMessages((prev) => prev.filter((msg) => msg.id !== currentFanCardId));
        setCurrentFanCardId(null);
      }
      setFanCardData(data);

      addBotMessage("🎉 Perfeito! Sua carteirinha está pronta para download!");

      setFanCardStep("complete");
    },
    [addBotMessage, currentFanCardId, setMessages],
  );

  const checkFanCardInput = useCallback(
    (userInput: string): boolean => {
      if (fanCardRegex.test(userInput.toLowerCase())) {
        startFanCardFlow();
        return true;
      }

      return false;
    },
    [fanCardRegex, startFanCardFlow],
  );

  return {
    fanCardData,
    fanCardStep,
    startFanCardFlow,
    cancelFanCardFlow,
    completeFanCard,
    checkFanCardInput,
    fanCardRegex,
  };
}
