"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Awards",     href: "#awards" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setMobileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg-primary/95 backdrop-blur-md border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between" style={{ height: "72px" }}>

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span
              className="w-8 h-8 flex items-center justify-center border font-mono text-xs transition-all duration-300"
              style={{ borderColor: "var(--border-accent)", color: "var(--accent-primary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-primary)";
                e.currentTarget.style.color = "var(--bg-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--accent-primary)";
              }}
            >
              KS
            </span>
            <span className="hidden sm:block font-display font-600 text-sm tracking-widest uppercase"
              style={{ color: "var(--text-primary)" }}>
              Quek Kang Sheng
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive  = activeSection === sectionId;
              return (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className="relative py-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200"
                    style={{ color: isActive ? "var(--accent-primary)" : "var(--text-secondary)" }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    {label}
                    <span
                      className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
                      style={{
                        background: "var(--accent-primary)",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  </button>
                </li>
              );
            })}
            <li className="ml-4">
              <a
                href="/Quek_Kang_Sheng_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs py-2 px-5"
              >
                Résumé
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 transition-colors duration-200"
            style={{ color: "var(--text-secondary)" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[72px] backdrop-blur-lg transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "rgba(8,8,8,0.98)" }}
      >
        <div className="container-custom flex flex-col" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
          {NAV_LINKS.map(({ label, href }, i) => {
            const sectionId = href.replace("#", "");
            const isActive  = activeSection === sectionId;
            return (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                style={{
                  transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                  color: isActive ? "var(--accent-primary)" : "var(--text-primary)",
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingTop: "1.5rem",
                  paddingBottom: "1.5rem",
                }}
                className={cn(
                  "text-left font-display text-2xl font-700 transition-all duration-300 flex items-center gap-5",
                  mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
              >
                <span className="font-mono text-xs w-6 shrink-0" style={{ color: "var(--text-muted)" }}>
                  0{i + 1}.
                </span>
                {label}
              </button>
            );
          })}
          <a
            href="/Quek_Kang_Sheng_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary self-start"
            style={{ marginTop: "3rem" }}
            onClick={() => setMobileOpen(false)}
          >
            Download Résumé
          </a>
        </div>
      </div>
    </nav>
  );
}