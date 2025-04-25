import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiGithub, FiInstagram, FiArrowRight } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 pt-16 pb-8 md:pt-20 md:pb-10 border-t border-zinc-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0b90b]/20 to-transparent"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#e0b90b]/5 blur-3xl rounded-full opacity-30"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Image src="/logo.webp" alt="FURIA Logo" width={40} height={40} />
                <motion.div
                  className="absolute inset-0 bg-[#e0b90b]/20 blur-md rounded-full -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <h3 className="text-xl font-bold">
                FURIA <span className="text-[#e0b90b]">Chatbot</span>
              </h3>
            </div>

            <p className="text-zinc-400 text-sm mb-4 max-w-xs">
              Seu assistente virtual para tudo sobre a FURIA Esports. Resultados, estatísticas e informações em tempo
              real.
            </p>

            <div className="mt-5">
              <Link
                href="/chatbot"
                target="_blank"
                className="inline-flex items-center text-[#e0b90b] hover:text-white transition-colors gap-2 group font-medium"
              >
                Acessar chatbot
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col md:items-end xs:items-center sm:items-center"
          >
            <h4 className="text-white font-semibold mb-4 text-lg">Siga-nos</h4>
            <div className="flex flex-wrap gap-3">
              <SocialLink icon={<FiInstagram />} href="https://instagram.com/gabriel.htcss" label="Instagram" />
              <SocialLink icon={<FiGithub />} href="https://github.com/edgabrieloliveira" label="GitHub" />
            </div>

            <div className="mt-5 pt-5 border-t border-zinc-800/50">
              <span className="text-zinc-400 text-xs block mb-2">Desenvolvido por</span>
              <a
                href="https://github.com/edgabrieloliveira"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-[#e0b90b] transition-colors group"
              >
                Gabriel Oliveira
                <FiArrowRight
                  size={14}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                />
              </a>
            </div>
          </motion.div>
        </div>
        <div className="h-px bg-zinc-900 w-full mb-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            className="text-zinc-500 text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            © 2025 FURIA Esports. Todos os direitos reservados.
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-zinc-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="https://www.furia.gg" target="_blank" className="hover:text-zinc-300 transition-colors">
              Site oficial
            </Link>
            <Link href="https://www.hltv.org" target="_blank" className="hover:text-zinc-300 transition-colors">
              HLTV
            </Link>
            <Link href="https://liquipedia.net" target="_blank" className="hover:text-zinc-300 transition-colors">
              Liquipedia
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#e0b90b] hover:border-[#e0b90b]/50 transition-colors hover:-translate-y-1 transform duration-200"
    >
      {icon}
    </a>
  );
}
