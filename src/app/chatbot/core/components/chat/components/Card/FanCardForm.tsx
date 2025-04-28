import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@public/logo.webp";
import { BsCardList } from "react-icons/bs";

interface FanCardFormProps {
  onSubmit: (data: { name: string; nickname: string; jogador: string; since: string }) => void;
  onCancel: () => void;
  timestamp: Date;
}

const FURIA_PLAYERS = [
  { id: "kscerato", name: "Kaike 'KSCERATO' Cerato" },
  { id: "yuurih", name: "Yuri 'yuurih' Santos" },
  { id: "fallen", name: "Gabriel 'FalleN' Toledo" },
  { id: "molodoy", name: "Artem 'molodoy' Bykov" },
  { id: "yekindar", name: "Mareks 'YEKINDAR' Gaļinskis" },
];

const FAN_SINCE_OPTIONS = [
  { value: "2017", label: "2017 (desde o início)" },
  { value: "2018", label: "2018" },
  { value: "2019", label: "2019" },
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
];

export function FanCardForm({ onSubmit, onCancel, timestamp }: FanCardFormProps) {
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    jogador: "",
    since: "",
  });
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      setFormValid(!!newData.name && !!newData.nickname && !!newData.jogador && !!newData.since);

      return newData;
    });
  };

  const handleSubmit = () => {
    if (formValid) {
      onSubmit(formData);
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 w-full max-w-md mb-4">
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-zinc-800 bg-zinc-900 flex-shrink-0 flex items-center justify-center p-1.5">
        <Image src={Logo} alt="FURIA Logo" width={50} height={50} />
      </div>

      <div className="flex flex-col w-full">
        <div
          className={`bg-zinc-800 p-4 sm:p-5 rounded-xl rounded-tl-none border border-zinc-600 shadow-lg transition-all duration-300 
            ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex justify-between items-center mb-4 border-b border-zinc-600 pb-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#e0b90b] text-black px-2.5 py-1 flex items-center gap-2 rounded-md text-xs sm:text-sm font-medium tracking-wider">
                <BsCardList /> CARTEIRINHA FURIA
              </span>
            </div>
          </div>

          <div className="text-white text-xs sm:text-sm mb-4 sm:mb-5">
            Preencha os campos abaixo para criar sua carteirinha oficial de fã da FURIA!
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="fanName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Seu nome completo
              </label>
              <input
                type="text"
                id="fanName"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Digite seu nome aqui"
                className="w-full p-2 sm:p-3 bg-zinc-900 border border-zinc-700 rounded-md text-white text-xs sm:text-sm
                  focus:outline-none focus:border-[#e0b90b] focus:ring-1 focus:ring-[#e0b90b]"
              />
            </div>
            <div>
              <label htmlFor="fanNickname" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Seu nickname
              </label>
              <input
                type="text"
                id="fanNickname"
                value={formData.nickname}
                onChange={(e) => handleChange("nickname", e.target.value)}
                placeholder="Como você é conhecido na comunidade"
                className="w-full p-2 sm:p-3 bg-zinc-900 border border-zinc-700 rounded-md text-white text-xs sm:text-sm
                  focus:outline-none focus:border-[#e0b90b] focus:ring-1 focus:ring-[#e0b90b]"
              />
            </div>
            <div>
              <label htmlFor="fanPlayer" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Jogador favorito
              </label>
              <select
                id="fanPlayer"
                value={formData.jogador}
                onChange={(e) => handleChange("jogador", e.target.value)}
                className="w-full p-2 sm:p-3 bg-zinc-900 border border-zinc-700 rounded-md text-white text-xs sm:text-sm
                  focus:outline-none focus:border-[#e0b90b] focus:ring-1 focus:ring-[#e0b90b]"
              >
                <option value="" disabled>
                  Selecione o jogador
                </option>
                {FURIA_PLAYERS.map((player) => (
                  <option key={player.id} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fanSince" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Fã desde
              </label>
              <select
                id="fanSince"
                value={formData.since}
                onChange={(e) => handleChange("since", e.target.value)}
                className="w-full p-2 sm:p-3 bg-zinc-900 border border-zinc-700 rounded-md text-white text-xs sm:text-sm
                  focus:outline-none focus:border-[#e0b90b] focus:ring-1 focus:ring-[#e0b90b]"
              >
                <option value="" disabled>
                  Selecione o ano
                </option>
                {FAN_SINCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 p-2 sm:p-3 bg-zinc-900 border border-zinc-600 rounded-md text-white text-xs sm:text-sm font-medium 
                  hover:bg-zinc-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formValid}
                className={`flex-1 p-2 sm:p-3 rounded-md text-black text-xs sm:text-sm font-medium transition-colors
                  ${formValid ? "bg-[#e0b90b] hover:bg-yellow-500" : "bg-zinc-600 text-zinc-400 cursor-not-allowed"}`}
              >
                Gerar Carteirinha
              </button>
            </div>
          </div>
        </div>

        <div className="text-[8px] sm:text-[10px] mt-1 sm:mt-1.5 text-zinc-500 flex items-center gap-1 ml-1">
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
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}
