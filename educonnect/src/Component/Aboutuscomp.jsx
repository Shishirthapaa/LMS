import React, { useRef, useEffect } from "react";
import "../Css/Aboutuscomp.css";
import mission from "../Images/ourmissionimgs.png";
import Lmslaptopscreen from "../Images/laptopimglms.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const handleIconClick = (url, event) => {
  event.preventDefault();
  window.open(url, "_blank");
};

const Aboutuscomp = ({ scrollToContact }) => {
  const contactUsRef = useRef(null);

  useEffect(() => {
    if (scrollToContact) {
      contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollToContact]);

  return (
    <div className="fullaboutuspage">
      <div className="backgroundaboutus">
        <div className="cardaboutus">
          <div className="middleaboutus">
            <div className="textaboutus">
              <h2 style={{ width: '30%' }}>About EduConnect</h2>
              <p style={{ width: '68%' }}>
                Welcome to EduConnect, the Learning Management System designed to
                revolutionize the educational experience for institutions,
                educators, and students alike. At EduConnect, we believe in the
                power of technology to transform learning and make education
                accessible, engaging, and effective.
              </p>
            </div>
          </div>
        </div>
        <div className="missionsaboutus">
          <div className="text2aboutus">
            <h2>Our Mission</h2>
            <p>
              Our mission is to bridge the gap between traditional education and
              modern technology. We strive to provide an intuitive, user-friendly
              platform that supports diverse learning styles and fosters an
              environment where knowledge thrives.
            </p>
          </div>
          <img className="missionaboutusimg" src={mission} alt="missionimg" />
        </div>
        <div className="featuresaboutus">
          <div className="laptopimgdiv">
            <img className="lmsscreenaboutus" src={Lmslaptopscreen} alt="screenimg" />
          </div>
          <div className="text3aboutus">
            <h2>What we offer?</h2>
            <p>
              EduConnect offers a comprehensive suite of tools and resources that
              empower educators to create dynamic, interactive courses and manage
              their classrooms with ease. Students benefit from personalized
              learning paths, instant feedback, and collaborative opportunities
              that enhance their educational journey.
            </p>
          </div>
        </div>
        <div className="contactaboutus" ref={contactUsRef}>
          <div className="text4aboutus">
            <h2>Why Choose EduConnect?</h2>
            <ul>
              <li>
                Innovative Features: Our platform is packed with cutting-edge
                features like real-time analytics, gamification, and mobile access
                to keep learners engaged and motivated.
              </li>
              <li>
                User-Centric Design: We prioritize ease of use, ensuring that our
                system is accessible to users of all technical skill levels.
              </li>
              <li>
                Continuous Support: Our dedicated support team is always ready to
                assist you, ensuring a smooth and productive experience.
              </li>
            </ul>
            <p>
              Join us at EduConnect and be a part of the future of education.
              Together, we can unlock the full potential of every learner.
            </p>
          </div>
        </div>
        <div className="featuresaboutus">
          <div className="text5aboutus">
            <h2>Contact Us</h2>
            <p>
              We’d love to hear from you! Whether you have questions, feedback, or
              need assistance, our team at EduConnect is here to help.
            </p>
            <p>
              Thank you for choosing EduConnect - we look forward to helping you learn!
            </p>
          </div>
          <div className="socialaboutus">
            <div className="nameaboutus">
              <p style={{ fontSize: "20px" }}>Shishir Thapa</p>
            </div>
            <div className="iconsaboutus">
              <a
                href="https://www.facebook.com/Shishirjung.thapa/"
                rel="noopener noreferrer"
                onClick={(event) =>
                  handleIconClick("https://www.facebook.com/Shishirjung.thapa/", event)
                }
              >
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className="clickaboutus"
                />
              </a>
              <a
                href="https://www.instagram.com/shishirthapaaa/"
                rel="noopener noreferrer"
                onClick={(event) =>
                  handleIconClick("https://www.instagram.com/shishirthapaaa/", event)
                }
              >
                <FontAwesomeIcon icon={faInstagram} className="clickaboutus" />
              </a>
              <a
                href="mailto:sisirjangthapa@gmail.com"
                rel="noopener noreferrer"
                onClick={(event) =>
                  handleIconClick("mailto:sisirjangthapa@gmail.com", event)
                }
              >
                <FontAwesomeIcon icon={faEnvelope} className="clickaboutus" />
              </a>
              <a
                href="https://www.linkedin.com/in/shishir-thapa-599144238/"
                rel="noopener noreferrer"
                onClick={(event) =>
                  handleIconClick("https://www.linkedin.com/in/shishir-thapa-599144238/", event)
                }
              >
                <FontAwesomeIcon icon={faLinkedin} className="clickaboutus" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutuscomp;
