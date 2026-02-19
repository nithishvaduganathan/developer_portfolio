"use client";

import { projectsData } from '@/utils/data/projects-data';
import { useEffect, useState } from 'react';
import ProjectCard from './project-card';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("projects");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 6);

  return (
    <section id="projects" className="section relative">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400 font-mono">03. </span>
            Featured Projects
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-transparent"></div>
        </div>

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {projectsData.length > 6 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-secondary"
            >
              {showAll ? 'Show Less' : `Show All (${projectsData.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;