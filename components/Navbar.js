"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(`#${id}`);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const linkContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const linkItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      x: "100%",
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const mobileLinkContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
    exit: {},
  };

  const mobileLinkItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: { x: 50, opacity: 0, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 w-full flex justify-between items-center z-[1000] transition-all duration-500 ${
        scrolled
          ? "py-3 px-[5%] glass border-b border-[var(--glass-border)] shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "py-5 px-[5%] bg-transparent"
      }`}
    >
      {/* Logo */}
      <motion.div
        className="text-[1.8rem] font-[800] tracking-[1px] z-[1001]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <a href="#hero" className="text-gradient">
          AY
        </a>
      </motion.div>

      {/* Desktop Menu */}
      <motion.div
        className="hidden md:flex items-center gap-[2rem]"
        variants={linkContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <ul className="flex items-center gap-[2rem]">
          {navLinks.map((link) => (
            <motion.li key={link.href} variants={linkItemVariants}>
              <a
                href={link.href}
                className="relative text-[0.9rem] font-[500] uppercase tracking-[1.5px] py-1 transition-colors duration-300 group"
                style={{
                  color:
                    activeSection === link.href
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                }}
              >
                {link.label}

                {/* Hover underline */}
                <span
                  className="absolute bottom-[-2px] left-0 h-[2px] bg-[image:var(--accent-gradient)] transition-all duration-300 ease-out"
                  style={{
                    width: activeSection === link.href ? "100%" : "0%",
                  }}
                />

                {/* Animated active indicator */}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[image:var(--accent-gradient)]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Hover glow */}
                <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[image:var(--accent-gradient)] transition-all duration-300 group-hover:w-full" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Theme Toggle */}
        {mounted && (
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors duration-300 ml-1 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute"
                >
                  <FaSun className="text-yellow-400 text-base" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute"
                >
                  <FaMoon className="text-base" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </motion.div>

      {/* Mobile: Theme Toggle + Hamburger */}
      <div className="flex items-center gap-5 md:hidden z-[1001]">
        {mounted && (
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="sun-mobile"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <FaSun className="text-yellow-400 text-base" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon-mobile"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <FaMoon className="text-base" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}

        {/* Premium Hamburger → X animation */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-7 h-5 flex flex-col justify-between cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-full h-[2px] bg-[var(--text-primary)] rounded-full origin-center"
            animate={
              menuOpen
                ? { rotate: 45, y: 9 }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="block w-full h-[2px] bg-[var(--text-primary)] rounded-full"
            animate={
              menuOpen
                ? { opacity: 0, scaleX: 0 }
                : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-full h-[2px] bg-[var(--text-primary)] rounded-full origin-center"
            animate={
              menuOpen
                ? { rotate: -45, y: -9 }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </button>
      </div>

      {/* Mobile Menu: Backdrop Overlay + Slide-out Panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark overlay */}
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-out panel */}
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 w-[70%] max-w-[320px] h-screen bg-[var(--bg-surface)] border-l border-[var(--border-color)] flex flex-col justify-center items-center z-[1000] md:hidden shadow-[-10px_0_40px_rgba(0,0,0,0.2)]"
            >
              <motion.ul
                className="flex flex-col items-center gap-10"
                variants={mobileLinkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navLinks.map((link) => (
                  <motion.li key={link.href} variants={mobileLinkItemVariants}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="relative text-[1.1rem] font-[600] uppercase tracking-[2px] transition-colors duration-300"
                      style={{
                        color:
                          activeSection === link.href
                            ? "var(--text-primary)"
                            : "var(--text-secondary)",
                      }}
                    >
                      {link.label}
                      {activeSection === link.href && (
                        <motion.span
                          layoutId="activeMobileIndicator"
                          className="absolute -bottom-2 left-0 w-full h-[2px] bg-[image:var(--accent-gradient)]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Decorative gradient line at bottom */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[image:var(--accent-gradient)] rounded-full opacity-40" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
