import React from "react";
import "./About.css";
import { FaCode, FaMobileAlt, FaShieldAlt, FaVideo } from "react-icons/fa";

function About() {
    return (

        <div className="about-container">

            <section className="about">

                <h1 className="about-title">About Me</h1>

                <p className="about-text">
                    I'm a Web Developer skilled in JavaScript, React.js and Firebase with
                    knowledge of Linux and cybersecurity. I enjoy building secure,
                    scalable and user-friendly web applications.
                </p>

                <p className="about-text">
                    I focus on creating responsive and modern web interfaces while also
                    integrating backend services and authentication systems. I have
                    experience working with startups and production teams to deliver
                    high-quality digital products.
                </p>

                <h2 className="section-title">What I'm Doing</h2>

                <div className="services">

                    <div className="service-card">
                        <FaCode className="service-icon" />
                        <div>
                            <h3>Web Development</h3>
                            <p>
                                Building modern and responsive websites using HTML, CSS,
                                JavaScript, React.js and Firebase.
                            </p>
                        </div>
                    </div>

                    <div className="service-card">
                        <FaShieldAlt className="service-icon" />
                        <div>
                            <h3>Cyber Security</h3>
                            <p>
                                Knowledge of penetration testing and security tools such as
                                Nmap, Wireshark and Burp Suite.
                            </p>
                        </div>
                    </div>

                    <div className="service-card">
                        <FaMobileAlt className="service-icon" />
                        <div>
                            <h3>Responsive Apps</h3>
                            <p>
                                Creating responsive UI components and scalable web applications
                                that work across devices.
                            </p>
                        </div>
                    </div>

                    <div className="service-card">
                        <FaVideo className="service-icon" />
                        <div>
                            <h3>Video Editing</h3>
                            <p>
                                Editing promotional and social media videos with storytelling,
                                color correction and transitions.
                            </p>
                        </div>
                    </div>

                </div>

            </section>

        </div>

    );
}

export default About;