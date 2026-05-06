"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  {
    title: "Gold Award",
    competition: "ARTSIC 2020",
    fullName: "National Assistive & Rehabilitation Technology Student Innovation Challenge",
    scope: "National",
    scopeColor: "#34d399",
    year: "2020",
    description:
      "Competed against ITE, Polytechnic and University students across Singapore with our Flex Sensor Glove project — an integrated hardware-software solution supporting fine motor skills training for autistic children. Advanced through to the Semifinals and clinched Gold placement.",
    highlight: true,
    certificate: "/certificates/artsic-certificate.jpg",
  },
  {
    title: "Merit Award",
    competition: "gSIC / i-CREATe 2020",
    fullName: "Global Student Innovation Challenge",
    scope: "International",
    scopeColor: "#D4A853",
    year: "2020",
    description:
      "Represented Singapore in an international competition with our Flex Sensor Glove project, competing against teams from multiple countries. The project developed smart gloves with flex sensors to capture finger movement data, paired with a sensor-integrated mobile game and analytics dashboard to support rehabilitation for the elderly and disabled.",
    highlight: true,
    certificate: "/certificates/gsic-certificate.jpg",
  },
  {
    title: "Semifinalist",
    competition: "ImagineCup 2018",
    fullName: "Microsoft Imagine Cup",
    scope: "International",
    scopeColor: "#D4A853",
    year: "2018",
    description:
      "Advanced to the Semifinals of Microsoft's global student technology competition, one of the world's most prestigious student innovation challenges.",
    highlight: false,
    certificate: null,
  },
];

/* ── Falling gold particles canvas ── */
function GoldParticles() {
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

    interface Particle {
      x: number; y: number; r: number;
      speed: number; opacity: number;
      phase: number; color: string;
      wobble: number; wobbleSpeed: number;
    }

    const COLORS = [
      "rgba(240,192,96,",
      "rgba(212,168,83,",
      "rgba(255,220,80,",
      "rgba(255,200,50,",
      "rgba(180,130,40,",
    ];

    const count = Math.floor(canvas.width / 5);
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x:           Math.random() * canvas.width,
      y:           Math.random() * canvas.height,
      r:           Math.random() * 5 + 0.8,
      speed:       Math.random() * 0.8 + 0.3,
      opacity:     Math.random() * 0.9 + 0.2,
      phase:       Math.random() * Math.PI * 2,
      color:       COLORS[Math.floor(Math.random() * COLORS.length)],
      wobble:      Math.random() * 2 - 1,
      wobbleSpeed: (Math.random() - 0.5) * 0.03,
    }));

    let frame = 0;
    let rafId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach((p) => {
      /* Gentle leaf-like drift */
        const swayX = Math.sin(frame * 0.008 + p.phase) * 0.4;

        p.x += swayX;
        p.y += p.speed;

        if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        /* Main circle */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();

        /* Bright specular highlight */
        ctx.beginPath();
        ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.35, p.r * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,220,${p.opacity * 0.55})`;
        ctx.fill();

        /* Soft outer glow for larger particles */
        if (p.r > 3) {
          const grd = ctx.createRadialGradient(p.x, p.y, p.r, p.x, p.y, p.r * 2.5);
          grd.addColorStop(0, `${p.color}${p.opacity * 0.25})`);
          grd.addColorStop(1, `${p.color}0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65, zIndex: 0 }}
    />
  );
}

/* ── Lightbox component ── */
function Lightbox({
  src, alt, onClose,
}: { src: string; alt: string; onClose: () => void }) {
  /* Close on Escape key */
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
      style={{ background: "rgba(0,0,0,0.92)", zIndex: 9999, padding: "1.5rem" }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border transition-all duration-200"
        style={{ borderColor: "var(--border-accent)", color: "var(--accent-primary)" }}
        onClick={onClose}
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Image — prevent click from closing */}
      <div
        className="relative w-full max-w-4xl"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "90vh",
            objectFit: "contain",
            border: "1px solid var(--border-accent)",
          }}
        />
        <p className="font-mono text-xs text-center mt-3" style={{ color: "var(--text-muted)" }}>
          {alt} — Click outside or press Esc to close
        </p>
      </div>
    </div>
  );
}

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".awards-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: ".awards-heading", start: "top 85%" },
        }
      );
      gsap.fromTo(".award-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.15,
          scrollTrigger: { trigger: ".awards-grid", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Lightbox portal */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}

      <section
        ref={sectionRef}
        id="awards"
        className="section-padding relative overflow-hidden"
      >
        {/* Falling gold particles */}
        <GoldParticles />

        {/* Top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)",
            zIndex: 1,
          }}
        />

        {/* Bottom glow pool */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "220px",
            background: "linear-gradient(to top, rgba(212,168,83,0.1) 0%, transparent 100%)",
            zIndex: 0,
          }}
        />

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>

          {/* Heading */}
          <div style={{ marginBottom: "5rem" }}>
            <span className="awards-heading text-label block opacity-0">
              06. Awards & Achievements
            </span>
            <h2
              className="awards-heading font-display font-700 opacity-0"
              style={{
                marginTop: "1.25rem",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Recognition
            </h2>
            <p
              className="awards-heading opacity-0 max-w-xl"
              style={{
                color: "var(--text-secondary)",
                marginTop: "1.5rem",
                lineHeight: 1.8,
                fontSize: "1rem",
              }}
            >
              Competitions and challenges where I represented my institution and pushed
              boundaries in assistive technology and software innovation.
            </p>
          </div>

          {/* Awards grid */}
          <div className="awards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AWARDS.map((award) => (
              <div
                key={award.competition}
                className="award-card opacity-0 flex flex-col border transition-all duration-300"
                style={{
                  borderColor: award.highlight ? "var(--border-accent)" : "var(--border-subtle)",
                  background: "rgba(11,11,11,0.88)",
                  backdropFilter: "blur(14px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = award.highlight
                    ? "var(--border-accent)"
                    : "var(--border-subtle)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Certificate image with click-to-expand */}
                {award.certificate && (
                  <div
                    className="relative w-full overflow-hidden group/img cursor-pointer"
                    style={{ height: "200px", borderBottom: "1px solid var(--border-subtle)" }}
                    onClick={() =>
                      setLightbox({ src: award.certificate!, alt: `${award.competition} Certificate` })
                    }
                  >
                    <Image
                      src={award.certificate}
                      alt={`${award.competition} Certificate`}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to bottom, transparent 50%, rgba(11,11,11,0.9) 100%)",
                      }}
                    />

                    {/* Hover overlay with zoom hint */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200"
                      style={{ background: "rgba(0,0,0,0.45)" }}
                    >
                      <div
                        className="flex items-center gap-2 px-4 py-2 border font-mono text-xs tracking-widest uppercase"
                        style={{
                          borderColor: "var(--accent-primary)",
                          color: "var(--accent-primary)",
                          background: "rgba(0,0,0,0.7)",
                        }}
                      >
                        <ZoomIn size={14} />
                        View Certificate
                      </div>
                    </div>
                  </div>
                )}

                {/* Card content */}
                <div style={{ padding: "2rem", flex: 1, display: "flex", flexDirection: "column" }}>

                  {/* Scope + year */}
                  <div className="flex items-center justify-between" style={{ marginBottom: "1.5rem" }}>
                    <span
                      className="font-mono text-xs tracking-widest uppercase px-3 py-1 border"
                      style={{ color: award.scopeColor, borderColor: award.scopeColor, opacity: 0.9 }}
                    >
                      {award.scope}
                    </span>
                    <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>
                      {award.year}
                    </span>
                  </div>

                  {/* Placement */}
                  <div
                    style={{
                      fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                      color: "var(--accent-primary)",
                      lineHeight: 1,
                      marginBottom: "0.75rem",
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 800,
                    }}
                  >
                    {award.title}
                  </div>

                  {/* Competition */}
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.4rem",
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {award.competition}
                  </div>

                  {/* Full name */}
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                      letterSpacing: "0.03em",
                      lineHeight: 1.5,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {award.fullName}
                  </div>

                  <div style={{ height: "1px", background: "var(--border-subtle)", marginBottom: "1.5rem" }} />

                  {/* Description */}
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.8", flex: 1 }}>
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}