"use client";

import { experiences } from "@/utils/data/experience";
import { useEffect, useState } from "react";
import { BsPersonWorkspace } from "react-icons/bs";

function Experience() {
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

    const element = document.getElementById("experience");
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
    <section id="experience" className="section relative">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400 font-mono">04. </span>
            Work Experience
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-transparent"></div>
        </div>

        {/* Timeline */}
        <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-transparent"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-navy-dark transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300"></div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <div className="card group">
                    {/* Duration Badge */}
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-mono bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/30">
                      {exp.duration}
                    </div>

                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-3">
                      <div className="text-cyan-400 mt-1">
                        <BsPersonWorkspace size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <p className="text-slate-400 font-medium">{exp.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;