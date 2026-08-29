import { Link } from "react-router-dom";
import schoolLogo from "../assets/icons/ssp-school-logo.svg";
import "../styles/components/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__identity">
          <img className="footer__logo-image" src={schoolLogo} alt="" />
          <span>SSP PUBLIC SCHOOL</span>
        </div>

        <div className="footer__column">
          <h2>Quick Links</h2>
          <Link to="/about">About</Link>
          <Link to="/academics">Academics</Link>
          <Link to="/campus-life">Campus Life</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer__column">
          <h2>Admissions</h2>
          <Link to="/admission">How to Apply</Link>
          <Link to="/admission">Fees &amp; Scholarships</Link>
          <Link to="/contact">Visit Our Campus</Link>
        </div>

        <div className="footer__column">
          <h2>Connect</h2>
          <a href="mailto:info@ssppschool.edu">info@ssppschool.edu</a>
          <a href="tel:+911123456789">+91 11 2345 6789</a>
          <span>New Delhi, India</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
