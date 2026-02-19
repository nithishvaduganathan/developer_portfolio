"use client";

import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = personalData.designation;

  useEffect(() => {
    setIsVisible(true);

    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <section className="section relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">

          {/* Left Column - Text Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="mb-6">
              <p className="text-cyan-400 font-mono text-lg mb-2">Hi, my name is</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                {personalData.name.split(' ').map((word, index) => (
                  <span key={index} className="block">
                    {index === 0 ? word : <span className="text-slate-400">{word}</span>}
                  </span>
                ))}
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-400 mb-6">
                I'm a <span className="text-cyan-400">{typedText}</span>
                <span className="animate-pulse">|</span>
              </h2>
            </div>

            <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
              {personalData.description.slice(0, 200)}...
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="#contact" className="btn btn-primary">
                <RiContactsFill size={20} />
                <span>Get In Touch</span>
              </Link>
              <Link href={personalData.resume} target="_blank" className="btn btn-secondary">
                <MdDownload size={20} />
                <span>Download Resume</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              <Link
                href={personalData.github}
                target="_blank"
                className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                aria-label="GitHub Profile"
              >
                <BsGithub size={28} />
              </Link>
              <Link
                href={personalData.linkedIn}
                target="_blank"
                className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <BsLinkedin size={28} />
              </Link>
              <Link
                href={personalData.leetcode}
                target="_blank"
                className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                aria-label="LeetCode Profile"
              >
                <SiLeetcode size={28} />
              </Link>
              <Link
                href={personalData.twitter}
                target="_blank"
                className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                aria-label="Twitter Profile"
              >
                <FaTwitterSquare size={28} />
              </Link>
              <Link
                href={personalData.facebook}
                target="_blank"
                className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                aria-label="Facebook Profile"
              >
                <FaFacebook size={28} />
              </Link>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className={`hidden lg:flex items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Geometric Shapes */}
              <div className="relative w-96 h-96">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>

                {/* Middle Ring */}
                <div className="absolute inset-8 border-2 border-purple-400/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>

                {/* Inner Circle with Gradient */}
                <div className="absolute inset-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center p-8">
                    <div className="text-6xl font-bold text-gradient mb-4">
                      {'</>'}
                    </div>
                    <p className="text-slate-300 font-mono text-sm">
                      Building the future
                    </p>
                  </div>
                </div>

                {/* Floating Dots */}
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-float"></div>
                <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/4 right-0 w-2 h-2 bg-coral-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-cyan-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;