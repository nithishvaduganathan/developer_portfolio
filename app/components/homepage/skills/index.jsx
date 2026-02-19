"use client";

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import { useEffect, useState } from "react";

// Categorize skills
const skillCategories = {
  "Frontend": ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next JS", "Tailwind", "Bootstrap", "MaterialUI"],
  "Backend": ["Python", "Flask", "REST API", "JWT Authentication", "Wordpress"],
  "AI/ML": ["Machine Learning", "Artificial Intelligence", "Natural Language Processing (NLP)", "Scikitlearn", "TensorFlow", "Keras", "PyTorch", "OpenCV", "LLMs"],
  "Database": ["MongoDB", "MySQL", "PostgreSQL", "SQLite", "Firebase"],
  "DevOps": ["Git", "GitHub", "Docker", "AWS", "Nginx"],
  "Tools": ["Linux", "Windows", "PowerShell", "Jupyter Notebook", "Streamlit", "n8n", "Zapier", "UiPath"]
};

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Frontend");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("skills");
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
    <section id="skills" className="section relative">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400 font-mono">02. </span>
            Skills & Technologies
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-transparent"></div>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap gap-3 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${activeCategory === category
                  ? "bg-cyan-400 text-navy-dark shadow-lg shadow-cyan-400/50"
                  : "bg-navy-light text-slate-300 hover:bg-navy-light/80 hover:text-cyan-400 border border-slate-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {skillCategories[activeCategory].map((skill, index) => {
            const skillImage = skillsImage(skill);
            return (
              <div
                key={skill}
                className="card group cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col items-center gap-4 p-6">
                  {/* Skill Icon */}
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    {skillImage ? (
                      <Image
                        src={skillImage.src}
                        alt={skill}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center text-2xl font-bold text-white">
                        {skill.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Skill Name */}
                  <p className="text-center text-sm font-medium text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                    {skill}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-lg transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* All Skills Count */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 font-mono">
            Total Skills: <span className="text-cyan-400 font-bold">{skillsData.length}+</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Skills;