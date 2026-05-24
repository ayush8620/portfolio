"use client";
import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, XCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "yadavaayush8484@gmail.com",
    link: "mailto:yadavaayush8484@gmail.com",
    linkText: "Say Hello",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "N/A (Prefer Email)",
    link: null,
    linkText: null,
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Allahabad, India",
    link: null,
    linkText: null,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: "success", title: "", message: "" });
  const [focusedField, setFocusedField] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardSlideLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const formSlideRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
    },
  };

  return (
    <section id="contact" ref={sectionRef} className="py-[6rem] px-[5%] min-h-[70vh] flex items-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-[4rem]"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-[1rem] py-[0.35rem] rounded-full text-[0.75rem] font-[700] uppercase tracking-[0.15em] mb-[1rem] bg-[rgba(59,130,246,0.1)] text-[var(--accent-primary)] border border-[rgba(59,130,246,0.2)]"
          >
            Contact
          </motion.span>
          <h2 className="text-[2.5rem] md:text-[3rem] font-[800] mb-[1rem] leading-tight">
            <span className="text-gradient">Get In Touch</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-[1.05rem] md:text-[1.15rem] max-w-[550px] mx-auto leading-relaxed">
            Interested in working together or have a question? Feel free to reach out — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-[2.5rem] lg:gap-[3rem] items-start">
          {/* Contact Info Cards - Slide from Left */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1 flex flex-col gap-[1.25rem] w-full"
          >
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardSlideLeft}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  className="glass p-[1.75rem] rounded-[16px] flex items-center gap-[1.5rem] cursor-default group hover:border-[rgba(59,130,246,0.3)] transition-colors duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-[56px] h-[56px] flex-shrink-0 rounded-[14px] flex items-center justify-center bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] group-hover:bg-[rgba(59,130,246,0.15)] group-hover:border-[rgba(59,130,246,0.35)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"
                  >
                    <IconComponent className="w-[22px] h-[22px] text-[var(--accent-primary)]" />
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="text-[1.1rem] font-[700] mb-[0.2rem] text-[var(--text-primary)]">
                      {info.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-[0.9rem] leading-[1.5] break-all">
                      {info.value}
                    </p>
                    {info.link && (
                      <a
                        href={info.link}
                        className="inline-block mt-[0.4rem] text-[var(--accent-primary)] font-[600] text-[0.85rem] hover:text-[var(--accent-secondary)] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[var(--accent-secondary)] after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {info.linkText} →
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="hidden lg:block mt-[0.5rem] p-[1.5rem] rounded-[14px] border border-dashed border-[var(--border-color)] text-center"
            >
              <p className="text-[var(--text-secondary)] text-[0.85rem] opacity-70">
                💡 I typically respond within 24 hours
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form - Slide from Right */}
          <motion.div
            variants={formSlideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-[1.5] w-full"
          >
            <div className="glass p-[2rem] md:p-[2.5rem] rounded-[20px] relative overflow-hidden">
              {/* Subtle corner glow */}
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-[1.5rem] relative z-10">
                {/* Name Field */}
                <div className="flex flex-col gap-[0.5rem]">
                  <label
                    htmlFor="name"
                    className={`text-[0.85rem] font-[600] tracking-wide uppercase transition-colors duration-300 ${
                      focusedField === "name" ? "text-[var(--accent-primary)]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    Your Name
                  </label>
                  <motion.div whileTap={{ scale: 0.995 }}>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      required
                      className="w-full bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] p-[0.9rem] px-[1.1rem] rounded-[10px] text-[var(--text-primary)] outline-none transition-all duration-300 focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12),0_0_20px_rgba(59,130,246,0.06)] placeholder:text-[var(--text-secondary)] placeholder:opacity-40 text-[0.95rem]"
                    />
                  </motion.div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-[0.5rem]">
                  <label
                    htmlFor="email"
                    className={`text-[0.85rem] font-[600] tracking-wide uppercase transition-colors duration-300 ${
                      focusedField === "email" ? "text-[var(--accent-primary)]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    Your Email
                  </label>
                  <motion.div whileTap={{ scale: 0.995 }}>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      required
                      className="w-full bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] p-[0.9rem] px-[1.1rem] rounded-[10px] text-[var(--text-primary)] outline-none transition-all duration-300 focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12),0_0_20px_rgba(59,130,246,0.06)] placeholder:text-[var(--text-secondary)] placeholder:opacity-40 text-[0.95rem]"
                    />
                  </motion.div>
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-[0.5rem]">
                  <label
                    htmlFor="message"
                    className={`text-[0.85rem] font-[600] tracking-wide uppercase transition-colors duration-300 ${
                      focusedField === "message" ? "text-[var(--accent-primary)]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    Your Message
                  </label>
                  <motion.div whileTap={{ scale: 0.995 }}>
                    <textarea
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="How can I help you?"
                      required
                      className="w-full bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] p-[0.9rem] px-[1.1rem] rounded-[10px] text-[var(--text-primary)] outline-none transition-all duration-300 focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12),0_0_20px_rgba(59,130,246,0.06)] placeholder:text-[var(--text-secondary)] placeholder:opacity-40 resize-y min-h-[130px] text-[0.95rem]"
                    />
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { y: -3, boxShadow: "0 12px 28px rgba(59,130,246,0.35)" } : {}}
                  whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                  className="mt-[0.5rem] flex items-center justify-center gap-[0.75rem] py-[0.95rem] px-[2rem] bg-[image:var(--accent-gradient)] text-white border-none rounded-[10px] font-[700] text-[1rem] cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.25)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none relative overflow-hidden group"
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.15)_45%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.15)_55%,transparent_60%)] bg-[length:200%_100%] animate-[shimmer_3s_infinite] pointer-events-none" />

                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-[18px] h-[18px] animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px]" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {modal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[20px] p-[2.5rem] max-w-[420px] w-full text-center shadow-[0_25px_60px_rgba(0,0,0,0.4)] relative overflow-hidden"
            >
              {/* Modal corner glow */}
              <div
                className={`absolute top-0 left-0 w-full h-[3px] ${
                  modal.type === "success"
                    ? "bg-[linear-gradient(90deg,transparent,#22c55e,transparent)]"
                    : "bg-[linear-gradient(90deg,transparent,#ef4444,transparent)]"
                }`}
              />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                className={`mx-auto w-[64px] h-[64px] rounded-full flex items-center justify-center mb-[1.5rem] ${
                  modal.type === "success"
                    ? "bg-green-500/15 border border-green-500/25"
                    : "bg-red-500/15 border border-red-500/25"
                }`}
              >
                {modal.type === "success" ? (
                  <CheckCircle className="w-[30px] h-[30px] text-green-500" />
                ) : (
                  <XCircle className="w-[30px] h-[30px] text-red-500" />
                )}
              </motion.div>

              <h3 className="text-[1.4rem] font-[800] text-[var(--text-primary)] mb-[0.5rem]">
                {modal.title}
              </h3>
              <p className="text-[var(--text-secondary)] mb-[2rem] leading-[1.6] text-[0.95rem]">
                {modal.message}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={closeModal}
                className="w-full py-[0.85rem] rounded-[10px] font-[600] text-[0.95rem] transition-all duration-300 bg-[var(--text-primary)] text-[var(--bg-color)] hover:opacity-90"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shimmer keyframe style */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
