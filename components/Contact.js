"use client";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: "success", title: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModal({ isOpen: true, type: "success", title: "Message Sent!", message: "Thank you for reaching out. I'll get back to you as soon as possible." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setModal({ isOpen: true, type: "error", title: "Delivery Failed", message: "Server Error 500. Did you remember to RESTART your dev server after saving the .env variables?" });
      }
    } catch (error) {
      console.error(error);
      setModal({ isOpen: true, type: "error", title: "Network Error", message: "An unexpected error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => setModal({ ...modal, isOpen: false });

  return (
    <section id="contact" className="py-[6rem] px-[5%] min-h-[70vh] flex items-center">
      <div className="max-w-[1200px] mx-auto w-full">
        <h2 className="text-[2.5rem] font-[800] text-center mb-[1rem]">
          <span className="text-gradient">Get In Touch</span>
        </h2>
        <p className="text-center text-[var(--text-secondary)] text-[1.1rem] mb-[4rem] max-w-[600px] mx-auto">
          Interested in working together or have a question? Feel free to reach out.
        </p>

        <div className="flex flex-col md:flex-row gap-[3rem] items-start">
          <div className="flex-[1] flex flex-col gap-[1.5rem] w-full">
            
            <div className="glass p-[2rem] rounded-[16px] flex items-center gap-[1.5rem] transition-transform duration-300 hover:-translate-y-[5px] hover:border-[rgba(59,130,246,0.4)]">
              <div className="w-[60px] h-[60px] flex-shrink-0 bg-[rgba(59,130,246,0.1)] rounded-[50%] border border-[rgba(59,130,246,0.2)] flex items-center justify-center text-[var(--accent-primary)] text-[1.5rem]">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="text-[1.2rem] font-[700] mb-[0.3rem] text-[var(--text-primary)]">Email</h3>
                <p className="text-[var(--text-secondary)] mb-[0.5rem] text-[0.95rem] leading-[1.5]">yadavaayush8484@gmail.com</p>
                <a href="mailto:yadavaayush8484@gmail.com" className="text-[var(--accent-primary)] font-[600] text-[0.9rem] transition-colors duration-300 hover:text-[var(--accent-secondary)] hover:underline">Say Hello</a>
              </div>
            </div>

            <div className="glass p-[2rem] rounded-[16px] flex items-center gap-[1.5rem] transition-transform duration-300 hover:-translate-y-[5px] hover:border-[rgba(59,130,246,0.4)]">
              <div className="w-[60px] h-[60px] flex-shrink-0 bg-[rgba(59,130,246,0.1)] rounded-[50%] border border-[rgba(59,130,246,0.2)] flex items-center justify-center text-[var(--accent-primary)] text-[1.5rem]">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="text-[1.2rem] font-[700] mb-[0.3rem] text-[var(--text-primary)]">Phone</h3>
                <p className="text-[var(--text-secondary)] mb-[0.5rem] text-[0.95rem] leading-[1.5]">+91 8896848466</p>
                <a href="tel:+918896848466" className="text-[var(--accent-primary)] font-[600] text-[0.9rem] transition-colors duration-300 hover:text-[var(--accent-secondary)] hover:underline">Call Me</a>
              </div>
            </div>

            <div className="glass p-[2rem] rounded-[16px] flex items-center gap-[1.5rem] transition-transform duration-300 hover:-translate-y-[5px] hover:border-[rgba(59,130,246,0.4)]">
              <div className="w-[60px] h-[60px] flex-shrink-0 bg-[rgba(59,130,246,0.1)] rounded-[50%] border border-[rgba(59,130,246,0.2)] flex items-center justify-center text-[var(--accent-primary)] text-[1.5rem]">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="text-[1.2rem] font-[700] mb-[0.3rem] text-[var(--text-primary)]">Location</h3>
                <p className="text-[var(--text-secondary)] text-[0.95rem] leading-[1.5]">Allahabad, India</p>
              </div>
            </div>
            
          </div>

          <div className="glass flex-[1.5] p-[2.5rem] rounded-[16px] w-full border-[var(--glass-border)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-[1.5rem]">
              <div className="flex flex-col gap-[0.5rem]">
                <label htmlFor="name" className="text-[0.9rem] font-[600] text-[var(--text-secondary)]">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe" 
                  required 
                  className="w-full bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(0,0,0,0.2)] border border-[var(--border-color)] p-[1rem] rounded-[8px] text-[var(--text-primary)] outline-none transition-all duration-300 focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]"
                />
              </div>
              <div className="flex flex-col gap-[0.5rem]">
                <label htmlFor="email" className="text-[0.9rem] font-[600] text-[var(--text-secondary)]">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com" 
                  required 
                   className="w-full bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(0,0,0,0.2)] border border-[var(--border-color)] p-[1rem] rounded-[8px] text-[var(--text-primary)] outline-none transition-all duration-300 focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]"
                />
              </div>
              <div className="flex flex-col gap-[0.5rem]">
                <label htmlFor="message" className="text-[0.9rem] font-[600] text-[var(--text-secondary)]">Your Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="How can I help you?" 
                  required 
                  className="w-full bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(0,0,0,0.2)] border border-[var(--border-color)] p-[1rem] rounded-[8px] text-[var(--text-primary)] outline-none transition-all duration-300 focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] resize-y"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-[1rem] flex items-center justify-center gap-[0.8rem] py-[1rem] px-[2rem] bg-[image:var(--accent-gradient)] text-white border-none rounded-[8px] font-[700] text-[1.1rem] cursor-pointer transition-all duration-300 hover:not-disabled:-translate-y-[3px] hover:not-disabled:shadow-[0_10px_20px_rgba(59,130,246,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"} <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[16px] p-[2rem] max-w-[400px] w-full text-center shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform transition-all duration-300 scale-100">
            <div className={`mx-auto w-[60px] h-[60px] rounded-full flex items-center justify-center text-[2rem] mb-[1.5rem] ${modal.type === 'success' ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}>
              {modal.type === 'success' ? '✓' : '✖'}
            </div>
            <h3 className="text-[1.5rem] font-[800] text-[var(--text-primary)] mb-[0.5rem]">{modal.title}</h3>
            <p className="text-[var(--text-secondary)] mb-[2rem] leading-[1.5]">{modal.message}</p>
            <button 
              onClick={closeModal}
              className="w-full py-[0.8rem] rounded-[8px] font-[600] transition-all duration-300 bg-[var(--text-primary)] text-[var(--bg-color)] hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
