"use client";

interface TimelineItemProps {
  title: string;
  organisation: string;
  period: string;
  description?: string[];
  current?: boolean;
  isLast?: boolean;
}

export default function TimelineItem({
  title,
  organisation,
  period,
  description = [],
  current = false,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-8 group">

      {/* ── Timeline spine ── */}
      <div className="flex flex-col items-center" style={{ paddingTop: "6px" }}>
        {/* Dot */}
        <div
          className="relative z-10 shrink-0 transition-all duration-300 group-hover:scale-125"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: current ? "var(--accent-primary)" : "var(--bg-elevated)",
            border: "2px solid",
            borderColor: current ? "var(--accent-primary)" : "var(--border-default)",
            boxShadow: current ? "0 0 14px rgba(212,168,83,0.5)" : "none",
          }}
        />
        {/* Vertical line */}
        {!isLast && (
          <div
            style={{
              width: "1px",
              flex: 1,
              marginTop: "10px",
              background: "linear-gradient(to bottom, var(--border-accent), var(--border-subtle))",
            }}
          />
        )}
      </div>

      {/* ── Content ── */}
      <div style={{ paddingBottom: isLast ? "0" : "3.5rem", flex: 1 }}>

        {/* Period + Current badge */}
        <div
          className="flex items-center gap-3 flex-wrap"
          style={{ marginBottom: "0.75rem" }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: current ? "var(--accent-primary)" : "var(--text-muted)",
            }}
          >
            {period}
          </span>
          {current && (
            <span
              className="font-mono"
              style={{
                padding: "0.15rem 0.6rem",
                border: "1px solid var(--border-accent)",
                color: "var(--accent-primary)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Current
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-display transition-colors duration-200 group-hover:text-accent-primary"
          style={{
            fontWeight: 600,
            fontSize: "1.25rem",
            lineHeight: 1.35,
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {title}
        </h3>

        {/* Organisation */}
        <p
          className="font-mono"
          style={{
            fontSize: "0.9rem",
            color: "var(--accent-primary)",
            letterSpacing: "0.04em",
            marginBottom: "1.5rem",
          }}
        >
          {organisation}
        </p>

        {/* Description bullets */}
        {description.length > 0 && (
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {description.map((point, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "0.875rem",
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  lineHeight: "1.8",
                }}
              >
                <span
                    style={{
                        color: "var(--accent-primary)",
                        marginTop: "0.35rem",
                        fontSize: "0.9rem",
                        flexShrink: 0,
                    }}
                    >
                    ▸
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}