import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export default function CTASection() {
  return (
    <section className="container mx-auto py-16 md:py-24 px-4">
      <motion.div
        className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute -right-20 -top-20 w-64 h-64 bg-[#e0b90b]/5 blur-3xl rounded-full"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#e0b90b]/10 blur-3xl rounded-full"
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        ></motion.div>

        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#e0b90b]/20 to-transparent"></div>

        <div className="flex flex-col lg:flex-row relative z-10">
          <div className="p-8 sm:p-10 md:p-14 lg:w-2/3">
            <motion.span
              className="inline-block text-[#e0b90b] font-medium text-sm mb-3 tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              COMECE AGORA
            </motion.span>

            <motion.h3
              className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Pronto para conversar com a FURIA?
            </motion.h3>

            <motion.p
              className="text-zinc-400 text-base sm:text-lg mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Acesse agora o chatbot da FURIA e tenha todas as informações sobre sua equipe favorita em um só lugar.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <Benefit text="Informações em tempo real" delay={0.3} />
              <Benefit text="Perguntas ilimitadas" delay={0.4} />
              <Benefit text="Estatísticas detalhadas" delay={0.5} />
              <Benefit text="Disponível 24/7" delay={0.6} />
            </div>

            <motion.div
              className="flex flex-wrap gap-4 items-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#e0b90b] to-[#ffd700] rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                <Link
                  href="/chatbot"
                  target="_blank"
                  className="relative bg-gradient-to-r from-[#e0b90b] to-[#d6aa00] hover:from-[#ffd700] hover:to-[#e0b90b] text-black px-8 py-4 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap shadow-[0_4px_20px_rgba(224,185,11,0.3)] hover:shadow-[0_6px_30px_rgba(224,185,11,0.4)]"
                >
                  Falar com o bot <FiArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:w-1/3 bg-gradient-to-br from-zinc-900 to-black border-l border-zinc-800 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <motion.div
                className="w-full max-w-xs bg-black border border-zinc-800 rounded-lg overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 20, rotateZ: -5 }}
                whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateZ: 2 }}
              >
                <div className="bg-zinc-900 px-4 py-3 flex items-center border-b border-zinc-800">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                  <span className="text-xs text-zinc-400 ml-auto">FURIA Chat</span>
                </div>

                <div className="p-4 space-y-3">
                  <div className="bg-zinc-800 p-2.5 rounded text-sm text-white rounded-tl-none max-w-[90%]">
                    Olá! Como posso ajudar você hoje?
                  </div>

                  <div className="bg-[#e0b90b]/10 border border-[#e0b90b]/20 p-2.5 rounded text-sm text-white rounded-tr-none ml-auto max-w-[90%]">
                    Quando é o próximo jogo da FURIA?
                  </div>

                  <TypewriterEffect text="O próximo jogo da FURIA será na PGL Astana 2025!" />
                </div>

                <div className="p-3 border-t border-zinc-800">
                  <div className="flex gap-2 items-center bg-zinc-800 rounded-lg px-3 py-2">
                    <input
                      type="text"
                      placeholder="Digite sua mensagem..."
                      className="bg-transparent text-xs flex-1 outline-none text-zinc-400"
                      disabled
                    />
                    <button className="p-1.5 bg-[#e0b90b] rounded-md">
                      <FiArrowRight size={12} className="text-black" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-6 right-6">
              <Image src="/logo.webp" alt="FURIA Logo" width={40} height={40} className="opacity-20" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Benefit({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="w-5 h-5 rounded-full bg-[#e0b90b]/20 flex items-center justify-center text-[#e0b90b]">
        <FiCheck size={12} />
      </div>
      <span className="text-zinc-300 text-sm">{text}</span>
    </motion.div>
  );
}

function TypewriterEffect({ text }: { text: string }) {
  const [displayText, setDisplayText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [index, text, isVisible]);

  return (
    <div ref={ref} className="bg-zinc-800 p-2.5 rounded text-sm text-white rounded-tl-none max-w-[90%]">
      {displayText}
      {index < text.length && <span className="inline-block w-1.5 h-4 bg-[#e0b90b] ml-0.5 animate-pulse"></span>}
    </div>
  );
}
