"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, FileText, Image as ImageIcon, ExternalLink, Star } from "lucide-react";

const certificates = [
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

export default function Certificates() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="certificates" ref={sectionRef} className="py-[7rem] px-[5%] relative min-h-screen">
      {/* ── ambient glows ── */}
      <div className="absolute top-[20%] right-[0%] w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-tertiary, #06b6d4) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)" }} />
      
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
              <Award size={13} /> Achievements
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-[2.8rem] sm:text-[3.2rem] font-[800] leading-[1.15]">
            <span className="text-gradient">Certificates</span>
          </motion.h2>
          
          <motion.p variants={fadeUp} className="mt-[1rem] text-[var(--text-secondary)] text-[1.05rem] max-w-[540px] mx-auto leading-[1.6]">
            A showcase of my continuous learning, hackathon participations, and professional training certifications.
          </motion.p>
        </motion.div>

        {/* ── certificates grid ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.5rem]"
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{
                y: -6,
                boxShadow: "0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(59,130,246,0.15)",
              }}
              className="glass rounded-[16px] overflow-hidden flex flex-col group transition-all duration-300"
            >
              {/* Thumbnail Area */}
              <div className="h-[180px] w-full relative overflow-hidden bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
                {cert.type === "image" ? (
                  <>
                    <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-all duration-300"></div>
                    <img src={cert.file} alt={cert.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[var(--accent-primary)] opacity-80 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(135deg,rgba(59,130,246,0.05),rgba(139,92,246,0.05))]">
                    <FileText size={48} className="mb-[10px]" strokeWidth={1.5} />
                    <span className="text-[0.85rem] font-[600] uppercase tracking-wider text-[var(--text-secondary)]">PDF Document</span>
                  </div>
                )}
                
                {/* View Overlay Button */}
                <a 
                  href={cert.file} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]"
                >
                  <span className="flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg-color)] py-2 px-4 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ExternalLink size={16} /> View
                  </span>
                </a>
              </div>
              
              {/* Content Area */}
              <div className="p-[1.5rem] flex flex-col flex-grow border-t border-[var(--glass-border)] bg-[rgba(255,255,255,0.01)]">
                <div className="flex items-center gap-[0.5rem] mb-[0.5rem]">
                  <span className="p-[6px] rounded-[8px] bg-[rgba(59,130,246,0.1)] text-[var(--accent-primary)]">
                    {cert.type === "image" ? <ImageIcon size={14} /> : <FileText size={14} />}
                  </span>
                  <span className="text-[0.75rem] font-[600] tracking-wider uppercase text-[var(--text-secondary)]">
                    {cert.type === "image" ? "Image" : "Document"}
                  </span>
                </div>
                <h3 className="text-[1.1rem] font-[700] text-[var(--text-primary)] mb-[0.5rem] line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-[0.85rem] text-[var(--text-secondary)] line-clamp-2 mt-auto">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
