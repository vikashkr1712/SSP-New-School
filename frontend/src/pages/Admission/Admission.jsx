import { useState } from "react";
import "../../styles/layout/Admission.css";

const admissionVisual = "/images/SSP School.png";

const faqItems = [
  {
    question: "What is the age criteria for admission?",
    answer: "Age criteria depend on the grade applied for and are set according to the school’s admission policy.",
  },
  {
    question: "Which grades are currently open?",
    answer: "Admissions are open for select classes across Kindergarten through Grade 12.",
  },
  {
    question: "Is there any entrance test?",
    answer: "Entrance evaluation is conducted only for certain grade levels based on school guidelines.",
  },
  {
    question: "What documents are required?",
    answer: "Birth certificate, passport photos, previous school report or transfer certificate, and Aadhaar card if available.",
  },
  {
    question: "What are school timings?",
    answer: "School timings are shared with parents after the admission offer is issued.",
  },
  {
    question: "How can I pay admission fees?",
    answer: "Fee payment options are provided once the admission offer is confirmed.",
  },
];

const faqLeft = faqItems.slice(0, 3);
const faqRight = faqItems.slice(3, 6);

const initialFormState = {
  studentName: "",
  parentName: "",
  classInterested: "",
  phone: "",
  email: "",
  message: "",
};

function validateForm(values) {
  const errors = {};

  if (!values.studentName.trim()) errors.studentName = "Student name is required.";
  if (!values.parentName.trim()) errors.parentName = "Parent name is required.";
  if (!values.classInterested.trim()) errors.classInterested = "Class interested is required.";
  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[0-9\s()-]{7,15}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.message.trim()) errors.message = "Message is required.";

  return errors;
}

function Admission() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [activeFaq, setActiveFaq] = useState({ left: null, right: null });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const toggleFaq = (column, index) => {
    setActiveFaq((prev) => ({
      ...prev,
      [column]: prev[column] === index ? null : index,
    }));
  };

  const scrollToInquiryForm = () => {
    document.getElementById("admission-inquiry-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const downloadProspectus = () => {
    const prospectus = [
      "SSP School Prospectus 2026-27",
      "",
      "Admissions are open for Kindergarten through Grade 12.",
      "For admission enquiries, please complete the online inquiry form or contact the admissions office.",
      "",
      "SSP School",
      "Varanasi, India",
      "Email: admissions@sspschool.edu.in",
      "Phone: +91 98765 43211",
    ].join("\n");
    const downloadUrl = URL.createObjectURL(new Blob([prospectus], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "SSP-School-Prospectus-2026-27.txt";
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage("");

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSuccessMessage("Form submitted successfully. We will contact you shortly.");
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <main className="admission-page">
     
     <section className="admission-hero-banner">

  <img
    src={admissionVisual}
    alt="SSP School"
    className="admission-hero-banner-image"
  />

  <div className="admission-hero-banner-overlay"></div>

  <div className="admission-hero-banner-content">

    <span className="section-label">
      ADMISSIONS
    </span>

    <h1>
      Shape Your Child's Future
      <br />
      Admissions Open 2026-27
    </h1>

    <p>
      Join SSP School for a future-focused education with experienced
      faculty, modern facilities, academic excellence, and holistic
      development.
    </p>

    <div className="admission-hero-banner-buttons">
      <button type="button" className="btn btn-primary" onClick={scrollToInquiryForm}>
        Enquire Now →
      </button>

      <button type="button" className="btn btn-outline" onClick={downloadProspectus}>
        Download Prospectus
      </button>
    </div>

    <div className="admission-hero-banner-stats">

      <div>
        <strong>1500+</strong>
        <span>Students</span>
      </div>

      <div>
        <strong>50+</strong>
        <span>Faculty</span>
      </div>

      <div>
        <strong>98%</strong>
        <span>Results</span>
      </div>

      <div>
        <strong>25+</strong>
        <span>Activities</span>
      </div>

    </div>

  </div>

</section>

      <section className="admission-features section-shell">
        <div className="feature-panel">
          <article className="feature-card">
            <div className="feature-icon">🏫</div>
            <div>
              <h3>Quality Education</h3>
              <p>Comprehensive curriculum focused on academic excellence.</p>
            </div>
          </article>
          <article className="feature-card">
            <div className="feature-icon">👩‍🏫</div>
            <div>
              <h3>Expert Faculty</h3>
              <p>Experienced and dedicated educators guiding every student.</p>
            </div>
          </article>
          <article className="feature-card">
            <div className="feature-icon">🏛️</div>
            <div>
              <h3>Modern Facilities</h3>
              <p>Smart classrooms, labs, library, and sports infrastructure.</p>
            </div>
          </article>
          <article className="feature-card">
            <div className="feature-icon">🌟</div>
            <div>
              <h3>Holistic Development</h3>
              <p>Focus on academics, sports, arts, values, and life skills.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="admission-process section-shell">
        <div className="section-head">
          <span className="section-label">ADMISSION PROCESS</span>
          <h2>Simple Steps To Get Started</h2>
        </div>
        <div className="process-timeline">
          <article className="timeline-step">
            <div className="timeline-icon">📋</div>
            <div className="timeline-number">01</div>
            <h3>Enquiry</h3>
            <p>Fill out the enquiry form online or visit our campus.</p>
          </article>
          <article className="timeline-step">
            <div className="timeline-icon">📝</div>
            <div className="timeline-number">02</div>
            <h3>Application</h3>
            <p>Submit the admission application form.</p>
          </article>
          <article className="timeline-step">
            <div className="timeline-icon">👥</div>
            <div className="timeline-number">03</div>
            <h3>Interaction</h3>
            <p>Student interaction and parent meeting.</p>
          </article>
          <article className="timeline-step">
            <div className="timeline-icon">✅</div>
            <div className="timeline-number">04</div>
            <h3>Admission Offer</h3>
            <p>Receive the admission offer and fee details.</p>
          </article>
          <article className="timeline-step">
            <div className="timeline-icon">✔️</div>
            <div className="timeline-number">05</div>
            <h3>Confirmation</h3>
            <p>Confirm admission and complete enrollment.</p>
          </article>
        </div>
      </section>

      <section className="admission-requirements section-shell">
        <div className="requirements-grid">
          <article className="requirement-card">
            <h3>Eligibility</h3>
            <ul>
              <li>Age criteria as per grade applied</li>
              <li>Previous academic records</li>
              <li>Basic understanding of English</li>
              <li>Good communication skills</li>
            </ul>
          </article>
          <article className="requirement-card">
            <h3>Documents Required</h3>
            <ul>
              <li>Birth Certificate</li>
              <li>Passport Photos</li>
              <li>Previous School Report</li>
              <li>Aadhaar Card</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="admission-faq section-shell">
        <div className="section-head">
          <span className="section-label">FREQUENTLY ASKED QUESTIONS</span>
          <h2>Have Questions? We're Here To Help</h2>
        </div>
        <div className="faq-grid">
          <div className="faq-column">
            {faqLeft.map((item, index) => (
              <div className={`faq-item ${activeFaq.left === index ? "open" : ""}`} key={item.question}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq("left", index)}
                  aria-expanded={activeFaq.left === index}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle">{activeFaq.left === index ? "−" : "+"}</span>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="faq-column">
            {faqRight.map((item, index) => (
              <div className={`faq-item ${activeFaq.right === index ? "open" : ""}`} key={item.question}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq("right", index)}
                  aria-expanded={activeFaq.right === index}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle">{activeFaq.right === index ? "−" : "+"}</span>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admission-cta section-shell">
        <div className="cta-card">          <div className="cta-icon">✉️</div>          <div className="cta-copy">
            <h2>Admissions Open 2026-27</h2>
            <p>Take the first step towards your child’s bright future.</p>
          </div>
          <button type="button" className="cta-button" onClick={scrollToInquiryForm}>Enquire Now</button>
        </div>
      </section>

      <section id="admission-inquiry-form" className="admission-form-wrap section-shell">
        <div className="admission-form-card">
          <div className="form-head">
            <span className="section-label">Admission Inquiry Form</span>
            <h2>Provide the details below and we’ll respond shortly.</h2>
          </div>

          {successMessage ? <div className="form-alert form-alert--success">{successMessage}</div> : null}
          <form className="admission-form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <label className="field">
                <span>Student Name</span>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter student name"
                />
                {errors.studentName ? <small>{errors.studentName}</small> : null}
              </label>

              <label className="field">
                <span>Parent Name</span>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder="Enter parent name"
                />
                {errors.parentName ? <small>{errors.parentName}</small> : null}
              </label>

              <label className="field">
                <span>Class Interested</span>
                <select name="classInterested" value={formData.classInterested} onChange={handleChange}>
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                </select>
                {errors.classInterested ? <small>{errors.classInterested}</small> : null}
              </label>

              <label className="field">
                <span>Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
                {errors.phone ? <small>{errors.phone}</small> : null}
              </label>

              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
                {errors.email ? <small>{errors.email}</small> : null}
              </label>

              <label className="field field-full">
                <span>Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need"
                  rows="6"
                />
                {errors.message ? <small>{errors.message}</small> : null}
              </label>
            </div>

            <button type="submit" className="form-submit">Submit Inquiry</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Admission;
