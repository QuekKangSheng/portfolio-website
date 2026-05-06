"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "@/components/ui/ProjectCard";
import { sanityClient } from "@/lib/sanity";
import type { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);

/* ── Fallback static data (shown until Sanity is populated) ── */
const STATIC_PROJECTS: Project[] = [
  {
    _id: "1",
    title: "Feast Finder — Microservices F&B Platform",
    description:
      "Designed and developed a microservices-based backend using atomic and composite services to support core F&B workflows including reservation, cancellation and notification.",
    techStack: ["Python", "REST APIs", "RabbitMQ", "Docker", "Twilio", "Stripe"],
    startDate: "2025-01",
    endDate: "2025-04",
    featured: true,
  },
  {
    _id: "2",
    title: "Project ADORE!",
    description:
      "Full-stack web application using modern JavaScript framework and backend services to support community-driven stray adoption. Reddit-inspired forum with location-based features.",
    techStack: ["Vue/Nuxt", "Node.js", "Express.js"],
    startDate: "2024-08",
    endDate: "2024-12",
    featured: true,
  },
  {
    _id: "3",
    title: "Office Work Scheduler — OptiPlan",
    description:
      "Client-driven office scheduling web application using Scrum to support staff daily task planning. Developed comprehensive test cases to ensure system reliability.",
    techStack: ["Scrum", "Web Application", "Testing"],
    startDate: "2025-08",
    endDate: "2025-12",
    featured: false,
  },
  {
    _id: "4",
    title: "Temasek Poly — Fine Motor Skills Training",
    description:
      "Integrated hardware-software solution supporting fine motor skills training for autistic children. Smart gloves with flex sensors, mobile game, and analytics dashboard.",
    techStack: ["Hardware", "Mobile", "Analytics", "Flex Sensors"],
    startDate: "2020-04",
    endDate: "2021-04",
    featured: false,
  },
  {
    _id: "5",
    title: "LABarber Digital Transformation",
    description:
      "Research and root cause analysis to identify operational inefficiencies. Translated findings into digital solution proposals to improve branding and customer experience.",
    techStack: ["Figma", "Digital Transformation", "UX Research"],
    startDate: "2025-01",
    endDate: "2025-04",
    featured: false,
  },
  {
    _id: "6",
    title: "Sustain Wardrobe",
    description:
      "User-centered sustainability-focused mobile app. Applied UX methodologies to research and prototype, with high-fidelity UI/UX designs and defined user interaction flows.",
    techStack: ["Figma", "UX Design", "Prototyping"],
    startDate: "2024-08",
    endDate: "2024-12",
    featured: false,
  },
];

/* ── Sanity GROQ query ── */
const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, startDate desc) {
  _id, title, description, techStack, githubUrl, liveUrl,
  image, startDate, endDate, featured
}`;

const FILTER_OPTIONS = ["All", "Featured", "Web", "Hardware", "Design"];

export default function ProjectsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [projects,  setProjects]  = useState<Project[]>(STATIC_PROJECTS);
  const [filter,    setFilter]    = useState("All");
  const [loading,   setLoading]   = useState(false);

  /* ── Fetch from Sanity if available ── */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await sanityClient.fetch<Project[]>(PROJECTS_QUERY);
        if (data && data.length > 0) setProjects(data);
      } catch {
        // Sanity not configured yet — use static fallback silently
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  /* ── Scroll animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projects-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: ".projects-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(".project-card-wrap",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  /* ── Filter logic ── */
  const filtered = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Featured") return p.featured;
    if (filter === "Web")
      return p.techStack?.some((t) =>
        ["Vue", "Nuxt", "React", "Next", "Node", "Express", "JavaScript", "TypeScript", "PHP"].some(
          (kw) => t.toLowerCase().includes(kw.toLowerCase())
        )
      );
    if (filter === "Hardware")
      return p.techStack?.some((t) =>
        ["Hardware", "Sensor", "Circuit", "Microcontroller", "Soldering"].some((kw) =>
          t.toLowerCase().includes(kw.toLowerCase())
        )
      );
    if (filter === "Design")
      return p.techStack?.some((t) =>
        ["Figma", "UX", "Design", "Prototype"].some((kw) =>
          t.toLowerCase().includes(kw.toLowerCase())
        )
      );
    return true;
  });

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-accent), transparent)",
        }}
      />

      <div className="container-custom">

        {/* ── Heading ── */}
        <div className="mb-12">
          <span className="projects-heading text-label block opacity-0">
            03. Projects
          </span>
          <h2 className="projects-heading text-display font-display font-700 mt-3 opacity-0">
            Things I've Built
          </h2>
          <p className="projects-heading text-text-secondary mt-4 max-w-xl opacity-0">
            A selection of projects spanning full-stack web, microservices,
            hardware integration and digital transformation.
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className="px-4 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                border: "1px solid",
                borderColor:
                  filter === opt ? "var(--accent-primary)" : "var(--border-subtle)",
                color:
                  filter === opt ? "var(--accent-primary)" : "var(--text-muted)",
                background:
                  filter === opt ? "rgba(212,168,83,0.08)" : "transparent",
              }}
            >
              {opt}
            </button>
          ))}
          <span
            className="ml-auto font-mono text-xs self-center"
            style={{ color: "var(--text-muted)" }}
          >
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Projects grid ── */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <div key={project._id} className="project-card-wrap opacity-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            className="py-20 text-center font-mono text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No projects match this filter.
          </div>
        )}

        {/* ── CMS note ── */}
        <div
          className="mt-12 p-5 border flex items-start gap-4"
          style={{
            borderColor: "var(--border-subtle)",
            background: "var(--bg-card)",
          }}
        >
          <span
            className="font-mono text-xs shrink-0 px-2 py-0.5"
            style={{
              border: "1px solid var(--border-accent)",
              color: "var(--accent-primary)",
            }}
          >
            CMS
          </span>
          <p className="font-mono text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Projects are managed via Sanity CMS. To add a new project, open your
            Sanity Studio at{" "}
            <span style={{ color: "var(--accent-primary)" }}>localhost:3333</span>{" "}
            and create a new Project document. Changes appear here automatically.
          </p>
        </div>

      </div>
    </section>
  );
}