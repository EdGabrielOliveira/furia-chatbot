"use client";
import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../../../../public/logo.webp";
import Image from "next/image";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const { messages, suggestions, isLoading, processMessage, processSuggestion } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleRefresh = (e: React.MouseEvent) => {
    if (e.detail === 1) {
      window.location.reload();
    } else {
      setInputValue("");
      // Aqui você pode limpar também mensagens, sugestões, etc, se quiser
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userInput = inputValue;
    setInputValue("");
    processMessage(userInput);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (text: string) => {
    if (isLoading) return;
    processSuggestion(text);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="flex flex-col h-[800px] w-[600px] rounded-2xl bg-black overflow-hidden shadow-2xl border border-zinc-800 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black opacity-80 z-0"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="bg-black text-white p-4 flex items-center gap-4 border-b border-zinc-800 backdrop-blur-md">
          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center shadow-lg border border-zinc-700 p-1.5">
            <Image src={Logo} alt="FURIA Logo" width={50} height={50} />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xl tracking-tight flex items-center">
                FURIA Chatbot
                <span className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </h3>
              <p className="text-xs text-zinc-400">Assistente oficial dos fanáticos furioso!</p>
            </div>
            <div>
              <button
                onClick={handleRefresh}
                className="cursor-pointer bg-[#e0b90be1] hover:scale-95 duration-150 py-2 px-4 font-bold rounded-xl"
              >
                Limpar conversa
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-zinc-900 to-black">
          <div className="flex flex-col gap-5">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[85%] ${message.sender === "user" ? "self-end" : "self-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900 flex-shrink-0 flex items-center justify-center p-1.5">
                        <Image src={Logo} alt="FURIA Logo" width={50} height={50} />
                      </div>
                      <div>
                        <div className="bg-zinc-900 text-white p-4 rounded-2xl rounded-tl-none shadow-md border border-zinc-800">
                          <div className="font-light leading-relaxed">{message.text}</div>
                        </div>
                        <div className="text-[10px] mt-1.5 text-zinc-500 flex items-center gap-1.5 ml-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-3 h-3"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  )}

                  {message.sender === "user" && (
                    <div>
                      <div className="bg-white text-black p-4 rounded-2xl rounded-tr-none shadow-md">
                        <div className="font-normal">{message.text}</div>
                      </div>
                      <div className="text-[10px] mt-1.5 text-zinc-400 flex items-center gap-1.5 justify-end mr-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="self-start flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900 flex-shrink-0 flex items-center justify-center p-1.5">
                  <Image src={Logo} alt="FURIA Logo" width={50} height={50} />
                </div>
                <div className="bg-zinc-900 py-3 px-4 rounded-2xl rounded-tl-none shadow-md border border-zinc-800">
                  <div className="flex gap-1 items-center">
                    <div
                      className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {suggestions.length > 0 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 space-y-2"
                >
                  <p className="text-zinc-500 text-xs px-1 mb-2">Sugestões:</p>
                  <div className="flex flex-wrap  gap-2">
                    {suggestions.map((suggestion) => (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion.text)}
                        className="bg-zinc-900 text-zinc-300 text-xs py-2 px-4 rounded-lg
                                 hover:bg-white hover:text-black transition-all duration-300
                                 border border-zinc-800 hover:border-white shadow-md"
                      >
                        {suggestion.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="bg-black border-t border-zinc-800 px-4 py-4 flex items-center gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder={isLoading ? "Aguarde a resposta..." : "Digite sua pergunta sobre a FURIA..."}
            className="flex-1 bg-zinc-900 text-white rounded-lg py-3 px-5 
                     placeholder:text-zinc-500 border border-zinc-800 hover:border-zinc-700 focus:border-white 
                     focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-300"
          />
          <Button
            type="submit"
            onClick={handleSendMessage}
            disabled={isLoading}
            className={`p-3 rounded-lg ${
              isLoading
                ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                : "bg-white text-black hover:bg-zinc-100 active:bg-zinc-200 shadow-md"
            } transition-all duration-300 flex items-center justify-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
