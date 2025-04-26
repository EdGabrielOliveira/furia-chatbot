/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, useMemo } from "react";
import { fetchAIResponse } from "../api/router";
import { useQuiz } from "./quizHook/furiaQuiz";
import { useFanCard } from "./cardHook/fanCard";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isQuiz?: boolean;
  quizOptions?: string[];
  quizQuestionId?: string;
  isFanCard?: boolean;
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
  QUIZ: ["quiz", "teste", "desafio", "conhecimento", "perguntas", "trivia"],
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionButton[]>(defaultSuggestions);
  const [isLoading, setIsLoading] = useState(false);

  const generateId = useCallback(() => Math.random().toString(36).substring(2, 11), []);

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

  const quizRegex = useMemo(() => /quiz|teste|desafio|conhecimento|perguntas|trivia/i, []);

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

  const { fanCardData, fanCardStep, startFanCardFlow, cancelFanCardFlow, completeFanCard, checkFanCardInput } =
    useFanCard({
      addBotMessage,
      processMessage: addUserMessage,
      setSuggestions,
      defaultSuggestions,
      generateId,
      setMessages,
    });

  const {
    quizActive,
    quizScore,
    quizCompleted,
    currentQuestionIndex,
    totalQuestions,
    startQuizFlow,
    processQuizAnswer,
    quizAnswered,
    currentCorrectAnswer,
    currentSelectedAnswer,
    checkQuizInput,
  } = useQuiz({
    addBotMessage,
    addUserMessage,
    setMessages,
    generateId,
    setSuggestions,
    defaultSuggestions,
  });

  const processUserInput = useCallback(
    async (userInput: string) => {
      if (!userInput.trim() || isLoading) return;

      if (quizRegex.test(userInput.toLowerCase())) {
        addUserMessage(userInput);
        startQuizFlow();
        return;
      }
      if (checkQuizInput && checkQuizInput(userInput)) {
        return;
      }

      if (checkFanCardInput && checkFanCardInput(userInput)) {
        return;
      }

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
    [
      isLoading,
      quizRegex,
      addUserMessage,
      addBotMessage,
      generateNewSuggestions,
      checkQuizInput,
      checkFanCardInput,
      startQuizFlow,
    ],
  );

  useEffect(() => {}, [processUserInput, checkFanCardInput]);

  const processSuggestion = useCallback(
    (suggestionText: string) => {
      processUserInput(suggestionText);
    },
    [processUserInput],
  );

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

  return {
    // Chat base
    messages,
    isLoading,
    suggestions,
    processMessage: processUserInput,
    processSuggestion,
    addUserMessage,
    addBotMessage,
    updateMessage,
    removeMessage,

    // Fan card
    fanCardData,
    fanCardStep,
    cancelFanCardFlow,
    startFanCardFlow,
    completeFanCard,

    // Quiz
    quizActive,
    quizScore,
    quizCompleted,
    currentQuestionIndex,
    totalQuestions,
    startQuizFlow,
    processQuizAnswer,
    quizAnswered,
    currentCorrectAnswer,
    currentSelectedAnswer,
  };
}
