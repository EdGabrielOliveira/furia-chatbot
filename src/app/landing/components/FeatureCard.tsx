import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gradient-to-b from-zinc-900 to-black p-6 rounded-xl border border-zinc-800 hover:border-[#e0b90b]/50 transition-all group relative overflow-hidden"
      whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.4)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#e0b90b]/0 to-[#e0b90b]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="w-14 h-14 bg-[#e0b90b]/10 rounded-lg flex items-center justify-center mb-5 text-[#e0b90b] group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h4 className="text-xl font-semibold mb-3 group-hover:text-[#e0b90b] transition-colors duration-300">{title}</h4>
      <p className="text-zinc-400 text-sm">{description}</p>
    </motion.div>
  );
}
