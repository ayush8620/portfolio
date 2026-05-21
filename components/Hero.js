"use client";
import { FaDownload, FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-[5%] overflow-hidden">
      <div className="absolute top-[30%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,_rgba(59,130,246,0.15)_0%,_rgba(139,92,246,0.1)_40%,_transparent_70%)] z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-[800px] text-center animate-[fadeIn_1s_ease-out] flex flex-col items-center">

        {/* Profile Image */}
        <div className="mb-[2rem] w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-[50%] overflow-hidden border-[4px] border-[var(--glass-border)] shadow-[0_0_30px_rgba(59,130,246,0.2)] dark:shadow-[0_0_30px_rgba(59,130,246,0.4)] relative group transition-all duration-500 hover:border-[var(--accent-primary)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]">
          <img src="/profile.png" alt="Ayush Yadav" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>

        <h3 className="text-[1.2rem] text-[var(--text-secondary)] mb-[0.5rem] font-[500] tracking-[2px] uppercase">
          Hi, I am
        </h3>
        <h1 className="text-[clamp(3rem,8vw,5rem)] font-[800] leading-[1.1] mb-[1rem]">
          Ayush Yadav
        </h1>
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-[700] mb-[1.5rem]">
          <span className="text-gradient">Full Stack Developer</span>
        </h2>

        <p className="text-[1.1rem] text-[var(--text-secondary)] leading-[1.6] mb-[2.5rem] max-w-[600px] mx-auto">
          Web developer skilled in JavaScript, React.js, and Firebase with knowledge of Linux and cybersecurity, seeking to build secure and scalable web applications.
        </p>

        <div className="flex flex-col md:flex-row gap-[1.5rem] justify-center text-center">
          <a href="#projects" className="flex items-center justify-center gap-[0.5rem] py-[0.8rem] px-[2rem] rounded-[50px] font-[600] text-[1rem] bg-[image:var(--accent-gradient)] text-white border-none cursor-pointer transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)]">
            View Work <FaArrowRight />
          </a>
          <a href="https://drive.google.com/file/d/1PvFTaEKRuJAiC7oCimgvWrY7q727AOeo/view?usp=sharing" className="flex items-center justify-center gap-[0.5rem] py-[0.8rem] px-[2rem] rounded-[50px] font-[600] text-[1rem] bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)] hover:-translate-y-[3px] dark:hover:bg-[rgba(255,255,255,0.05)]" target="_blank">
            Resume <FaDownload />
          </a>
    <a href="https://drive.google.com/drive/folders/19sKjIEUUKDHKO1UeOReKjSZTe9M4pwYC?usp=sharing" className="flex items-center justify-center gap-[0.5rem] py-[0.8rem] px-[2rem] rounded-[50px] font-[600] text-[1rem] bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)] hover:-translate-y-[3px] dark:hover:bg-[rgba(255,255,255,0.05)]" target="_blank">
            OOPs With Java <FaDownload />
          </a>
        </div>
      </div>
    </section>
  );
}
