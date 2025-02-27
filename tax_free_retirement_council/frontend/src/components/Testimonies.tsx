import "../assets/css/Home.css";
import React from "react";
import Navbar from "./navigation.js";
import RightArrow from "../assets/img/right_arrow.svg";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/vimeo";
import person_one from "../assets/img/person_one.jpg";
import person_two from "../assets/img/person_two.jpg";
import person_three from "../assets/img/person_three.jpg";

import DownArrow from "../assets/img/arrow-down.svg";
import UpArrow from "../assets/img/arrow-up.svg";

const Testimonies: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false); //useState for checking if the resolution is mobile
  const [openPanel, setOpenPanel] = useState<number | null>(null); //useState for

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobile]);
  const togglePanel = (panel: number) => {
    if (isMobile) {
      setOpenPanel(openPanel === panel ? null : panel);
    }
  };
  return (
    <div className="testimony-panel-container">
      <div className="testimony-header">
        <h1>WHAT OUR Clients ARE SAYING... </h1>
      </div>
      <div className="testimony-container-middle">
        <div className="testimony-left-panel">
          <button
            className="panel-collapsible"
            onClick={() => {
              togglePanel(1);
            }}
          >
            <div className="mind-icon-wrapper">
              <img src={person_one} className="whiteman-icon" />
            </div>
            <div className="testimony-content">
              <p
                className={`panel-content ${isMobile && openPanel !== 1 ? "collapsed" : ""}`}
              >
                "I can't recommend the Tax Free Retirement Council enough. Their
                holistic approach transformed my retirement planning from a
                daunting task into an exciting new chapter. With tailored advice
                and a community that truly cares, I now feel empowered to take
                control of my future. It was the best decision I ever made."{" "}
              </p>
              <h3>— Michael M.</h3>
              <div className="down-arrow-container">
                <img
                  className={`down-arrow ${isMobile && openPanel !== 1 ? "" : "collapsed"}`}
                  src={DownArrow}
                />
                <img
                  className={`down-arrow ${isMobile && openPanel !== 1 ? "collapsed" : ""}`}
                  src={UpArrow}
                />
              </div>
            </div>
          </button>
        </div>

        <div className="testimony-middle-panel">
          <button
            className="panel-collapsible"
            onClick={() => {
              togglePanel(2);
            }}
          >
            <div className="planning-icon-wrapper">
              <img src={person_two} className="person_two-icon" />
            </div>
            <div className="testimony-content">
              <p
                className={`panel-content ${isMobile && openPanel !== 2 ? "collapsed" : ""}`}
              >
                "After joining the Tax Free Retirement Council, I realized how
                critical it is to plan ahead. Their expert team and engaging
                community not only eased my fears but also provided practical
                tools for building a secure future. Now, I'm excited about my
                retirement journey, and I know I'm in good hands."{" "}
              </p>
              <h3>— Cameron D.</h3>
              <div className="down-arrow-container">
                <img
                  className={`down-arrow ${isMobile && openPanel !== 2 ? "" : "collapsed"}`}
                  src={DownArrow}
                />
                <img
                  className={`down-arrow ${isMobile && openPanel !== 2 ? "collapsed" : ""}`}
                  src={UpArrow}
                />
              </div>
            </div>
          </button>
        </div>
        <div className="testimony-right-panel">
          <button
            className="panel-collapsible"
            onClick={() => {
              togglePanel(3);
            }}
          >
            <div className="takecontrol-icon-wrapper">
              <img src={person_three} className="person_three-icon" />
            </div>
            <div className="testimony-content">
              <p
                className={`panel-content ${isMobile && openPanel !== 3 ? "collapsed" : ""}`}
              >
                "Joining the Tax Free Retirement Council was a turning point for
                me. I finally feel confident and secure about my future. Their
                expert guidance and supportive community helped me make
                proactive decisions before it was too late. I'm now planning for
                retirement with peace of mind and a renewed sense of purpose."{" "}
              </p>

              <h3>— Jeff A.</h3>

              <div className="down-arrow-container">
                <img
                  className={`down-arrow ${isMobile && openPanel !== 3 ? "" : "collapsed"}`}
                  src={DownArrow}
                />
                <img
                  className={`down-arrow ${isMobile && openPanel !== 3 ? "collapsed" : ""}`}
                  src={UpArrow}
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonies;
