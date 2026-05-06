"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOFT_SKILLS = [
  { label: "Team Collabortion",              icon: "🤝" },
  { label: "Cross-functional Collaboration", icon: "🌐🤝" },
  { label: "Leadership",                     icon: "💪🏻" },
  { label: "Communication & Management",     icon: "🧑‍🤝‍🧑💬" },
  { label: "Analytical Thinking",            icon: "📊🧠" },
  { label: "Adaptability",                   icon: "🔄" },
  { label: "Attention to Detail",            icon: "🔍" },
  { label: "Self-Directed Learning",         icon: "📚" },
];

const HOBBIES = [
  {
    icon: "✈️",
    title: "Travelling",
    description:
      "I enjoy travelling to new places and exploring their culture. It pushes me beyond my own perspective and constantly reminds me how limited my understanding can be, and how much more there is to learn from the world.",
  },
  {
    icon: "🛠️",
    title: "Building Tech",
    description:
      "From hardware tinkering to personal side projects, when I have the time, I would always try to build and experiment on something outside of coursework. It's how I learn best and turn ideas into something tangible.",
  },
  {
    icon: "🏺",
    title: "Collecting Vintage Items",
    description:
      "I have a soft spot for vintage items. I'm drawn to the stories behind them, and I enjoy the process of searching and discovering as much as the moment of finding something meaningful.",
  },
  {
    icon: "❤️",
    title: "Volunteering",
    description:
      "When I'm free, I involve myself in volunteering and outreach initiatives, spending time with different communities to better understand people's experiences, challenges, and perspectives.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: ".about-heading", start: "top 85%" },
        }
      );
      gsap.fromTo(".about-para",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: ".about-bio", start: "top 80%" },
        }
      );
      gsap.fromTo(".hobby-card",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: ".hobbies-grid", start: "top 82%" },
        }
      );
      gsap.fromTo(".skill-badge",
        { scale: 0.85, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, stagger: 0.05,
          scrollTrigger: { trigger: ".skills-badges", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">

      {/* ── Gold wave ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-full h-full"
        >
          <defs>
            {/* Body fill — transparent at top, gold at bottom */}
            <linearGradient id="waveBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#D4A853" stopOpacity="0" />
              <stop offset="40%"  stopColor="#D4A853" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#A07830" stopOpacity="0.15" />
            </linearGradient>

            {/* Edge line gradient — bright gold across the wave rim */}
            <linearGradient id="waveEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#D4A853" stopOpacity="0" />
              <stop offset="25%"  stopColor="#F0C060" stopOpacity="0.2" />
              <stop offset="60%"  stopColor="#D4A853" stopOpacity="1" />
              <stop offset="100%" stopColor="#A07830" stopOpacity="0" />
            </linearGradient>

            {/* Glow filter for the edge line */}
            <filter id="edgeGlow" x="-20%" y="-100%" width="140%" height="400%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Filled wave body */}
          <path
            fill="url(#waveBodyGrad)"
            d="M0,200 C240,100 480,320 720,200 C960,80 1200,320 1440,200 L1440,900 L0,900 Z"
          >
            <animate
              attributeName="d"
              values="
                M0,200 C240,100 480,320 720,200 C960,80 1200,320 1440,200 L1440,900 L0,900 Z;
                M0,200 C240,320 480,100 720,200 C960,320 1200,80 1440,200 L1440,900 L0,900 Z;
                M0,200 C240,100 480,320 720,200 C960,80 1200,320 1440,200 L1440,900 L0,900 Z
              "
              dur="10s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </path>

          {/* Glowing edge line along the wave rim */}
          <path
            fill="none"
            stroke="url(#waveEdgeGrad)"
            strokeWidth="2.5"
            filter="url(#edgeGlow)"
            d="M0,200 C240,100 480,320 720,200 C960,80 1200,320 1440,200"
          >
            <animate
              attributeName="d"
              values="
                M0,200 C240,100 480,320 720,200 C960,80 1200,320 1440,200;
                M0,200 C240,320 480,100 720,200 C960,320 1200,80 1440,200;
                M0,200 C240,100 480,320 720,200 C960,80 1200,320 1440,200
              "
              dur="10s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </path>

          {/* Inner shimmer line — */}
          <path
            fill="none"
            stroke="#F0C060"
            strokeWidth="1"
            opacity="0.35"
            d="M0,215 C240,115 480,335 720,215 C960,95 1200,335 1440,215"
          >
            <animate
              attributeName="d"
              values="
                M0,215 C240,115 480,335 720,215 C960,95 1200,335 1440,215;
                M0,215 C240,335 480,115 720,215 C960,335 1200,95 1440,215;
                M0,215 C240,115 480,335 720,215 C960,95 1200,335 1440,215
              "
              dur="10s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </path>
        </svg>
      </div>

      {/* Top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)", zIndex: 1 }}
      />

      {/* All content sits above the wave */}
      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="about-heading text-label block opacity-0">01. About</span>
          <h2
            className="about-heading font-display font-700 opacity-0"
            style={{ marginTop: "1.25rem", fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Who I Am
          </h2>
        </div>

        {/* Bio */}
        <div className="about-bio max-w-3xl" style={{ marginBottom: "5rem" }}>
          <p className="about-para text-lg opacity-0"
            style={{ color: "var(--text-secondary)", lineHeight: "2.1", marginBottom: "2rem" }}>
            I'm{" "}
            <span style={{ color: "var(--text-primary)" }}>Kang Sheng</span>, an Information
            Systems student at{" "}
            <span style={{ color: "var(--accent-primary)" }}>Singapore Management University</span>,
            specialising in Smart-City Management Technology and FinTech. I build full-stack systems,
            designing and developing everything from backend to frontend applications,
            with a focus on solving real, messy problems.
          </p>

          <p className="about-para opacity-0"
            style={{ color: "var(--text-secondary)", lineHeight: "2.1", marginBottom: "2rem" }}>
            What drives me isn't just writing code, but{" "}
            <span style={{ color: "var(--text-primary)" }}>designing how systems work together</span>.
            I'm particularly interested in distributed systems and solutions that bridge software with
            real-world operations — where{" "}
            <span style={{ color: "var(--text-primary)" }}>reliability, coordination and scalability</span>{" "}
            actually matter.
          </p>

          <p className="about-para opacity-0"
            style={{ color: "var(--text-secondary)", lineHeight: "2.1", marginBottom: "2rem" }}>
            My foundation comes from Temasek Polytechnic, where I worked extensively with embedded
            systems, circuit design, and hardware-software integration. That experience continues to{" "}
            <span style={{ color: "var(--text-primary)" }}>shape how I think</span> today: I approach
            problems as{" "}
            <span style={{ color: "var(--text-primary)" }}>
              interconnected systems rather than isolated components, paying close attention to edge
              cases, failure modes and real-world constraints.
            </span>
          </p>

          <p className="about-para opacity-0"
            style={{ color: "var(--text-secondary)", lineHeight: "2.1" }}>
            Beyond the screen, I also actively spend time on the ground speaking with people,
            volunteering to understand their{" "}
            <span style={{ color: "var(--text-primary)" }}>challenges and pain points</span>. Spending
            meaningful time with people in the community has grounded my perspective — reminding me
            that technology isn't the end goal. People are. The systems we build should ultimately be{" "}
            <span style={{ color: "var(--text-primary)" }}>useful, accessible and human-centered</span>.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: "var(--border-subtle)", marginBottom: "5rem" }} />

        {/* Hobbies */}
        <div style={{ marginBottom: "5rem" }}>
          <span className="text-label block" style={{ marginBottom: "3rem" }}>
            Outside of Code
          </span>
          <div className="hobbies-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOBBIES.map((hobby) => (
              <div
                key={hobby.title}
                className="hobby-card opacity-0 border flex flex-col gap-6 transition-all duration-300"
                style={{
                  borderColor: "var(--border-subtle)",
                  background: "rgba(17,17,17,0.85)",
                  backdropFilter: "blur(12px)",
                  padding: "2rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span style={{ fontSize: "2rem" }}>{hobby.icon}</span>
                <div>
                  <h4
                    className="font-display font-600 text-base"
                    style={{ color: "var(--text-primary)", marginBottom: "1rem" }}
                  >
                    {hobby.title}
                  </h4>
                  <p className="text-sm" style={{ color: "var(--text-secondary)", lineHeight: "1.9" }}>
                    {hobby.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: "var(--border-subtle)", marginBottom: "5rem" }} />

        {/* Soft Skills */}
        <div>
          <span className="text-label block" style={{ marginBottom: "3rem" }}>
            Soft Skills
          </span>
          <div className="skills-badges flex flex-wrap gap-4">
            {SOFT_SKILLS.map((skill) => (
              <div
                key={skill.label}
                className="skill-badge opacity-0 flex items-center gap-3 border transition-all duration-200"
                style={{
                  borderColor: "var(--border-subtle)",
                  background: "rgba(17,17,17,0.85)",
                  backdropFilter: "blur(12px)",
                  padding: "0.875rem 1.5rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.background = "rgba(212,168,83,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.background = "rgba(17,17,17,0.85)";
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{skill.icon}</span>
                <span className="font-mono text-xs tracking-wide" style={{ color: "var(--text-secondary)" }}>
                  {skill.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}