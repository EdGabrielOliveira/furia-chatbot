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
    <div className="bg-zinc-900 sm:p-[6px] md:p-[6px] rounded-r-2xl border border-zinc-800 border-l-0">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="md:p-2  p-[8px] cursor-pointer rounded-xl bg-[#e0b90be1]
       hover:bg-white "
        aria-label="Enviar mensagem"
      >
        <VscArrowRight size={20} className="text-black" />
      </button>
    </div>
  );
}
