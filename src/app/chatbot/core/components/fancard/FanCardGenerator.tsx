import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { FiDownload, FiX, FiCheckCircle } from "react-icons/fi";
import FanCard from "./FanCard";

interface FanCardGeneratorProps {
  userData: {
    name: string;
    nickname: string;
    email: string;
    since: string;
    avatarUrl?: string;
    jogador?: string;
    cardStyle?: React.CSSProperties;
  };
  onClose: () => void;
}

const FanCardGenerator: React.FC<FanCardGeneratorProps> = ({ userData, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 380;
  const CARD_HEIGHT = 220;

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.width = `${CARD_WIDTH}px`;
      cardRef.current.style.height = `${CARD_HEIGHT}px`;
      cardRef.current.style.maxWidth = `${CARD_WIDTH}px`;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      if (containerRef.current) {
        containerRef.current.style.width = `${CARD_WIDTH}px`;
        containerRef.current.style.height = `${CARD_HEIGHT}px`;
        containerRef.current.style.overflow = "hidden";
        containerRef.current.style.padding = "0";
        containerRef.current.style.margin = "0";
        containerRef.current.style.display = "inline-block";
        containerRef.current.style.position = "relative";
      }

      if (cardRef.current) {
        cardRef.current.style.width = `${CARD_WIDTH}px`;
        cardRef.current.style.height = `${CARD_HEIGHT}px`;
        cardRef.current.style.maxWidth = `${CARD_WIDTH}px`;
      }

      const dataUrl = await domtoimage.toPng(cardRef.current, {
        quality: 1,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
        },
        filter: (node) => {
          return (
            !(node instanceof HTMLElement) ||
            (node.tagName !== "BUTTON" && !node.classList?.contains("exclude-from-capture"))
          );
        },
      });

      if (containerRef.current) {
        containerRef.current.style.display = "";
        containerRef.current.style.position = "";
        containerRef.current.style.overflow = "";
        containerRef.current.style.padding = "";
        containerRef.current.style.margin = "";
        containerRef.current.style.width = "";
        containerRef.current.style.height = "";
      }

      saveAs(dataUrl, `furia-fan-${userData.nickname || "fan"}.png`);
      setIsDownloaded(true);

      setTimeout(() => setIsDownloaded(false), 3000);
    } catch (error) {
      console.error("Erro ao gerar carteirinha:", error);
      alert("Houve um erro ao gerar sua carteirinha. Por favor, tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl max-w-lg w-full shadow-2xl relative z-10 overflow-hidden border border-zinc-800"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e0b90b] to-transparent"></div>

          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#e0b90b]/5 blur-3xl opacity-60"></div>
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#e0b90b]/5 blur-3xl opacity-40"></div>

          <div className="flex justify-between items-center p-5 border-b border-zinc-800/50">
            <div className="flex items-center gap-3">
              <div className="bg-[#e0b90b]/10 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e0b90b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">
                Carteirinha <span className="text-[#e0b90b]">FURIA</span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors rounded-full p-2 hover:bg-zinc-800"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-xl p-4 mb-6 flex justify-center items-center shadow-inner border border-zinc-800">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="overflow-hidden rounded-lg shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300"
              >
                <div
                  ref={containerRef}
                  className="inline-block"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    overflow: "hidden",
                  }}
                >
                  <FanCard
                    ref={cardRef}
                    name={userData.name}
                    nickname={userData.nickname}
                    since={userData.since}
                    avatarUrl={userData.avatarUrl}
                    jogador={userData.jogador || ""}
                    cardStyle={{
                      width: `${CARD_WIDTH}px`,
                      height: `${CARD_HEIGHT}px`,
                      maxWidth: `${CARD_WIDTH}px`,
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-2 gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                <span className="text-xs text-zinc-500 uppercase block mb-1">Nome</span>
                <span className="text-sm text-white">{userData.name}</span>
              </div>
              <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                <span className="text-xs text-zinc-500 uppercase block mb-1">Nickname</span>
                <span className="text-sm text-white">@{userData.nickname}</span>
              </div>
              <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                <span className="text-xs text-zinc-500 uppercase block mb-1">Fã desde</span>
                <span className="text-sm text-white">{userData.since}</span>
              </div>
              <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                <span className="text-xs text-zinc-500 uppercase block mb-1">Jogador favorito</span>
                <span className="text-sm text-white">{userData.jogador || "Não informado"}</span>
              </div>
            </motion.div>

            <motion.div
              className="flex w-full"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className={`w-full gap-2 py-3 z-50 rounded-lg flex items-center justify-center cursor-pointer 
                  ${
                    isGenerating
                      ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : isDownloaded
                      ? "bg-green-600 text-white"
                      : "bg-[#e0b90b] text-black hover:bg-[#d1ac09]"
                  } font-medium transition-all duration-300`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-500 border-t-zinc-300 rounded-full animate-spin"></div>
                    <span>Gerando...</span>
                  </>
                ) : isDownloaded ? (
                  <>
                    <FiCheckCircle size={18} />
                    <span>Download Concluído</span>
                  </>
                ) : (
                  <>
                    <FiDownload size={18} className="" />
                    <span>Baixar Carteirinha</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>

          <div className="p-4 bg-black/30 border-t border-zinc-800/50 text-center">
            <p className="text-zinc-500 text-xs">Compartilhe sua carteirinha nas redes sociais usando #FURIAESPORTS</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FanCardGenerator;
