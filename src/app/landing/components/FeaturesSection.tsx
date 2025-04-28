import React from "react";
import { motion, useInView } from "framer-motion";
import { FiAward, FiZap, FiUsers, FiArrowRight } from "react-icons/fi";
import FeatureCard from "./FeatureCard";
import { BsPuzzle } from "react-icons/bs";

export default function FeaturesSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="features" className="bg-zinc-950 py-16 md:py-24 relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0b90b]/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0b90b]/10 to-transparent"></div>

      <motion.div
        className="absolute top-1/4 -right-20 w-64 h-64 rounded-full bg-[#e0b90b]/5 blur-[100px]"
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block">
            <span className="px-4 py-1.5 bg-[#e0b90b]/10 text-[#e0b90b] text-sm rounded-full font-medium inline-block mb-6 border border-[#e0b90b]/20 relative z-10">
              FUNCIONALIDADES
            </span>
            <motion.div
              className="absolute -inset-1 rounded-full bg-[#e0b90b]/5 blur-md z-0"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-300">
            Recursos do chatbot
          </h3>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-[#e0b90b] mx-auto my-4"
          />

          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Nosso assistente virtual foi desenvolvido para manter você atualizado sobre tudo que envolve a FURIA Esports
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <FeatureCard
            icon={<BsPuzzle size={28} />}
            title="Quiz de perguntas"
            description="Teste seus conhecimentos sobre a FURIA com nosso quiz interativo."
            delay={0}
          />

          <FeatureCard
            icon={<FiAward size={28} />}
            title="Rankings e estatísticas"
            description="Consulte rankings mundiais, estatísticas dos jogadores e desempenho da equipe."
            delay={0.1}
          />

          <FeatureCard
            icon={<FiZap size={28} />}
            title="Sugestões personalizadas"
            description="Receba sugestões de perguntas com base na conversa para explorar mais conteúdo."
            delay={0.2}
          />

          <FeatureCard
            icon={<FiUsers size={28} />}
            title="Carteirinha de fã"
            description="Crie sua carteirinha de fã da FURIA e compartilhe nas redes sociais."
            delay={0.3}
          />
        </motion.div>

        <motion.div
          className="mt-16 md:mt-24 bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 md:p-8 overflow-hidden relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute -right-40 -top-40 w-80 h-80 bg-[#e0b90b]/10 rounded-full blur-[80px] opacity-50"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-2/3">
              <span className="text-[#e0b90b] bg-[#e0b90b]/10 px-3 py-1 text-xs rounded-md font-medium">
                EM DESTAQUE
              </span>
              <h4 className="text-2xl md:text-3xl font-bold mt-3">Aprenda sobre CS2 com nosso assistente</h4>
              <p className="text-zinc-400 mt-4 text-base md:text-lg">
                Além das informações sobre a FURIA, nosso bot é especialista em Counter-Strike. Pergunte sobre táticas,
                mapas, economia e muito mais.
              </p>

              <motion.a
                href="/chatbot"
                target="_blank"
                className="mt-6 inline-flex items-center text-[#e0b90b] hover:text-[#d6aa00] group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Faça uma pergunta
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>

            <div className="md:w-1/3 bg-black/50 p-3 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-xs text-zinc-400">chat.furia.gg</div>
              </div>

              <div className="bg-zinc-900 rounded-md p-3 text-sm text-zinc-200">
                <div className="text-[#e0b90b] mb-1">Você:</div>
                <div className="mb-4">Qual a melhor forma de dar entry no bombsite A da Mirage?</div>
                <div className="text-[#e0b90b] mb-1">FURIA Bot:</div>
                <div>
                  Para dar entry no bombsite A da Mirage, é importante usar smokes no CT e jungle, flash pelo ramp ou A
                  main e coordenar com seu time...
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
