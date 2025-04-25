/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useChat } from "../../hooks/useChat";
import { Input } from "./components/Input/Input";
import Button from "./components/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../../../../../public/logo.webp";
import Image from "next/image";
import FanCardGenerator from "../fancard/FanCardGenerator";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const {
    messages,
    suggestions,
    isLoading,
    processMessage,
    processSuggestion,
    fanCardData,
    fanCardStep,
    cancelFanCardFlow,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleCloseFanCard = () => {
    cancelFanCardFlow();
  };

  const handleRefresh = (e: React.MouseEvent) => {
    if (e.detail === 1) {
      window.location.reload();
    } else {
      setInputValue("");
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
    <div className="flex flex-col h-screen w-full max-w-full min-w-full  bg-black overflow-hidden shadow-2xl border border-zinc-800 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black opacity-80 z-0"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="bg-black text-white p-3 gap-4 xl:px-60 lg:px52 md:px-20 sm:px-20 xs:px-8 sm:p-4 flex items-center  border-b border-zinc-800 backdrop-blur-md">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900 flex items-center justify-center shadow-lg border border-zinc-700 p-1.5">
            <Image src={Logo} alt="FURIA Logo" width={50} height={50} priority />
          </div>
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h3 className="font-bold text-lg sm:text-xl tracking-tight flex items-center">
                FURIA Chatbot
                <span className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </h3>
              <p className="text-[10px] sm:text-xs text-zinc-400">Assistente oficial dos fanáticos furioso!</p>
            </div>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <button
                onClick={handleRefresh}
                className="text-[10px] sm:text-xs text-white font-bold border-2 hover:border-white border-[#e0b90b] py-1.5 sm:py-2 px-2 cursor-pointer rounded-lg sm:rounded-xl whitespace-nowrap"
              >
                Limpar
              </button>

              <button
                onClick={() => processMessage("Quero criar minha carteirinha de fã")}
                className="text-[10px] sm:text-xs uppercase text-black font-bold border-2 border-[#e0b90b] bg-[#e0b90b] py-1.5 sm:py-2 px-3 sm:px-4 cursor-pointer rounded-lg sm:rounded-xl hover:bg-white hover:text-black hover:border-white whitespace-nowrap"
              >
                Carteirinha
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-5 xl:px-60 lg:px52 md:px-20 sm:px-20 xs:px-8  bg-gradient-to-b from-zinc-900 to-black">
          <div className="flex flex-col gap-4 sm:gap-5">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[90%] sm:max-w-[85%] ${message.sender === "user" ? "self-end" : "self-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="flex gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-zinc-800 bg-zinc-900 flex-shrink-0 flex items-center justify-center p-1.5">
                        <Image src={Logo} alt="FURIA Logo" width={50} height={50} />
                      </div>
                      <div>
                        <div className="bg-zinc-900 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl rounded-tl-none shadow-md border border-zinc-800">
                          <div className="font-light leading-relaxed prose prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-sm sm:prose-base">
                            <ReactMarkdown
                              components={{
                                a: ({ node, ...props }) => <a className="text-[#e0b90be1] underline" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-1" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-1" {...props} />,
                                li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
                                h1: ({ node, ...props }) => <h1 className="text-lg font-bold my-1" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-md font-bold my-1" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-sm font-bold my-1" {...props} />,
                                code: ({ node, ...props }) => (
                                  <code className="bg-zinc-800 rounded px-1 py-0.5 text-xs sm:text-sm" {...props} />
                                ),
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                          </div>
                        </div>
                        <div className="text-[8px] sm:text-[10px] mt-1 sm:mt-1.5 text-zinc-500 flex items-center gap-1 sm:gap-1.5 ml-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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
                      <div className="bg-white text-black p-3 sm:p-4 rounded-xl sm:rounded-2xl rounded-tr-none shadow-md">
                        <div className="font-normal text-sm sm:text-base">{message.text}</div>
                      </div>
                      <div className="text-[8px] sm:text-[10px] mt-1 sm:mt-1.5 text-zinc-400 flex items-center gap-1 sm:gap-1.5 justify-end mr-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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
                className="self-start flex items-center gap-2 sm:gap-3"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-zinc-800 bg-zinc-900 flex-shrink-0 flex items-center justify-center p-1.5">
                  <Image src={Logo} alt="FURIA Logo" width={50} height={50} />
                </div>
                <div className="bg-zinc-900 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl rounded-tl-none shadow-md border border-zinc-800">
                  <div className="flex gap-1 items-center">
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-400 animate-bounce"
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
                  className="mt-2 sm:mt-4 space-y-1.5 sm:space-y-2"
                >
                  <p className="text-zinc-500 text-[10px] sm:text-xs px-1 mb-1 sm:mb-2">Sugestões:</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {suggestions.map((suggestion) => (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion.text)}
                        className="bg-zinc-900 text-zinc-300 text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 rounded-md sm:rounded-lg
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

        <div className="bg-black border-t border-zinc-800 px-2 py-3 sm:py-4 flex items-center xl:px-60 lg:px52 md:px-20 sm:px-20 xs:px-8 ">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder={isLoading ? "Aguarde..." : "Digite sua pergunta sobre a FURIA..."}
            className="text-sm sm:text-base"
          />

          <div className="flex flex-col overflow-hidden relative">
            {fanCardStep === "complete" && fanCardData && (
              <FanCardGenerator userData={fanCardData} onClose={handleCloseFanCard} />
            )}
          </div>

          <Button type="submit" onClick={handleSendMessage} disabled={isLoading}></Button>
        </div>
      </div>
    </div>
  );
}
