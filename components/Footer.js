"use client";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-color)] pt-[4rem] px-[5%] pb-[2rem] mt-[5rem]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left flex-wrap gap-[2rem] mb-[3rem]">
        <div>
          <h2 className="text-[2rem] font-[800] mb-[0.5rem] text-gradient">Ayush Yadav</h2>
          <p className="text-[var(--text-secondary)] text-[1rem]">Full Stack Developer | Cybersecurity Enthusiast</p>
        </div>
        <div className="flex gap-[1.5rem]">
          <a href="https://github.com/ayush8620" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] text-[1.5rem] transition-all duration-300 hover:text-[var(--accent-primary)] hover:-translate-y-[3px]">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ayush-yadav-6a0525320" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] text-[1.5rem] transition-all duration-300 hover:text-[var(--accent-primary)] hover:-translate-y-[3px]">
            <FaLinkedin />
          </a>
          <a href="mailto:yadavaayush8484@gmail.com" className="text-[var(--text-secondary)] text-[1.5rem] transition-all duration-300 hover:text-[var(--accent-primary)] hover:-translate-y-[3px]">
            <FaEnvelope />
          </a>
        </div>
      </div>
      <div className="text-center text-[var(--text-secondary)] opacity-80 text-[0.9rem] border-t border-[var(--border-color)] pt-[2rem] space-y-2">
        <p>&copy; {new Date().getFullYear()} Ayush Yadav. All rights reserved.</p>
        <p>Built with Next.js & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
