import { Link } from "react-router-dom";
import "../../styles/layout/About.css";
import "../../styles/layout/Home.css";

const principalImage = "/images/Deepak-Kumar-Bajaj-1.jpg";

const campusImage = "/images/SSP School.png";

const timeline = [
  {
    year: "1998",
    title: "School Established",
    description: "Our school began with a small team of dedicated educators and a clear learning vision.",
  },
  {
    year: "2008",
    title: "Academic Expansion",
    description: "We introduced broader academic programs and added more student support services.",
  },
  {
    year: "2018",
    title: "Modern Campus Upgrade",
    description: "Smart classrooms, digital tools, and improved facilities were added for better learning.",
  },
  {
    year: "2026",
    title: "Growing with Purpose",
    description: "Today we continue to grow while keeping values, discipline, and quality at the center.",
  },
];

const facilities = [
  "Smart classrooms with digital learning tools",
  "Well-equipped science and computer labs",
  "Library with academic and reference resources",
  "Sports ground and indoor activity spaces",
];

const achievements = [
  {
    value: "5000+",
    label: "Students guided successfully",
  },
  {
    value: "95%",
    label: "Annual exam success rate",
  },
  {
    value: "120+",
    label: "Awards and recognitions",
  },
];

function About() {
  return (
    <main className="about-page">
      <section className="about-hero-modern">

  <div className="about-hero-overlay">

    <div className="about-hero-content">

      <span className="home-eyebrow">
        ABOUT SSP SCHOOL
      </span>

      <h1>
        Building Character
        <br />
        Inspiring Excellence
      </h1>

      <p>
        At SSP School, we believe in nurturing young minds to become
        compassionate, confident and responsible global citizens
        ready to lead the future.
      </p>

    </div>

  </div>

</section>

<section className="about-highlights">

  <div className="highlight-card">

    <div className="highlight-icon">🎯</div>

    <div>
      <h3>Our Mission</h3>

      <p>
        To provide a safe, inclusive and challenging
        environment that encourages students to explore,
        learn and excel.
      </p>
    </div>

  </div>

  <div className="highlight-card">

    <div className="highlight-icon">👁</div>

    <div>
      <h3>Our Vision</h3>

      <p>
        To be a respected institution recognized for
        academic excellence, character building and
        holistic development.
      </p>
    </div>

  </div>

</section>

    <section className="section-shell journey-section">

  <div className="home-section-heading">
    <span>OUR JOURNEY</span>
    <h2>Growing Through Excellence And Innovation</h2>
  </div>

  <section className="school-stats">

    <div className="stat-box">
      <h2>1998</h2>
      <p>School Founded</p>
    </div>

    <div className="stat-box">
      <h2>2008</h2>
      <p>Academic Expansion</p>
    </div>

    <div className="stat-box">
      <h2>2018</h2>
      <p>Digital Transformation</p>
    </div>

    <div className="stat-box">
      <h2>2026</h2>
      <p>Future Ready Campus</p>
    </div>

  </section>

</section>

     <section className="section-shell mission-section">

  <div className="home-section-heading">
    <span>MISSION & VISION</span>
    <h2>
      Focused On Excellence And Character Development
    </h2>
  </div>

  <div className="program-grid mission-grid">

    <div className="program-card">

      <div style={{padding:"30px"}}>

        <h3>🎯 Mission</h3>

        <p>
          To provide quality education that empowers students
          with knowledge, confidence, leadership and values.
        </p>

      </div>

    </div>

    <div className="program-card">

      <div style={{padding:"30px"}}>

        <h3>👁 Vision</h3>

        <p>
          To become a leading institution known for academic
          excellence, innovation and holistic development.
        </p>

      </div>

    </div>

  </div>

</section>

      <section className="about-principal section-shell">
      <div className="why-ssp">

  <div className="why-ssp-left">
    <img
      src={principalImage}
      alt="Principal"
    />
  </div>

  <div className="why-ssp-right">

    <span className="home-eyebrow">
  Principal's Message
</span>

<h2>
  A Message Of Encouragement,
  Responsibility And Ambition
</h2>

    <p>
      Our goal is not only to educate but to empower.
      We believe every child has the potential to grow,
      succeed and contribute meaningfully to society.
    </p>

    <p>
      Through guidance, discipline and compassion,
      we create the conditions for lifelong success.
    </p>

    <h4>
      Principal, SSP School
    </h4>

  </div>

</div>
      </section>

     <section className="campus-life section-shell">

  <div className="home-section-heading">
    <span>FACILITIES</span>
    <h2>Modern Learning Spaces For Every Student</h2>
  </div>

  <div className="campus-grid">

    <div className="campus-card">
      <img src={campusImage} alt="Smart Classrooms" />
      <h3>Smart Classrooms</h3>
    </div>

    <div className="campus-card">
      <img src={campusImage} alt="Science Labs" />
      <h3>Science Labs</h3>
    </div>

    <div className="campus-card">
      <img src={campusImage} alt="Sports Complex" />
      <h3>Sports Complex</h3>
      
    </div>

  </div>

</section>

      <section className="section-shell">

  <div className="home-section-heading">
    <span>OUR ACHIEVEMENTS</span>
    <h2>Numbers That Reflect Our Success</h2>
  </div>

  <section className="school-stats">

    <div className="stat-box">
      <h2>5000+</h2>
      <p>Students</p>
    </div>

    <div className="stat-box">
      <h2>100+</h2>
      <p>Faculty Members</p>
    </div>

    <div className="stat-box">
      <h2>95%</h2>
      <p>Board Results</p>
    </div>

    <div className="stat-box">
      <h2>25+</h2>
      <p>Years of Excellence</p>
    </div>

  </section>

</section>

<section className="home-cta section-shell">

  <div className="home-cta__content">

    <div>

      <span className="home-eyebrow">
        Admissions Open 2026
      </span>

      <h2>
        Join SSP School And Build A Bright Future
      </h2>

      <p>
        Become part of a learning community that inspires
        excellence, leadership and lifelong success.
      </p>

    </div>

    <Link
      to="/contact"
      className="home-button"
    >
      Apply Now
    </Link>

  </div>

</section>

    </main>
  );
}

export default About;