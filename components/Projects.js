"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Smartphone,
  QrCode,
  ShieldCheck,
  Database,
  Users,
  Zap,
  Layout,
  Lock,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const techStack = [
  { name: "Next.js 16", color: "#E2E8F0", bg: "rgba(226,232,240,0.1)" },
  { name: "React 19", color: "#61DAFB", bg: "rgba(97,218,251,0.1)" },
  { name: "Firebase Auth", color: "#FFCA28", bg: "rgba(255,202,40,0.1)" },
  { name: "Cloud Firestore", color: "#FF6F00", bg: "rgba(255,111,0,0.1)" },
  { name: "Tailwind CSS v4", color: "#06B6D4", bg: "rgba(6,182,212,0.1)" },
  { name: "Framer Motion", color: "#FF0080", bg: "rgba(255,0,128,0.1)" },
  { name: "Lucide React", color: "#F56565", bg: "rgba(245,101,101,0.1)" },
  { name: "react-qr-code", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
  { name: "JavaScript", color: "#F7DF1E", bg: "rgba(247,223,30,0.1)" },
];

const features = [
  {
    icon: QrCode,
    title: "QR-Based Business Cards",
    desc: "Generate & share digital business cards via QR codes",
  },
  {
    icon: ShieldCheck,
    title: "Firebase OTP Auth",
    desc: "Secure onboarding with phone-based verification",
  },
  {
    icon: Database,
    title: "Firestore Real-Time",
    desc: "Live networking connections backed by Cloud Firestore",
  },
  {
    icon: Users,
    title: "Public Profile Preview",
    desc: "Shareable profile pages with connection previews",
  },
  {
    icon: Lock,
    title: "Duplicate Prevention",
    desc: "Intelligent duplicate connection detection & blocking",
  },
  {
    icon: Zap,
    title: "Rate Limiting",
    desc: "Lightweight request middleware for API protection",
  },
  {
    icon: Layout,
    title: "Mobile-First Flow",
    desc: "Responsive onboarding designed for mobile users",
  },
  {
    icon: ShieldCheck,
    title: "Security Rules",
    desc: "Firestore security rules for granular data access",
  },
];

/* ── animation variants ──────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── component ────────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-[7rem] px-[5%] min-h-screen overflow-hidden"
    >
      {/* ── ambient glow blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[5%] right-[-8%] w-[450px] h-[450px] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-[1]">
        {/* ── section heading ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-[4.5rem]"
        >
          <motion.div variants={fadeUp} className="mb-[1rem]">
            <span
              className="inline-flex items-center gap-[6px] text-[0.8rem] font-[600] tracking-[0.15em] uppercase px-[14px] py-[6px] rounded-full border"
              style={{
                color: "var(--accent-primary)",
                borderColor: "rgba(59,130,246,0.25)",
                background: "rgba(59,130,246,0.06)",
              }}
            >
              <Star size={13} /> Portfolio
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-[2.8rem] sm:text-[3.2rem] font-[800] leading-[1.15]"
          >
            <span className="text-gradient">Featured Project</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-[1rem] text-[var(--text-secondary)] text-[1.05rem] max-w-[540px] mx-auto leading-[1.6]"
          >
            A production-ready middleware platform solving real-world
            networking challenges
          </motion.p>
        </motion.div>

        {/* ── main project card ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="glass rounded-[24px] overflow-hidden"
          style={{
            boxShadow:
              "0 0 0 1px rgba(59,130,246,0.08), 0 25px 80px -12px rgba(0,0,0,0.45)",
          }}
        >
          {/* ── top bar ── */}
          <div
            className="flex items-center justify-between px-[2rem] py-[1rem] border-b"
            style={{ borderColor: "var(--glass-border)" }}
          >
            <div className="flex items-center gap-[8px]">
              <span className="w-[12px] h-[12px] rounded-full bg-[#ff5f57]" />
              <span className="w-[12px] h-[12px] rounded-full bg-[#febc2e]" />
              <span className="w-[12px] h-[12px] rounded-full bg-[#28c840]" />
            </div>
            <span
              className="inline-flex items-center gap-[6px] text-[0.75rem] font-[700] tracking-[0.12em] uppercase px-[12px] py-[4px] rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                color: "#a78bfa",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <Sparkles size={12} /> Featured Project
            </span>
          </div>

          {/* ── two-column layout ── */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_0.85fr]">
            {/* ── left: content ── */}
            <motion.div
              variants={slideInLeft}
              className="p-6 sm:p-8 lg:p-12 flex flex-col order-2 lg:order-1"
            >
              <h3
                className="text-3xl sm:text-4xl lg:text-[2.6rem] font-[800] leading-[1.15] mb-[0.6rem]"
                style={{ color: "var(--text-primary)" }}
              >
                Vynco Web Middleware
              </h3>

              <p
                className="text-[1rem] font-[500] mb-[1.8rem] leading-[1.5]"
                style={{ color: "var(--accent-secondary)" }}
              >
                A mobile-first middleware web platform for the Vynco app that
                streamlines onboarding, QR-based networking, and digital
                profile sharing.
              </p>

              <p
                className="text-[0.95rem] leading-[1.75] mb-[2.2rem]"
                style={{ color: "var(--text-secondary)" }}
              >
                Developed a responsive middleware platform for the Vynco
                mobile app, enabling users to create and share QR-based
                digital business cards, verify identity through Firebase OTP
                authentication, preview public profiles, establish
                Firestore-backed networking connections, and view recent
                interactions before downloading the mobile app.
              </p>

              {/* ── tech stack ── */}
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-[0.6rem] mb-[2.5rem]"
              >
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech.name}
                    variants={scaleIn}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: `0 0 16px ${tech.bg}`,
                    }}
                    className="inline-flex items-center gap-[6px] py-[6px] px-[14px] rounded-full text-[0.8rem] font-[600] cursor-default select-none border transition-colors duration-200"
                    style={{
                      background: tech.bg,
                      color: tech.color,
                      borderColor: `${tech.color}22`,
                    }}
                  >
                    <span
                      className="w-[6px] h-[6px] rounded-full"
                      style={{ background: tech.color }}
                    />
                    {tech.name}
                  </motion.span>
                ))}
              </motion.div>

              {/* ── CTA buttons ── */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-auto">
                <motion.a
                  href="https://www.linkllyapp.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full sm:w-auto justify-center items-center gap-[8px] py-3 px-6 rounded-xl text-[0.9rem] font-[600] text-white transition-shadow duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
                  }}
                >
                  <ExternalLink size={16} /> Live Demo
                  <ArrowRight size={14} className="ml-[2px]" />
                </motion.a>

                <motion.a
                  href="https://github.com/Adarsh240-feb/Vynco"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full sm:w-auto justify-center items-center gap-[8px] py-3 px-6 rounded-xl text-[0.9rem] font-[600] border transition-colors duration-300"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--glass-border)",
                    background: "var(--glass-bg)",
                  }}
                >
                  <FaGithub size={16} /> Source Code
                </motion.a>

                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.vynco.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full sm:w-auto justify-center items-center gap-[8px] py-3 px-6 rounded-xl text-[0.9rem] font-[600] border transition-colors duration-300"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--glass-border)",
                    background: "var(--glass-bg)",
                  }}
                >
                  <Smartphone size={16} /> Android App
                </motion.a>
              </div>
            </motion.div>

            {/* ── right: mockup preview ── */}
            <motion.div
              variants={slideInRight}
              className="relative flex items-center justify-center p-8 sm:p-12 lg:p-14 order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-[var(--glass-border)]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(59,130,246,0.04) 0%, rgba(139,92,246,0.06) 100%)",
              }}
            >
              {/* decorative ring */}
              <div
                aria-hidden
                className="absolute w-[280px] h-[280px] rounded-full opacity-[0.08] pointer-events-none"
                style={{
                  border: "2px dashed var(--accent-primary)",
                  animation: "spin 30s linear infinite",
                }}
              />

              <motion.div
                whileHover={{ scale: 1.03, rotate: -1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative rounded-[20px] overflow-hidden w-full max-w-[360px]"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                <img
                  src="/vynco-preview.png"
                  alt="Vynco Web Middleware – QR-based digital business card platform preview"
                  className="w-full h-auto block"
                  loading="lazy"
                />
                {/* shimmer overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, transparent 55%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 4s ease-in-out infinite",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── key features grid ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mt-[3.5rem]"
        >
          <motion.h4
            variants={fadeUp}
            className="text-[1.1rem] font-[700] tracking-[0.1em] uppercase text-center mb-[2rem]"
            style={{ color: "var(--text-secondary)" }}
          >
            Key Capabilities
          </motion.h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1rem]">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={scaleIn}
                  whileHover={{
                    y: -6,
                    boxShadow:
                      "0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(59,130,246,0.15)",
                  }}
                  className="glass rounded-[16px] p-[1.5rem] flex flex-col gap-[0.6rem] cursor-default transition-colors duration-300"
                >
                  <span
                    className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))",
                    }}
                  >
                    <Icon
                      size={20}
                      style={{ color: "var(--accent-primary)" }}
                    />
                  </span>
                  <h5
                    className="text-[0.95rem] font-[700]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {feat.title}
                  </h5>
                  <p
                    className="text-[0.82rem] leading-[1.55]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── keyframe styles ── */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
