import { useState, useEffect } from "react";
import { Message } from "../../../../hooks/useChat";
import Image from "next/image";
import Logo from "@public/logo.webp";

interface QuizBubbleProps {
  message: Message;
  onQuizOptionSelect: (optionIndex: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  correctAnswer: number | null;
  answered: boolean;
}

export function QuizBubble({
  message,
  onQuizOptionSelect,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  correctAnswer,
  answered,
}: QuizBubbleProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, [message.id]);

  const getOptionClassName = (index: number) => {
    if (!answered) {
      return hoveredOption === index
        ? "bg-[#e0b90b] border-[#e0b90b] text-black shadow-lg translate-y-[-2px]"
        : "bg-zinc-900 border-zinc-700 text-white hover:border-[#e0b90b]";
    } else {
      if (index === correctAnswer) {
        return "bg-green-600 border-green-500 text-white shadow-md";
      } else if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
        return "bg-red-600 border-red-500 text-white";
      } else {
        return "bg-zinc-800 border-zinc-700 text-zinc-400";
      }
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 w-full max-w-full sm:max-w-md mb-3 sm:mb-4">
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-zinc-800 bg-zinc-900 flex-shrink-0 flex items-center justify-center p-1">
        <Image src={Logo} alt="FURIA Logo" width={50} height={50} className="w-full h-full" />
      </div>

      <div className="flex flex-col w-full">
        <div
          className={`bg-zinc-800 p-3 sm:p-5 rounded-xl rounded-tl-none border border-zinc-600 shadow-lg transition-all duration-300 
            ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-3 sm:mb-4 border-b border-zinc-600 pb-3">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <span className="text-[#e0b90b] text-lg sm:text-xl">🏆</span>
              <span className="bg-[#e0b90b] text-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs font-medium tracking-wider">
                QUIZ FURIA
              </span>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 w-full sm:w-auto justify-start sm:justify-end mt-1 sm:mt-0">
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <div
                  key={`progress-${i}`}
                  className={`h-1 sm:h-1.5 w-4 sm:w-6 rounded-full transition-all ${
                    i < currentQuestionIndex
                      ? "bg-[#e0b90b]"
                      : i === currentQuestionIndex
                      ? "bg-[#e0b90b] animate-pulse"
                      : "bg-zinc-600"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-white text-base sm:text-lg font-medium mb-3 sm:mb-4">
            <span className="text-[#e0b90b] mr-1 sm:mr-2 font-bold block sm:inline text-sm sm:text-base mb-1 sm:mb-0">
              Pergunta {currentQuestionIndex + 1}:
            </span>{" "}
            {message.text}
          </div>

          {message.quizOptions && (
            <div className="quiz-options flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-5">
              {message.quizOptions.map((option, index) => (
                <button
                  key={`${message.id}-option-${index}`}
                  className={`quiz-option-button p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 
                    ${getOptionClassName(index)}`}
                  onClick={() => !answered && onQuizOptionSelect(index)}
                  onMouseEnter={() => !answered && setHoveredOption(index)}
                  onMouseLeave={() => !answered && setHoveredOption(null)}
                  disabled={answered}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      <span
                        className={`inline-flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 rounded-full mr-2 sm:mr-3 flex-shrink-0
                        ${
                          answered
                            ? index === correctAnswer
                              ? "bg-green-600 text-white"
                              : index === selectedAnswer
                              ? "bg-red-600 text-white"
                              : "bg-zinc-700 text-zinc-400"
                            : hoveredOption === index
                            ? "bg-black text-[#e0b90b] border border-[#e0b90b]"
                            : "bg-[#e0b90b] text-black"
                        } font-bold text-xs sm:text-sm`}
                      >
                        {index + 1}
                      </span>
                      <span className="flex-1 text-left font-medium text-sm sm:text-base truncate">{option}</span>
                    </div>
                    {answered && (
                      <span className="ml-1 sm:ml-2 flex-shrink-0">
                        {index === correctAnswer
                          ? "✅"
                          : index === selectedAnswer && selectedAnswer !== correctAnswer
                          ? "❌"
                          : ""}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-[8px] sm:text-[10px] mt-1 text-zinc-500 flex items-center gap-0.5 sm:gap-1 ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-2.5 h-2.5 sm:w-3 sm:h-3"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
              clipRule="evenodd"
            />
          </svg>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}
