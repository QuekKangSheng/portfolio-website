"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineItem from "@/components/ui/TimelineItem";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  {
    title: "BSc Information Systems (SMT/FinTech)",
    organisation: "Singapore Management University",
    period: "Aug 2023 — Present",
    current: true,
    description: [
      "School of Computing & Information Systems",
      "Dual-track specialisation in Smart-City Management Technology & FinTech",
      "Integrates full-stack development and systems design, with a strong emphasis on analysing real-world contexts, understanding stakeholder needs, and building scalable solutions that align with how systems operate in practice",
    ],
  },
  {
    title: "Diploma in Computer Engineering (Merit)",
    organisation: "Temasek Polytechnic",
    period: "Apr 2018 — Apr 2021",
    current: false,
    description: [
      "School of Engineering — CGPA 3.87 / 4.0",
      "Specialised in hardware-software integration and embedded systems",
    ],
  },
  {
    title: "GCE O-Level",
    organisation: "East View Secondary School",
    period: "Jan 2013 — Nov 2017",
    current: false,
    description: [],
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".edu-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: ".edu-heading", start: "top 85%" },
        }
      );
      gsap.fromTo(".edu-item",
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.2,
          scrollTrigger: { trigger: ".edu-timeline", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="education">
      {/* Heading */}
      <div style={{ marginBottom: "2rem" }}>
        <span className="edu-heading text-label block opacity-0">05. Education</span>
            <h2
                className="edu-heading font-display font-700 opacity-0"
                style={{
                marginTop: "1.25rem",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                }}
            >
                Academic Background
            </h2>
        </div>

      {/* Timeline */}
      <div className="edu-timeline">
        {EDUCATION.map((edu, i) => (
          <div key={edu.title} className="edu-item opacity-0">
            <TimelineItem
              title={edu.title}
              organisation={edu.organisation}
              period={edu.period}
              current={edu.current}
              description={edu.description}
              isLast={i === EDUCATION.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}