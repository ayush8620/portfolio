import React from "react";
import "./ProfileSection.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import profileImage from "../assets/profile.png";

export default function ProfileSection() {
  return (
    <div className="profile-container">
      <div className="profile-card">

        <img
          src={profileImage}
          alt="Ayush Yadav"
          className="profile-img"
        />

        <h2>Ayush Yadav</h2>
        <span className="role">Web developer</span>

        <hr />

        <div className="info">
          <div className="info-item">
            <MdEmail className="icon"/>
            <div>
              <p className="label">EMAIL</p>
              <p>yadavaayush8484...</p>
            </div>
          </div>

          <div className="info-item">
            <MdPhone className="icon"/>
            <div>
              <p className="label">PHONE</p>
              <p>+91 8896848466</p>
            </div>
          </div>

          <div className="info-item">
            <FaBirthdayCake className="icon"/>
            <div>
              <p className="label">BIRTHDAY</p>
              <p>April 16, 2007</p>
            </div>
          </div>

          <div className="info-item">
            <MdLocationOn className="icon"/>
            <div>
              <p className="label">LOCATION</p>
              <p>India</p>
            </div>
          </div>
        </div>

        <div className="socials">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>

      </div>
    </div>
  );
}