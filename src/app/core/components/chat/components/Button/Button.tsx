import React from "react";

interface ButtonProps {
  type: "submit";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function Button({ type, onClick, disabled, className, children }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        className ||
        `p-3 rounded-lg ${
          disabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white transition-colors flex items-center justify-center`
      }
      aria-label="Enviar mensagem"
    >
      {children || (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      )}
    </button>
  );
}
