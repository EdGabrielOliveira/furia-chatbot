/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function ChatSimulator() {
  const [messageIndex, setMessageIndex] = useState(0);
  const chatMessages = [
    { text: "Olá! Como posso te ajudar hoje?", sender: "bot" },
    { text: "Quando é o próximo jogo da FURIA?", sender: "user" },
    { text: "O próximo jogo da FURIA será na PGL Astana 2025!", sender: "bot" },
    { text: "Quem são os jogadores atuais?", sender: "user" },
    { text: "O atual line-up da FURIA de CS2 é: falleN, yuurih, kscerato, YEKINDAR e molodoy.", sender: "bot" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % chatMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className=" mt-20 lg:mt-0 flex justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-[#e0b90b]/5 blur-3xl rounded-full"></div>

        <div className="relative w-[350px] h-[600px] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
          <div className="w-full h-12 grid grid-cols-3 bg-black  items-center px-4 border-b border-zinc-800">
            <div className="flex items-center ">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            </div>
            <span className="text-xs text-zinc-400 mx-auto">FURIA Chat</span>
          </div>

          <div className="p-4 h-[calc(600px-48px)] bg-gradient-to-b from-zinc-900 to-black">
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {chatMessages.slice(0, messageIndex + 1).map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`${
                      message.sender === "bot"
                        ? "bg-zinc-800 rounded-lg rounded-tl-none max-w-[80%]"
                        : "bg-[#e0b90b]/10 rounded-lg rounded-tr-none max-w-[80%] self-end border border-[#e0b90b]/20"
                    } p-3`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex gap-2 mt-2">
                <motion.div
                  className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg text-xs hover:border-[#e0b90b]/50 cursor-pointer"
                  whileHover={{ scale: 1.03, borderColor: "rgba(224,185,11,0.5)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Escalação atual
                </motion.div>
                <motion.div
                  className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg text-xs hover:border-[#e0b90b]/50 cursor-pointer"
                  whileHover={{ scale: 1.03, borderColor: "rgba(224,185,11,0.5)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Ranking mundial
                </motion.div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-zinc-800 rounded-lg p-2 flex items-center">
                <input
                  type="text"
                  className="bg-transparent outline-none flex-1 text-sm px-2"
                  placeholder="Digite sua pergunta..."
                  disabled
                />
                <motion.button
                  className="bg-[#e0b90b] text-black p-1.5 rounded-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiArrowRight size={14} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-20 h-20 bg-[#e0b90b]/10 rounded-full blur-xl"></div>
        <div className="absolute -left-16 top-1/2 w-10 h-10 bg-[#e0b90b]/20 rounded-full blur-md"></div>
      </div>
    </motion.div>
  );
}
