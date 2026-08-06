import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Admission from "./pages/Admission/Admission";
import Contact from "./pages/Contact/Contact";

export default function App() {
  useEffect(() => {
    const originalStyles = new WeakMap();
    const getCard = (target) => target instanceof Element
      ? target.closest("[class*='card']")
      : null;

    const handlePointerOver = (event) => {
      const card = getCard(event.target);
      if (!card || card.contains(event.relatedTarget)) return;

      originalStyles.set(card, {
        transform: card.style.transform,
        transition: card.style.transition,
      });
      card.style.transition = "transform 180ms ease";
      card.style.transform = "translateY(-6px)";
    };

    const handlePointerOut = (event) => {
      const card = getCard(event.target);
      if (!card || card.contains(event.relatedTarget)) return;

      const original = originalStyles.get(card);
      if (!original) return;
      card.style.transform = original.transform;
      card.style.transition = original.transition;
      originalStyles.delete(card);
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
