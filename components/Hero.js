"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaDownload, FaArrowRight } from "react-icons/fa";

// Typewriter hook
function useTypewriter(text, speed = 80, delay = 800) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayText.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayText(text.slice(0, displayText.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, started, text, speed]);

  return displayText;
}

// Floating particles
function FloatingParticles() {
  const particles = [
    { size: 4, x: "10%", y: "20%", duration: 6, delay: 0 },
    { size: 3, x: "85%", y: "15%", duration: 8, delay: 1 },
    { size: 5, x: "70%", y: "70%", duration: 7, delay: 0.5 },
    { size: 3, x: "20%", y: "75%", duration: 9, delay: 2 },
    { size: 4, x: "50%", y: "10%", duration: 6.5, delay: 1.5 },
    { size: 2, x: "90%", y: "50%", duration: 7.5, delay: 0.8 },
    { size: 3, x: "30%", y: "45%", duration: 8, delay: 2.5 },
    { size: 2, x: "65%", y: "85%", duration: 6, delay: 1.2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[var(--accent-primary)]"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.15, 0.35, 0.2, 0.3, 0.15],
            scale: [1, 1.3, 0.9, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Container & item variants for stagger
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const roleText = useTypewriter("Full Stack Developer", 70, 1000);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-[100vh] flex flex-col items-center justify-center relative px-[5%] overflow-hidden pt-[100px] pb-[40px]"
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1, 0.95, 1],
          opacity: [0.6, 0.85, 0.7, 0.9, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[60%] left-[30%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)",
        }}
        animate={{
          scale: [1, 0.95, 1.05, 1],
          opacity: [0.4, 0.6, 0.5, 0.4],
        }}
        transition={{
          duration: 10,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-[800px] text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Profile Image with rotating gradient border */}
        <motion.div variants={fadeUpVariant} className="mb-8">
          <div className="relative group">
            {/* Rotating gradient ring */}
            <div
              className="absolute -inset-[3px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"
              style={{
                background:
                  "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                animation: "spin 4s linear infinite",
              }}
            />
            {/* Inner glow */}
            <div className="absolute -inset-[6px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-md bg-[image:var(--accent-gradient)]" />

            {/* Image container */}
            <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden border-[3px] border-[var(--bg-color)] z-[1]">
              <img
                src="/profile.png"
                alt="Ayush Yadav"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.h3
          variants={fadeUpVariant}
          className="text-[1.1rem] text-[var(--text-secondary)] mb-2 font-[500] tracking-[3px] uppercase"
        >
          Hi, I am
        </motion.h3>

        {/* Name */}
        <motion.h1
          variants={fadeUpVariant}
          className="text-[clamp(2.4rem,8vw,5rem)] font-[800] leading-[1.1] mb-3"
        >
          Ayush{" "}
          <span className="text-gradient">Yadav</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.h2
          variants={fadeUpVariant}
          className="text-[clamp(1.2rem,4vw,2.2rem)] font-[700] mb-6 h-[1.4em]"
        >
          <span className="text-gradient">
            {roleText}
            <motion.span
              className="inline-block w-[3px] h-[1em] bg-[var(--accent-primary)] ml-1 align-middle rounded-sm"
              animate={{ opacity: [1, 1, 0, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUpVariant}
          className="text-[1.05rem] md:text-[1.1rem] text-[var(--text-secondary)] leading-[1.7] mb-10 max-w-[580px] mx-auto"
        >
          Web developer skilled in JavaScript, React.js, and Firebase with
          knowledge of Linux and cybersecurity, seeking to build secure and
          scalable web applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Primary CTA */}
          <motion.a
            href="#projects"
            className="relative flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-full font-[600] text-[0.95rem] text-white cursor-pointer overflow-hidden group"
            style={{ background: "var(--accent-gradient)" }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Hover glow effect */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(59,130,246,0.5),_0_0_60px_rgba(139,92,246,0.3)]" />
            <span className="relative z-[1] flex items-center gap-2.5">
              View Work
              <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="https://drive.google.com/file/d/1PvFTaEKRuJAiC7oCimgvWrY7q727AOeo/view?usp=sharing"
            target="_blank"
            className="relative flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-full font-[600] text-[0.95rem] text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer overflow-hidden group bg-transparent hover:border-[var(--accent-primary)]"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Subtle hover background fill */}
            <span className="absolute inset-0 rounded-full bg-[var(--accent-primary)] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500" />
            <span className="relative z-[1] flex items-center gap-2.5">
              Resume
              <FaDownload className="text-sm transition-transform duration-300 group-hover:translate-y-[2px]" />
            </span>
          </motion.a>
        </motion.div>


      </motion.div>

      {/* CSS for rotating border */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
