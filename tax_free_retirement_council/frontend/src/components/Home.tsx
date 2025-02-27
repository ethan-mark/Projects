import "../assets/css/Home.css";
import React from "react";
import Navbar from "./navigation";
import RightArrow from "../assets/img/right_arrow.svg";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/vimeo";
import { ReactComponent as MindMapping } from "../assets/img/mind_mapping.svg";
import { ReactComponent as Planning } from "../assets/img/planning.svg";
import { ReactComponent as TakeControl } from "../assets/img/take_control.svg";
import DownArrow from "../assets/img/arrow-down.svg";
import UpArrow from "../assets/img/arrow-up.svg";
import Testimonies from "./Testimonies";
import FooterLogo from "../assets/img/footer_logo.jpg";
import { ReactComponent as Facebook } from "../assets/img/facebook.svg";

import { ReactComponent as LinkedIn } from "../assets/img/linkedin.svg";

import { ReactComponent as Instagram } from "../assets/img/instagram.svg";
import { useNavigate } from "react-router-dom";
const Home: React.FC = () => {
  return (
    <div className="Home">
      <header className="Home-header">
        <Navbar />
      </header>
      <main>
        <div className="top-body">
          <TopSection />
          <MiddleSection />
          <VideoSection />
          <Testimonies />
          <Footer />
        </div>
      </main>
    </div>
  );
};

const TopSection: React.FC = () => {
  return (
    <div className="top-section">
      <div className="top-div-section">
        <h1 className="full-potential">
          Your Retirement - Learn the Optimal WAY to do a Roth Conversion
        </h1>
        <p>
          Retirement should be about freedom, not financial stress. Without a
          plan, taxes, market drops, and unexpected costs can drain your
          savings. The good news? You can retire tax-free and keep more of
          what’s yours.{" "}
        </p>
        <p style={{ fontWeight: "bold" }}>
          {" "}
          💡 Take this quick 60-second quiz to discover how ready you are for a
          worry-free, tax-free future.
        </p>
        <div className="big-button-container">
          <a className="big-test-button" href="/test-form">
            Take the Test
            <img className="right-arrow" src={RightArrow} />
          </a>
        </div>
      </div>
    </div>
  );
};

const MiddleSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState<Boolean>(false); //useState for checking if the resolution is mobile
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
    <div className="three-panel-container">
      <div className="container-middle">
        <div className="left-panel">
          <button
            className="panel-collapsible"
            onClick={() => {
              togglePanel(1);
            }}
          >
            <div className="mind-icon-wrapper">
              <MindMapping className="mind-icon" />
            </div>
            <h3>Secure Peace of Mind</h3>

            <p
              className={`panel-content ${isMobile && openPanel !== 1 ? "collapsed" : ""}`}
            >
              Develop a secure retirement plan today by matching with an advisor
              that understands your financial situation. Unlock the keys to a
              Tax-Free Retirement now by taking our advisor questionnaire.{" "}
            </p>
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
          </button>
        </div>

        <div className="middle-panel">
          <button
            className="panel-collapsible"
            onClick={() => {
              togglePanel(2);
            }}
          >
            <div className="planning-icon-wrapper">
              <Planning className="planning-icon" />
            </div>
            <h3>Personalized Planning for You</h3>
            <p
              className={`panel-content ${isMobile && openPanel !== 2 ? "collapsed" : ""}`}
            >
              We believe that every retirement journey is unique, which is why
              we tailor our strategies specifically to your financial goals,
              lifestyle preferences, and risk tolerance. Through one-on-one
              consultations and ongoing reviews, we create a flexible plan that
              adapts as your needs evolve, ensuring you feel confident and
              secure every step of the way.{" "}
            </p>
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
          </button>
        </div>
        <div className="right-panel">
          <button
            className="panel-collapsible"
            onClick={() => {
              togglePanel(3);
            }}
          >
            <div className="takecontrol-icon-wrapper">
              <TakeControl className="takecontrol-icon" />
            </div>

            <h3>Take Control</h3>

            <p
              className={`panel-content ${isMobile && openPanel !== 3 ? "collapsed" : ""}`}
            >
              Now is the time to build a tax-free retirement strategy that
              balances growth, risk management, and evolving market conditions.
              Our certified advisors are rigorously screened to ensure that
              every recommendation is backed by deep expertise, and a commitment
              to your long-term financial success.
            </p>
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
          </button>
        </div>
      </div>
    </div>
  );
};

function VideoSection() {
  interface VimeoPlayerProps {
    className?: string;
  }
  const VimeoPlayer: React.FC<VimeoPlayerProps> = () => {
    return (
      <ReactPlayer
        className="react-player"
        url="https://vimeo.com/1056474059/8a9dbb141d?ts=0&share=copy"
        playing={true} // ✅ Auto-plays the video
        loop={true} // ✅ Loops infinitely
        controls={false} // ✅ Hides all controls
        muted={true} // ✅ Ensures autoplay works
      />
    );
  };
  return (
    <div className="outer-video-container">
      <div className="inner-video-container">
        <div className="panel-on-video">
          <h3>🚗 Enjoy the Drive – Your Future, Your Freedom </h3>
          <p>
            Secure a tax-free retirement so you can travel, explore, and live on
            your terms.
          </p>
          <p style={{ fontWeight: "bold" }}>
            👉 Take the 60-second quiz to start your journey.
          </p>
          <div className="big-button-container">
            <a className="big-test-button" href="/test-form">
              Take the Test
              <img className="right-arrow" src={RightArrow} />
            </a>
          </div>
        </div>
        <VimeoPlayer className="vimeo-player" />
      </div>
    </div>
  );
}
const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleIconClick = (e: MouseEvent) => {
    console.log(e);
  };
  return (
    <div className="footer-container">
      <div className="logo-description">
        <img src={FooterLogo} />
      </div>
      <div className="links-container">
        <div className="conditions-container">
          <h2>Conditions</h2>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      <div className="social-media-container">
        <h2>Connect With Us</h2>
        <div className="media-icons-container">
          <div className="icon-div">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="facebook-icon" />
            </a>
          </div>

          <div className="icon-div">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="instagram-icon" />
            </a>
          </div>

          <div className="icon-div">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn className="linkedin-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
