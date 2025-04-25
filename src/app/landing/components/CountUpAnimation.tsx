import React, { useState, useEffect } from "react";
import { useScroll } from "framer-motion";

interface CountUpAnimationProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

export default function CountUpAnimation({ target, prefix = "", suffix = "" }: CountUpAnimationProps) {
  const [count, setCount] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.5 && count < target) {
        const increment = Math.ceil(target / 50);
        const timer = setTimeout(() => {
          setCount((prev) => Math.min(prev + increment, target));
        }, 30);
        return () => clearTimeout(timer);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, count, target]);

  return (
    <h4 className="text-4xl font-bold text-[#e0b90b]">
      {prefix}
      {count}
      {suffix}
    </h4>
  );
}
