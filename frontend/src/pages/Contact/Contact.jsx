import "../../styles/layout/Contact.css";

const contactCards = [
  {
    title: "Visit Us",
    value: "SSP School, Banaras Parao – Mugalsarai Road, Dandi",
    note: "Monday to Saturday | 8:00 AM - 4:00 PM",
  },
  {
    title: "Call Us",
    value: "+91 98765 43210",
    note: "Admissions Desk: +91 98765 43211",
  },
  {
    title: "Email",
    value: "info@sspschool.edu.in",
    note: "Admissions: admissions@sspschool.edu.in",
  },
  {
    title: "Office Hours",
    value: "Mon - Sat | 8:00 AM - 4:00 PM",
    note: "Closed on Sundays and public holidays",
  },
];

const contactHighlights = [
  {
    label: "Admissions Office",
    value: "+91 98765 43211",
  },
  {
    label: "Office Hours",
    value: "Mon - Sat | 8:00 AM - 4:00 PM",
  },
  {
    label: "Campus Address",
    value: "Banaras Parao – Mugalsarai Road, Dandi",
  },
];

const contactHeroImage = "/images/SSP School.webp";

const quickInfo = [
  "Principal: Dr. Ananya Sharma",
  "Academic Coordinator: Mr. Ravi Kumar",
  "Transport Desk: +91 98765 43212",
  "School Bus Routes: City Center, Riverside, Lakeview, Mughalsarai",
];

function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-hero-modern">
        <div className="contact-hero-overlay">
          <div className="contact-hero-content">
            <span className="contact-eyebrow">CONTACT SSP SCHOOL</span>
            <h1>We're Here To Help!</h1>
            <p>
              Have questions about admissions, academics,<br />
              transportation, or campus visits?<br />
              <br />
              Our team is ready to assist parents,<br />
              students, and visitors.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-feature section-shell">
        <div className="contact-feature__text card-panel">
          <span className="contact-section-heading__eyebrow">Questions?</span>
          <h2>Reach the right person without having to search around the site.</h2>
          <p>
            Like the reference layouts, this section keeps the most helpful contact details in one
            place so parents can act quickly.
          </p>
        </div>

        <div className="contact-feature__list card-panel">
          <ul>
            <li>Admissions and fee support</li>
            <li>Transport and route coordination</li>
            <li>Principal and academic office contact</li>
            <li>Office hours and campus location</li>
          </ul>
        </div>
      </section>

      <section id="contact-details" className="contact-details section-shell">
        <div className="contact-section-heading">
          <span>Contact Details</span>
          <h2>Everything you need to reach Seth M.R. Jaipuria School in one place.</h2>
        </div>

        <div className="contact-card-grid">
          {contactCards.map((item) => (
            <article className="contact-card" key={item.title}>
              <span className="contact-card__label">{item.title}</span>
              <h3>{item.value}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-lower section-shell">
        <div className="contact-map card-panel">
          <div className="contact-section-heading">
            <span>Campus Location</span>
            <h2>Find us easily during school hours.</h2>
          </div>
          <div className="contact-map__embed">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Seth+M.R.+Jaipuria+School+Banaras"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Seth M.R. Jaipuria School location in Google Maps"
            >
              <div className="contact-map__canvas" aria-label="Stylized campus location map">
                <div className="contact-map__road contact-map__road--horizontal" />
                <div className="contact-map__road contact-map__road--vertical" />
                <div className="contact-map__road contact-map__road--diagonal" />
                <div className="contact-map__park contact-map__park--left" />
                <div className="contact-map__park contact-map__park--right" />
                <div className="contact-map__district contact-map__district--south">Banaras Parao</div>
                <div className="contact-map__pin">
                  <span className="contact-map__pin-dot" />
                  <span className="contact-map__pin-label">SSP School</span>
                </div>
              </div>
            </a>
          </div>
          <p className="contact-map__caption">SSP School Location</p>
        </div>

        <div className="contact-info card-panel">
          <div className="contact-section-heading">
            <span>Quick Info</span>
            <h2>Useful details for parents and guardians.</h2>
          </div>
          <ul className="contact-info__list">
            {quickInfo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="contact-info__note">
            <strong>School Office:</strong>
            <p>
              The office can support admissions, fee queries, transport, and academic scheduling
              questions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;

