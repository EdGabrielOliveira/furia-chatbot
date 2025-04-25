// src/app/core/components/fanCard/FanCardGenerator.tsx
import React, { useState, useRef } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import FanCard from "./FanCard";

interface FanCardGeneratorProps {
  userData: {
    name: string;
    nickname: string;
    email: string;
    since: string;
    avatarUrl?: string;
  };
  onClose: () => void;
}

const FanCardGenerator: React.FC<FanCardGeneratorProps> = ({ userData, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const dataUrl = await domtoimage.toPng(cardRef.current, {
        quality: 1,
      });

      saveAs(dataUrl, `furia-fan-card-${userData.nickname}.jpg`);
    } catch (error) {
      console.error("Erro ao gerar carteirinha:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-80 z-50 p-4">
      <div className="bg-zinc-900 rounded-xl p-6 max-w-md w-[50rem]">
        <h2 className="text-[#e0b90b] text-xl font-bold mb-4">Sua Carteirinha FURIA</h2>

        <div className="flex justify-center mb-6">
          <FanCard jogador={""} ref={cardRef} {...userData} />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className={`flex-1 py-3 px-4 rounded-lg ${
              isGenerating
                ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                : "bg-[#e0b90b] text-black hover:bg-[#c6a30a]"
            } font-medium transition-all duration-200`}
          >
            {isGenerating ? "Gerando..." : "Baixar Carteirinha"}
          </button>

          <button
            onClick={onClose}
            disabled={isGenerating}
            className="py-3 px-4 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-all duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FanCardGenerator;
