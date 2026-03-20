"use client";
import { FaGraduationCap, FaCode, FaServer, FaShieldAlt } from "react-icons/fa";

const skillCategories = [
  { title: "Frontend Development", icon: <FaCode />, skills: ["HTML", "CSS", "JavaScript", "React.js", "Responsive Design"] },
  { title: "Backend & Tools", icon: <FaServer />, skills: ["Git", "GitHub", "Vercel", "VS Code", "Clerk", "Firebase", "ExpressJS"] },
  { title: "Programming", icon: <FaCode />, skills: ["Python", "C"] },
  { title: "Cybersecurity", icon: <FaShieldAlt />, skills: ["Ethical Hacking", "Penetration Testing (Nmap, Wireshark, Burp Suite)", "Web App Security", "SQL Injection", "XSS", "Reverse Shell"] }
];

const education = [
  { degree: "B.Tech Computer Science and Engineering", school: "United Institute of Technology, Allahabad", year: "2025 - Present" },
  { degree: "12th Standard - CBSE - 78.75%", school: "M.V. Convent Inter College, Allahabad", year: "2024" },
  { degree: "10th Standard - CBSE - 79.42%", school: "M.V. Convent Inter College, Allahabad", year: "2022" }
];

export default function Skills() {
  return (
    <section id="skills" className="py-[6rem] px-[5%] min-h-[80vh] relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-[5rem] lg:gap-[4rem]">
          
          <div className="flex-[1.5]">
            <h2 className="text-[2.5rem] font-[800] mb-[3rem]">
              <span className="text-gradient">Skills</span>
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[1.5rem]">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="glass p-[1.5rem] rounded-[16px] transition-transform duration-300 hover:-translate-y-[5px] hover:border-[rgba(139,92,246,0.4)]">
                  <div className="flex items-center gap-[1rem] mb-[1.5rem]">
                    <div className="text-[1.5rem] text-[var(--accent-secondary)] bg-[rgba(139,92,246,0.1)] p-[0.8rem] rounded-[12px]">
                      {cat.icon}
                    </div>
                    <h3 className="text-[1.2rem] font-[700] text-[var(--text-primary)]">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {cat.skills.map((skill, i) => (
                      <span key={i} className="bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] py-[0.4rem] px-[0.8rem] rounded-[8px] text-[0.85rem] border border-[var(--border-color)] transition-all duration-300 hover:border-[rgba(139,92,246,0.5)] hover:bg-[rgba(139,92,246,0.1)] hover:text-[var(--text-primary)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-[1]">
            <h2 className="text-[2.5rem] font-[800] mb-[3rem]">
              <span className="text-gradient">Education</span>
            </h2>
            <div className="flex flex-col gap-[1.5rem]">
              {education.map((edu, idx) => (
                <div key={idx} className="glass p-[1.5rem] rounded-[16px] relative transition-transform duration-300 hover:translate-x-[5px] hover:border-[rgba(59,130,246,0.4)]">
                  <div className="absolute top-[-15px] right-[-15px] w-[40px] h-[40px] bg-[var(--bg-color)] border-[2px] border-[var(--accent-primary)] rounded-[50%] flex items-center justify-center text-[var(--accent-primary)] text-[1.2rem] shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    <FaGraduationCap />
                  </div>
                  <h3 className="text-[1.2rem] font-[700] text-[var(--text-primary)] mb-[0.5rem] pr-[1.5rem]">{edu.degree}</h3>
                  <h4 className="text-[1rem] text-[var(--text-secondary)] mb-[1rem]">{edu.school}</h4>
                  <div className="inline-block text-[0.85rem] text-[var(--accent-primary)] bg-[rgba(59,130,246,0.1)] py-[0.3rem] px-[0.8rem] rounded-[20px] font-[600]">
                    {edu.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
