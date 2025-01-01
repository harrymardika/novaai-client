import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import Footers from "../../components/footers/Footers";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>NOVA AI</h1>
        <h2>Next-gen Orbit of Visionary Artificial Intelligence Technology</h2>
        <h3>
          Welcome to NOVA – Revolutionizing the world transformed by the
          seamless integration of Artificial Intelligence!
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/mrai.png"
                  : typingStatus === "human2"
                  ? "/mrai2.png"
                  : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                "Can NOVA really help optimize business strategies?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Absolutely! NOVA leverages predictive analytics to boost efficiency and maximize profits",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "What about personal productivity?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "NOVA AI can automate repetitive tasks, organize your schedule, and provide intelligent reminders",
                2000,
                () => {
                  setTypingStatus("human1");
                },
                "How does NOVA ensure data security?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "With state-of-the-art encryption and AI-driven threat detection, your data is always protected",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Impressive! Can NOVA support innovation in tech development?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Absolutely! NOVA provides intelligent solutions for coding, debugging, and even generating creative ideas for new projects",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <Footers> </Footers>
    </div>
  );
};

export default Homepage;
