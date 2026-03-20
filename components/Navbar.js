"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full flex justify-between items-center z-[1000] transition-all duration-300 ${scrolled ? "py-[1rem] px-[5%] glass border-b border-[var(--glass-border)]" : "py-[1.8rem] px-[5%] bg-transparent"}`}>
      
      <div className="text-[1.8rem] font-[800] tracking-[1px] z-[1001]">
        <a href="#hero" className="text-gradient"></a>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-[2.5rem]">
        <ul className="flex items-center gap-[2.5rem]">
          <li><a href="#experience" className="text-[0.95rem] font-[500] uppercase tracking-[1px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative group transition-colors duration-300">
            Experience
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[image:var(--accent-gradient)] transition-all duration-300 group-hover:w-full"></span>
          </a></li>
          <li><a href="#projects" className="text-[0.95rem] font-[500] uppercase tracking-[1px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative group transition-colors duration-300">
            Projects
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[image:var(--accent-gradient)] transition-all duration-300 group-hover:w-full"></span>
          </a></li>
          <li><a href="#skills" className="text-[0.95rem] font-[500] uppercase tracking-[1px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative group transition-colors duration-300">
            Skills
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[image:var(--accent-gradient)] transition-all duration-300 group-hover:w-full"></span>
          </a></li>
          <li><a href="#contact" className="text-[0.95rem] font-[500] uppercase tracking-[1px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative group transition-colors duration-300">
            Contact
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[image:var(--accent-gradient)] transition-all duration-300 group-hover:w-full"></span>
          </a></li>
        </ul>
        
        {mounted && (
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-lg ml-2">
            {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
        )}
      </div>

      {/* Mobile Hamburger & Theme Toggle */}
      <div className="flex items-center gap-6 md:hidden z-[1001]">
        {mounted && (
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-[var(--text-secondary)] text-lg">
            {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
        )}
        
        <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-[5px] cursor-pointer">
          <span className={`w-[25px] h-[2px] bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}></span>
          <span className={`w-[25px] h-[2px] bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-[25px] h-[2px] bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`fixed top-0 w-[60%] h-screen bg-[var(--bg-surface)] flex flex-col justify-center border-l border-[var(--border-color)] transition-all duration-300 ease-in-out md:hidden z-[1000] ${menuOpen ? "right-0" : "right-[-100%]"}`}>
        <ul className="flex flex-col items-center gap-8 text-[0.95rem] font-[500] uppercase tracking-[1px]">
          <li><a href="#experience" className="text-[var(--text-secondary)]" onClick={() => setMenuOpen(false)}>Experience</a></li>
          <li><a href="#projects" className="text-[var(--text-secondary)]" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#skills" className="text-[var(--text-secondary)]" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li><a href="#contact" className="text-[var(--text-secondary)]" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
