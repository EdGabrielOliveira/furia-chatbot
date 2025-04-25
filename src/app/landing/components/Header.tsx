import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-2 md:py-3 bg-black/90 backdrop-blur-lg shadow-lg shadow-black/10 border-b border-zinc-800/30"
          : "py-4 md:py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <motion.div
            className="flex items-center gap-2.5 md:gap-3 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
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
              <Image
                src="/logo.webp"
                alt="FURIA Logo"
                width={40}
                height={40}
                className="z-10 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold leading-none relative">
                FURIA <span className="text-[#e0b90b]">Chat</span>
                <motion.span
                  className="absolute -top-1 -right-8 text-[10px] text-zinc-400 font-normal bg-zinc-800/80 px-1.5 py-0.5 rounded-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  BETA
                </motion.span>
              </h1>
            </div>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <motion.nav
            className="flex items-center mr-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NavLink href="#features">Recursos</NavLink>
            <NavLink href="#stats">Estatísticas</NavLink>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/chatbot"
              target="_blank"
              className="bg-gradient-to-r from-[#e0b90b] to-[#d6aa00] hover:from-[#c6a30a] hover:to-[#e0b90b] text-black px-5 py-2 rounded-lg font-medium transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(224,185,11,0.3)] hover:shadow-[0_0_20px_rgba(224,185,11,0.5)] hover:-translate-y-0.5"
            >
              Acessar chat <FiArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className="md:hidden">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={toggleMobileMenu}
            className={`w-10 h-10 flex items-center justify-center rounded-lg ${
              mobileMenuOpen ? "bg-zinc-800" : "bg-zinc-900/80"
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-zinc-800/50"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                <MobileNavLink href="#features" onClick={() => setMobileMenuOpen(false)}>
                  Recursos
                </MobileNavLink>
                <MobileNavLink href="#stats" onClick={() => setMobileMenuOpen(false)}>
                  Estatísticas
                </MobileNavLink>

                <div className="pt-3 mt-2 border-t border-zinc-800/30">
                  <Link
                    href="/chatbot"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-gradient-to-r from-[#e0b90b] to-[#d6aa00] text-black p-3 w-full rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(224,185,11,0.3)]"
                  >
                    Acessar chat <FiArrowRight size={18} />
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="text-zinc-400 hover:text-white mx-3 font-medium text-sm transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#e0b90b] after:origin-center after:scale-x-0 after:transition-transform hover:after:scale-x-100"
  >
    {children}
  </Link>
);

interface MobileNavLinkProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const MobileNavLink = ({ href, onClick, children }: MobileNavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-zinc-200 p-2 text-lg font-medium w-full block border-l-2 border-transparent hover:border-[#e0b90b] hover:bg-zinc-800/50 transition-all rounded-r-md"
  >
    {children}
  </Link>
);
