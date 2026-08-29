import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/layout/Admission.css";

import familyImage from "../../assets/images/12-admissions-family-welcome.webp";
import campusImage from "../../assets/images/15-campus-entrance.webp";
import receptionImage from "../../assets/images/14-school-reception.webp";
import communityImage from "../../assets/images/06-community-outdoors.webp";

const initialFormState = { parentName: "", email: "", phone: "", grade: "" };

const steps = [
  { number: "01", title: "Enquire", text: "Tell us about your child and your preferences." },
  { number: "02", title: "Visit", text: "Explore our campus and meet our educators." },
  { number: "03", title: "Apply", text: "Submit your application with required documents." },
  { number: "04", title: "Welcome", text: "Receive confirmation and begin your journey with us." },
];

const entryRows = [
  ["Early Years", "Ages 3–5", "Open"],
  ["Primary School", "Grades 1–5", "Limited"],
  ["Middle School", "Grades 6–8", "Open"],
  ["Senior School", "Grades 9–12", "Enquire"],
];

function validateForm(values) {
  const errors = {};
  if (!values.parentName.trim()) errors.parentName = "Parent or guardian name is required.";
  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^\+?[0-9\s()-]{7,15}$/.test(values.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (!values.grade) errors.grade = "Please select your child’s grade.";
  return errors;
}

function AdmissionIcon({ name }) {
  const icons = {
    calendar: <><rect x="14" y="18" width="44" height="39" rx="3"/><path d="M14 29h44M24 12v12M48 12v12M25 39h3M35 39h3M45 39h3M25 48h3M35 48h3"/></>,
    sun: <><circle cx="36" cy="36" r="12"/><path d="M36 9v9M36 54v9M9 36h9M54 36h9M17 17l6 6M49 49l6 6M55 17l-6 6M23 49l-6 6"/></>,
    people: <><circle cx="26" cy="28" r="8"/><circle cx="48" cy="28" r="8"/><path d="M10 57c1-11 7-17 16-17 5 0 9 2 12 6M62 57c-1-11-7-17-14-17-5 0-9 2-12 6"/></>,
    documents: <><path d="M22 11h25l9 9v40H22V11Z"/><path d="M47 11v10h9M29 33h20M29 42h20M29 51h14"/><path d="m12 22 10-8"/></>,
    support: <><path d="M10 39h11c6 0 9 5 13 5h13c5 0 9 5 5 8-7 5-18 8-27 8-6 0-10-5-15-7V39Z"/><path d="M25 39c2-12 8-20 18-20 8 0 14 5 17 13M43 11v9M30 16l5 7M56 16l-5 7"/></>,
    faq: <><path d="M11 34c0-14 11-24 25-24s25 10 25 24-11 24-25 24c-4 0-8-1-12-3l-13 6 4-14c-3-4-4-8-4-13Z"/><path d="M27 30c1-5 5-8 10-8 6 0 10 4 10 9 0 8-11 7-11 15M36 52h.1"/></>,
  };
  return <svg viewBox="0 0 72 72" aria-hidden="true">{icons[name]}</svg>;
}

function Admission() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const scrollToCallback = () => document.getElementById("admissions-callback")?.scrollIntoView({ behavior: "smooth", block: "center" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage("");
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSuccessMessage("Thank you. Our admissions team will contact you shortly.");
    setFormData(initialFormState);
  };

  const downloadProspectus = () => {
    const content = [
      "SSP Public School Prospectus 2027–28",
      "",
      "A purposeful education rooted in knowledge, character and creativity.",
      "",
      "Admissions: admissions@ssppschool.edu",
      "Phone: +91 11 2345 6789",
      "New Delhi, India",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "SSP-Public-School-Prospectus-2027-28.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="admissions-page">
      <section className="admissions-hero">
        <div className="admissions-hero__copy">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Admissions</span></nav>
          <span className="page-eyebrow admissions-badge">ADMISSIONS 2027–28</span>
          <h1>Your child’s journey starts here.</h1>
          <p>Choosing a school is a meaningful decision. We are here to make every step clear, personal and welcoming.</p>
          <div className="button-row">
            <button className="school-button school-button--navy" type="button" onClick={scrollToCallback}>Start an Application</button>
            <Link className="school-button school-button--outline" to="/contact">Book a Campus Visit</Link>
          </div>
        </div>
        <div className="admissions-hero__visual"><img src={familyImage} alt="A family meeting an SSP admissions educator" /></div>
      </section>

      <div className="statement-strip">Visit <i>•</i> Apply <i>•</i> Meet <i>•</i> Begin</div>

      <section className="admissions-journey">
        <header className="section-heading section-heading--center">
          <span className="page-eyebrow">JOINING SSP</span>
          <h2>A simple, supportive admissions journey.</h2>
        </header>
        <div className="admissions-steps">
          {steps.map((step) => (
            <article key={step.number}><strong>{step.number}</strong><h3>{step.title}</h3><p>{step.text}</p></article>
          ))}
        </div>
      </section>

      <section className="plan-visit">
        <div className="plan-visit__image"><img src={campusImage} alt="The green entrance to SSP Public School" /></div>
        <div className="plan-visit__copy">
          <span className="page-eyebrow">PLAN YOUR VISIT</span>
          <h2>See SSP in action.</h2>
          <p>A campus visit is the best way to experience our learning environment, facilities and community.</p>
          <div className="visit-detail"><AdmissionIcon name="calendar"/><div><strong>Campus tours</strong><span>Monday to Saturday</span></div></div>
          <div className="visit-detail"><AdmissionIcon name="sun"/><div><strong>Open morning</strong><span>18 October</span></div></div>
          <div className="visit-detail"><AdmissionIcon name="people"/><div><strong>Meet our educators</strong><span>By appointment</span></div></div>
          <Link className="school-button school-button--navy" to="/contact">Schedule Your Visit</Link>
        </div>
      </section>

      <section className="entry-guidance">
        <h2>Entry points and age guidance.</h2>
        <div className="entry-table" role="table" aria-label="Entry points and age guidance">
          <div className="entry-row entry-row--head" role="row"><span role="columnheader">Programme</span><span role="columnheader">Age / Grade</span><span role="columnheader">Availability</span></div>
          {entryRows.map(([programme, age, availability]) => (
            <div className="entry-row" role="row" key={programme}><strong role="cell">{programme}</strong><span role="cell">{age}</span><em className={`availability availability--${availability.toLowerCase()}`} role="cell">{availability}</em></div>
          ))}
        </div>
      </section>

      <section className="admission-info-cards">
        <article><AdmissionIcon name="documents"/><div><h3>What You’ll Need</h3><p>Birth certificate, previous school records and passport-size photo.</p></div><span aria-hidden="true">→</span></article>
        <article><AdmissionIcon name="support"/><div><h3>Fees &amp; Support</h3><p>Transparent fee structure and flexible support options for families.</p></div><span aria-hidden="true">→</span></article>
        <article><AdmissionIcon name="faq"/><div><h3>Frequently Asked Questions</h3><p>Find answers to common questions about admissions at SSP.</p></div><span aria-hidden="true">→</span></article>
      </section>

      <section className="key-dates">
        <h2>Key dates for 2027–28</h2>
        <div>
          <article><strong>01 September</strong><span>Applications open</span></article>
          <article><strong>18 October</strong><span>Open morning</span></article>
          <article><strong>15 December</strong><span>Priority deadline</span></article>
        </div>
      </section>

      <section className="admissions-support">
        <div className="admissions-support__copy">
          <span className="page-eyebrow">WE’RE HERE TO HELP</span>
          <h2>Questions are always welcome.</h2>
          <p>Our admissions team is here to guide you through every step of the process with care and clarity.</p>
          <p>We look forward to helping your child find a place to learn, grow and thrive at SSP.</p>
          <a href="mailto:admissions@ssppschool.edu">✉ &nbsp; admissions@ssppschool.edu</a>
          <a href="tel:+911123456789">⌕ &nbsp; +91 11 2345 6789</a>
        </div>
        <div className="admissions-support__image"><img src={receptionImage} alt="An SSP team member welcoming a family at reception" /></div>
      </section>

      <section className="callback-section" id="admissions-callback">
        <div className="callback-section__intro">
          <h2>Request an admissions call.</h2>
          <p>Share a few details and our team will connect with you at a time that works best.</p>
        </div>
        <form className="callback-form" onSubmit={handleSubmit} noValidate>
          <label><span>Parent/Guardian Name</span><input name="parentName" value={formData.parentName} onChange={handleChange} aria-invalid={Boolean(errors.parentName)} aria-describedby={errors.parentName ? "parentName-error" : undefined}/>{errors.parentName && <small id="parentName-error">{errors.parentName}</small>}</label>
          <label><span>Email Address</span><input type="email" name="email" value={formData.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined}/>{errors.email && <small id="email-error">{errors.email}</small>}</label>
          <label><span>Phone Number</span><input type="tel" name="phone" value={formData.phone} onChange={handleChange} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined}/>{errors.phone && <small id="phone-error">{errors.phone}</small>}</label>
          <label><span>Child’s Grade</span><select name="grade" value={formData.grade} onChange={handleChange} aria-invalid={Boolean(errors.grade)} aria-describedby={errors.grade ? "grade-error" : undefined}><option value="">Select a grade</option><option>Early Years</option><option>Grades 1–5</option><option>Grades 6–8</option><option>Grades 9–12</option></select>{errors.grade && <small id="grade-error">{errors.grade}</small>}</label>
          <button type="submit">Request a Call</button>
          <p className="callback-form__status" role="status" aria-live="polite">{successMessage}</p>
        </form>
      </section>

      <section className="admissions-final-cta gold-corner-lines">
        <div className="admissions-final-cta__copy">
          <h2>Ready to take the next step?</h2>
          <p>Begin your child’s journey with SSP today.</p>
          <div className="button-row">
            <button className="school-button school-button--navy" type="button" onClick={scrollToCallback}>Start an Application</button>
            <button className="school-button school-button--outline" type="button" onClick={downloadProspectus}>Download Prospectus</button>
          </div>
        </div>
        <div className="admissions-final-cta__image"><img src={communityImage} alt="Students and an educator together at SSP" /></div>
      </section>
    </main>
  );
}

export default Admission;
