/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { fetchAIResponse } from "../api/router";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface SuggestionButton {
  id: string;
  text: string;
}

const defaultSuggestions: SuggestionButton[] = [
  { id: "s1", text: "Escalação atual da FURIA" },
  { id: "s2", text: "Próximo jogo da FURIA" },
  { id: "s3", text: "Ranking mundial atual" },
  { id: "s4", text: "Últimos resultados" },
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionButton[]>(defaultSuggestions);
  const [isLoading, setIsLoading] = useState(false);

  const generateId = () => Math.random().toString(36).substring(2, 11);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: generateId(),
        text: "🔥 Salve, torcedor da FURIA! Bem-vindo ao chat oficial. Estou aqui para te manter atualizado sobre nosso esquadrão de CS2, próximos jogos, resultados e tudo mais que você quiser saber. O que deseja descobrir hoje sobre a nossa FURIA?",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages([welcomeMessage]);
    }
  }, []);

  const addUserMessage = useCallback((text: string) => {
    const message: Message = {
      id: generateId(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    return message;
  }, []);

  const addBotMessage = useCallback((text: string) => {
    const message: Message = {
      id: generateId(),
      text,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    return message;
  }, []);

  const updateMessage = useCallback((id: string, text: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, text } : msg)));
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const generateNewSuggestions = useCallback((response: string) => {
    const lowerResponse = response.toLowerCase();

    if (
      lowerResponse.includes("jogador") ||
      lowerResponse.includes("kscerato") ||
      lowerResponse.includes("yuurih") ||
      lowerResponse.includes("falleN") ||
      lowerResponse.includes("molodoy") ||
      lowerResponse.includes("yekindar") ||
      lowerResponse.includes("escalação") ||
      lowerResponse.includes("roster") ||
      lowerResponse.includes("elenco")
    ) {
      setSuggestions([
        { id: "p1", text: "Quem é o capitão atual?" },
        { id: "p2", text: "Melhor jogador da FURIA em 2025" },
        { id: "p3", text: "Estatísticas do Fúria" },
        { id: "p4", text: "Como o saffee está jogando?" },
      ]);
    } else if (
      lowerResponse.includes("campeonato") ||
      lowerResponse.includes("torneio") ||
      lowerResponse.includes("major") ||
      lowerResponse.includes("competição") ||
      lowerResponse.includes("resultado") ||
      lowerResponse.includes("ranking") ||
      lowerResponse.includes("partida") ||
      lowerResponse.includes("jogo") ||
      lowerResponse.includes("classificação")
    ) {
      setSuggestions([
        { id: "t1", text: "Próximo Major de CS2" },
        { id: "t2", text: "Próximo jogo da FURIA" },
        { id: "t3", text: "Classificação no ranking da HLTV" },
        { id: "t4", text: "Últimos resultados da FURIA" },
      ]);
    } else if (
      lowerResponse.includes("mapa") ||
      lowerResponse.includes("desempenho") ||
      lowerResponse.includes("performance") ||
      lowerResponse.includes("estatística") ||
      lowerResponse.includes("vitória") ||
      lowerResponse.includes("derrota")
    ) {
      setSuggestions([
        { id: "m1", text: "Melhor mapa da FURIA" },
        { id: "m2", text: "Win rate na Mirage" },
        { id: "m3", text: "Melhor adversário" },
        { id: "m4", text: "Como foi contra a Vitality?" },
      ]);
    } else {
      setSuggestions([
        { id: "d1", text: "Quando é o próximo jogo?" },
        { id: "d2", text: "Como assistir aos jogos da FURIA" },
        { id: "d3", text: "Loja oficial da FURIA" },
        { id: "d4", text: "Chance de título este ano" },
      ]);
    }
  }, []);

  const processMessage = useCallback(
    async (userInput: string) => {
      if (!userInput.trim() || isLoading) return;
      addUserMessage(userInput);
      setSuggestions([]);

      setIsLoading(true);

      try {
        const { text: aiResponse } = await fetchAIResponse(userInput);

        addBotMessage(aiResponse);

        generateNewSuggestions(aiResponse);
      } catch (error) {
        console.error("Erro ao processar mensagem:", error);
        addBotMessage("Desculpe, tivemos um problema ao processar sua mensagem. Por favor, tente novamente.");
        setSuggestions(defaultSuggestions);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, addUserMessage, addBotMessage, removeMessage, generateNewSuggestions],
  );

  const processSuggestion = useCallback(
    (suggestionText: string) => {
      processMessage(suggestionText);
    },
    [processMessage],
  );

  return {
    messages,
    isLoading,
    suggestions,
    processMessage,
    processSuggestion,
    addUserMessage,
    addBotMessage,
    updateMessage,
    removeMessage,
  };
}
