import React from "react";
import Link from "next/link";
import { motion, MotionValue, useInView } from "framer-motion";
import { FiMessageSquare, FiBarChart2, FiTrendingUp, FiClock, FiCreditCard } from "react-icons/fi";
import ChatSimulator from "./ChatSimulator";
import ScrollIndicator from "./ScrollIndicator";

interface HeroSectionProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export default function HeroSection({ opacity, scale }: HeroSectionProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative pt-28 md:pt-32 pb-16 md:pb-24 px-4 mt-8 md:mt-12 mb-10">
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#e0b90b]/3 blur-[100px] rounded-full hidden lg:block"></div>
      <div className="absolute -bottom-20 left-10 w-80 h-80 bg-[#e0b90b]/3 blur-[100px] rounded-full hidden lg:block"></div>

      <div className="container mx-auto flex flex-col-reverse justify-between lg:flex-row items-center gap-12 lg:gap-6">
        <motion.div className="lg:w-1/2 space-y-8 text-center lg:text-left" style={{ opacity, scale }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative inline-block">
              <span className="px-4 py-1.5 bg-[#e0b90b]/10 text-[#e0b90b] text-sm rounded-full font-medium inline-block mb-6 border border-[#e0b90b]/20">
                CHATBOT DA TORCIDA FURIOSA
              </span>
              <motion.div
                className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-[#e0b90b]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-[#e0b90b] drop-shadow-[0_0_8px_rgba(224,185,11,0.2)] relative inline-block">
                Conecte-se
                <svg
                  className="absolute -bottom-3 left-0 w-full h-2 text-[#e0b90b]/30"
                  viewBox="0 0 200 9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,5 Q40,0 80,5 T160,5 T240,5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>{" "}
              com a FURIA através do nosso{" "}
              <span className="relative inline-block">
                assistente
                <motion.div
                  className="absolute -z-10 bottom-0 left-0 right-0 h-[30%] bg-gradient-to-r from-[#e0b90b]/0 via-[#e0b90b]/20 to-[#e0b90b]/0"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: 1 }}
                />
              </span>{" "}
              inteligente
            </h2>

            <motion.p
              className="text-lg md:text-xl text-zinc-400 max-w-lg mt-6 mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Tenha todas as informações sobre a FURIA CS na palma da sua mão. Resultados, agenda de jogos, informações
              sobre jogadores e muito mais.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3 mt-8 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <QuickFeature icon={<FiBarChart2 />} text="Estatísticas dos jogadores" />
            <QuickFeature icon={<FiTrendingUp />} text="Rankings atualizados" />
            <QuickFeature icon={<FiClock />} text="Próximas partidas" />
            <QuickFeature icon={<FiCreditCard />} text="Carteirinha de Fã" />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link
              href="/chatbot"
              target="_blank"
              className="bg-gradient-to-r from-[#e0b90b] to-[#d6aa00] hover:from-[#d6aa00] hover:to-[#e0b90b] text-black px-7 py-3.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(224,185,11,0.2)] hover:shadow-[0_0_35px_rgba(224,185,11,0.3)] hover:-translate-y-1 group relative overflow-hidden"
            >
              <span className="relative z-10">Conversar agora</span>
              <FiMessageSquare size={18} className="relative z-10" />
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            <a
              href="#features"
              className="border border-zinc-800 hover:border-[#e0b90b]/50 px-7 py-3.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 hover:-translate-y-1 hover:bg-zinc-900/30 relative overflow-hidden group"
            >
              <span>Ver recursos</span>
              <motion.div
                className="absolute inset-0 bg-[#e0b90b]/5 opacity-0 group-hover:opacity-100"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </a>
          </motion.div>
        </motion.div>

        <div className="pr-5 relative">
          <motion.div
            className="absolute -z-10 -inset-10 bg-[#e0b90b]/5 blur-[60px] rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <ChatSimulator />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

interface QuickFeatureProps {
  icon: React.ReactNode;
  text: string;
}

function QuickFeature({ icon, text }: QuickFeatureProps) {
  return (
    <div className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg p-2 hover:bg-zinc-800/50 hover:border-zinc-700 transition-colors group cursor-default">
      <div className="w-9 h-9 bg-[#e0b90b]/10 text-[#e0b90b] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-xs text-zinc-300">{text}</span>
    </div>
  );
}
