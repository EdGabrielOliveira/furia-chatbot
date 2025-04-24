import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export default function Input({
  value,
  onChange,
  onKeyPress,
  disabled,
  placeholder = "Digite sua mensagem...",
  className,
}: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      disabled={disabled}
      placeholder={placeholder}
      className={
        className ||
        `flex-1 px-4 py-3 rounded-lg border ${
          disabled ? "bg-gray-100 text-gray-400" : "bg-white"
        } border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`
      }
    />
  );
}
