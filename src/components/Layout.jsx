import React from "react";
import ProfileSection from "./ProfileSection";
import About from "./About";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">

      <div className="left">
        <ProfileSection />
      </div>

      <div className="right">
        <About />
      </div>

    </div>
  );
}

export default Layout;