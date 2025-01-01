import { Link } from "react-router-dom";
import "./footers.css";

const Footers = () => {
  return (
    <div className="footers">
      <img src="/logo-nova.png" alt="" />
      <div className="links">
        <Link to="/">About Us</Link>
        <span></span>
        <Link to="/">Terms of Service</Link>
        <span></span>
        <Link to="/">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footers;
