import { Link } from "react-router-dom";
import "../../styles/layout/Academics.css";

import roboticsImage from "../../assets/images/10-robotics-innovation.webp";
import classroomImage from "../../assets/images/01-home-hero-classroom.webp";
import libraryImage from "../../assets/images/02-library-learning.webp";
import artsImage from "../../assets/images/03-creative-arts.webp";
import debateImage from "../../assets/images/11-debate-public-speaking.webp";
import educatorsImage from "../../assets/images/09-educators-collaboration.webp";

const stages = [
  { title: "Early Years", detail: "Ages 3–6", icon: "sprout" },
  { title: "Primary School", detail: "Grades 1–5", icon: "book" },
  { title: "Middle School", detail: "Grades 6–8", icon: "cap" },
  { title: "Senior School", detail: "Grades 9–12", icon: "award" },
];

const principles = [
  { title: "Inquiry-led learning", text: "Students explore, question and discover.", icon: "search" },
  { title: "Strong fundamentals", text: "Concepts are clear, connections are strong.", icon: "book" },
  { title: "Real-world application", text: "Learning is connected to life beyond school.", icon: "globe" },
  { title: "Personal guidance", text: "Teachers mentor every child to reach their potential.", icon: "person" },
];

const subjectCards = [
  { title: "STEM & Innovation", text: "Hands-on exploration of science, technology, engineering and mathematics to build problem-solvers and innovators.", image: roboticsImage },
  { title: "Languages & Humanities", text: "Developing communication, empathy and perspective through languages, literature and social sciences.", image: libraryImage },
  { title: "Arts & Design", text: "Encouraging creativity and expression through visual arts, music, drama and design thinking.", image: artsImage },
];

function LineIcon({ name }) {
  const paths = {
    sprout: <><path d="M36 58V31"/><path d="M36 36c-10 0-15-6-14-15 9 0 15 5 14 15Zm0-7c10 0 15-6 14-15-9 0-15 5-14 15Z"/></>,
    book: <><path d="M13 18c9-2 17 0 23 5v34c-6-5-14-7-23-5V18Zm46 0c-9-2-17 0-23 5v34c6-5 14-7 23-5V18Z"/><path d="M20 28c5 0 9 1 12 4M20 36c5 0 9 1 12 4"/></>,
    cap: <><path d="m9 27 27-13 27 13-27 13L9 27Z"/><path d="M20 34v13c9 8 23 8 32 0V34M62 28v18"/></>,
    award: <><circle cx="36" cy="31" r="15"/><path d="m27 44-5 15 14-7 14 7-5-15M30 31l4 4 8-9"/></>,
    search: <><circle cx="31" cy="31" r="18"/><path d="m44 44 15 15"/></>,
    globe: <><circle cx="36" cy="36" r="23"/><path d="M13 36h46M36 13c7 7 10 15 10 23S43 52 36 59M36 13c-7 7-10 15-10 23s3 16 10 23"/></>,
    person: <><circle cx="36" cy="25" r="12"/><path d="M15 59c3-13 11-20 21-20s18 7 21 20"/></>,
  };
  return <svg viewBox="0 0 72 72" aria-hidden="true">{paths[name]}</svg>;
}

function Academics() {
  return (
    <main className="academics-page">
      <section className="academics-hero">
        <div className="academics-hero__copy">
          <span className="page-eyebrow">ACADEMICS AT SSP</span>
          <h1>Learning designed for every stage of growth.</h1>
          <p>A future-ready education that builds knowledge, strengths and confidence—every step of the way.</p>
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Academics</span></nav>
        </div>
        <div className="academics-hero__visual"><img src={roboticsImage} alt="SSP students collaborating on a robotics project" /></div>
      </section>

      <div className="statement-strip">Strong foundations <i>•</i> Inspired teaching <i>•</i> Future-ready skills</div>

      <section className="school-section academic-journey">
        <header className="section-heading section-heading--center">
          <h2>A connected journey from curiosity to confidence.</h2>
          <p>Our academic programmes are thoughtfully designed for each stage of a child’s development, ensuring the right balance of challenge, support and discovery.</p>
        </header>
        <div className="stage-grid" role="list" aria-label="Academic stages">
          {stages.map((stage, index) => (
            <article className={`stage-card${index === 0 ? " is-selected" : ""}`} key={stage.title} role="listitem">
              <LineIcon name={stage.icon} />
              <h3>{stage.title}</h3>
              <span>{stage.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="academics-approach">
        <div className="academics-approach__image"><img src={classroomImage} alt="Students learning together with their teacher" /></div>
        <div className="academics-approach__copy">
          <span className="page-eyebrow">OUR APPROACH</span>
          <h2>Understanding before memorising.</h2>
          <p>We nurture curiosity and critical thinking through meaningful learning experiences that go beyond textbooks.</p>
          <p>Our approach builds strong foundations while encouraging creativity, collaboration and real-world problem solving.</p>
          <div className="principle-grid">
            {principles.map((principle) => (
              <article className="principle" key={principle.title}>
                <LineIcon name={principle.icon} />
                <div><h3>{principle.title}</h3><p>{principle.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="academic-subjects">
        <header className="section-heading section-heading--center"><h2>Learning that goes beyond subjects.</h2></header>
        <div className="subject-grid">
          {subjectCards.map((card) => (
            <article className="subject-card" key={card.title}>
              <img src={card.image} alt="" />
              <div><h3>{card.title}</h3><p>{card.text}</p><span aria-hidden="true">→</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="learner-support">
        <h2>How we support every learner.</h2>
        <div className="learner-support__grid">
          <article><h3>Academic mentoring</h3><p>Personalised guidance from experienced educators to help students set goals, stay motivated and achieve more.</p></article>
          <article><h3>Learning support</h3><p>Targeted support for diverse learning needs so every child feels confident and keeps progressing.</p></article>
          <article><h3>Enrichment pathways</h3><p>Clubs, competitions and certifications that help students discover passions and build future-ready skills.</p></article>
        </div>
      </section>

      <section className="school-section beyond-classroom">
        <div className="beyond-classroom__copy">
          <span className="page-eyebrow">BEYOND THE CLASSROOM</span>
          <h2>Skills for school—and for life.</h2>
          <p>We prepare students to lead with confidence, communicate with clarity and collaborate with empathy.</p>
          <Link className="school-button school-button--navy" to="/campus-life">Explore Student Life</Link>
        </div>
        <div className="beyond-classroom__images">
          <img className="beyond-classroom__main" src={debateImage} alt="SSP student presenting in a debate" />
          <img className="beyond-classroom__secondary" src={roboticsImage} alt="Students working on robotics" />
        </div>
      </section>

      <section className="academic-progress">
        <div className="academic-progress__copy">
          <h2>Progress you can understand.</h2>
          <p>Assessment at SSP is fair, consistent and transparent. We focus on what students understand, how they apply it, and how they grow.</p>
          <p>We partner with parents with regular updates and meaningful conversations to support every child’s learning journey.</p>
        </div>
        <div className="progress-panel" aria-label="Sample progress report">
          <h3>Sample Progress Report</h3>
          <div className="progress-row"><span>Growth</span><i><b style={{ width: "84%" }} /></i><strong>84%</strong></div>
          <div className="progress-row"><span>Application</span><i><b style={{ width: "78%" }} /></i><strong>78%</strong></div>
          <div className="progress-row"><span>Engagement</span><i><b style={{ width: "90%" }} /></i><strong>90%</strong></div>
        </div>
      </section>

      <section className="academic-final-cta">
        <div className="academic-final-cta__image"><img src={educatorsImage} alt="SSP educators working together" /></div>
        <div className="academic-final-cta__copy gold-corner-lines">
          <h2>Find the right learning pathway for your child.</h2>
          <div className="button-row">
            <Link className="school-button school-button--navy" to="/admission">View Admissions</Link>
            <Link className="school-button school-button--outline" to="/contact">Book a Campus Visit</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Academics;
