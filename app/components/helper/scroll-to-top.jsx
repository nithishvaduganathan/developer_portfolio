"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-cyan-400 text-navy-dark shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-cyan-400/50 cursor-pointer group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      {/* Progress Ring */}
      <svg className="absolute -inset-1 w-16 h-16 -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="rgba(100, 255, 218, 0.2)"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="rgba(100, 255, 218, 0.8)"
          strokeWidth="2"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 30}`}
          strokeDashoffset={`${2 * Math.PI * 30 * (1 - scrollProgress / 100)}`}
          className="transition-all duration-150"
        />
      </svg>

      {/* Arrow Icon */}
      <FaArrowUp className="text-lg group-hover:animate-bounce" />
    </button>
  );
};

export default ScrollToTop;
