import React, { forwardRef } from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled: boolean;
  placeholder: string;
  className?: string;
}

export const InputRing = {};

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
        className={`w-full p-2 sm:p-3 rounded-l-xl focus:bg-zinc-900/70 border-r-0 focus:ring-0 focus:outline-0 bg-zinc-900 text-white
           placeholder:text-zinc-500 
            border border-zinc-800 ${className}`}
      />
    );
  },
);

Input.displayName = "Input";
