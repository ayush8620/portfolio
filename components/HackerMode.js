"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Matrix Rain Canvas ───────────────────────────────────────
function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]=/\\";
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array.from({ length: columns }, () => Math.random() * -100);

    const handleResize = () => {
      resize();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -100);
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const brightness = Math.random();
        if (brightness > 0.96) {
          ctx.fillStyle = "#fff";
          ctx.font = `bold ${fontSize}px monospace`;
        } else if (brightness > 0.8) {
          ctx.fillStyle = "#4ade80";
          ctx.font = `${fontSize}px monospace`;
        } else {
          ctx.fillStyle = `rgba(0, 255, 65, ${0.15 + brightness * 0.35})`;
          ctx.font = `${fontSize}px monospace`;
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.25,
      }}
    />
  );
}

// ─── Glitch Transition Overlay ─────────────────────────────
function GlitchTransition({ show, onComplete }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Horizontal glitch bars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, opacity: 0 }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0.8, 1, 0],
            scaleX: [1, 1.5, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 0.6,
            delay: Math.random() * 0.3,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${(i / 20) * 100}%`,
            height: `${100 / 20}%`,
            background:
              i % 3 === 0
                ? "rgba(0, 255, 65, 0.3)"
                : i % 3 === 1
                ? "rgba(255, 0, 0, 0.15)"
                : "rgba(0, 100, 255, 0.15)",
            mixBlendMode: "screen",
          }}
        />
      ))}

      {/* Static noise */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.1, 0.6, 0.2, 0.7, 0] }}
        transition={{ duration: 0.7 }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          opacity: 0.4,
        }}
      />

      {/* Center text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0, 1, 0.5, 1],
          x: [0, -5, 5, -3, 2, 0],
        }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#00ff41",
          fontFamily: "'Courier New', monospace",
          fontSize: "clamp(16px, 4vw, 28px)",
          fontWeight: "bold",
          textShadow:
            "0 0 20px rgba(0,255,65,0.8), 0 0 40px rgba(0,255,65,0.4)",
          letterSpacing: "4px",
          whiteSpace: "nowrap",
        }}
      >
        INITIATING HACK SEQUENCE...
      </motion.div>
    </motion.div>
  );
}

// ─── Fake loading bar ─────────────────────────────────────────
function useLoadingBar(duration = 2000) {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  const start = useCallback(() => {
    setProgress(0);
    setRunning(true);
  }, []);

  useEffect(() => {
    if (!running) return;
    const steps = 20;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const jitter = Math.random() * 8 - 4;
      setProgress(Math.min(100, (step / steps) * 100 + jitter));
      if (step >= steps) {
        setProgress(100);
        setRunning(false);
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [running, duration]);

  return { progress, running, start };
}

// ─── useIsMobile hook ──────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── ASCII art headers ──────────────────────────────────────
const ASCII_HEADER_FULL = [
  "  ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ ",
  "  ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗",
  "  ███████║███████║██║     █████╔╝ █████╗  ██████╔╝",
  "  ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗",
  "  ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║",
  "  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝",
  "            ▄▄▄ ACCESS TERMINAL v3.7 ▄▄▄",
];

const ASCII_HEADER_COMPACT = [
  " ╦ ╦╔═╗╔═╗╦╔═╔═╗╦═╗",
  " ╠═╣╠═╣║  ╠╩╗║╣ ╠╦╝",
  " ╩ ╩╩ ╩╚═╝╩ ╩╚═╝╩╚═",
  "  ACCESS TERMINAL v3.7",
];

// ─── Hack stages data ─────────────────────────────────────
const HACK_STAGES = [
  {
    command: "scan",
    loadingText: "Scanning target network...",
    lines: [
      "► Scanning ports 1-65535...",
      "► Port 22 (SSH)    — FILTERED",
      "► Port 80 (HTTP)   — OPEN",
      "► Port 443 (HTTPS) — OPEN",
      "► Port 3000 (Node) — OPEN",
      "",
      "  ╔═══════════════════════════════╗",
      "  ║  TARGET IDENTIFIED            ║",
      "  ║  Host: ayushyadav.dev         ║",
      "  ║  Server: Next.js/16.x        ║",
      "  ║  Status: ACTIVE               ║",
      "  ╚═══════════════════════════════╝",
      "",
      '▸ Type "breach" to bypass firewall...',
    ],
  },
  {
    command: "breach",
    loadingText: "Bypassing firewall...",
    lines: [
      "► Injecting payload...",
      "► [■■■□□□□□□□] Decrypting tokens...",
      "► [■■■■■■□□□□] Exploiting CORS...",
      "► [■■■■■■■■■■] Firewall bypassed!",
      "",
      "  ╔═══════════════════════════════╗",
      "  ║  █ ACCESS: ELEVATED          ║",
      "  ║  █ CLEARANCE: PARTIAL        ║",
      "  ║  █ THREAT: NONE (friendly!)  ║",
      "  ╚═══════════════════════════════╝",
      "",
      '▸ Type "extract" to pull profile...',
    ],
  },
  {
    command: "extract",
    loadingText: "Extracting classified data...",
    lines: [
      "► Decrypting personnel database...",
      "► Bypassing 2FA verification...",
      "► Extracting profile records...",
      "",
      "  ┌─────────────────────────────────┐",
      "  │ ▓▓▓ CLASSIFIED FILE ▓▓▓        │",
      "  ├─────────────────────────────────┤",
      "  │                                 │",
      "  │ NAME:   Ayush Yadav             │",
      "  │ ROLE:   Full Stack Developer    │",
      "  │ LOCATION: Allahabad, India      │",
      "  │ STATUS: Open to Opportunities   │",
      "  │                                 │",
      "  │ ◆ SKILLS DECRYPTED:            │",
      "  │   JavaScript · React · Next.js  │",
      "  │   Node.js · Firebase · Tailwind │",
      "  │   Linux · Cybersecurity · Git   │",
      "  │                                 │",
      "  └─────────────────────────────────┘",
      "",
      '▸ Type "decrypt" for contacts...',
    ],
  },
  {
    command: "decrypt",
    loadingText: "Decrypting secure channels...",
    lines: [
      "► Breaking RSA-4096 encryption...",
      "► Decoding Base64 payloads...",
      "► Reconstructing channels...",
      "",
      "  ╔═════════════════════════════════╗",
      "  ║  ◈ SECURE CHANNELS ◈          ║",
      "  ╠═════════════════════════════════╣",
      "  ║                                 ║",
      "  ║  📧 EMAIL:                      ║",
      "  ║  yadavaayush8484@gmail.com      ║",
      "  ║                                 ║",
      "  ║  🔗 GITHUB:                     ║",
      "  ║  github.com/ayush8620           ║",
      "  ║                                 ║",
      "  ║  💼 LINKEDIN:                   ║",
      "  ║  linkedin.com/in/ayush-yadav    ║",
      "  ║                                 ║",
      "  ║  📄 RESUME:                     ║",
      "  ║  [LINK UNLOCKED — SEE BELOW]   ║",
      "  ║                                 ║",
      "  ╚═════════════════════════════════╝",
      "",
      "  ✦ HACK COMPLETE — ACCESS GRANTED ✦",
      "",
      '▸ Type "exit" to return to portfolio',
      '▸ Type "clear" to reset terminal',
      '▸ Type "help" for all commands',
    ],
  },
];

const HELP_TEXT = [
  "",
  "  ╔══════════════════════════════╗",
  "  ║    AVAILABLE COMMANDS       ║",
  "  ╠══════════════════════════════╣",
  "  ║  scan    — Scan network    ║",
  "  ║  breach  — Bypass firewall ║",
  "  ║  extract — Extract profile ║",
  "  ║  decrypt — Decrypt contact ║",
  "  ║  resume  — Download resume ║",
  "  ║  clear   — Clear terminal  ║",
  "  ║  help    — Show this menu  ║",
  "  ║  exit    — Return to site  ║",
  "  ╚══════════════════════════════╝",
  "",
];

function getWelcomeLines(isMobile) {
  const header = isMobile ? ASCII_HEADER_COMPACT : ASCII_HEADER_FULL;
  return [
    "",
    ...header,
    "",
    "  [SYS] Connection established...",
    "  [SYS] Initializing exploit framework...",
    "  [SYS] Target portfolio detected.",
    "",
    '  Type "scan" to begin recon...',
    '  Type "help" for all commands.',
    "",
  ];
}

// ─── Terminal Line Component ──────────────────────────────
function TerminalLine({ text, index, isMobile }) {
  const line = text ?? "";

  let color = "#00ff41";
  if (line.startsWith("►") || line.startsWith("▸")) color = "#4ade80";
  if (line.includes("CLASSIFIED") || line.includes("ACCESS GRANTED"))
    color = "#f59e0b";
  if (line.includes("OPEN")) color = "#22c55e";
  if (line.includes("FILTERED")) color = "#ef4444";
  if (line.includes("[SYS]")) color = "#06b6d4";
  if (line.includes("ERROR") || line.includes("DENIED")) color = "#ef4444";
  if (line.includes("█") || line.includes("▓")) color = "#a855f7";
  if (
    line.includes("╔") || line.includes("╗") || line.includes("║") ||
    line.includes("╚") || line.includes("╝") || line.includes("╠") ||
    line.includes("╣")
  )
    color = "#3b82f6";
  if (
    line.includes("┌") || line.includes("┐") || line.includes("│") ||
    line.includes("└") || line.includes("┘") || line.includes("├") ||
    line.includes("┤")
  )
    color = "#3b82f6";
  if (line.includes("✦")) color = "#fbbf24";
  if (line.includes("██")) color = "#22c55e";
  if (line.startsWith("root@")) color = "#00ff41";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.02, duration: 0.12 }}
      style={{
        color,
        fontFamily: "'Courier New', 'Fira Code', monospace",
        fontSize: isMobile ? "11.5px" : "14px",
        lineHeight: "1.65",
        whiteSpace: "pre",
        letterSpacing: "0.5px",
      }}
    >
      {line}
    </motion.div>
  );
}

// ─── Loading Bar Component ───────────────────────────────
function LoadingBar({ progress, text, isMobile }) {
  const filled = Math.floor(progress / 5);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);
  return (
    <div
      style={{
        color: "#4ade80",
        fontFamily: "monospace",
        fontSize: isMobile ? "11.5px" : "14px",
        marginTop: "8px",
      }}
    >
      <div style={{ marginBottom: "4px", color: "#06b6d4" }}>{text}</div>
      <div>
        [{bar}] {Math.floor(progress)}%
      </div>
    </div>
  );
}

// ─── Main HackerMode Component ───────────────────────────
export default function HackerMode({ active, setActive }) {
  const [terminalLines, setTerminalLines] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentStage, setCurrentStage] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // "open" | "close"
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const isMobile = useIsMobile();
  const { progress, running, start: startLoading } = useLoadingBar(1800);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines, progress]);

  // Focus input when terminal is active
  useEffect(() => {
    if (active && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [active]);

  // Lock body scroll when active
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  // Initialize terminal when entering
  const enterHackerMode = useCallback(() => {
    setPendingAction("open");
    setShowGlitch(true);
  }, []);

  const onGlitchComplete = useCallback(() => {
    setShowGlitch(false);
    if (pendingAction === "open") {
      setTerminalLines(getWelcomeLines(isMobile));
      setCurrentStage(-1);
      setShowResume(false);
      setIsProcessing(false);
      setActive(true);
    } else if (pendingAction === "close") {
      setTerminalLines([]);
      setCurrentStage(-1);
      setShowResume(false);
      setActive(false);
      window.scrollTo(0, 0);
    }
    setPendingAction(null);
  }, [pendingAction, isMobile, setActive]);

  const exitHackerMode = useCallback(() => {
    setPendingAction("close");
    setShowGlitch(true);
  }, []);

  // Add lines with delay
  const addLinesSequentially = (lines, callback) => {
    setIsProcessing(true);
    let i = 0;
    const addNext = () => {
      if (i < lines.length) {
        setTerminalLines((prev) => [...prev, lines[i]]);
        i++;
        setTimeout(addNext, 70);
      } else {
        setIsProcessing(false);
        callback?.();
      }
    };
    addNext();
  };

  // Process commands
  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setTerminalLines((prev) => [...prev, `root@hacker:~$ ${cmd}`]);

    if (trimmed === "help") {
      addLinesSequentially(HELP_TEXT);
      return;
    }

    if (trimmed === "clear") {
      setTerminalLines(getWelcomeLines(isMobile));
      return;
    }

    if (trimmed === "exit") {
      setTerminalLines((prev) => [
        ...prev,
        "",
        "  [SYS] Closing connection...",
        "  [SYS] Wiping logs...",
        "  [SYS] Returning to portfolio...",
      ]);
      setTimeout(exitHackerMode, 1200);
      return;
    }

    if (trimmed === "resume") {
      setShowResume(true);
      addLinesSequentially([
        "",
        "  [SYS] Resume link activated...",
        "",
      ]);
      setTimeout(() => {
        window.open(
          "https://drive.google.com/file/d/1PvFTaEKRuJAiC7oCimgvWrY7q727AOeo/view?usp=sharing",
          "_blank"
        );
      }, 800);
      return;
    }

    const stageIndex = HACK_STAGES.findIndex((s) => s.command === trimmed);

    if (stageIndex === -1) {
      addLinesSequentially([
        "",
        `  [ERROR] Command not found: "${cmd}"`,
        '  [SYS] Type "help" for commands.',
        "",
      ]);
      return;
    }

    if (stageIndex > currentStage + 1) {
      const needed = HACK_STAGES[currentStage + 1].command;
      addLinesSequentially([
        "",
        "  [DENIED] Access level insufficient.",
        `  [SYS] Run "${needed}" first.`,
        "",
      ]);
      return;
    }

    if (stageIndex <= currentStage) {
      addLinesSequentially([
        "",
        `  [SYS] Stage "${trimmed}" already done.`,
        "",
      ]);
      return;
    }

    const stage = HACK_STAGES[stageIndex];

    setIsProcessing(true);
    startLoading();
    setTerminalLines((prev) => [...prev, ""]);

    setTimeout(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 300);
      addLinesSequentially(stage.lines, () => {
        setCurrentStage(stageIndex);
        if (stageIndex === 3) setShowResume(true);
      });
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isProcessing) {
      processCommand(inputValue);
      setInputValue("");
    }
  };

  const hackProgress = ((currentStage + 1) / HACK_STAGES.length) * 100;

  // Responsive sizes for floating button
  const btnSize = isMobile ? 48 : 56;
  const btnRadius = isMobile ? 14 : 16;

  return (
    <>
      {/* ─── Glitch transition overlay ────────────────────── */}
      <GlitchTransition show={showGlitch} onComplete={onGlitchComplete} />

      {/* ─── Floating Trigger Button (only when not active) ── */}
      {!active && (
        <motion.button
          id="hacker-mode-trigger"
          onClick={enterHackerMode}
          className="fixed z-[9990] group cursor-pointer"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            bottom: isMobile ? "1.2rem" : "2rem",
            right: isMobile ? "1.2rem" : "2rem",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Enter Hacker Mode"
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-[-6px] rounded-full"
            style={{ border: "2px solid #00ff41", opacity: 0.4 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Button body */}
          <div
            style={{
              width: btnSize,
              height: btnSize,
              borderRadius: btnRadius,
              background:
                "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
              border: "1px solid rgba(0, 255, 65, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 0 25px rgba(0, 255, 65, 0.15), inset 0 0 15px rgba(0, 255, 65, 0.05)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                width: "100%",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, rgba(0,255,65,0.4), transparent)",
              }}
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span
              style={{
                fontSize: isMobile ? "18px" : "22px",
                color: "#00ff41",
                fontFamily: "monospace",
                fontWeight: "bold",
                textShadow: "0 0 10px rgba(0,255,65,0.5)",
                position: "relative",
                zIndex: 1,
              }}
            >
              {">_"}
            </span>
          </div>

          {/* Tooltip — desktop only */}
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 12px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.9)",
                color: "#00ff41",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                fontFamily: "monospace",
                whiteSpace: "nowrap",
                opacity: 0,
                pointerEvents: "none",
                transition: "opacity 0.2s ease",
                border: "1px solid rgba(0,255,65,0.2)",
              }}
              className="group-hover:!opacity-100"
            >
              Enter Hacker Mode 🔓
              <div
                style={{
                  position: "absolute",
                  bottom: "-5px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(45deg)",
                  width: "10px",
                  height: "10px",
                  background: "rgba(0,0,0,0.9)",
                  borderRight: "1px solid rgba(0,255,65,0.2)",
                  borderBottom: "1px solid rgba(0,255,65,0.2)",
                }}
              />
            </div>
          )}
        </motion.button>
      )}

      {/* ─── Full Page Terminal ────────────────────────────── */}
      {active && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            background: "#020208",
          }}
        >
          {/* Matrix rain background */}
          <MatrixRain />

          {/* CRT scan-line overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Subtle vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Glitch effect overlay */}
          <AnimatePresence>
            {glitchText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0, 0.6, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(0,255,65,0.1) 50%, transparent 100%)",
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>

          {/* ── Top Bar ─────────────────────────────────────── */}
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isMobile ? "12px 14px" : "14px 24px",
              background:
                "linear-gradient(180deg, rgba(10,10,20,0.95) 0%, rgba(5,5,16,0.9) 100%)",
              borderBottom: "1px solid rgba(0, 255, 65, 0.12)",
              position: "relative",
              zIndex: 10,
              flexShrink: 0,
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "10px" : "16px",
                minWidth: 0,
              }}
            >
              {/* Traffic lights */}
              <div style={{ display: "flex", gap: "7px", flexShrink: 0 }}>
                <motion.div
                  onClick={exitHackerMode}
                  whileHover={{ scale: 1.3 }}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#ff5f57",
                    cursor: "pointer",
                    boxShadow: "0 0 6px rgba(255,95,87,0.4)",
                  }}
                />
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#febd2f",
                    boxShadow: "0 0 6px rgba(254,189,47,0.4)",
                  }}
                />
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#28c840",
                    boxShadow: "0 0 6px rgba(40,200,64,0.4)",
                  }}
                />
              </div>

              {/* Terminal title */}
              <span
                style={{
                  color: "#4ade80",
                  fontSize: isMobile ? "12px" : "14px",
                  fontFamily: "monospace",
                  fontWeight: "600",
                  letterSpacing: "1.5px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {isMobile
                  ? "root@hack — ~/portfolio"
                  : "root@ayush-portfolio — ~/hack/exploit"}
              </span>
            </div>

            {/* Progress + exit button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "10px" : "16px",
                flexShrink: 0,
              }}
            >
              {/* Progress */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? "6px" : "10px",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "50px" : "120px",
                    height: "4px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.06)",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${hackProgress}%` }}
                    transition={{ duration: 0.5 }}
                    style={{
                      height: "100%",
                      borderRadius: "4px",
                      background:
                        hackProgress === 100
                          ? "linear-gradient(90deg, #fbbf24, #f59e0b)"
                          : "linear-gradient(90deg, #00ff41, #4ade80)",
                      boxShadow:
                        hackProgress === 100
                          ? "0 0 12px rgba(251,191,36,0.5)"
                          : "0 0 8px rgba(0,255,65,0.4)",
                    }}
                  />
                </div>
                <span
                  style={{
                    color: hackProgress === 100 ? "#fbbf24" : "#4ade80",
                    fontSize: isMobile ? "10px" : "12px",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  {hackProgress === 100
                    ? "✓ PWNED"
                    : `${Math.floor(hackProgress)}%`}
                </span>
              </div>

              {/* Exit button */}
              <motion.button
                onClick={exitHackerMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "rgba(255, 95, 87, 0.1)",
                  border: "1px solid rgba(255, 95, 87, 0.3)",
                  borderRadius: "8px",
                  padding: isMobile ? "5px 10px" : "6px 14px",
                  color: "#ff5f57",
                  fontFamily: "monospace",
                  fontSize: isMobile ? "10px" : "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease",
                }}
              >
                {isMobile ? "EXIT" : "EXIT [ESC]"}
              </motion.button>
            </div>
          </motion.div>

          {/* ── Terminal Body ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
            style={{
              flex: 1,
              overflow: "auto",
              padding: isMobile ? "16px 12px" : "24px 32px",
              cursor: "text",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,255,65,0.15) transparent",
              WebkitOverflowScrolling: "touch",
              position: "relative",
              zIndex: 5,
              minHeight: 0,
            }}
          >
            {/* Centered content container for readability */}
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              {/* Output lines */}
              {terminalLines.map((line, i) => (
                <TerminalLine
                  key={`${i}-${line}`}
                  text={line}
                  index={0}
                  isMobile={isMobile}
                />
              ))}

              {/* Loading bar */}
              {running && (
                <LoadingBar
                  progress={progress}
                  text={
                    HACK_STAGES[currentStage + 1]?.loadingText ||
                    "Processing..."
                  }
                  isMobile={isMobile}
                />
              )}

              {/* Resume download button */}
              {showResume && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: "12px", marginBottom: "8px" }}
                >
                  <a
                    href="https://drive.google.com/file/d/1PvFTaEKRuJAiC7oCimgvWrY7q727AOeo/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: isMobile ? "10px 16px" : "10px 20px",
                      background: "rgba(0, 255, 65, 0.08)",
                      border: "1px solid rgba(0, 255, 65, 0.25)",
                      borderRadius: "8px",
                      color: "#4ade80",
                      fontFamily: "monospace",
                      fontSize: isMobile ? "12px" : "14px",
                      fontWeight: "600",
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(0, 255, 65, 0.15)";
                      e.currentTarget.style.boxShadow =
                        "0 0 25px rgba(0,255,65,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(0, 255, 65, 0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    📄 Download Resume
                  </a>
                </motion.div>
              )}

              {/* Input line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "12px",
                  fontFamily: "'Courier New', monospace",
                  fontSize: isMobile ? "12px" : "14px",
                }}
              >
                <span
                  style={{
                    color: "#22c55e",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {isMobile ? "$" : "root@hacker:~$"}
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isProcessing}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#00ff41",
                    fontFamily: "'Courier New', monospace",
                    fontSize: isMobile ? "12px" : "14px",
                    caretColor: "#00ff41",
                    letterSpacing: "0.5px",
                    minWidth: 0,
                    padding: isMobile ? "6px 0" : "4px 0",
                  }}
                />
                {!isProcessing && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                      color: "#00ff41",
                      fontSize: isMobile ? "12px" : "14px",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    █
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── Status Bar ─────────────────────────────────── */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isMobile ? "8px 14px" : "8px 24px",
              background: "rgba(0, 255, 65, 0.03)",
              borderTop: "1px solid rgba(0, 255, 65, 0.08)",
              position: "relative",
              zIndex: 10,
              flexShrink: 0,
              backdropFilter: "blur(10px)",
            }}
          >
            <span
              style={{
                color: "rgba(0, 255, 65, 0.45)",
                fontSize: isMobile ? "10px" : "12px",
                fontFamily: "monospace",
                letterSpacing: "0.5px",
              }}
            >
              {isProcessing ? "⟳ PROCESSING..." : "● READY"}
            </span>
            <div
              style={{
                display: "flex",
                gap: isMobile ? "12px" : "20px",
                color: "rgba(0, 255, 65, 0.35)",
                fontSize: isMobile ? "10px" : "12px",
                fontFamily: "monospace",
                letterSpacing: "0.5px",
              }}
            >
              <span>
                STAGE {currentStage + 1}/{HACK_STAGES.length}
              </span>
              <span>SSH-2.0</span>
              {!isMobile && <span>UTF-8</span>}
              {!isMobile && <span>BASH</span>}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
