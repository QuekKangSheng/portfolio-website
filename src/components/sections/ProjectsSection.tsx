"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight, GitFork, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* TYPES */
interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  domain: string;
  domainTags: string[];
  techStack: string[];
  period: string;
  githubUrl?: string;
  liveUrl?: string;
  figmaUrl?: string;
  prototypeUrl?: string;
  zipUrl?: string;
  pdfUrl?: string;
  isPrivate: boolean;
  featured: boolean;
  images: string[];
  imageFit?: "cover" | "contain";
}

/* PROJECT DATA */
const PROJECTS: Project[] = [
  {
    id: "project-adore",
    title: "Project ADORE!",
    shortDesc: "Full-stack community platform for stray animal adoption with location-based features.",
    fullDesc:
      "Built a full-stack web application to support community-driven stray animal adoption efforts, leveraging modern JavaScript frameworks and backend services to deliver a responsive and scalable platform. The application included a Reddit-style community forum where users could share updates, discuss rescue efforts, and coordinate adoptions more effectively. Location-based features and notification capabilities were also integrated to improve communication, facilitate information sharing, and support quicker responses within the community.",
    domain: "Full-Stack",
    domainTags: ["Full-Stack"],
    techStack: ["Vue/Nuxt", "Node.js", "Express.js"],
    period: "Aug 2024 — Dec 2024",
    isPrivate: true,
    featured: true,
    githubUrl: "https://github.com/itsryanloh/wad2-g10t6.git",
    pdfUrl: "/projects/project-adore/Adore.pdf",
    images: [
      "/projects/project-adore/1.png",
      "/projects/project-adore/2.png",
      "/projects/project-adore/3.png",
      "/projects/project-adore/4.png",
      "/projects/project-adore/5.png",
      "/projects/project-adore/6.png",
      "/projects/project-adore/7.png",
      "/projects/project-adore/8.png",
      "/projects/project-adore/9.png",
    ],
  },
  {
    id: "optiplan",
    title: "Office Work Scheduler — OptiPlan",
    shortDesc: "Client-driven office scheduling web application built with Scrum methodology.",
    fullDesc:
      "Built and delivered an office scheduling web application designed to streamline daily task planning and improve operational coordination among staff. Worked alongside clients and development teams to gather requirements, define user stories, and ensure features aligned with business objectives. Contributed throughout the Agile development lifecycle, including sprint planning, backlog refinement, and effort estimation, to support smooth and timely project delivery. Additionally, developed detailed test scenarios to strengthen system stability, functionality, and overall user experience.",
    domain: "Full-Stack",
    domainTags: ["Full-Stack"],
    techStack: ["Scrum", "Web Application", "Testing"],
    period: "Aug 2025 — Dec 2025",
    isPrivate: true,
    featured: true,
    githubUrl: "https://github.com/yzkoh2/SPM.git",
    pdfUrl: "/projects/optiplan/report.pdf",
    zipUrl: "/projects/optiplan/optiplan.zip",
    images: [
      "/projects/optiplan/1.jpg",
      "/projects/optiplan/2.jpg",
      "/projects/optiplan/3.jpg",
      "/projects/optiplan/4.jpg",
      "/projects/optiplan/5.jpg",
      "/projects/optiplan/6.jpg",
    ],
  },
  {
    id: "fine-motor-skills",
    title: "Polytechnic Capstone Project: Fine Motor Skills Training",
    shortDesc: "Award-winning interdisciplinary solution — hardware glove, mobile game and analytics dashboard for autistic children.",
    fullDesc:
      "Developed an integrated hardware and software solution aimed at supporting fine motor skills training for autistic children through interactive and data-driven activities. The project involved engineering smart gloves embedded with flex sensors to capture and process finger movement data in real time. To encourage engagement during therapy, a sensor-integrated mobile game was designed to combine training exercises with interactive gameplay while collecting user performance data. A web-based analytics dashboard was also developed to help visualise progress, monitor performance metrics, and identify improvement trends over time. The project received recognition with a Gold award at the ARTSIC 2020 and a Merit award at gSIC/i-CREATe 2020.",
    domain: "Multi-Domain",
    domainTags: ["Full-Stack", "Hardware", "Game Dev"],
    techStack: ["Hardware", "Flex Sensors", "Mobile", "Data Analytics", "Circuit Design"],
    period: "Apr 2020 — Apr 2021",
    isPrivate: true,
    featured: true,
    imageFit: "contain",
    zipUrl: "/projects/fine-motor-skills/fine-motor-skills.zip",
    images: [
      "/projects/fine-motor-skills/0.png",
      "/projects/fine-motor-skills/1.png",
      "/projects/fine-motor-skills/2.png",
      "/projects/fine-motor-skills/3.png",
      "/projects/fine-motor-skills/4.png",
      "/projects/fine-motor-skills/5.png",
      "/projects/fine-motor-skills/6.png",
      "/projects/fine-motor-skills/7.png",
      "/projects/fine-motor-skills/8.png",
    ],
  },
  {
    id: "feast-finder",
    title: "Feast Finder",
    shortDesc: "Microservices-based F&B platform for reservation, cancellation and notifications.",
    fullDesc:
      "Designed and developed a microservices-based backend architecture to support core F&B operational workflows, with a focus on scalability, maintainability, and system resilience. Business requirements were translated into a combination of atomic and composite services, allowing different functions to remain modular while working together seamlessly across the platform. The backend included RESTful APIs and orchestrated service flows to manage key processes such as reservations, cancellations, and notification handling, helping streamline operations and improve overall system reliability.",
    domain: "Full-Stack",
    domainTags: ["Full-Stack"],
    techStack: ["Python", "REST APIs", "RabbitMQ", "Docker", "Twilio", "Stripe"],
    period: "Jan 2025 — Apr 2025",
    isPrivate: true,
    featured: false,
    imageFit: "contain",
    githubUrl: "https://github.com/WeiShenL/G4T4-IS213.git",
    zipUrl: "/projects/feast-finder/feast-finder.zip",
    images: [
      "/projects/feast-finder/1.png",
      "/projects/feast-finder/2.png",
      "/projects/feast-finder/3.png",
      "/projects/feast-finder/4.png",
      "/projects/feast-finder/5.png",
      "/projects/feast-finder/6.png",
      "/projects/feast-finder/7.png",
      "/projects/feast-finder/8.png",
      "/projects/feast-finder/9.png",
      "/projects/feast-finder/10.png",
      "/projects/feast-finder/11.png",
      "/projects/feast-finder/12.png",
      "/projects/feast-finder/13.png",
      "/projects/feast-finder/14.png",
      "/projects/feast-finder/15.png",
      "/projects/feast-finder/16.png",
    ],
  },
  {
    id: "sustain-wardrobe",
    title: "Sustain Wardrobe",
    shortDesc: "UX research and prototyping for a sustainability-focused mobile application.",
    fullDesc:
      "Contributed to the development of a sustainability-focused mobile application by helping shape the overall user experience through research, design, and iterative prototyping. The project placed strong emphasis on understanding user needs and translating those insights into intuitive and accessible interface designs. High-fidelity prototypes were created and refined over multiple iterations to improve usability and engagement, while user flows and application behaviour were carefully planned to ensure a smooth and scalable experience. Collaboration with team members throughout the process also helped bridge user research, product goals, and technical considerations into a cohesive final design.",
    domain: "UI/UX & Design",
    domainTags: ["UI/UX & Design"],
    techStack: ["Figma", "UX Research", "Prototyping", "UI Design"],
    period: "Aug 2024 — Dec 2024",
    isPrivate: true,
    featured: false,
    zipUrl: "/projects/sustain-wardrobe/sustain-wardrobe.zip",
    figmaUrl: "https://www.figma.com/design/QFTsBLtIUMir7RAkwqzgn6/Sustain-Wardrobe?node-id=2311-1633&t=1XwpYWEM2du4yMGE-1",
    prototypeUrl: "https://www.figma.com/proto/QFTsBLtIUMir7RAkwqzgn6/Sustain-Wardrobe?node-id=2317-526&t=IxhsYY45PRXSc3D8-1&scaling=scale-down&content-scaling=fixed&page-id=2311%3A1633&starting-point-node-id=2317%3A526&show-proto-sidebar=1",
    images: ["/projects/sustain-wardrobe/1.png"],
  },
  {
    id: "labarber",
    title: "LABarber Digital Transformation",
    shortDesc: "Digital strategy and UX proposals to improve a barbershop's branding and operations.",
    fullDesc:
      "Worked on identifying operational challenges and service gaps through research and root cause analysis, with a focus on understanding areas where the overall customer experience could be improved. Based on the findings, digital solution ideas were then proposed to help enhance branding, streamline user interactions, and support business growth. To communicate these ideas more effectively, both low- and high-fidelity prototypes were created and refined for stakeholder discussions, helping translate concepts into practical and scalable digital experiences.",
    domain: "UI/UX & Design",
    domainTags: ["UI/UX & Design"],
    techStack: ["Figma", "Digital Transformation", "UX Research", "Prototyping"],
    period: "Jan 2025 — Apr 2025",
    isPrivate: true,
    featured: false,
    zipUrl: "/projects/la-barber/la-barber.zip",
    figmaUrl: "https://www.figma.com/design/QfyHluNsP3rAsiHUy5ByVE/LABarber?node-id=0-1&t=FrcD7sXXXUq3OGUl-1",
    prototypeUrl: "https://www.figma.com/proto/QfyHluNsP3rAsiHUy5ByVE/LABarber?node-id=9-225&t=G3guz8SEr777Uw0B-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=9%3A225&show-proto-sidebar=1",
    images: ["/projects/la-barber/1.png"],
  },
  {
    id: "bto-process",
    title: "BTO Application Process Innovation",
    shortDesc: "Process redesign and stakeholder analysis for Singapore's BTO application workflow.",
    fullDesc:
      "Reviewed and analysed the existing BTO application workflow to better understand operational challenges, identify process bottlenecks, and uncover areas for improvement. Findings from the analysis were translated into structured recommendations through root cause and impact assessments, helping support discussions around process redesign and optimisation. Current and future-state workflows were modelled using SAP Signavio to provide stakeholders with a clearer visual understanding of how proposed changes could improve efficiency and overall process flow. The project also involved presenting key findings and recommendations to stakeholders to support decision-making and alignment on future improvements.",
    domain: "Process & Strategy",
    domainTags: ["Process & Strategy"],
    techStack: ["Signavio", "Process Modelling", "Root Cause Analysis", "Stakeholder Management"],
    period: "Aug 2024 — Dec 2024",
    isPrivate: true,
    featured: false,
    zipUrl: "/projects/bto-process/bto-process.zip",
    images: ["/projects/bto-process/1.png"],
  },
];

/* FILTERS */
const FILTERS = [
  { label: "All",                count: () => PROJECTS.length },
  { label: "Featured",           count: () => PROJECTS.filter((p) => p.featured).length },
  { label: "Full-Stack",         count: () => PROJECTS.filter((p) => p.domain === "Full-Stack").length },
  { label: "Multi-Domain",       count: () => PROJECTS.filter((p) => p.domain === "Multi-Domain").length },
  { label: "UI/UX & Design",     count: () => PROJECTS.filter((p) => p.domain === "UI/UX & Design").length },
  { label: "Process & Strategy", count: () => PROJECTS.filter((p) => p.domain === "Process & Strategy").length },
];

/* HEX BACKGROUND */
function HexBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg
        viewBox="0 0 1800 1400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full"
        style={{ opacity: 0.07 }}
      >
        {Array.from({ length: 18 }).map((_, row) =>
          Array.from({ length: 22 }).map((_, col) => {
            const size = 60;
            const w    = size * 2;
            const h    = Math.sqrt(3) * size;
            const x    = col * w * 0.75 + (row % 2 === 0 ? 0 : w * 0.375);
            const y    = row * h * 0.5;
            const cx   = x + size;
            const cy   = y + h / 2;
            const points = Array.from({ length: 6 }).map((_, i) => {
              const angle = (Math.PI / 180) * (60 * i - 30);
              return `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`;
            }).join(" ");
            return (
              <polygon key={`${row}-${col}`} points={points}
                fill="none" stroke="#D4A853" strokeWidth="0.8" />
            );
          })
        )}
      </svg>
    </div>
  );
}

/* IMAGE GALLERY */
function ImageGallery({
  images,
  title,
  imageFit = "cover",
}: {
  images: string[];
  title: string;
  imageFit?: "cover" | "contain";
}) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: "280px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <span className="font-display font-800 select-none opacity-10"
          style={{ fontSize: "5rem", color: "var(--accent-primary)" }}>
          {title.slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "560px" }}>
      <img
        src={images[current]}
        alt={`${title} — image ${current + 1}`}
        style={{
          width: "100%", height: "100%",
          objectFit: imageFit,
          objectPosition: "top center",
          background: "var(--bg-elevated)",
          transition: "opacity 0.5s",
        }}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((p) => (p - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border transition-all duration-200"
            style={{ background: "rgba(0,0,0,0.6)", borderColor: "var(--border-accent)", color: "var(--accent-primary)" }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border transition-all duration-200"
            style={{ background: "rgba(0,0,0,0.6)", borderColor: "var(--border-accent)", color: "var(--accent-primary)" }}
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  border: "none", cursor: "pointer",
                  background: i === current ? "var(--accent-primary)" : "rgba(255,255,255,0.4)",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* PROJECT MODAL */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.88)", zIndex: 9999, padding: "1rem" }}
      onClick={onClose}
    >
      <div
        className="relative w-full flex flex-col overflow-hidden"
        style={{ maxWidth: "1000px", maxHeight: "90vh", background: "var(--bg-card)", border: "1px solid var(--border-accent)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border transition-all duration-200"
          style={{ borderColor: "var(--border-accent)", color: "var(--accent-primary)", background: "var(--bg-card)" }}
        >
          <X size={16} />
        </button>

        <div style={{ overflowY: "auto", flex: 1 }}>
          <ImageGallery images={project.images} title={project.title} imageFit={project.imageFit} />

          <div style={{ padding: "2.5rem" }}>
            {/* Header */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: "0.75rem" }}>
                {project.featured && (
                  <span className="font-mono text-xs tracking-widest uppercase px-2 py-0.5"
                    style={{ background: "rgba(212,168,83,0.15)", border: "1px solid var(--accent-primary)", color: "var(--accent-primary)" }}>
                    ★ Featured
                  </span>
                )}
                {project.domainTags.map((tag) => (
                  <span key={tag} className="font-mono text-xs tracking-widest uppercase px-2 py-0.5 border"
                    style={{ borderColor: "var(--border-accent)", color: "var(--accent-primary)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-display font-700"
                style={{ fontSize: "1.6rem", color: "var(--text-primary)", lineHeight: 1.2 }}>
                {project.title}
              </h2>
              <p className="font-mono text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {project.period}
              </p>
            </div>

            {/* Description */}
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.9", marginBottom: "2rem" }}>
              {project.fullDesc}
            </p>

            {/* Tech stack */}
            <div style={{ marginBottom: "2rem" }}>
              <span className="text-label block" style={{ marginBottom: "0.75rem" }}>Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-3 pt-5"
              style={{ borderTop: "1px solid var(--border-subtle)" }}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost" style={{ fontSize: "0.75rem", padding: "0.6rem 1.5rem" }}>
                  <GitFork size={14} /> View Code
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-primary" style={{ fontSize: "0.75rem", padding: "0.6rem 1.5rem" }}>
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {project.figmaUrl && (
                <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost" style={{ fontSize: "0.75rem", padding: "0.6rem 1.5rem" }}>
                  ✦ View Figma
                </a>
              )}
              {project.prototypeUrl && (
                <a href={project.prototypeUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost" style={{ fontSize: "0.75rem", padding: "0.6rem 1.5rem" }}>
                  ✦ View Prototype
                </a>
              )}
              {project.zipUrl && (
                <a href={project.zipUrl} download
                  className="btn-ghost" style={{ fontSize: "0.75rem", padding: "0.6rem 1.5rem" }}>
                  ↓ Download Project
                </a>
              )}
              {project.pdfUrl && (
                <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost" style={{ fontSize: "0.75rem", padding: "0.6rem 1.5rem" }}>
                  ↗ View Report
                </a>
              )}
              {project.isPrivate && !project.githubUrl && !project.figmaUrl && !project.zipUrl && (
                <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                  🔒 Private / Academic Project
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* PROJECT CARD */
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group flex flex-col border transition-all duration-300 cursor-pointer"
      style={{
        borderColor: hovered ? "var(--border-accent)" : "var(--border-subtle)",
        background: "rgba(14,14,14,0.88)",
        backdropFilter: "blur(10px)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "var(--shadow-accent)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ height: "220px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        {project.images.length > 0 ? (
          <img
            src={project.images[0]}
            alt={project.title}
            style={{
              width: "100%", height: "100%",
              objectFit: project.imageFit ?? "cover",
              objectPosition: "top center",
              background: "var(--bg-elevated)",
            }}
          />
        ) : (
          <span className="font-display font-800 select-none opacity-10"
            style={{ fontSize: "4rem", color: "var(--accent-primary)" }}>
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        )}
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ background: "rgba(0,0,0,0.5)", opacity: hovered ? 1 : 0 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase px-4 py-2 border"
            style={{ borderColor: "var(--accent-primary)", color: "var(--accent-primary)", background: "rgba(0,0,0,0.7)" }}>
            View Project
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>

        {/* Tags row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.featured && (
              <span className="font-mono text-xs tracking-widest uppercase px-2 py-0.5"
                style={{ background: "rgba(212,168,83,0.15)", border: "1px solid var(--accent-primary)", color: "var(--accent-primary)" }}>
                ★ Featured
              </span>
            )}
            {project.domainTags.map((tag) => (
              <span key={tag} className="font-mono text-xs tracking-widest uppercase px-2 py-0.5 border"
                style={{ borderColor: "var(--border-accent)", color: "var(--accent-primary)" }}>
                {tag}
              </span>
            ))}
          </div>
          <span className="font-mono text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
            {project.period.split(" — ")[1] ?? project.period}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-600 transition-colors duration-200"
          style={{
            fontSize: "1.1rem", lineHeight: 1.35,
            color: hovered ? "var(--accent-primary)" : "var(--text-primary)",
            fontFamily: "'Syne', sans-serif",
          }}>
          {project.title}
        </h3>

        {/* Short description */}
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.75", flex: 1 }}>
          {project.shortDesc}
        </p>

        {/* Tech tags (max 4 + overflow count) */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tech-tag">+{project.techStack.length - 4}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {project.isPrivate ? (
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>🔒 Private / Academic</span>
          ) : (
            <span className="font-mono text-xs" style={{ color: "#34d399" }}>◉ Public</span>
          )}
          <span className="font-mono text-xs transition-colors duration-200"
            style={{ color: hovered ? "var(--accent-primary)" : "var(--text-muted)" }}>
            Click to view →
          </span>
        </div>
      </div>
    </div>
  );
}

/* MAIN SECTION */
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter,   setFilter]   = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projects-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: ".projects-heading", start: "top 85%" } }
      );
      gsap.fromTo(".project-card-wrap",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08,
          scrollTrigger: { trigger: ".projects-grid", start: "top 82%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Re-animate cards on filter change */
  useEffect(() => {
    gsap.fromTo(".project-card-wrap",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: "power2.out" }
    );
  }, [filter]);

  const filtered = (() => {
    if (filter === "All")      return PROJECTS;
    if (filter === "Featured") return PROJECTS.filter((p) => p.featured);
    return PROJECTS.filter((p) => p.domain === filter);
  })();

  return (
    <>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <section
        ref={sectionRef}
        id="projects"
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--bg-secondary)" }}
      >
        <HexBackground />

        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)", zIndex: 1 }} />

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>

          {/* Heading */}
          <div style={{ marginBottom: "5rem" }}>
            <span className="projects-heading text-label block opacity-0">03. Projects</span>
            <h2 className="projects-heading font-display font-700 opacity-0"
              style={{ marginTop: "1.25rem", fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              Things I've Built
            </h2>
            <p className="projects-heading opacity-0 max-w-xl"
              style={{ color: "var(--text-secondary)", marginTop: "1.5rem", lineHeight: 1.8, fontSize: "1rem" }}>
              A selection of projects spanning full-stack development, hardware integration,
              UX design and process strategy.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3" style={{ marginBottom: "4rem" }}>
            {FILTERS.map(({ label, count }) => {
              const isActive = filter === label;
              return (
                <button key={label} onClick={() => setFilter(label)}
                  className="flex items-center gap-2 border transition-all duration-200 font-mono text-xs tracking-widest uppercase"
                  style={{
                    padding: "0.6rem 1.25rem",
                    borderColor: isActive ? "var(--accent-primary)" : "var(--border-subtle)",
                    background: isActive ? "rgba(212,168,83,0.1)" : "rgba(14,14,14,0.7)",
                    color: isActive ? "var(--accent-primary)" : "var(--text-muted)",
                    backdropFilter: "blur(8px)",
                    transform: isActive ? "translateY(-1px)" : "translateY(0)",
                    boxShadow: isActive ? "var(--shadow-accent)" : "none",
                  }}>
                  {label}
                  <span className="font-mono text-xs px-1.5 py-0.5"
                    style={{
                      background: isActive ? "rgba(212,168,83,0.2)" : "var(--bg-elevated)",
                      color: isActive ? "var(--accent-primary)" : "var(--text-muted)",
                      borderRadius: "2px",
                    }}>
                    {count()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Project grid */}
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div key={project.id} className="project-card-wrap">
                <ProjectCard project={project} onClick={() => setSelected(project)} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center font-mono text-sm" style={{ color: "var(--text-muted)" }}>
              No projects in this category.
            </div>
          )}
        </div>
      </section>
    </>
  );
}