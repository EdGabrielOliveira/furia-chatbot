import { Message } from "../../../../hooks/useChat";
import { QuizBubble } from "./QuizBubble";

interface MessageBubbleProps {
  message: Message;
  onQuizOptionSelect: (optionIndex: number, fromQuizClick?: boolean) => void;
  currentQuestionIndex?: number;
  totalQuestions?: number;
  selectedAnswer?: number | null;
  correctAnswer?: number | null;
  answered?: boolean;
}

export function MessageBubble({
  message,
  onQuizOptionSelect,
  currentQuestionIndex = 0,
  totalQuestions = 5,
  selectedAnswer = null,
  correctAnswer = null,
  answered = false,
}: MessageBubbleProps) {
  if (message.isQuiz) {
    return (
      <QuizBubble
        message={message}
        onQuizOptionSelect={(index) => onQuizOptionSelect(index, true)}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        selectedAnswer={selectedAnswer}
        correctAnswer={correctAnswer}
        answered={answered}
      />
    );
  }

  return null;
}
