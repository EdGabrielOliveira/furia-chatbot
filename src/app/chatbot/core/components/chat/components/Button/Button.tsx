import React from "react";
import { VscArrowRight } from "react-icons/vsc";

interface ButtonProps {
  type: "submit";
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function Button({ type, onClick, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="p-2 cursor-pointer rounded-xl absolute z-10 right-6 bg-[#e0b90be1] hover:bg-white"
      aria-label="Enviar mensagem"
    >
      <VscArrowRight size={20} className="text-black" />
    </button>
  );
}
