"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Developer Intern",
    company: "Crensa Studio Pvt. Ltd.",
    date: "Nov 2025 - Jan 2026",
    points: [
      "Implemented PWA features including service workers and caching strategies to enhance offline capability and performance.",
      "Developed responsive frontend UI components using modern web technologies.",
      "Integrated backend APIs to support platform functionality."
    ]
  },
  {
    role: "Creative Production Intern",
    company: "Crensa Studio Pvt. Ltd.",
    date: "Nov 2025 - Jan 2026",
    points: [
      "Captured cinematic visuals and managed on-ground shoots for Crensa Originals productions.",
      "Edited short-form video content with storytelling precision and visual consistency."
    ]
  },
  {
    role: "Video Editing Intern",
    company: "United Incubation Hub",
    date: "2024 - 2025",
    points: [
      "Edited short-form promotional and event videos for startup and incubation programs.",
      "Applied color correction, transitions, and audio synchronization to improve video quality.",
      "Collaborated with the media and event team to create content for social media campaigns."
    ]
  }
];

function TimelineCard({ exp, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`relative flex items-start gap-6 md:gap-10 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        className="flex-1 md:w-[calc(50%-40px)] max-md:ml-[52px]"
      >
        <div className="group glass p-6 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[rgba(59,130,246,0.35)] relative overflow-hidden cursor-default">
          {/* Hover glow overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-1.5 tracking-tight">
              {exp.role}
            </h3>
            <h4 className="text-base md:text-lg text-[var(--accent-secondary)] font-semibold mb-4">
              {exp.company}
            </h4>
            <div className="inline-flex items-center gap-2 text-[var(--text-secondary)] text-sm mb-5 bg-[rgba(59,130,246,0.08)] py-1.5 px-4 rounded-full border border-[rgba(59,130,246,0.15)]">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-medium">{exp.date}</span>
            </div>
            <ul className="space-y-3">
              {exp.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 text-[var(--text-secondary)] text-sm md:text-[0.94rem] leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shrink-0 opacity-60" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Timeline dot — center on desktop, left on mobile */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
        className={`
          absolute z-20
          left-0 top-6
          md:left-1/2 md:top-8 md:-translate-x-1/2
        `}
      >
        <div className="relative">
          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 rounded-full border-2 border-[var(--accent-primary)]"
          />
          {/* Dot */}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent-primary)] flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] relative">
            <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-[var(--accent-primary)]" />
          </div>
        </div>
      </motion.div>

      {/* Spacer for the opposite side on desktop */}
      <div className="hidden md:block flex-1 md:w-[calc(50%-40px)]" />
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  // Scroll-driven timeline line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 px-[5%] min-h-screen relative overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-sm mb-5"
          >
            <Briefcase className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
              Career
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--text-secondary)] text-base md:text-lg mt-4 max-w-lg mx-auto"
          >
            My professional journey and the roles that shaped my skills.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Static background line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-[var(--border-color)] opacity-40" />

          {/* Animated fill line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] md:left-1/2 md:-translate-x-[1px] top-0 w-[2px] bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] origin-top"
          />

          {/* Experience cards */}
          <div className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, index) => (
              <TimelineCard key={index} exp={exp} index={index} />
            ))}
          </div>

          {/* Terminal dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 -bottom-3 w-3 h-3 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_12px_rgba(59,130,246,0.4)]"
          />
        </div>
      </div>
    </section>
  );
}
