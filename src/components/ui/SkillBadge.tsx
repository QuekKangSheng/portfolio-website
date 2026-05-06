"use client";

import { cn } from "@/utils/cn";

interface SkillBadgeProps {
  name: string;
  proficiency?: number;
  className?: string;
}

export default function SkillBadge({ name, proficiency = 3, className }: SkillBadgeProps) {
  return (
    <div
      className={cn("group flex flex-col gap-4 p-6 border transition-all duration-300 cursor-default", className)}
      style={{
        borderColor: "var(--border-subtle)",
        background: "rgba(17,17,17,0.8)",
        backdropFilter: "blur(8px)",
        minHeight: "100px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-accent)";
        e.currentTarget.style.background = "rgba(212,168,83,0.05)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 0 16px rgba(212,168,83,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.style.background = "rgba(17,17,17,0.8)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Skill name */}
      <span
        className="text-sm font-medium leading-snug transition-colors duration-200 group-hover:text-accent-primary flex-1"
        style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-primary)" }}
      >
        {name}
      </span>

      {/* Proficiency bar */}
      <div className="flex gap-1" aria-label={`Proficiency: ${proficiency} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "3px",
              borderRadius: "1px",
              background: i < proficiency ? "var(--accent-primary)" : "var(--border-subtle)",
              opacity: i < proficiency ? 1 - i * 0.1 : 1,
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}