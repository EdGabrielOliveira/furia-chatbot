import React from "react";
import { motion, useInView } from "framer-motion";
import CountUpAnimation from "./CountUpAnimation";
import { FiMessageSquare, FiCheckCircle, FiUsers, FiCreditCard } from "react-icons/fi";

export default function StatsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="stats" className="py-20 md:py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-950"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Impacto <span className="text-[#e0b90b]">em números</span>
          </h3>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Nosso chatbot da FURIA está transformando a experiência dos fãs com informações precisas e em tempo real
          </p>

          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-12 bg-zinc-800"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-[#e0b90b] mx-2"></div>
            <div className="h-px w-12 bg-zinc-800"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            icon={<FiMessageSquare size={24} />}
            value={<CountUpAnimation target={500} prefix="+" />}
            label="Perguntas respondidas"
            description="diariamente"
            delay={0}
          />

          <StatCard
            icon={<FiCheckCircle size={24} />}
            value={<CountUpAnimation target={98} suffix="%" />}
            label="Respostas precisas"
            description="taxa de acerto"
            delay={0.1}
          />

          <StatCard
            icon={<FiUsers size={24} />}
            value={<CountUpAnimation target={15} suffix="K" />}
            label="Fãs conectados"
            description="e crescendo"
            delay={0.2}
          />

          <StatCard
            icon={<FiCreditCard size={24} />}
            value={<CountUpAnimation target={27} suffix="K" />}
            label="Carteirinhas geradas"
            description="compartilhadas"
            delay={0.3}
          />
        </div>

        <motion.div
          className="mt-16 md:mt-24 bg-gradient-to-r from-zinc-900 to-black rounded-xl overflow-hidden border border-zinc-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="bg-black/50 p-6 md:p-8 md:w-1/3">
              <h4 className="text-xl font-semibold mb-2">📈 Crescimento contínuo</h4>
              <p className="text-zinc-400 text-sm mb-4">
                O uso do chatbot da FURIA cresceu <span className="text-[#e0b90b]">300%</span> nos últimos 3 meses
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-zinc-800/50 px-3 py-1 text-xs rounded-full text-zinc-400">#CSGOBrasil</span>
                <span className="bg-zinc-800/50 px-3 py-1 text-xs rounded-full text-zinc-400">#FURIA</span>
                <span className="bg-zinc-800/50 px-3 py-1 text-xs rounded-full text-zinc-400">#ESports</span>
              </div>
            </div>

            <div className="flex-1 p-6 md:p-8 relative">
              <div className="h-16 md:h-24 flex items-end justify-between gap-1 mb-2">
                {[15, 20, 18, 25, 30, 35, 42, 45, 50, 55, 60, 67].map((height, i) => (
                  <motion.div
                    key={i}
                    className="h-0 bg-gradient-to-t from-[#e0b90b]/60 to-[#e0b90b] rounded-sm flex-1 max-w-2"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${height}%` } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-zinc-500">
                <span>JAN</span>
                <span>FEV</span>
                <span>MAR</span>
                <span>ABR</span>
                <span>MAI</span>
                <span>JUN</span>
                <span>JUL</span>
                <span>AGO</span>
                <span>SET</span>
                <span>OUT</span>
                <span>NOV</span>
                <span>DEZ</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
  description,
  delay = 0,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="bg-gradient-to-b from-zinc-900 to-black p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 group transition-all relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#e0b90b]/5 opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#e0b90b]/10 text-[#e0b90b] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>

        <div className="flex-1">
          <div className="text-3xl md:text-4xl font-bold text-[#e0b90b]">{value}</div>
          <p className="text-white font-medium mt-1">{label}</p>
          <p className="text-zinc-400 text-xs mt-1">{description}</p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#e0b90b]/0 via-[#e0b90b] to-[#e0b90b]/0"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
}
