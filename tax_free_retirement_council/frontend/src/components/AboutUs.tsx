import React from "react";
import Navbar from "./navigation";
import "../assets/css/Home.css";
import useDocumentTitle from "./UseDocumentTitle";
import TopHeaderPhoto from "../assets/img/about-us-top-header.jpg";
const AboutUs: React.FC = () => {
  useDocumentTitle("About Us", true);
  return (
    <div className="about-us-container">
      <Navbar />
      <AboutUsHeader />
    </div>
  );
};
const AboutUsHeader: React.FC = () => {
  return (
    <div className="about-us-top-container">
      <div className="about-us-top-header">
        <div className="about-us-wrapper">
          <h1>About Us</h1>
          <p>
            At Tax Free Retirement Council, we are dedicated to empowering you
            to achieve a secure, tax-efficient retirement. Our mission is
            simple: to help you navigate the complexities of retirement planning
            with confidence and clarity.
          </p>
        </div>
        <div className="top-header-photo-wrapper">
          <img src={TopHeaderPhoto} />
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
