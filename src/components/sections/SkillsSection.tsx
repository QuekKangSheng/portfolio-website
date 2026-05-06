"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillBadge from "@/components/ui/SkillBadge";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    id: "language",
    label: "Languages",
    number: "01",
    icon: "{ }",
    skills: [
      { name: "Python", proficiency: 5 },
      { name: "Java", proficiency: 4 },
      { name: "JavaScript", proficiency: 4 },
      { name: "TypeScript", proficiency: 4 },
      { name: "C++", proficiency: 3 },
      { name: "PHP", proficiency: 3 },
    ],
  },
  {
    id: "ui",
    label: "UI & Styling",
    number: "02",
    icon: "</>",
    skills: [
      { name: "HTML / CSS", proficiency: 5 },
      { name: "Tailwind CSS",proficiency: 4 },
      { name: "Bootstrap", proficiency: 4 },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & Runtime",
    number: "03",
    icon: "⬡",
    skills: [
      { name: "Agile / Scrum", proficiency: 5 },
      { name: "Vue / Nuxt", proficiency: 4 },
      { name: "Next.js", proficiency: 4 },
      { name: "Node.js", proficiency: 4 },
      { name: "Express.js", proficiency: 4 },
    ],
  },
  {
    id: "apis",
    label: "APIs & Integrations",
    number: "04",
    icon: "⚙",
    skills: [
      { name: "RESTful-based Microservices", proficiency: 5 },
      { name: "Brevo SMTP", proficiency: 5 },
      { name: "RabbitMQ", proficiency: 5 },
      { name: "Twilio", proficiency: 5 },
      { name: "Stripe", proficiency: 4 },
    ],
  },
  {
    id: "database",
    label: "Databases",
    number: "05",
    icon: "⛁",
    skills: [
      { name: "MySQL", proficiency: 5 },
      { name: "PostgreSQL", proficiency: 5 },
    ],
  },
  {
    id: "data",
    label: "Data & Analytics",
    number: "06",
    icon: "▦",
    skills: [
      { name: "Jupyter Notebook", proficiency: 4 },
      { name: "Pandas", proficiency: 4 },
      { name: "Matplotlib", proficiency: 4 },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Version Control",
    number: "07",
    icon: "▲",
    skills: [
      { name: "Git / GitHub", proficiency: 5 },
      { name: "Docker", proficiency: 5 },
      { name: "Vercel", proficiency: 4 },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    number: "08",
    icon: "⬢",
    skills: [
      { name: "Circuit Patching", proficiency: 4 },
      { name: "Soldering", proficiency: 4 },
      { name: "Microcontroller Programming", proficiency: 4 },
    ],
  },
  {
    id: "tools",
    label: "Tools & Methods",
    number: "09",
    icon: "◈",
    skills: [
      { name: "Supabase", proficiency: 5 },
      { name: "Microsoft Powerpoint", proficiency: 5 },
      { name: "Microsoft Excel", proficiency: 5 },
      { name: "Figma", proficiency: 4 },
      { name: "Low/Mid/High-Fi Prototyping", proficiency: 4 },
      { name: "Signavio/Draw.io", proficiency: 3 },
    ],
  },
];

/* ── Matrix rain canvas ── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01アイウエオカキクケコサシスセソ∑∆∏∂∇∈∉⊂⊃∪∩";
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(8, 8, 8, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'DM Mono', monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        ctx.fillStyle = "rgba(240, 192, 96, 0.9)";
        ctx.fillText(char, x, y * fontSize);
        ctx.fillStyle = "rgba(160, 120, 48, 0.3)";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y - 1) * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 60);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.18 }}
    />
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("language");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skills-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: ".skills-heading", start: "top 85%" },
        }
      );
      gsap.fromTo(".cat-tab",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.07,
          scrollTrigger: { trigger: ".cat-tabs", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".skill-card",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeCategory]);

  const active = SKILL_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)",
          zIndex: 1,
        }}
      />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="skills-heading text-label block opacity-0">02. Skills</span>
          <h2
            className="skills-heading font-display font-700 opacity-0"
            style={{
              marginTop: "1.25rem",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Technical Arsenal
          </h2>
          <p
            className="skills-heading opacity-0 max-w-xl"
            style={{ color: "var(--text-secondary)", marginTop: "1.5rem", lineHeight: 1.8 }}
          >
            Technologies and tools I've worked with across projects, internships and coursework.
          </p>
        </div>

        {/* ── Category tabs — 3×3 grid ── */}
        <div
          className="cat-tabs grid gap-3"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            marginBottom: "4rem",
          }}
        >
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="cat-tab opacity-0 flex flex-col items-center gap-2 border transition-all duration-200"
                style={{
                  borderColor: isActive ? "var(--accent-primary)" : "var(--border-subtle)",
                  background: isActive ? "rgba(212,168,83,0.1)" : "rgba(17,17,17,0.7)",
                  backdropFilter: "blur(8px)",
                  transform: isActive ? "translateY(-2px)" : "translateY(0)",
                  boxShadow: isActive ? "var(--shadow-accent)" : "none",
                  padding: "1.5rem 1rem",
                }}
              >
                <span
                  className="font-mono text-xl"
                  style={{ color: isActive ? "var(--accent-primary)" : "var(--text-muted)" }}
                >
                  {cat.icon}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    color: isActive ? "var(--accent-dim)" : "var(--text-muted)",
                  }}
                >
                  {cat.number}
                </span>
                <span
                  className="font-mono text-center leading-tight"
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  }}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active category header */}
        <div className="flex items-center gap-4" style={{ marginBottom: "2.5rem" }}>
          <span
            className="font-mono text-2xl"
            style={{ color: "var(--accent-primary)" }}
          >
            {active.icon}
          </span>
          <h3
            className="font-display font-600"
            style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}
          >
            {active.label}
          </h3>
          <span
            className="font-mono text-xs px-3 py-1"
            style={{ border: "1px solid var(--border-accent)", color: "var(--accent-primary)" }}
          >
            {active.skills.length} skills
          </span>
        </div>

        {/* Skill cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {active.skills.map((skill) => (
            <div key={skill.name} className="skill-card opacity-0">
              <SkillBadge name={skill.name} proficiency={skill.proficiency} />
            </div>
          ))}
        </div>

        {/* Proficiency legend with backdrop */}
        <div
          style={{
            marginTop: "5rem",
            padding: "2rem 2.5rem",
            border: "1px solid var(--border-subtle)",
            background: "rgba(17,17,17,0.85)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            className="font-mono text-xs tracking-widest uppercase block"
            style={{ color: "var(--accent-primary)", marginBottom: "1.5rem" }}
          >
            Proficiency Scale
          </span>
          <div className="flex flex-wrap gap-6">
            {[
              { bars: 1, label: "Familiar"   },
              { bars: 2, label: "Learning"   },
              { bars: 3, label: "Competent"  },
              { bars: 4, label: "Proficient" },
              { bars: 5, label: "Expert"     },
            ].map(({ bars, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "1.25rem",
                        height: "3px",
                        borderRadius: "1px",
                        background: i < bars
                          ? "var(--accent-primary)"
                          : "var(--border-subtle)",
                      }}
                    />
                  ))}
                </div>
                <span
                  className="font-mono"
                  style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}