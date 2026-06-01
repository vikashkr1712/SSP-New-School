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
    <span>📞 +91 XXXXX XXXXX</span>
  </div>

  <div className="hero-content">

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

   <div className="hero-right">

  <img
    src={schoolBuilding}
    alt="SSP School Campus"
  />

</div>

  </div>

</section>
<section className="feature-strip">

  <div className="feature-card">
    <h3>Academic Excellence</h3>
    <p>Comprehensive curriculum and student success.</p>
  </div>

  <div className="feature-card">
    <h3>Experienced Faculty</h3>
    <p>Qualified teachers guiding every learner.</p>
  </div>

  <div className="feature-card">
    <h3>Modern Facilities</h3>
    <p>Labs, sports and digital classrooms.</p>
  </div>

  <div className="feature-card">
    <h3>Holistic Growth</h3>
    <p>Academics, arts and sports together.</p>
  </div>

</section>

      <section className="home-intro section-shell">
        <div className="home-intro__grid">
          <div className="home-intro__copy">
            <div className="home-section-heading">
              <span>School Introduction</span>
              <h2>Smart and clever kids ready to fly high.</h2>
            </div>
            <p>
              We create an environment where students feel valued and motivated. From early years
              learning to guided development, our programs are built to support growth at every
              stage.
            </p>
            <p>
              Modern classrooms, skilled teachers, and thoughtful student support help us deliver
              an experience that goes beyond textbooks.
            </p>
            <Link className="home-button home-button--secondary" to="/contact">
              Enroll Now
            </Link>
          </div>

          <div className="home-intro__feature-grid">
            {featureCards.map((item) => (
              <article className="home-feature-card" key={item.title}>
                <div className="home-feature-card__image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="home-feature-card__text">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-highlights section-shell">
        <div className="home-section-heading">
          <span>Learning Focus</span>
          <h2>Shaping the future of kids with joyful, structured learning.</h2>
        </div>

        <div className="home-learning-grid">
          {learningBlocks.map((item) => (
            <article className="home-learning-card" key={item.title}>
              <div className="home-learning-card__art">
                <img src={item.image} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.grade}</p>
            </article>
          ))}
        </div>

        <div className="home-card-grid home-card-grid--stats">
          {academicHighlights.map((item) => (
            <article className="home-card" key={item.title}>
              <div className="home-card__image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="home-card__stat">
                <strong>{item.stat}</strong>
                <span>{item.label}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-choose section-shell">
        <div className="home-section-heading">
          <span>Why Choose Our School</span>
          <h2>We combine care, quality, and opportunity in one place.</h2>
        </div>

        <div className="home-choose__grid">
          <div className="home-choose__image-grid">
              <p className="home-choose__intro home-choose__intro--left">
                We focus on an impactful lesson at a time, making sure children feel encouraged and
                supported.
              </p>
              <article className="home-choose__image-card home-choose__image-card--gold">
              <img src={promoImageOne} alt="Learning activities at SSP School" />
              <div>
                <h3>Life Skills for Kids</h3>
                <p>Everyday habits, confidence, and values.</p>
              </div>
            </article>
            <article className="home-choose__image-card home-choose__image-card--green">
              <img src={promoImageTwo} alt="Students exploring ideas at SSP School" />
              <div>
                <h3>Imagination is Power</h3>
                <p>Creative thinking and expression.</p>
              </div>
            </article>
            <article className="home-choose__image-card home-choose__image-card--blue">
              <img src={eventVisual} alt="SSP School student growth illustration" />
              <div>
                <h3>Grow Your Own Wings</h3>
                <p>Support for academic and personal growth.</p>
              </div>
            </article>
            <article className="home-choose__image-card home-choose__image-card--teal">
              <img src={studentLifeImage} alt="Children learning and playing at SSP School" />
              <div>
                <h3>Discover & Play</h3>
                <p>Hands-on activities that spark curiosity and teamwork.</p>
              </div>
            </article>
          </div>

          <div className="home-choose__content">
            <p className="home-choose__intro">
              We focus on an impactful lesson at a time, making sure children feel encouraged and
              supported.
            </p>

            <div className="home-choose__list">
              {chooseItems.map((item) => (
                <div className="home-choose__item" key={item}>
                  <span className="home-choose__bullet" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-promo section-shell">
        <article className="home-promo__panel home-promo__panel--gold">
          <div>
            <span className="home-eyebrow">Confidence Building</span>
            <h2>Confidence that builds a brighter future.</h2>
            <p>
              Empowering kids with confidence to create a successful future through guided
              learning and strong support.
            </p>
            <Link className="home-button home-button--secondary" to="/admission">
              Enroll Now
            </Link>
          </div>
          <img src={principalImage} alt="Principal leading SSP School" />
        </article>

        <article className="home-promo__panel home-promo__panel--warm">
          <div>
            <span className="home-eyebrow">Helping Kids</span>
            <h2>Helping kids to shoot their dreams.</h2>
            <p>Inspiring kids to aim higher with care, structure, and modern learning support.</p>
            <Link className="home-button home-button--primary" to="/about">
              Learn More
            </Link>
          </div>
          <img src={promoImageOne} alt="Admission support at SSP School" />
        </article>
      </section>

      <section className="home-admission-band section-shell">
        <div className="home-admission-band__copy">
          <span className="home-eyebrow">Admission is ongoing</span>
          <h2>Empower your kids to think smarter and sharper.</h2>
          <p>
            Encourage kids to think critically, be creative, and solve problems for a better
            future.
          </p>
          <Link className="home-button home-button--primary" to="/admission">
            Get Educated
          </Link>
        </div>

        <div className="home-admission-band__visual">
          <img src={admissionVisual} alt="Student admission support" />
          <div className="home-admission-band__chip-grid">
            <article>
              <strong>45M+</strong>
              <span>Kids watched around the globe</span>
            </article>
            <article>
              <strong>164+</strong>
              <span>National participating in the Olympiad</span>
            </article>
          </div>
        </div>
      </section>

      <section className="home-event section-shell">
        <div className="home-event__visual">
          <img src={eventVisual} alt="Classroom event at SSP School" />
        </div>
        <div className="home-event__content">
          <span className="home-eyebrow">Upcoming Event</span>
          <h2>Building children one at a time.</h2>
          <p>
            Classes and activities rooted in knowledge, values, and meaningful support for every
            learner.
          </p>
          <div className="home-event__meta">07 March 2026</div>
        </div>
      </section>

      <section className="home-cta section-shell">
        <div className="home-cta__content">
          <span className="home-eyebrow">Call to Action</span>
          <h2>Ready to begin your child’s journey with us?</h2>
          <p>
            Explore our admission process and connect with our team to learn how we can help your
            child thrive.
          </p>
          <Link className="home-button home-button--primary" to="/contact">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;