"use client";

import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';

function ProjectCard({ project }) {
  return (
    <div className="card h-full flex flex-col group">
      {/* Project Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-sm text-slate-400 font-mono">{project.role}</p>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.code && (
            <Link
              href={project.code}
              target="_blank"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="View Code"
            >
              <BsGithub size={20} />
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="View Demo"
            >
              <FiExternalLink size={20} />
            </Link>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm mb-4 flex-1 leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tools.map((tool, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs font-mono bg-navy-dark text-cyan-400 rounded-full border border-cyan-400/30 hover:border-cyan-400 transition-colors duration-300"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;