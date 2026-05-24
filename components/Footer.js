"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Heart } from "lucide-react";

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/ayush8620",
    label: "GitHub",
    hoverColor: "hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]",
    hoverBg: "hover:bg-[rgba(255,255,255,0.1)]",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/ayush-yadav-6a0525320",
    label: "LinkedIn",
    hoverColor: "hover:text-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.25)]",
    hoverBg: "hover:bg-[rgba(10,102,194,0.1)]",
  },
  {
    icon: Mail,
    href: "mailto:yadavaayush8484@gmail.com",
    label: "Email",
    hoverColor: "hover:text-[var(--accent-primary)] hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]",
    hoverBg: "hover:bg-[rgba(59,130,246,0.1)]",
  },
];

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <footer ref={footerRef} className="relative mt-[5rem] overflow-hidden">
      {/* Animated gradient line at top */}
      <div className="h-[2px] w-full bg-[linear-gradient(90deg,transparent_0%,var(--accent-primary)_25%,var(--accent-secondary)_50%,var(--accent-primary)_75%,transparent_100%)] opacity-60" />

      <div className="bg-[var(--bg-surface)] pt-[3.5rem] pb-[1.5rem] px-[5%]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-[1200px] mx-auto"
        >
          {/* Main Footer Content */}
          <div className="flex flex-col items-center text-center mb-[2.5rem]">
            {/* Name & Tagline */}
            <motion.div variants={itemVariants} className="mb-[1.5rem]">
              <h2 className="text-[1.8rem] md:text-[2.2rem] font-[800] mb-[0.4rem]">
                <span className="text-gradient">Ayush Yadav</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-[0.95rem] md:text-[1rem] font-[400]">
                Full Stack Developer | Cybersecurity Enthusiast
              </p>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={itemVariants} className="flex gap-[1rem] mb-[2rem]">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-[var(--text-secondary)] text-[1.2rem] border border-[var(--border-color)] bg-transparent transition-all duration-300 ${social.hoverColor} ${social.hoverBg}`}
                  >
                    <IconComponent className="w-[18px] h-[18px]" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Quick Navigation Links */}
            <motion.nav variants={itemVariants} className="flex flex-wrap justify-center gap-x-[1.5rem] gap-y-[0.5rem] mb-[0.5rem]">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-[var(--text-secondary)] text-[0.85rem] font-[500] hover:text-[var(--accent-primary)] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[var(--accent-primary)] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          </div>

          {/* Elegant Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-[1rem] mb-[1.5rem]"
          >
            <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,transparent,var(--border-color))]" />
            <div className="w-[6px] h-[6px] rounded-full bg-[var(--accent-primary)] opacity-40" />
            <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,var(--border-color),transparent)]" />
          </motion.div>

          {/* Copyright Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-[0.75rem] text-[var(--text-secondary)] text-[0.8rem]"
          >
            <p className="opacity-70">
              &copy; {new Date().getFullYear()} Ayush Yadav. All rights reserved.
            </p>
            <p className="opacity-70 flex items-center gap-[0.4rem]">
              Built with
              <span className="inline-flex items-center gap-[0.25rem]">
                <Heart className="w-[12px] h-[12px] text-red-500 fill-red-500" />
              </span>
              using Next.js & Tailwind CSS
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
