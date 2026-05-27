"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import HackerMode from "@/components/HackerMode";

export default function Home() {
  const [hackerMode, setHackerMode] = useState(false);

  return (
    <>
      {/* Normal portfolio — hidden when hacker mode is active */}
      {!hackerMode && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Experience />
            <Projects />
            <Certificates />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </>
      )}

      {/* HackerMode: floating button when inactive, full page when active */}
      <HackerMode active={hackerMode} setActive={setHackerMode} />
    </>
  );
}
