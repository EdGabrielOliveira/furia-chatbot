"use client";

import React, { useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
import CTASection from "./components/CTASection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#000000] to-[#080808] -z-10" />

      {/* Floating gradient effects */}
      <div className="fixed -top-[40vh] -left-[20vw] w-[70vw] h-[70vh] bg-[#e0b90b] opacity-[0.02] blur-[120px] rounded-full -z-10" />
      <div className="fixed -bottom-[30vh] -right-[20vw] w-[60vw] h-[60vh] bg-[#e0b90b] opacity-[0.015] blur-[150px] rounded-full -z-10" />

      {/* Componentes da Landing Page */}
      <Header isScrolled={isScrolled} />
      <HeroSection opacity={opacity} scale={scale} />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
