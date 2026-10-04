"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheck, FaMoon, FaSun } from "react-icons/fa";

const CONTACT_EMAIL = "contact@ayushyadav.dev";

const tiers = [
  {
    name: "Landing Page",
    price: "₹8,000",
    time: "3 to 5 days",
    blurb: "A fast, good-looking page for a person, shop or small business.",
    features: [
      "Responsive design for phone and desktop",
      "Contact form and WhatsApp button",
      "Basic SEO and fast loading",
      "Deployed on your own domain",
    ],
  },
  {
    name: "Business Site or Store",
    price: "₹15,000",
    time: "1 to 2 weeks",
    blurb: "A multi-page website or a simple online store with a product catalogue.",
    features: [
      "Up to 8 pages or a catalogue of products",
      "WhatsApp or UPI checkout, or Razorpay on request",
      "Admin-friendly content updates",
      "SEO setup and analytics",
    ],
    featured: true,
  },
  {
    name: "Full Stack Web App",
    price: "₹40,000",
    time: "3 to 6 weeks",
    blurb: "A complete product with login, a database, dashboards and APIs.",
    features: [
      "Next.js, Node.js and PostgreSQL (or Firebase)",
      "Authentication and role-based access",
      "REST APIs and an admin dashboard",
      "Milestone-based delivery with demos",
    ],
  },
  {
    name: "Bug Fixing and Support",
    price: "₹500 / hour",
    time: "Flexible",
    blurb: "Fixes, performance work and small features on an existing project.",
    features: [
      "React, Next.js and Node.js code",
      "Clear estimate before I start",
      "Short written summary of every fix",
      "Pay for the hours used",
    ],
  },
];

const steps = [
  { title: "Tell me what you need", text: "Share your idea, a reference site or a rough list of features." },
  { title: "Quick plan and quote", text: "I send a short plan, a fixed price and a timeline before any work starts." },
  { title: "Build in milestones", text: "You see progress early and can change direction before it gets expensive." },
  { title: "Launch and support", text: "I deploy it, hand everything over and stay available for fixes after launch." },
];

const faqs = [
  {
    q: "Are these prices fixed?",
    a: "They are starting prices. The final quote depends on how many pages, features and integrations you need, and I always confirm it in writing before I begin.",
  },
  {
    q: "How does payment work?",
    a: "Larger projects are split into milestones, with an advance to start. I'll agree the exact split with you before work begins.",
  },
  {
    q: "How long does a project take?",
    a: "The ranges above are typical. Tell me your deadline and I'll say honestly whether it is realistic.",
  },
  {
    q: "Do you offer support after delivery?",
    a: "Yes. Bugs in what I built are fixed free for a short period after launch, and ongoing changes are available at the hourly rate.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function Pricing() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Project enquiry")}`;

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="fixed top-0 left-0 w-full z-[1000] flex justify-between items-center px-[5%] py-4 glass">
        <a
          href="/"
          className="flex items-center gap-2 text-[0.9rem] font-[500] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <FaArrowLeft /> Back to portfolio
        </a>
        <a href="/" className="text-[1.6rem] font-[800] tracking-[1px] text-gradient">
          AY
        </a>
        {mounted ? (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
        ) : (
          <span className="w-9 h-9" />
        )}
      </header>

      <main className="max-w-[1100px] mx-auto px-[5%] pt-32 pb-20">
        {/* Hero */}
        <motion.section
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="uppercase tracking-[3px] text-[0.8rem] text-[var(--text-secondary)] mb-3">
            Freelance services
          </p>
          <h1 className="text-[2.2rem] md:text-[3.2rem] font-[800] leading-tight mb-4">
            Simple, <span className="text-gradient">honest pricing</span>
          </h1>
          <p className="max-w-[640px] mx-auto text-[var(--text-secondary)] text-[1.05rem]">
            I build websites, online stores and full stack web apps. Here is what a project
            usually costs, so you know where you stand before we talk.
          </p>
        </motion.section>

        {/* Tiers */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className={`glass relative rounded-2xl p-6 flex flex-col shadow-[var(--shadow-md)] ${
                tier.featured ? "gradient-border shadow-[var(--shadow-glow)]" : ""
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[0.7rem] font-[700] uppercase tracking-[1px] text-white bg-[image:var(--accent-gradient)]">
                  Most popular
                </span>
              )}
              <h2 className="text-[1.15rem] font-[700] mb-1">{tier.name}</h2>
              <p className="text-[0.85rem] text-[var(--text-secondary)] mb-4">{tier.blurb}</p>
              <p className="text-[0.75rem] uppercase tracking-[1px] text-[var(--text-secondary)]">
                Starting at
              </p>
              <p className="text-[1.8rem] font-[800] text-gradient mb-1">{tier.price}</p>
              <p className="text-[0.85rem] text-[var(--text-secondary)] mb-5">{tier.time}</p>
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[0.9rem]">
                    <FaCheck className="mt-1 shrink-0 text-[var(--accent-primary)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={mailto}
                className="text-center py-2.5 rounded-full text-[0.9rem] font-[600] text-white bg-[image:var(--accent-gradient)] hover:opacity-90 transition-opacity"
              >
                Get a quote
              </a>
            </motion.div>
          ))}
        </section>

        {/* Process */}
        <section className="mb-20">
          <h2 className="text-[1.8rem] font-[800] text-center mb-10">How I work</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass rounded-2xl p-6"
              >
                <span className="text-gradient text-[1.6rem] font-[800]">0{i + 1}</span>
                <h3 className="font-[700] mt-1 mb-2">{s.title}</h3>
                <p className="text-[0.9rem] text-[var(--text-secondary)]">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20 max-w-[760px] mx-auto">
          <h2 className="text-[1.8rem] font-[800] text-center mb-8">Common questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((f) => (
              <details key={f.q} className="glass rounded-xl p-5 group">
                <summary className="cursor-pointer font-[600] list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-[var(--accent-primary)] group-open:rotate-45 transition-transform text-[1.3rem]">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[0.95rem] text-[var(--text-secondary)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="glass gradient-border rounded-3xl text-center p-10 shadow-[var(--shadow-glow)]"
        >
          <h2 className="text-[1.8rem] font-[800] mb-3">Have a project in mind?</h2>
          <p className="text-[var(--text-secondary)] max-w-[520px] mx-auto mb-6">
            Tell me what you want to build. I'll reply with a short plan and a clear quote.
          </p>
          <a
            href={mailto}
            className="inline-block px-8 py-3 rounded-full font-[600] text-white bg-[image:var(--accent-gradient)] hover:opacity-90 transition-opacity"
          >
            Start a conversation
          </a>
        </motion.section>
      </main>

      <footer className="text-center text-[0.85rem] text-[var(--text-secondary)] pb-10">
        © {new Date().getFullYear()} Ayush Yadav
      </footer>
    </div>
  );
}
