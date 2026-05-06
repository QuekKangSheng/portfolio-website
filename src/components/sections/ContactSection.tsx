"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactForm } from "@/hooks/useContactForm";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { formData, state, handleChange, handleSubmit, reset } = useContactForm();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: ".contact-heading", start: "top 85%" },
        }
      );
      gsap.fromTo(".contact-form",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const inputStyle = {
    background: "rgba(22,22,22,0.9)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 200ms",
    width: "100%",
    padding: "1rem 1.25rem",
    lineHeight: "1.6",
    backdropFilter: "blur(8px)",
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      {/* Background diagonal lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-full h-full"
          style={{ opacity: 0.04 }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <line
              key={i}
              x1={i * 55 - 200} y1="0"
              x2={i * 55 + 200} y2="600"
              stroke="#D4A853" strokeWidth="1"
            />
          ))}
        </svg>

        {/* Gold radial glow */}
        <div
          className="absolute"
          style={{
            top: "20%",
            left: "-10%",
            width: "60%",
            height: "70%",
            background: "radial-gradient(ellipse, rgba(212,168,83,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

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
        <div style={{ marginBottom: "5rem" }}>
          <span className="contact-heading text-label block opacity-0">
            07. Contact
          </span>
          <h2
            className="contact-heading font-display font-700 opacity-0"
            style={{
              marginTop: "1.25rem",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Get In Touch
          </h2>
          <p
            className="contact-heading opacity-0 max-w-lg"
            style={{
              color: "var(--text-secondary)",
              marginTop: "1.5rem",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            Whether you have an opportunity, a project idea, or just want to
            connect — my inbox is always open.
          </p>
        </div>

        {/* Form */}
        <div className="contact-form opacity-0 max-w-2xl">
          {state.status === "success" ? (

            /* ── Success state ── */
            <div
              className="flex flex-col items-center justify-center text-center"
              style={{
                padding: "5rem 4rem",
                gap: "2.5rem",
                border: "1px solid var(--border-accent)",
                background: "rgba(212,168,83,0.04)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Checkmark */}
              <div
                className="w-20 h-20 flex items-center justify-center border-2"
                style={{ borderColor: "var(--accent-primary)" }}
              >
                <span style={{ fontSize: "2rem" }}>✓</span>
              </div>

              {/* Text */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h3
                  className="font-display font-700"
                  style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}
                >
                  Message Sent!
                </h3>
                <p
                  className="font-mono"
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.9",
                    maxWidth: "360px",
                  }}
                >
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>

              {/* Button */}
              <button
                onClick={reset}
                className="btn-ghost"
                style={{ fontSize: "0.75rem", padding: "0.75rem 2rem" }}
              >
                Send Another
              </button>
            </div>

          ) : (

            /* ── Contact form ── */
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              <div>
                <label className="text-label block" style={{ marginBottom: "0.75rem" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                />
              </div>

              <div>
                <label className="text-label block" style={{ marginBottom: "0.75rem" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                />
              </div>

              <div>
                <label className="text-label block" style={{ marginBottom: "0.75rem" }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your opportunity or project..."
                  rows={7}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                />
              </div>

              {state.status === "error" && (
                <p className="font-mono text-sm" style={{ color: "#ef4444" }}>
                  ✕ {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={state.status === "loading"}
                className="btn-primary"
                style={{
                  opacity: state.status === "loading" ? 0.7 : 1,
                  cursor: state.status === "loading" ? "not-allowed" : "pointer",
                  alignSelf: "flex-start",
                  paddingLeft: "3rem",
                  paddingRight: "3rem",
                }}
              >
                {state.status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-bg-primary border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Message →"
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}