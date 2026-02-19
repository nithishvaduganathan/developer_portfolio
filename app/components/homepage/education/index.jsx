"use client";

import { educations } from "@/utils/data/educations";
import { useEffect, useState } from "react";
import { MdSchool } from "react-icons/md";

function Education() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("education");
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
    <section id="education" className="section relative">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400 font-mono">05. </span>
            Education
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-transparent"></div>
        </div>

        {/* Education Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {educations.map((edu, index) => (
            <div
              key={edu.id}
              className="card group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Duration Badge */}
              <div className="inline-block px-4 py-1 mb-4 text-xs font-mono bg-purple-400/10 text-purple-400 rounded-full border border-purple-400/30">
                {edu.duration}
              </div>

              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-3">
                <div className="text-purple-400 mt-1">
                  <MdSchool size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {edu.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{edu.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;