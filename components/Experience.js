"use client";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";

const experiences = [
  {
    role: "Full Stack Developer Intern",
    company: "Crensa Studio Pvt. Ltd.",
    date: "Nov 2025 - Jan 2026",
    points: [
      "Implemented PWA features including service workers and caching strategies to enhance offline capability and performance.",
      "Developed responsive frontend UI components using modern web technologies.",
      "Integrated backend APIs to support platform functionality."
    ]
  },
  {
    role: "Creative Production Intern",
    company: "Crensa Studio Pvt. Ltd.",
    date: "Nov 2025 - Jan 2026",
    points: [
      "Captured cinematic visuals and managed on-ground shoots for Crensa Originals productions.",
      "Edited short-form video content with storytelling precision and visual consistency."
    ]
  },
  {
    role: "Video Editing Intern",
    company: "United Incubation Hub",
    date: "2024 - 2025",
    points: [
      "Edited short-form promotional and event videos for startup and incubation programs.",
      "Applied color correction, transitions, and audio synchronization to improve video quality.",
      "Collaborated with the media and event team to create content for social media campaigns."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-[6rem] px-[5%] min-h-screen relative">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-[2.5rem] font-[800] text-center mb-[4rem]">
          <span className="text-gradient">Experience</span>
        </h2>
        
        <div className="relative max-w-[800px] mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute w-[2px] bg-[var(--border-color)] top-0 bottom-0 left-[20px] md:left-[20px] ml-[-1px] md:ml-[-1px] max-md:left-[15px]"></div>
          
          <div>
            {experiences.map((exp, index) => (
              <div key={index} className="py-[2rem] px-0 relative pl-[60px] max-md:pl-[45px]">
                {/* Timeline Dot */}
                <div className="absolute w-[40px] h-[40px] left-0 top-[2rem] bg-[var(--bg-color)] border-[2px] border-[var(--accent-primary)] rounded-[50%] z-10 flex items-center justify-center text-[var(--accent-primary)] text-[1.2rem] shadow-[0_0_15px_rgba(59,130,246,0.3)] max-md:w-[30px] max-md:h-[30px] max-md:top-[2.2rem] max-md:text-[0.9rem]">
                  <FaBriefcase />
                </div>
                
                {/* Content Card */}
                <div className="glass p-[2rem] max-md:p-[1.5rem] rounded-[12px] transition-transform duration-300 hover:-translate-y-[5px] hover:border-[rgba(59,130,246,0.3)]">
                  <h3 className="text-[1.5rem] font-[700] text-[var(--text-primary)] mb-[0.5rem]">{exp.role}</h3>
                  <h4 className="text-[1.2rem] text-[var(--accent-secondary)] font-[600] mb-[1rem]">{exp.company}</h4>
                  <div className="flex items-center gap-[0.5rem] text-[var(--text-secondary)] text-[0.9rem] mb-[1.5rem] bg-[rgba(255,255,255,0.05)] py-[0.5rem] px-[1rem] rounded-[20px] w-fit">
                    <FaCalendarAlt /> {exp.date}
                  </div>
                  <ul className="list-disc pl-[1.5rem] text-[var(--text-secondary)] leading-[1.6]">
                    {exp.points.map((point, i) => (
                      <li key={i} className="mb-[0.8rem]">{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
