"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowDown } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "Software Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
];

const STATS = [
  { value: "8+",  label: "Projects Built" },
  { value: "4+",  label: "Years Coding" },
  { value: "SMU", label: "Undergraduate" },
  { value: "3+",  label: "Tech Stacks" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const metaRef    = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const roleRef    = useRef<HTMLSpanElement>(null);
  const roleIndex  = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(gridRef.current,
        { opacity: 0 }, { opacity: 1, duration: 2 }, 0);

      tl.fromTo(".hero-word",
        { y: 100, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.12 }, 0.2);

      tl.fromTo(metaRef.current,
        { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.9);

      tl.fromTo(".hero-role-line",
        { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.1);

      tl.fromTo(statsRef.current,
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.3);

      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.4);

      tl.fromTo(scrollRef.current,
        { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.9);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-content", {
        y: -60, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", end: "bottom top", scrub: true,
        },
      });
      gsap.to(imageRef.current, {
        y: -30, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", end: "bottom top", scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;
    const rotate = () => {
      gsap.to(el, {
        y: -18, opacity: 0, duration: 0.3, ease: "power2.in",
        onComplete: () => {
          roleIndex.current = (roleIndex.current + 1) % ROLES.length;
          el.textContent = ROLES[roleIndex.current];
          gsap.fromTo(el,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
        },
      });
    };
    const interval = setInterval(rotate, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div ref={gridRef} className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
            backgroundImage:
            "linear-gradient(rgba(212,168,83,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.07) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
        }}
    />

      {/* Gold glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 30% 65%, rgba(212,168,83,0.06) 0%, transparent 70%)" }}
      />

      {/* Bottom fade */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 55%, #080808 100%)" }}
      />

      <div
        className="container-custom relative z-10"
        style={{
          /* Generous top padding to clear navbar on ALL screen sizes */
          paddingTop: "clamp(6rem, 15vw, 10rem)",
          paddingBottom: "6rem",
        }}
      >
        {/* ── Stacked on mobile/tablet, side by side on lg+ ── */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-16">

          {/* ── Text — centered on mobile, left-aligned on desktop ── */}
          <div className="hero-content flex-1 min-w-0 w-full flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Meta row */}
            <div
              ref={metaRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 opacity-0"
              style={{ marginBottom: "3rem" }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={11} style={{ color: "var(--accent-primary)" }} />
                <span className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: "var(--text-muted)" }}>
                  Singapore
                </span>
              </div>
              <span style={{ color: "var(--border-default)" }}>·</span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: "#34d399" }}>
                  Open to opportunities
                </span>
              </div>
            </div>

            {/* Name */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(2.8rem, 7.5vw, 8rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                <span className="hero-word inline-block opacity-0"
                  style={{ color: "var(--text-primary)", marginRight: "0.25em" }}>
                  Quek
                </span>
                <span className="hero-word inline-block opacity-0"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px var(--accent-primary)",
                    marginRight: "0.25em",
                  }}>
                  Kang
                </span>
                <span className="hero-word inline-block opacity-0"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px var(--accent-primary)",
                  }}>
                  Sheng
                </span>
              </h1>
            </div>

            {/* Rotating role */}
            <div
              className="hero-role-line flex items-center justify-center lg:justify-start gap-4 opacity-0"
              style={{ marginBottom: "4rem" }}
            >
              <div className="w-10 h-px shrink-0"
                style={{ background: "var(--accent-primary)" }} />
              <span
                ref={roleRef}
                className="font-mono text-sm tracking-widest uppercase"
                style={{ color: "var(--accent-primary)" }}
              >
                {ROLES[0]}
              </span>
            </div>

            {/* Stats — centered on mobile */}
            <div
              ref={statsRef}
              className="opacity-0 grid grid-cols-4 w-full pt-8"
              style={{
                borderTop: "1px solid var(--border-subtle)",
                maxWidth: "580px",
              }}
            >
              {STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  style={{
                    borderRight: i < STATS.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    paddingRight: "1rem",
                    paddingLeft: i > 0 ? "1rem" : "0",
                    paddingTop: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                      color: "var(--accent-primary)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    className="font-mono leading-relaxed"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "clamp(0.55rem, 1.2vw, 0.65rem)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Profile image — visible on ALL screens ── */}
          <div
            ref={imageRef}
            className="opacity-0 shrink-0"
          >
            <div
              className="relative"
              style={{
                width: "clamp(200px, 38vw, 300px)",
                height: "clamp(250px, 47vw, 380px)",
                border: "2px solid var(--border-accent)",
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Quek Kang Sheng"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(212,168,83,0.18) 0%, transparent 50%)",
                  }}
                />
              </div>

              {/* Corner accents */}
              <div className="absolute" style={{
                bottom: "-8px", right: "-8px", width: "28px", height: "28px",
                borderRight: "2px solid var(--accent-primary)",
                borderBottom: "2px solid var(--accent-primary)",
              }} />
              <div className="absolute" style={{
                top: "-8px", left: "-8px", width: "28px", height: "28px",
                borderLeft: "2px solid var(--accent-primary)",
                borderTop: "2px solid var(--accent-primary)",
              }} />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span
          className="font-mono text-xs tracking-widest uppercase transition-colors duration-200 group-hover:text-accent-primary"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll
        </span>
        <ArrowDown
          size={18}
          style={{
            color: "var(--accent-primary)",
            animation: "bounceDown 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}