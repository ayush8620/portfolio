"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Terminal, Shield, GraduationCap } from "lucide-react";

const skillCategories = [
  { title: "Frontend Development", icon: Code2, skills: ["HTML", "CSS", "JavaScript", "React.js", "Responsive Design"] },
  { title: "Backend & Tools", icon: Server, skills: ["Git", "GitHub", "Vercel", "VS Code", "Clerk", "Firebase", "ExpressJS"] },
  { title: "Programming", icon: Terminal, skills: ["Python", "C"] },
  { title: "Cybersecurity", icon: Shield, skills: ["Ethical Hacking", "Penetration Testing (Nmap, Wireshark, Burp Suite)", "Web App Security", "SQL Injection", "XSS", "Reverse Shell"] }
];

const education = [
  { degree: "B.Tech Computer Science and Engineering", school: "United Institute of Technology, Allahabad", year: "2025 - Present" },
  { degree: "12th Standard - CBSE - 78.75%", school: "M.V. Convent Inter College, Allahabad", year: "2024" },
  { degree: "10th Standard - CBSE - 79.42%", school: "M.V. Convent Inter College, Allahabad", year: "2022" }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const skillBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function SkillCard({ category, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group glass p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[rgba(139,92,246,0.35)] relative overflow-hidden cursor-default"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-secondary)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon + Title */}
        <div className="flex items-center gap-3.5 mb-5">
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.5 }}
            className="w-11 h-11 rounded-xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.15)] flex items-center justify-center text-[var(--accent-secondary)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-shadow duration-500"
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
            {category.title}
          </h3>
        </div>

        {/* Skill badges */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap gap-2"
        >
          {category.skills.map((skill, i) => (
            <motion.span
              key={i}
              variants={skillBadgeVariants}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 18px rgba(139,92,246,0.25)",
              }}
              className="bg-[rgba(139,92,246,0.06)] text-[var(--text-secondary)] py-1.5 px-3.5 rounded-lg text-sm font-medium border border-[var(--border-color)] transition-colors duration-300 hover:border-[rgba(139,92,246,0.45)] hover:bg-[rgba(139,92,246,0.12)] hover:text-[var(--text-primary)] cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function EducationCard({ edu, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex gap-5">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="relative z-10"
        >
          <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent-primary)] flex items-center justify-center shadow-[0_0_16px_rgba(59,130,246,0.25)]">
            <GraduationCap className="w-4 h-4 text-[var(--accent-primary)]" />
          </div>
        </motion.div>
        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-[2px] bg-gradient-to-b from-[var(--accent-primary)] to-[rgba(59,130,246,0.15)] flex-1 mt-2 origin-top"
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        className={`group glass p-5 rounded-2xl flex-1 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(59,130,246,0.35)] relative overflow-hidden cursor-default ${
          !isLast ? "mb-5" : ""
        }`}
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)] mb-1 tracking-tight leading-snug">
            {edu.degree}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">
            {edu.school}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] bg-[rgba(59,130,246,0.08)] py-1 px-3 rounded-full border border-[rgba(59,130,246,0.15)]">
            {edu.year}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const skillsHeaderRef = useRef(null);
  const eduHeaderRef = useRef(null);
  const skillsInView = useInView(skillsHeaderRef, { once: true, margin: "-80px" });
  const eduInView = useInView(eduHeaderRef, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-[5%] min-h-[80vh] relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">
          {/* ─── Skills Column ─── */}
          <div className="flex-[1.6]">
            {/* Skills Header */}
            <div ref={skillsHeaderRef} className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-sm mb-4"
              >
                <Code2 className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                  Tech Stack
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold tracking-tight"
              >
                <span className="text-gradient">Skills</span>
              </motion.h2>
            </div>

            {/* Skill Cards Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {skillCategories.map((cat, idx) => (
                <SkillCard key={idx} category={cat} index={idx} />
              ))}
            </motion.div>
          </div>

          {/* ─── Education Column ─── */}
          <div className="flex-[1]">
            {/* Education Header */}
            <div ref={eduHeaderRef} className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={eduInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-sm mb-4"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                  Education
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={eduInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold tracking-tight"
              >
                <span className="text-gradient">Education</span>
              </motion.h2>
            </div>

            {/* Education Timeline */}
            <div className="flex flex-col">
              {education.map((edu, idx) => (
                <EducationCard
                  key={idx}
                  edu={edu}
                  index={idx}
                  isLast={idx === education.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
