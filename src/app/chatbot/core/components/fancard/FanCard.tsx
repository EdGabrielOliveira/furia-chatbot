/* eslint-disable @next/next/no-img-element */
import React, { forwardRef } from "react";
import QRCode from "react-qr-code";
import { FURIA_LOGO_BASE64 } from "../../utils/logoBase64";

interface FanCardProps {
  name: string;
  nickname: string;
  jogador: string;
  since: string;
  avatarUrl?: string;
  cardStyle?: React.CSSProperties;
}

const FanCard = forwardRef<HTMLDivElement, FanCardProps>(
  ({ name, nickname, jogador, since, avatarUrl, cardStyle }, ref) => {
    const githubUrl = "https://github.com/gabrieloliveiragom";
    const simpleId = Math.random().toString(12).substring(2, 12);

    return (
      <div
        ref={ref}
        className="w-[500px] h-[200px] bg-transparent pr-4 bg-gradient-to-br from-[#000000] to-[#000000] rounded-xl overflow-hidden relative"
        style={{ ...(cardStyle || {}) }}
      >
        <div className="absolute inset-0 z-0 border-2 border-[#e0b90b] rounded-xl"></div>
        <div className="absolute top-0 z-0 left-0 w-full h-1 bg-gradient-to-r from-[#e0b90b] via-[#ffffff] to-[#e0b90b]"></div>

        <div className={`absolute w-full z-3 h-52 mt-2 bg-black bg-no-repeat bg-contain opacity-15 logo-Base64`}></div>
        <div className="absolute w-full z-2 rounded-xl bottom-0 h-full bg-gradient-to-b from-[#000000] to-[#ffffff] opacity-15"></div>
        <div className="absolute top-2 right-2 w-12 h-12">
          <img
            src={FURIA_LOGO_BASE64}
            alt="FURIA Logo"
            className="w-full opacity-0 h-full object-contain z-10"
            style={{ filter: "drop-shadow(0px 0px 2px rgba(224,185,11,0.7))" }}
          />
        </div>

        <div className="relative z-10 flex h-full p-3">
          <div className="w-1/3 flex flex-col items-center justify-between">
            <div className="w-16 h-16 mt-2 overflow-hidden flex items-center justify-center">
              {avatarUrl ? (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${avatarUrl})` }} />
              ) : (
                <div className="w-full h-full bg-center logo-Base64 bg-contain bg-no-repeat" />
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
            <div className="mt-2">
              <h3 className="text-white font-bold text-lg tracking-tight">{name}</h3>
              <p className="text-[#e0b90b] font-medium text-sm tracking-wide">{nickname}</p>
            </div>

            <div className=" bg-opacity-30 rounded-md p-2 mt-4 border-l-2 border-[#e0b90b]">
              <p className="text-zinc-300 text-xs font-medium mb-0.5">JOGADOR FAVORITO</p>
              <p className="text-white text-sm">{jogador}</p>
            </div>
            <div className="pt-2 text-white opacity-50 text-end ">ID:{simpleId}</div>

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
  },
);

FanCard.displayName = "FanCard";
export default FanCard;
