import { Link } from "react-router-dom";
import "../../styles/layout/About.css";

import campusWalkImage from "../../assets/images/05-students-campus-walk.webp";
import historyImage from "../../assets/images/07-school-history-2001.webp";
import principalImage from "../../assets/images/08-principal-portrait.webp";
import educatorsImage from "../../assets/images/09-educators-collaboration.webp";
import familyImage from "../../assets/images/12-admissions-family-welcome.webp";
import communityImage from "../../assets/images/06-community-outdoors.webp";

const guidance = [
  {
    title: "Our Mission",
    text: "To nurture confident, compassionate learners prepared to make a difference.",
    icon: "compass",
  },
  {
    title: "Our Vision",
    text: "To be a leading institution recognized for excellence and humanity.",
    icon: "sun",
  },
  {
    title: "Our Values",
    text: "Integrity · Curiosity · Empathy · Excellence",
    icon: "values",
  },
];

const milestones = [
  { year: "2001", text: "SSP Public School founded" },
  { year: "2008", text: "Senior School wing opened" },
  { year: "2016", text: "Innovation and Arts Centre launched" },
  { year: "2025", text: "Green campus programme completed" },
];

const communityTiles = [
  { title: "Our Educators", image: educatorsImage },
  { title: "Our Students", image: campusWalkImage },
  { title: "Our Families", image: familyImage },
];

function GuidanceIcon({ name }) {
  if (name === "compass") {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r="25" />
        <circle cx="36" cy="36" r="20" strokeDasharray="2 4" />
        <path d="m45 25-6 14-14 8 7-15 13-7Z" /><circle cx="36" cy="36" r="2" />
      </svg>
    );
  }
  if (name === "sun") {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <path d="M15 48h42M21 44a15 15 0 0 1 30 0M36 8v9M13 21l7 6M59 21l-7 6M7 42h9M56 42h9" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <path d="M17 49c-4-9-2-17 3-23 7 3 11 9 11 17M55 49c4-9 2-17-3-23-7 3-11 9-11 17M24 51c5-4 8-5 12-3 4-2 7-1 12 3M36 46V27M36 28c-7-2-10-7-9-13 6 0 10 4 9 13Zm0 0c7-2 10-7 9-13-6 0-10 4-9 13Z" />
    </svg>
  );
}

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero__copy">
          <span className="page-eyebrow">ABOUT SSP PUBLIC SCHOOL</span>
          <h1>A legacy of learning. A future of possibility.</h1>
          <p>For more than two decades, we have helped young people grow in knowledge, character and confidence.</p>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>About</span>
          </nav>
        </div>
        <div className="about-hero__visual">
          <img src={campusWalkImage} alt="SSP students walking together across campus" />
        </div>
      </section>

      <div className="statement-strip">Purpose-led education <i>•</i> Strong values <i>•</i> Lifelong curiosity</div>

      <section className="school-section about-story">
        <div className="about-story__image">
          <img src={historyImage} alt="Teachers speaking with SSP students in the school courtyard in 2001" />
        </div>
        <div className="about-story__copy">
          <span className="page-eyebrow">OUR STORY</span>
          <h2>Built with purpose. Growing with every generation.</h2>
          <p>SSP Public School was founded in 2001 with a simple belief—every child deserves a nurturing environment to discover their potential.</p>
          <p>From our first batch of students to a thriving community today, our journey has been shaped by dedicated educators, supportive families and curious learners who inspire us every day.</p>
          <p>We continue to evolve with time, embracing innovation while staying true to the values that define who we are.</p>
          <span className="about-story__year">Established 2001</span>
        </div>
      </section>

      <section className="about-guidance">
        <header className="section-heading section-heading--center">
          <span className="page-eyebrow">WHAT GUIDES US</span>
          <h2>Clear in purpose. Human at heart.</h2>
        </header>
        <div className="guidance-grid">
          {guidance.map((item) => (
            <article className={`guidance-card guidance-card--${item.icon}`} key={item.title}>
              <GuidanceIcon name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-principal">
        <div className="about-principal__image">
          <img src={principalImage} alt="Dr. Ananya Mehta, Principal of SSP Public School" />
        </div>
        <div className="about-principal__copy">
          <span className="page-eyebrow">FROM THE PRINCIPAL</span>
          <h2>Every child should feel known, supported and inspired.</h2>
          <p>At SSP, we see each child as a unique individual with dreams, strengths and limitless potential.</p>
          <p>Together with our passionate educators and caring community, we create experiences that spark curiosity, build character and prepare students for a meaningful future.</p>
          <div className="principal-signature">
            <strong>Dr. Ananya Mehta</strong>
            <span>Principal, SSP Public School</span>
          </div>
        </div>
      </section>

      <section className="about-journey">
        <header className="section-heading section-heading--center">
          <span className="page-eyebrow page-eyebrow--gold">OUR JOURNEY</span>
          <h2>Milestones that shaped our school.</h2>
        </header>
        <div className="timeline">
          {milestones.map((item) => (
            <div className="timeline__item" key={item.year}>
              <strong>{item.year}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="school-section about-community">
        <div className="about-community__intro">
          <h2>A community built by people who care.</h2>
          <p>Students thrive when they are supported by dedicated educators and families who share our values.</p>
          <span className="community-arrow" aria-hidden="true">→</span>
        </div>
        <div className="community-grid">
          {communityTiles.map((tile) => (
            <Link className="community-tile" to="/contact" key={tile.title}>
              <img src={tile.image} alt="" />
              <span>{tile.title} <i aria-hidden="true">→</i></span>
            </Link>
          ))}
        </div>

        <div className="about-final-cta">
          <div className="about-final-cta__image">
            <img src={communityImage} alt="SSP students and an educator together outdoors" />
          </div>
          <div className="about-final-cta__copy gold-corner-lines">
            <h2>Discover the people and places that make SSP special.</h2>
            <p>Take a closer look at our campus life and meet the people who make learning extraordinary.</p>
            <div className="button-row">
              <Link className="school-button school-button--navy" to="/campus-life">Explore Campus Life</Link>
              <Link className="school-button school-button--outline" to="/contact">Meet Our Team</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
