import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import AwardsSection from "@/components/sections/AwardsSection";
import ContactSection from "@/components/sections/ContactSection";

/* ── Topographic contour lines background ── */
function TopoBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <svg
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full"
        style={{ opacity: 0.1 }}
      >
        <path d="M-100,600 C150,520 300,650 500,580 C700,510 850,640 1050,560 C1250,480 1350,580 1500,520"
          fill="none" stroke="#D4A853" strokeWidth="1.2" />
        <path d="M-100,540 C180,460 320,590 520,510 C720,430 880,570 1080,490 C1280,410 1380,510 1500,450"
          fill="none" stroke="#D4A853" strokeWidth="1" />
        <path d="M-100,480 C200,400 360,530 560,450 C760,370 920,500 1100,430 C1300,360 1400,450 1500,400"
          fill="none" stroke="#D4A853" strokeWidth="0.8" />
        <path d="M-100,420 C220,340 400,470 600,400 C800,330 960,450 1140,380 C1320,310 1420,400 1500,360"
          fill="none" stroke="#D4A853" strokeWidth="0.7" />
        <path d="M-100,360 C250,285 430,410 630,345 C830,280 1000,395 1170,330 C1340,265 1430,350 1500,310"
          fill="none" stroke="#D4A853" strokeWidth="0.6" />
        <path d="M-100,660 C120,590 280,710 480,640 C680,570 820,700 1020,625 C1220,550 1340,645 1500,590"
          fill="none" stroke="#D4A853" strokeWidth="1.3" />
        <path d="M-100,720 C100,660 260,770 460,700 C660,630 800,755 1000,685 C1200,615 1330,710 1500,660"
          fill="none" stroke="#D4A853" strokeWidth="1.5" />
        <path d="M-100,780 C80,730 240,820 440,760 C640,700 780,810 980,745 C1180,680 1320,770 1500,730"
          fill="none" stroke="#D4A853" strokeWidth="1.8" />
        <path d="M-100,300 C270,230 460,350 660,290 C860,230 1040,340 1200,280 C1360,220 1440,300 1500,260"
          fill="none" stroke="#D4A853" strokeWidth="0.5" />
        <path d="M-100,240 C290,175 490,295 690,240 C890,185 1080,290 1240,235 C1380,180 1450,255 1500,215"
          fill="none" stroke="#D4A853" strokeWidth="0.4" />
        <path d="M-100,180 C310,120 520,240 720,185 C920,130 1120,240 1270,185 C1400,140 1460,210 1500,170"
          fill="none" stroke="#D4A853" strokeWidth="0.35" />
        {[
          [200, 595], [500, 565], [800, 540], [1100, 510], [1300, 535],
          [150, 475], [450, 445], [750, 420], [1050, 395], [1250, 415],
          [300, 355], [600, 330], [900, 305], [1150, 290],
        ].map(([x, y], i) => (
          <line key={i} x1={x} y1={y - 5} x2={x} y2={y + 5}
            stroke="#F0C060" strokeWidth="0.8" />
        ))}
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />

      {/* ── Shared wrapper: Experience (left) + Education (right) ── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--bg-secondary)" }}
      >
        <TopoBackground />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)",
            zIndex: 1,
          }}
        />
        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <ExperienceSection />
            <EducationSection />
          </div>
        </div>
      </section>

      {/* ── Awards & Achievements ── */}
      <AwardsSection />

      {/* ── Contact ── */}
      <ContactSection />
    </>
  );
}