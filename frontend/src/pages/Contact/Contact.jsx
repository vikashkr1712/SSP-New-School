import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/layout/Contact.css";

import receptionImage from "../../assets/images/14-school-reception.webp";
import campusImage from "../../assets/images/15-campus-entrance.webp";
import familyImage from "../../assets/images/12-admissions-family-welcome.webp";

const initialForm = { fullName: "", email: "", phone: "", topic: "", message: "", consent: false };

const helpCards = [
  { title: "Admissions", email: "admissions@ssppschool.edu", phone: "+91 11 2345 6789", link: "Admissions Enquiry", to: "/admission", icon: "cap" },
  { title: "General Office", email: "info@ssppschool.edu", phone: "+91 11 2345 6700", link: "Contact Office", to: "mailto:info@ssppschool.edu", icon: "building" },
  { title: "Student & Parent Support", email: "support@ssppschool.edu", phone: "+91 11 2345 6710", link: "Get Support", to: "mailto:support@ssppschool.edu", icon: "people" },
];

const faqs = [
  { question: "How do I arrange a school tour?", answer: "Contact our admissions team or use the Book a Campus Visit button and we will arrange a suitable time." },
  { question: "Where can I find admissions information?", answer: "Visit our Admissions page for entry guidance, key dates and application support." },
  { question: "What are the school office hours?", answer: "The office is open Monday to Friday, 8:00 AM–4:30 PM, and Saturday, 9:00 AM–1:00 PM." },
  { question: "How can current parents get support?", answer: "Current parents can contact the Student & Parent Support team by email or phone." },
];

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^\+?[0-9\s()-]{7,15}$/.test(values.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (!values.topic) errors.topic = "Please select a topic.";
  if (!values.message.trim()) errors.message = "Please enter your message.";
  if (!values.consent) errors.consent = "Please confirm that we may contact you.";
  return errors;
}

function ContactIcon({ name }) {
  const paths = {
    cap: <><path d="m9 27 27-13 27 13-27 13L9 27Z"/><path d="M20 34v13c9 8 23 8 32 0V34M62 28v18"/></>,
    building: <><path d="M15 60h42V25L36 12 15 25v35Z"/><path d="M24 31h6v7h-6zM42 31h6v7h-6zM24 44h6v7h-6zM42 44h6v7h-6zM33 50h6v10"/></>,
    people: <><circle cx="26" cy="28" r="8"/><circle cx="48" cy="28" r="8"/><path d="M10 57c1-11 7-17 16-17 5 0 9 2 12 6M62 57c-1-11-7-17-14-17-5 0-9 2-12 6"/></>,
  };
  return <svg viewBox="0 0 72 72" aria-hidden="true">{paths[name]}</svg>;
}

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess("");
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSuccess("Thank you. Your message has been received and our team will be in touch.");
    setForm(initialForm);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero__copy">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Contact</span></nav>
          <span className="page-eyebrow">CONTACT SSP</span>
          <h1>We would love to hear from you.</h1>
          <p>Whether you are planning a visit, exploring admissions or looking for information, our team is ready to help.</p>
        </div>
        <div className="contact-hero__visual"><img src={receptionImage} alt="An SSP staff member welcoming a family at school reception" /></div>
      </section>

      <div className="statement-strip">Connect <i>•</i> Visit <i>•</i> Discover</div>

      <section className="contact-options">
        <h2>How can we help?</h2>
        <div className="contact-options__grid">
          {helpCards.map((card) => (
            <article key={card.title}>
              <ContactIcon name={card.icon}/><h3>{card.title}</h3><a href={`mailto:${card.email}`}>{card.email}</a><a href={`tel:${card.phone.replace(/\s/g, "")}`}>{card.phone}</a>
              {card.to.startsWith("/") ? <Link to={card.to}>{card.link} &nbsp; →</Link> : <a href={card.to}>{card.link} &nbsp; →</a>}
            </article>
          ))}
        </div>
      </section>

      <section className="contact-main">
        <div className="message-column">
          <h2>Send us a message.</h2>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label><span>Full Name</span><input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" aria-invalid={Boolean(errors.fullName)}/>{errors.fullName && <small>{errors.fullName}</small>}</label>
            <label><span>Email Address</span><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email address" aria-invalid={Boolean(errors.email)}/>{errors.email && <small>{errors.email}</small>}</label>
            <label><span>Phone Number</span><input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" aria-invalid={Boolean(errors.phone)}/>{errors.phone && <small>{errors.phone}</small>}</label>
            <label><span>I’m contacting you about</span><select name="topic" value={form.topic} onChange={handleChange} aria-invalid={Boolean(errors.topic)}><option value="">Select an option</option><option>Admissions</option><option>Campus visit</option><option>Student support</option><option>General enquiry</option></select>{errors.topic && <small>{errors.topic}</small>}</label>
            <label><span>Your Message</span><textarea name="message" rows="5" value={form.message} onChange={handleChange} placeholder="Type your message here..." aria-invalid={Boolean(errors.message)}/>{errors.message && <small>{errors.message}</small>}</label>
            <label className="consent-field"><input type="checkbox" name="consent" checked={form.consent} onChange={handleChange}/><span>I agree to be contacted by SSP Public School regarding my enquiry.</span>{errors.consent && <small>{errors.consent}</small>}</label>
            <button type="submit">Send Message</button>
            <p className="contact-form__status" role="status" aria-live="polite">{success}</p>
          </form>
        </div>

        <aside className="campus-details">
          <span className="page-eyebrow">VISIT OUR CAMPUS</span>
          <h2>Come and experience SSP.</h2>
          <div className="campus-detail"><span aria-hidden="true">⌖</span><p><strong>SSP Public School</strong>Knowledge Avenue,<br/>New Delhi 110001, India</p></div>
          <div className="campus-detail"><span aria-hidden="true">◷</span><p><strong>Office Hours</strong>Monday–Friday, 8:00 AM–4:30 PM<br/>Saturday, 9:00 AM–1:00 PM</p></div>
          <a className="school-button school-button--navy" href="https://www.google.com/maps/search/?api=1&query=SSP+Public+School+Knowledge+Avenue+New+Delhi" target="_blank" rel="noreferrer">Get Directions</a>
          <img src={campusImage} alt="The entrance to SSP Public School" />
        </aside>
      </section>

      <section className="contact-map-section">
        <div className="stylized-map" role="img" aria-label="Stylized map showing SSP Public School on Knowledge Avenue, ten minutes from Central Station Metro">
          <span className="map-road map-road--one"/><span className="map-road map-road--two"/><span className="map-road map-road--three"/><span className="map-road map-road--four"/>
          <span className="map-route"/><span className="metro-marker">⊖<small>Central Station<br/>Metro</small></span><span className="school-marker">SSP<small>SSP Public School</small></span>
          <span className="knowledge-label">Knowledge Avenue</span><span className="main-gate"><strong>Main Gate —<br/>Knowledge Avenue</strong><small>▱ &nbsp; Visitor parking available</small></span>
        </div>
      </section>

      <section className="getting-section">
        <h2>Getting to SSP</h2>
        <div><article><span>▣</span><h3>School Transport</h3><p>Routes across Delhi NCR</p></article><article><span>▤</span><h3>By Metro</h3><p>10 minutes from<br/>Central Station</p></article><article><span>▱</span><h3>Visitor Parking</h3><p>Enter through Main Gate</p></article></div>
      </section>

      <section className="visit-band">
        <div><h2>Planning a campus visit?</h2><p>We’d love to welcome you to our campus. Book a visit and experience SSP in person.</p></div>
        <div className="button-row"><Link className="school-button visit-band__gold" to="/contact">Book a Campus Visit</Link><Link className="school-button visit-band__outline" to="/admission">Admissions Information</Link></div>
      </section>

      <section className="contact-faq">
        <h2>Frequently asked questions.</h2>
        <div>
          {faqs.map((faq, index) => {
            const open = openFaq === index;
            return <article key={faq.question}><h3><button type="button" onClick={() => setOpenFaq(open ? null : index)} aria-expanded={open} aria-controls={`contact-faq-${index}`}>{faq.question}<span aria-hidden="true">{open ? "−" : "+"}</span></button></h3><div id={`contact-faq-${index}`} hidden={!open}><p>{faq.answer}</p></div></article>;
          })}
        </div>
        <Link to="/contact">View All FAQs &nbsp; →</Link>
      </section>

      <section className="contact-final-cta gold-corner-lines">
        <div><img src={familyImage} alt="A family having a conversation with the SSP admissions team" /></div>
        <div><h2>Your SSP journey can begin with a conversation.</h2><Link className="school-button school-button--navy" to="/contact">Talk to Our Team</Link></div>
      </section>
    </main>
  );
}

export default Contact;
