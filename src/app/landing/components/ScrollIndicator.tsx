import React from "react";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex items-start justify-center">
        <motion.div
          className="w-1.5 h-1.5 bg-[#e0b90b] rounded-full mt-2"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
    </motion.div>
  );
}
