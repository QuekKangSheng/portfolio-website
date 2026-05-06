"use client";

import { useState } from "react";
import { ExternalLink, GitFork, Calendar } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Project } from "@/types/project";
import { urlFor } from "@/lib/sanity";
import { formatDate } from "@/utils/formatDate";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative flex flex-col border transition-all duration-300",
        featured ? "lg:flex-row" : "flex-col"
      )}
      style={{
        borderColor: hovered ? "var(--border-accent)" : "var(--border-subtle)",
        background: "var(--bg-card)",
        boxShadow: hovered ? "var(--shadow-accent)" : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-4 right-4 z-10 px-2 py-0.5 font-mono text-xs tracking-widest"
          style={{
            background: "rgba(212,168,83,0.15)",
            border: "1px solid var(--border-accent)",
            color: "var(--accent-primary)",
          }}
        >
          FEATURED
        </div>
      )}

      {/* Image */}
      {project.image && (
        <div
          className={cn(
            "overflow-hidden bg-bg-elevated",
            featured ? "lg:w-2/5 h-48 lg:h-auto" : "h-44"
          )}
        >
          <img
            src={urlFor(project.image).width(800).url()}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* No image placeholder */}
      {!project.image && (
        <div
          className={cn(
            "flex items-center justify-center overflow-hidden",
            featured ? "lg:w-2/5 h-48 lg:h-auto" : "h-44"
          )}
          style={{
            background: "var(--bg-elevated)",
            borderBottom: featured ? "none" : "1px solid var(--border-subtle)",
          }}
        >
          <span
            className="font-display font-800 text-4xl opacity-10 select-none"
            style={{ color: "var(--accent-primary)" }}
          >
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Date */}
        <div className="flex items-center gap-1.5">
          <Calendar size={11} style={{ color: "var(--text-muted)" }} />
          <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            {formatDate(project.startDate)}
            {project.endDate ? ` — ${formatDate(project.endDate)}` : " — Present"}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-700 text-lg leading-snug transition-colors duration-200"
          style={{ color: hovered ? "var(--accent-primary)" : "var(--text-primary)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        {/* Tech stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-tag text-xs">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs tracking-wide transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <GitFork size={12} />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs tracking-wide transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <ExternalLink size={12} />
              Live
            </a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              Private / Academic Project
            </span>
          )}
        </div>
      </div>
    </div>
  );
}