import { useState } from "react";
import { NavLink } from "react-router-dom";
import schoolLogo from "../assets/icons/ssp-school-logo.svg";
import "../styles/components/Navbar.css";

const navItems = [
  { label: "Home", to: "/", end: true },
  { label: "About", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Admissions", to: "/admission" },
  { label: "Campus Life", to: "/campus-life" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={closeMenu} aria-label="SSP Public School home">
          <img className="navbar__logo-image" src={schoolLogo} alt="" />
          <span className="navbar__school-name">SSP PUBLIC SCHOOL</span>
        </NavLink>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar__panel ${isMenuOpen ? "is-open" : ""}`}>
          <nav className="navbar__menu" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `navbar__link${isActive ? " is-active" : ""}`}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <NavLink to="/parent-portal" className="navbar__portal" onClick={closeMenu}>
            Parent Portal
          </NavLink>
          <NavLink to="/admission" className="navbar__cta" onClick={closeMenu}>
            Apply Now
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
