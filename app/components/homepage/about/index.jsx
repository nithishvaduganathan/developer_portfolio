"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { useEffect, useState } from "react";

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    experience: 0,
    projects: 0,
    skills: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate counters
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;

          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setStats({
              experience: Math.floor(progress * 2), // 2+ years
              projects: Math.floor(progress * 15), // 15+ projects
              skills: Math.floor(progress * 30), // 30+ skills
            });

            if (currentStep >= steps) {
              clearInterval(timer);
              setStats({ experience: 2, projects: 15, skills: 30 });
            }
          }, interval);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="about" className="section relative">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400 font-mono">01. </span>
            About Me
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-transparent"></div>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Text Content */}
          <div>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              {personalData.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="card text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{stats.experience}+</div>
                <div className="text-sm text-slate-400">Years Experience</div>
              </div>
              <div className="card text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{stats.projects}+</div>
                <div className="text-sm text-slate-400">Projects Done</div>
              </div>
              <div className="card text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{stats.skills}+</div>
                <div className="text-sm text-slate-400">Technologies</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Decorative Border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300"></div>

              {/* Image Container */}
              <div className="relative">
                <Image
                  src={personalData.profile}
                  width={350}
                  height={350}
                  alt={personalData.name}
                  className="rounded-lg relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-cyan-400/20 rounded-lg group-hover:bg-transparent transition-all duration-300 z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;