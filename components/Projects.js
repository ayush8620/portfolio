"use client";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "INNOHUB",
    subtitle: "Full-Stack Startup Networking Platform",
    description: "A full-stack platform enabling innovators to pitch ideas and investors to discover projects. Features category filters, idea voting, and pitch request modals.",
    tech: ["Vanilla JS", "Firebase Auth", "Firestore", "EmailJS"],
    github: "https://github.com/AyushYadav/INNOHUB",
    live: "#" 
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-[6rem] px-[5%] min-h-[80vh]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[2.5rem] font-[800] text-center mb-[4rem]">
          <span className="text-gradient">Featured Projects</span>
        </h2>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[2rem]">
          {projects.map((project, index) => (
            <div key={index} className="glass rounded-[16px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:border-[rgba(59,130,246,0.4)]">
              <div className="py-[2.5rem] px-[2rem] flex flex-col flex-grow">
                <h3 className="text-[1.8rem] font-[800] mb-[0.5rem] text-[var(--text-primary)]">{project.title}</h3>
                <h4 className="text-[1rem] text-[var(--accent-secondary)] mb-[1.5rem] font-[600]">{project.subtitle}</h4>
                <p className="text-[var(--text-secondary)] leading-[1.6] mb-[2rem] flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-[0.8rem] mb-[2rem]">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="bg-[rgba(59,130,246,0.1)] text-[var(--accent-primary)] py-[0.4rem] px-[0.8rem] rounded-[20px] text-[0.85rem] font-[600] border border-[rgba(59,130,246,0.2)]">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-[1.5rem]">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[0.5rem] text-[var(--text-primary)] text-[0.95rem] font-[500] transition-colors duration-300 hover:text-[var(--accent-primary)]">
                    <FaGithub /> Code
                  </a>
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[0.5rem] text-[var(--text-primary)] text-[0.95rem] font-[500] transition-colors duration-300 hover:text-[var(--accent-primary)]">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
