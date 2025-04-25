import React, { forwardRef } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";

interface FanCardProps {
  name: string;
  nickname: string;
  jogador: string;
  since: string;
  avatarUrl?: string;
}

const FanCard = forwardRef<HTMLDivElement, FanCardProps>(({ name, nickname, jogador, since, avatarUrl }, ref) => {
  const githubUrl = "https://github.com/EdGabrielOliveira";
  return (
    <div
      ref={ref}
      className="w-[500px] h-[200px] bg-transparent pr-4 bg-gradient-to-br from-[#000000] to-[#000000] rounded-xl overflow-hidden shadow-[0_0_15px_rgb(224,185,11,0.2)] relative"
      style={{ maxWidth: "" }}
    >
      <div className="absolute inset-0 border-2 border-[#e0b90b] rounded-xl"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e0b90b] via-[#ffd700] to-[#e0b90b]"></div>

      <div className="absolute -right-24 -top-24 w-56 h-56 bg-[#e0b90b] opacity-20 rotate-45 transform"></div>

      <div className="relative z-10 flex h-full p-3">
        <div className="w-1/3 flex flex-col items-center justify-between">
          <div className="w-16 h-16 mt-2 rounded-full border-[3px] border-[#e0b90b] shadow-[0_0_10px_rgba(224,185,11,0.5)] overflow-hidden bg-zinc-800 flex items-center justify-center">
            {avatarUrl ? (
              <Image src={avatarUrl} alt="Avatar" width={64} height={64} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-[#e0b90b] text-xl font-bold">
                {name
                  .split(" ")
                  .filter((part) => part.length > 0)
                  .map((part) => part.charAt(0))
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>

          <div className="mt-2 flex flex-col items-center">
            <div className="bg-white p-1 rounded-md mb-2">
              <QRCode
                value={githubUrl}
                size={48}
                style={{ height: "48px", width: "48px" }}
                level="H"
                fgColor="#000000"
                bgColor="#FFFFFF"
              />
            </div>
            <p className="text-[9px] mb-1 text-zinc-500 mt-1 font-medium tracking-wider uppercase">MEMBRO OFICIAL</p>
          </div>
        </div>

        <div className="w-2/3 flex flex-col justify-center pl-2">
          <div className=" mt-2">
            <h3 className="text-white font-bold text-lg tracking-tight">{name}</h3>
            <p className="text-[#e0b90b] font-medium text-sm tracking-wide">@{nickname}</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded-md p-2 mt-4 border-l-2 border-[#e0b90b]">
            <p className="text-zinc-300 text-xs font-medium mb-0.5">JOGADOR FAVORITO</p>
            <p className="text-white text-sm">{jogador}</p>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#e0b90b] mr-1.5"></div>
              <p className="text-zinc-300 text-xs">Desde {since}</p>
            </div>
            <div className="bg-[#e0b90b] text-black text-xs font-bold px-3 py-1 rounded-md tracking-wider">
              #DIADEFURIA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

FanCard.displayName = "FanCard";
export default FanCard;
