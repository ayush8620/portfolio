"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Award, FileText, Image as ImageIcon, ExternalLink, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

const certificates = [
  {
    title: "Deloitte - Data Analytics Job Simulation",
    file: "/Certificate/Data_Analytics_Deloitte.jpg",
    type: "image",
    description: "Certificate of Completion — Data Analytics Job Simulation (May 31st, 2026)",
  },
  {
    title: "Deloitte - Cyber Job Simulation",
    file: "/Certificate/Cyber_Security_Deloitte.jpg",
    type: "image",
    description: "Certificate of Completion — Cyber Job Simulation (May 31st, 2026)",
  },
  { 
    title: "Enigma XII", 
    file: "/Certificate/Enigma XII.jpg", 
    type: "image",
    description: "Participation/Achievement in Enigma XII"
  },
  { 
    title: "TECHSRIJAN", 
    file: "/Certificate/TECHSRIJAN.jpg", 
    type: "image",
    description: "Participation in TECHSRIJAN"
  },
  { 
    title: "Uhack 4.0", 
    file: "/Certificate/Uhack 4.0.jpg", 
    type: "image",
    description: "Participation in Uhack 4.0 Hackathon"
  },
  { 
    title: "Cybersecurity Summer Training", 
    file: "/Certificate/CYBERSECURITY SUMMER TRANING.jpg", 
    type: "image",
    description: "Completion of Summer Training in Cybersecurity"
  },
  { 
    title: "Devtown", 
    file: "/Certificate/Devtown.jpg", 
    type: "image",
    description: "Devtown Certification"
  },
  { 
    title: "HD204430 - Certification", 
    file: "/Certificate/HD204430-AYUSH YADAV.jpg", 
    type: "image",
    description: "Certification of Achievement"
  },
  { 
    title: "Codex", 
    file: "/Certificate/codex.jpg", 
    type: "image",
    description: "Codex Certification"
  },
  { 
    title: "Achievement Certificate", 
    file: "/Certificate/IMG_20260405_215737.jpg", 
    type: "image",
    description: "Certificate of Achievement"
  },
  { 
    title: "Netcamp Certificate 1", 
    file: "/Certificate/Netcamp/IMG_20260405_220110.jpg", 
    type: "image",
    description: "Netcamp Training & Certification"
  },
  { 
    title: "Netcamp Certificate 2", 
    file: "/Certificate/Netcamp/IMG_20260405_220142.jpg", 
    type: "image",
    description: "Netcamp Training & Certification"
  },
  { 
    title: "Netcamp Certificate 3", 
    file: "/Certificate/Netcamp/IMG_20260405_220202.jpg", 
    type: "image",
    description: "Netcamp Training & Certification"
  },
  { 
    title: "Netcamp Certificate 4", 
    file: "/Certificate/Netcamp/IMG_20260405_220237.jpg", 
    type: "image",
    description: "Netcamp Training & Certification"
  }
];

/* ── Premium Animation Variants ── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const INITIAL_COUNT = 8;

/* ── Floating Particle Component ── */
function FloatingParticle({ delay, duration, x, y, size }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent)",
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ── Certificate Card with Premium Hover ── */
function CertificateCard({ cert, idx }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -15, scale: 0.9, filter: "blur(10px)" }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        scale: 1, 
        filter: "blur(0px)",
        transition: { 
          duration: 0.7, 
          delay: idx * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }
      }}
      exit={{ 
        opacity: 0, 
        y: -30, 
        scale: 0.85, 
        filter: "blur(6px)",
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } 
      }}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      className="relative rounded-[16px] overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* ── Animated gradient border glow ── */}
      <motion.div
        className="absolute -inset-[1px] rounded-[17px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(59,130,246,0.5), rgba(139,92,246,0.3), transparent 70%)`
          ),
        }}
      />

      {/* ── Card inner ── */}
      <div className="relative z-[1] glass rounded-[16px] overflow-hidden flex flex-col flex-grow">
        {/* Thumbnail */}
        <div className="h-[180px] w-full relative overflow-hidden bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
          {cert.type === "image" ? (
            <>
              <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-all duration-500" />
              <img
                src={cert.file}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.12]"
                loading="lazy"
              />
              {/* ── Shimmer sweep on hover ── */}
              <div 
                className="absolute inset-0 z-[11] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmerSweep 1.5s ease-in-out infinite",
                }}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[var(--accent-primary)] opacity-80 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(135deg,rgba(59,130,246,0.05),rgba(139,92,246,0.05))]">
              <FileText size={48} className="mb-[10px]" strokeWidth={1.5} />
              <span className="text-[0.85rem] font-[600] uppercase tracking-wider text-[var(--text-secondary)]">
                PDF Document
              </span>
            </div>
          )}

          {/* View Overlay */}
          <a
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 bg-black/40 backdrop-blur-[3px]"
          >
            <motion.span
              initial={false}
              className="flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg-color)] py-2.5 px-5 rounded-full font-semibold text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-400 shadow-lg"
            >
              <ExternalLink size={16} /> View
            </motion.span>
          </a>
        </div>

        {/* Content */}
        <div className="p-[1.5rem] flex flex-col flex-grow border-t border-[var(--glass-border)] bg-[rgba(255,255,255,0.01)]">
          <div className="flex items-center gap-[0.5rem] mb-[0.5rem]">
            <span className="p-[6px] rounded-[8px] bg-[rgba(59,130,246,0.1)] text-[var(--accent-primary)] group-hover:bg-[rgba(59,130,246,0.18)] transition-colors duration-300">
              {cert.type === "image" ? <ImageIcon size={14} /> : <FileText size={14} />}
            </span>
            <span className="text-[0.75rem] font-[600] tracking-wider uppercase text-[var(--text-secondary)]">
              {cert.type === "image" ? "Image" : "Document"}
            </span>
          </div>
          <h3 className="text-[1.1rem] font-[700] text-[var(--text-primary)] mb-[0.5rem] line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
            {cert.title}
          </h3>
          <p className="text-[0.85rem] text-[var(--text-secondary)] line-clamp-2 mt-auto">
            {cert.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function Certificates() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const buttonRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll((prev) => {
      const next = !prev;
      setTimeout(() => {
        if (next) {
          // Expanding — scroll button into view at bottom so new cards are visible above
          buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        } else {
          // Collapsing — scroll the grid top into view gently
          gridRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 180);
      return next;
    });
  };

  const visibleCertificates = showAll ? certificates : certificates.slice(0, INITIAL_COUNT);
  const hasMore = certificates.length > INITIAL_COUNT;

  // Particles data (generated on client only to avoid hydration mismatch)
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 4,
      }))
    );
  }, []);

  return (
    <section id="certificates" ref={sectionRef} className="py-[7rem] px-[5%] relative min-h-screen overflow-hidden">
      
      {/* ── Ambient glows ── */}
      <motion.div
        className="absolute top-[20%] right-[0%] w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-tertiary, #06b6d4) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.09, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 10, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Floating particles ── */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} x={p.x} y={p.y} size={p.size} delay={p.delay} duration={p.duration} />
      ))}

      <div className="max-w-[1200px] mx-auto relative z-[1]">

        {/* ── Section heading ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-[4.5rem]"
        >
          <motion.div variants={fadeUp} className="mb-[1rem]">
            <motion.span
              className="inline-flex items-center gap-[6px] text-[0.8rem] font-[600] tracking-[0.15em] uppercase px-[14px] py-[6px] rounded-full border"
              style={{
                color: "var(--accent-primary)",
                borderColor: "rgba(59,130,246,0.25)",
                background: "rgba(59,130,246,0.06)",
              }}
              whileHover={{ scale: 1.05, borderColor: "rgba(59,130,246,0.5)" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Award size={13} /> Achievements
            </motion.span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
            <span className="text-gradient">Certificates</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-[1rem] text-[var(--text-secondary)] text-[1.05rem] max-w-[540px] mx-auto leading-[1.6]">
            A showcase of my continuous learning, hackathon participations, and professional training certifications.
          </motion.p>
        </motion.div>

        {/* ── Certificates grid ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.5rem]"
          style={{ perspective: "1200px" }}
        >
          <AnimatePresence mode="popLayout">
            {visibleCertificates.map((cert, idx) => (
              <CertificateCard key={cert.title} cert={cert} idx={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Show More / Show Less Button ── */}
        {hasMore && (
          <motion.div
            ref={buttonRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mt-[3rem]"
          >
            <motion.button
              onClick={handleToggle}
              className="group/btn relative inline-flex items-center gap-[10px] px-[2.2rem] py-[0.9rem] rounded-full font-[600] text-[0.95rem] tracking-wide cursor-pointer outline-none overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))",
                color: "var(--accent-primary)",
                border: "1px solid rgba(59,130,246,0.2)",
                boxShadow: "0 4px 25px rgba(59,130,246,0.06)",
              }}
              whileHover={{
                y: -3,
                boxShadow: "0 12px 40px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.3)",
                background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18))",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* ── Shimmer sweep on the button ── */}
              <span
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 35%, rgba(59,130,246,0.12) 45%, rgba(139,92,246,0.15) 50%, rgba(59,130,246,0.12) 55%, transparent 65%)",
                  backgroundSize: "250% 100%",
                  animation: "shimmerSweep 2s ease-in-out infinite",
                }}
              />

              {/* ── Glow pulse behind button ── */}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
                  filter: "blur(15px)",
                  transform: "scale(1.5)",
                }}
              />

              <span className="relative z-[1] flex items-center gap-[8px]">
                {showAll ? (
                  <>
                    <Sparkles size={16} className="opacity-70" />
                    Show Less
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronUp size={18} />
                    </motion.span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="opacity-70" />
                    Show More ({certificates.length - INITIAL_COUNT} more)
                    <motion.span
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        )}

      </div>

      {/* ── Keyframe animations ── */}
      <style jsx global>{`
        @keyframes shimmerSweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
