/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect, useMemo } from "react";
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
  { id: "s3", text: "Últimos resultados" },
];

const SUGGESTION_CATEGORIES = {
  PLAYERS: [
    { id: "p1", text: "Quem é o capitão atual?" },
    { id: "p2", text: "Melhor jogador da FURIA em 2025" },
    { id: "p3", text: "Como o KSCERATO está jogando?" },
  ],
  TOURNAMENTS: [
    { id: "t1", text: "Próximo Major de CS2" },
    { id: "t2", text: "Próximo jogo da FURIA" },
    { id: "t3", text: "Últimos resultados da FURIA" },
  ],
  PERFORMANCE: [
    { id: "m1", text: "Melhor mapa da FURIA" },
    { id: "m2", text: "Estatisticas do time" },
    { id: "m3", text: "Rank HLTV" },
  ],
  DEFAULT: [
    { id: "d1", text: "Quando é o próximo jogo?" },
    { id: "d2", text: "Aonde assistir os jogos" },
    { id: "d3", text: "Loja oficial da FURIA" },
  ],
  ESTATISTICS: [
    { id: "e1", text: "Estatísticas do time" },
    { id: "e2", text: "Estatísticas do FalleN" },
    { id: "e3", text: "Estatisticas do KSCERATO" },
  ],
};

const KEYWORD_MAPPINGS = {
  PLAYERS: [
    "jogador",
    "kscerato",
    "yuurih",
    "fallen",
    "molodoy",
    "yekindar",
    "escalação",
    "roster",
    "elenco",
    "capitão",
    "time",
  ],
  TOURNAMENTS: [
    "campeonato",
    "torneio",
    "major",
    "competição",
    "resultado",
    "ranking",
    "partida",
    "jogo",
    "classificação",
    "tabela",
    "liga",
  ],
  PERFORMANCE: [
    "mapa",
    "desempenho",
    "performance",
    "estatística",
    "vitória",
    "derrota",
    "kd",
    "winrate",
    "rating",
    "hltv",
  ],
  ESTATISSTICS: [
    "estatísticas",
    "stats",
    "performance",
    "rating",
    "kd",
    "kills",
    "mortes",
    "assistências",
    "headshots",
  ],
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionButton[]>(defaultSuggestions);
  const [isLoading, setIsLoading] = useState(false);
  const [fanCardData, setFanCardData] = useState<{
    name: string;
    nickname: string;
    email: string;
    since: string;
    avatarUrl?: string;
    jogador?: string;
  } | null>(null);
  const [fanCardStep, setFanCardStep] = useState<"none" | "name" | "nickname" | "jogador" | "since" | "complete">(
    "none",
  );

  const generateId = useCallback(() => Math.random().toString(36).substring(2, 11), []);

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
  }, [generateId]);

  const addUserMessage = useCallback(
    (text: string) => {
      const message: Message = {
        id: generateId(),
        text,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, message]);
      return message;
    },
    [generateId],
  );

  const addBotMessage = useCallback(
    (text: string) => {
      const message: Message = {
        id: generateId(),
        text,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, message]);
      return message;
    },
    [generateId],
  );

  const updateMessage = useCallback((id: string, text: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, text } : msg)));
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const generateNewSuggestions = useCallback((response: string) => {
    const lowerResponse = response.toLowerCase();

    const hasCategoryKeywords = (category: keyof typeof KEYWORD_MAPPINGS): boolean => {
      return KEYWORD_MAPPINGS[category].some((keyword) => lowerResponse.includes(keyword));
    };

    if (hasCategoryKeywords("PLAYERS")) {
      setSuggestions(SUGGESTION_CATEGORIES.PLAYERS);
    } else if (hasCategoryKeywords("TOURNAMENTS")) {
      setSuggestions(SUGGESTION_CATEGORIES.TOURNAMENTS);
    } else if (hasCategoryKeywords("PERFORMANCE")) {
      setSuggestions(SUGGESTION_CATEGORIES.PERFORMANCE);
    } else {
      setSuggestions(SUGGESTION_CATEGORIES.DEFAULT);
    }
  }, []);

  const startFanCardFlow = useCallback(() => {
    addBotMessage(
      "Vamos criar sua carteirinha oficial de fã da FURIA! Preciso de algumas informações. Para começar, qual é o seu nome e sobrenome?",
    );
    setFanCardStep("name");
    setSuggestions([]);
  }, [addBotMessage]);

  const cancelFanCardFlow = useCallback(() => {
    setFanCardStep("none");
    setFanCardData(null);
    addBotMessage("Fluxo de criação da carteirinha cancelado. Em que mais posso ajudar?");
    setSuggestions(defaultSuggestions);
  }, [addBotMessage]);

  const fanCardRegex = useMemo(() => /carteirinha|fã|fan|card/i, []);
  const yearRegex = useMemo(() => /\d{4}/, []);

  const processMessage = useCallback(
    async (userInput: string) => {
      if (!userInput.trim() || isLoading) return;
      addUserMessage(userInput);

      if (fanCardStep !== "none" && fanCardStep !== "complete") {
        processFanCardResponse(userInput);
        return;
      }

      setSuggestions([]);
      setIsLoading(true);

      if (fanCardRegex.test(userInput.toLowerCase())) {
        setIsLoading(false);
        startFanCardFlow();
        return;
      }

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
    [isLoading, addUserMessage, addBotMessage, generateNewSuggestions, fanCardStep, startFanCardFlow, fanCardRegex],
  );

  const processFanCardResponse = useCallback(
    (userInput: string) => {
      switch (fanCardStep) {
        case "name":
          setFanCardData((prev) => ({ ...prev, name: userInput } as any));
          addBotMessage(`Vamos lá, ${userInput}! Agora me diga, qual é o seu nickname (apelido) como fã?`);
          setFanCardStep("nickname");
          break;

        case "nickname":
          setFanCardData((prev) => ({ ...prev, nickname: userInput } as any));
          addBotMessage(
            "Perfeito! Agora queremos saber qual o seu jogador favorito da FURIA? Jogadores atuais: KSCERATO, yuurih, FalleN, molodoy, YEKINDAR",
          );
          setFanCardStep("jogador");
          break;

        case "jogador":
          setFanCardData((prev) => ({ ...prev, jogador: userInput } as any));
          addBotMessage("Ótimo! Agora informe a quanto tempo você é fã da FURIA? (ex: 2017, 2020, etc.)");
          setFanCardStep("since");
          break;

        case "since": {
          const yearMatch = userInput.match(yearRegex);
          const year = yearMatch ? parseInt(yearMatch[0]) : NaN;
          const currentYear = new Date().getFullYear();

          if (isNaN(year) || year < 2017 || year > currentYear) {
            addBotMessage(`Por favor, informe um ano válido entre 2017 (quando a FURIA foi fundada) e ${currentYear}:`);
            return;
          }

          setFanCardData((prev) => ({ ...prev, since: year.toString() } as any));
          addBotMessage("🎉 Perfeito! Sua carteirinha está pronta para download!");
          setFanCardStep("complete");
          break;
        }

        default:
          processMessage(userInput);
      }
    },
    [fanCardStep, addBotMessage, processMessage, yearRegex],
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
    fanCardData,
    fanCardStep,
    cancelFanCardFlow,
    startFanCardFlow,
  };
}
