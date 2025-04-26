/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { furiaQuizData } from "./furiaQuizData";
import { Message } from "../useChat";

interface UseQuizProps {
  addBotMessage: (text: string) => Message;
  addUserMessage: (text: string) => Message;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  generateId: () => string;
  setSuggestions: React.Dispatch<React.SetStateAction<any[]>>;
  defaultSuggestions: any[];
}

export function useQuiz({
  addBotMessage,
  addUserMessage,
  setMessages,
  generateId,
  setSuggestions,
  defaultSuggestions,
}: UseQuizProps) {
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuizMessageId, setCurrentQuizMessageId] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState<number | null>(null);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState<number | null>(null);

  const startQuizFlow = useCallback(() => {
    setQuizActive(true);
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
    setQuizAnswered(false);
    setCurrentCorrectAnswer(null);
    setCurrentSelectedAnswer(null);

    addBotMessage("🎮 Bem-vindo ao QUIZ da FURIA! Vamos testar seu conhecimento sobre o time!");

    setTimeout(() => {
      const currentQuestion = furiaQuizData[0];
      const quizMessageId = generateId();

      const quizMessage: Message = {
        id: quizMessageId,
        text: currentQuestion.question,
        sender: "bot",
        timestamp: new Date(),
        isQuiz: true,
        quizOptions: currentQuestion.options,
        quizQuestionId: currentQuestion.id,
      };

      setMessages((prev) => [...prev, quizMessage]);
      setCurrentQuizMessageId(quizMessageId);
      setCurrentCorrectAnswer(currentQuestion.correctAnswer);
      setSuggestions([]);
    }, 1000);
  }, [addBotMessage, generateId, setMessages, setSuggestions]);

  const processQuizAnswer = useCallback(
    (answerIndex: number, fromQuizClick: boolean = false) => {
      if (!quizActive || quizAnswered) return;

      const currentQuestion = furiaQuizData[currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctAnswer;

      setCurrentSelectedAnswer(answerIndex);
      setQuizAnswered(true);
      setUserAnswers((prev) => [...prev, answerIndex]);

      if (!fromQuizClick) {
        addUserMessage(currentQuestion.options[answerIndex]);
      }

      if (isCorrect) {
        setQuizScore((prev) => prev + 1);
      }

      setTimeout(() => {
        if (currentQuestionIndex >= furiaQuizData.length - 1) {
          finishQuiz(answerIndex, isCorrect);
        } else {
          moveToNextQuestion();
        }
      }, 1500);
    },
    [quizActive, quizAnswered, currentQuestionIndex, quizScore, addUserMessage, currentQuizMessageId],
  );

  const finishQuiz = useCallback(
    (answerIndex: number, isCorrect: boolean) => {
      const finalScore = isCorrect ? quizScore + 1 : quizScore;

      let resumo = `## 📝 Resumo do Quiz da FURIA\n\n`;
      resumo += `Você acertou ${finalScore} de ${furiaQuizData.length} perguntas!\n\n`;

      userAnswers.forEach((answer, index) => {
        const question = furiaQuizData[index];
        const isAnswerCorrect = answer === question.correctAnswer;

        resumo += `**Questão ${index + 1}**: ${isAnswerCorrect ? "✅ Correta!" : "❌ Errada!"}\n`;
        resumo += `"${question.question}"\n`;
        resumo += `Sua resposta: ${question.options[answer]}\n`;

        if (!isAnswerCorrect) {
          resumo += `Resposta correta: ${question.options[question.correctAnswer]}\n`;
        }

        resumo += `${question.explanation || ""}\n\n`;
      });

      const lastQuestion = furiaQuizData[currentQuestionIndex];
      const isLastAnswerCorrect = answerIndex === lastQuestion.correctAnswer;

      resumo += `**Questão ${currentQuestionIndex + 1}**: ${isLastAnswerCorrect ? "✅ Correta!" : "❌ Errada!"}\n`;
      resumo += `"${lastQuestion.question}"\n`;
      resumo += `Sua resposta: ${lastQuestion.options[answerIndex]}\n`;

      if (!isLastAnswerCorrect) {
        resumo += `Resposta correta: ${lastQuestion.options[lastQuestion.correctAnswer]}\n`;
      }

      resumo += `${lastQuestion.explanation || ""}\n\n`;

      if (finalScore === furiaQuizData.length) {
        resumo += `### 🔥 Perfeito! Você é um verdadeiro fã da FURIA! Conhece tudo sobre o time!`;
      } else if (finalScore >= Math.floor(furiaQuizData.length * 0.7)) {
        resumo += `### 🔥 Muito bom! Você é um grande conhecedor da FURIA!`;
      } else if (finalScore >= Math.floor(furiaQuizData.length * 0.4)) {
        resumo += `### 👍 Você conhece razoavelmente a FURIA. Continue acompanhando!`;
      } else {
        resumo += `### 😉 Você ainda pode aprender mais sobre a FURIA! Continue nos seguindo para ficar por dentro de tudo.`;
      }

      setTimeout(() => {
        if (currentQuizMessageId) {
          setMessages((prev) => prev.filter((msg) => msg.id !== currentQuizMessageId));
          setCurrentQuizMessageId(null);
        }

        addBotMessage(resumo);

        setQuizActive(false);
        setQuizCompleted(true);
        setQuizAnswered(false);
        setSuggestions(defaultSuggestions);
      }, 2000);
    },
    [
      quizScore,
      userAnswers,
      currentQuestionIndex,
      currentQuizMessageId,
      addBotMessage,
      setMessages,
      setSuggestions,
      defaultSuggestions,
    ],
  );

  const moveToNextQuestion = useCallback(() => {
    if (currentQuizMessageId) {
      setMessages((prev) => prev.filter((msg) => msg.id !== currentQuizMessageId));
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    setQuizAnswered(false);
    setCurrentSelectedAnswer(null);

    const nextQuestion = furiaQuizData[currentQuestionIndex + 1];
    const newQuizMessageId = generateId();

    const quizMessage: Message = {
      id: newQuizMessageId,
      text: nextQuestion.question,
      sender: "bot",
      timestamp: new Date(),
      isQuiz: true,
      quizOptions: nextQuestion.options,
      quizQuestionId: nextQuestion.id,
    };

    setMessages((prev) => [...prev, quizMessage]);
    setCurrentQuizMessageId(newQuizMessageId);
    setCurrentCorrectAnswer(nextQuestion.correctAnswer);
  }, [currentQuizMessageId, setMessages, currentQuestionIndex, generateId]);

  const checkQuizInput = useCallback(
    (userInput: string): boolean => {
      if (quizActive && /^[1-4]$/.test(userInput.trim())) {
        const answerIndex = parseInt(userInput, 10) - 1;
        processQuizAnswer(answerIndex);
        return true;
      }
      return false;
    },
    [quizActive, processQuizAnswer],
  );

  return {
    quizActive,
    quizScore,
    quizCompleted,
    currentQuestionIndex,
    totalQuestions: furiaQuizData.length,
    startQuizFlow,
    processQuizAnswer,
    quizAnswered,
    currentCorrectAnswer,
    currentSelectedAnswer,
    checkQuizInput,
  };
}
