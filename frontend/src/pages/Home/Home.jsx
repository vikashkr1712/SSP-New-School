import { Link } from "react-router-dom";
import "../../styles/layout/Home.css";

import schoolBuilding from "../../assets/images/SSP School.png";
import studentsImg from "../../assets/images/school student.jpg";
import activityImg from "../../assets/images/school activity.jpg";
import classroomImg from "../../assets/images/classroom_img.jpg";

const heroImage = schoolBuilding;
const campusLifeImage = activityImg;
const studentLifeImage = studentsImg;
const admissionVisual = classroomImg;

const promoImageOne = activityImg;
const promoImageTwo = studentsImg;
const eventVisual = classroomImg;
const principalImage = schoolBuilding;


const academicHighlights = [
  {
    title: "Academic Excellence",
    description: "Providing quality education with modern learning methods.",
    stat: "5000+",
    label: "Students",
    image: studentsImg,
  },
  {
    title: "Experienced Faculty",
    description: "Dedicated teachers focused on student success.",
    stat: "100+",
    label: "Faculty Members",
    image: classroomImg,
  },
  {
    title: "Campus Facilities",
    description: "Smart classrooms, labs and sports infrastructure.",
    stat: "25+",
    label: "Facilities",
    image: schoolBuilding,
  },
];

const chooseItems = [
  "Safe and supportive campus environment",
  "Smart classrooms and modern learning tools",
  "Regular parent-teacher communication",
  "Extra-curricular activities and events",
];

const featureCards = [
  {
    title: "Life Skills for Kids",
    description: "Learning is designed to build responsibility, confidence, and practical habits.",
    image: studentsImg,
  },
  {
    title: "Campus Activities",
    description: "Sports, cultural events and personality development programs.",
    image: activityImg,
  },
];

const learningBlocks = [
  {
    title: "Smart Classrooms",
    grade: "Technology Enabled Learning",
    image: classroomImg,
  },
  {
    title: "Student Development",
    grade: "Personality & Leadership",
    image: studentsImg,
  },
  {
    title: "School Activities",
    grade: "Sports & Cultural Events",
    image: activityImg,
  },
  {
    title: "Academic Excellence",
    grade: "Strong Foundation",
    image: schoolBuilding,
  },
];


function Home() {
  return (
    <main className="home-page">
      <section className="hero-modern">

  <div className="top-bar">
    <span>📍 Varanasi, India</span>
    <span>✉ info@sspschool.edu.in</span>
    <span>📞 +91 98765 43210</span>
  </div>

  <div className="hero-content hero-banner"
  style={{
    backgroundImage: `url(${schoolBuilding})`
  }}
>
  <div className="hero-overlay">

    <div className="hero-left">

      <span className="hero-tag">
        SSP School
      </span>

      <h1>
        Inspiring Excellence,
        <br />
        Shaping Tomorrow
      </h1>

      <p>
        A place where learning goes beyond classrooms
        and every student discovers their potential.
      </p>

      <div className="hero-buttons">
        <a href="/about" className="btn-primary">
          Discover More
        </a>

        <a href="/admission" className="btn-outline">
          Admissions Open 2026
        </a>
      </div>

    </div>

  </div>
</div>

</section>
<section className="feature-strip">

  <div className="feature-item">
    <span>🎓</span>
    <div>
      <h3>Academic Excellence</h3>
      <p>Strong curriculum and result-oriented learning.</p>
    </div>
  </div>

  <div className="feature-item">
    <span>👨‍🏫</span>
    <div>
      <h3>Expert Faculty</h3>
      <p>Dedicated and experienced teaching staff.</p>
    </div>
  </div>

  <div className="feature-item">
    <span>🏫</span>
    <div>
      <h3>Modern Facilities</h3>
      <p>Smart classrooms and advanced facilities.</p>
    </div>
  </div>

  <div className="feature-item">
    <span>🌱</span>
    <div>
      <h3>Holistic Growth</h3>
      <p>Sports, arts and leadership development.</p>
    </div>
  </div>

</section>

      <section className="home-intro section-shell">
        <div className="home-intro__grid">
          <div className="home-intro__copy">
            <div className="home-section-heading">
              <span>School Introduction</span>
              <h2>
  Building Future Leaders Through
  Quality Education.
</h2>
            </div>
            <p>
  SSP School provides a nurturing environment where
  students develop academically, socially, and personally.
  Our goal is to inspire curiosity, creativity, and confidence
  in every learner.
</p>
            <p>
              Modern classrooms, skilled teachers, and thoughtful student support help us deliver
              an experience that goes beyond textbooks.
            </p>
            <Link className="home-button home-button--secondary" to="/contact">
              Enroll Now
            </Link>
          </div>

          <div className="home-intro__image">
  <img src={studentsImg} alt="SSP School Students" />
</div>
        </div>
      </section>

     <section className="home-highlights section-shell">

  <div className="home-section-heading">
    <span>Academic Programs</span>
    <h2>Preparing Students for Academic Excellence</h2>
  </div>

  <div className="program-grid">

    <article className="program-card">
      <img src={classroomImg} alt="Primary School" />
      <h3>Primary Education</h3>
      <p>
        Strong foundations in literacy, numeracy and creativity.
      </p>
    </article>

    <article className="program-card">
      <img src={studentsImg} alt="Middle School" />
      <h3>Middle School</h3>
      <p>
        Developing critical thinking and problem-solving skills.
      </p>
    </article>

    <article className="program-card">
      <img src={activityImg} alt="Senior School" />
      <h3>Senior Secondary</h3>
      <p>
        Preparing students for higher education and careers.
      </p>
    </article>

  </div>

</section>
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
    <h2>25+</h2>
    <p>Years of Excellence</p>
  </div>

  <div className="stat-box">
    <h2>95%</h2>
    <p>Board Results</p>
  </div>

</section>
<section className="campus-life section-shell">

  <div className="home-section-heading">
    <span>Campus Life</span>
    <h2>Beyond Academics</h2>
    <p>
      Students participate in sports, cultural events,
      leadership activities and community programs.
    </p>
  </div>

  <div className="campus-grid">

    <div className="campus-card">
      <img src={activityImg} alt="School Activities" />
      <h3>Cultural Activities</h3>
    </div>

    <div className="campus-card">
      <img src={studentsImg} alt="Students" />
      <h3>Student Development</h3>
    </div>

    <div className="campus-card">
      <img src={classroomImg} alt="Classroom" />
      <h3>Smart Learning</h3>
    </div>

  </div>

</section>

     <section className="why-ssp section-shell">

  <div className="why-ssp-left">
    <img src={schoolBuilding} alt="SSP School Campus" />
  </div>

  <div className="why-ssp-right">

    <span className="home-eyebrow">
      Why SSP School
    </span>

    <h2>
      A Trusted Place For Learning,
      Growth And Success
    </h2>

    <div className="why-item">
      ✅ Experienced & Dedicated Faculty
    </div>

    <div className="why-item">
      ✅ Smart Classrooms & Modern Infrastructure
    </div>

    <div className="why-item">
      ✅ Sports, Arts & Co-Curricular Activities
    </div>

    <div className="why-item">
      ✅ Safe & Student Friendly Environment
    </div>

    <div className="why-item">
      ✅ Academic Excellence & Leadership Development
    </div>

  </div>

</section>

     <section className="principal-message section-shell">

  <div className="principal-left">
    <img src={schoolBuilding} alt="Principal Message" />
  </div>

  <div className="principal-right">

    <span className="home-eyebrow">
      Principal's Message
    </span>

    <h2>
      Welcome To SSP School
    </h2>

    <p>
      At SSP School, we believe every child has unique potential.
      Our mission is to provide a nurturing environment where
      students grow academically, socially and morally.
    </p>

    <p>
      Through quality education, modern infrastructure and
      dedicated faculty, we prepare students for future success.
    </p>

    <h4>Principal</h4>

  </div>

</section>

      <section className="news-section section-shell">

  <div className="home-section-heading">
    <span>Latest News & Events</span>
    <h2>What's Happening At SSP School</h2>
  </div>

  <div className="news-grid">

    <article className="news-card">
      <img src={activityImg} alt="Annual Function" />
      <h3>Annual Cultural Fest 2026</h3>
      <p>
        Students showcased their talents through dance,
        music and drama performances.
      </p>
    </article>

    <article className="news-card">
      <img src={studentsImg} alt="Sports Day" />
      <h3>Sports Day Celebration</h3>
      <p>
        Encouraging teamwork, discipline and healthy competition.
      </p>
    </article>

    <article className="news-card">
      <img src={classroomImg} alt="Smart Learning" />
      <h3>Smart Classroom Initiative</h3>
      <p>
        Technology integrated learning for better student outcomes.
      </p>
    </article>

  </div>

</section>

    </main>
  );
}

export default Home;