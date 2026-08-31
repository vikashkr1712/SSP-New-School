import { useLayoutEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Academics from "./pages/Academics/Academics";
import CampusLife from "./pages/CampusLife/CampusLife";
import Admission from "./pages/Admission/Admission";
import Contact from "./pages/Contact/Contact";

function usePageInteractions() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const activeAnimations = [];
    const heroItems = document.querySelectorAll("main > section:first-child > *");
    heroItems.forEach((element, index) => {
      const animation = element.animate(
        [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 560, delay: index * 75, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" },
      );
      activeAnimations.push(animation);
    });

    if (window.matchMedia("(max-width: 768px)").matches) {
      return () => activeAnimations.forEach((animation) => animation.cancel());
    }

    const sections = Array.from(document.querySelectorAll("main > section:not(:first-child)"));
    if (!("IntersectionObserver" in window)) return () => activeAnimations.forEach((animation) => animation.cancel());

    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(18px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 540, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" },
          );
          activeAnimations.push(animation);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8%" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      activeAnimations.forEach((animation) => animation.cancel());
      sections.forEach((section) => {
        section.style.removeProperty("opacity");
        section.style.removeProperty("transform");
      });
    };
  }, [pathname]);
}

export default function App() {
  usePageInteractions();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/campus-life" element={<CampusLife />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
