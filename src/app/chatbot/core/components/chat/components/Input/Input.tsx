import React, { forwardRef } from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled: boolean;
  placeholder: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, onKeyPress, disabled, placeholder, className }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-900 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#e0b90b] border border-zinc-800 ${className}`}
      />
    );
  },
);

Input.displayName = "Input";
