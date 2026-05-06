"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineItem from "@/components/ui/TimelineItem";

gsap.registerPlugin(ScrollTrigger);

/* ── Most recent first ── */
const EXPERIENCES = [
  {
    title: "Service Crew",
    organisation: "Ma Maison Restaurant",
    period: "May 2025 — Aug 2025",
    current: false,
    description: [
      "Delivered efficient customer service in a fast-paced environment while handling concurrent tasks",
      "Coordinated with team members to ensure smooth operations during peak hours",
    ],
  },
  {
    title: "Intern Software Engineer",
    organisation: "Ministry of Manpower",
    period: "Sep 2020 — Feb 2021",
    current: false,
    description: [
      "Collaborated with stakeholders to gather requirements and propose IT solutions aligned with business needs",
      "Supported the design and development of internal systems, applications and digital workflows",
      "Participated in Agile/Scrum based development cycles",
      "Prepared technical documentation and system handover materials to enable maintainability and future scaling",
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: ".exp-heading", start: "top 85%" },
        }
      );
      gsap.fromTo(".exp-item",
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.2,
          scrollTrigger: { trigger: ".exp-timeline", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="experience">
      {/* Heading */}
      <div style={{ marginBottom: "2rem" }}>
        <span className="exp-heading text-label block opacity-0">04. Experience</span>
        <h2
          className="exp-heading font-display font-700 opacity-0"
          style={{
            marginTop: "1.25rem",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Work History
        </h2>
      </div>

      {/* Timeline */}
      <div className="exp-timeline">
        {EXPERIENCES.map((exp, i) => (
          <div key={exp.title} className="exp-item opacity-0">
            <TimelineItem
              title={exp.title}
              organisation={exp.organisation}
              period={exp.period}
              current={exp.current}
              description={exp.description}
              isLast={i === EXPERIENCES.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}