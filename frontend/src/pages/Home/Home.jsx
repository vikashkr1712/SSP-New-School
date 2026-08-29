import { Link } from "react-router-dom";
import "../../styles/layout/Home.css";

import heroImage from "../../assets/images/01-home-hero-classroom.webp";
import libraryImage from "../../assets/images/02-library-learning.webp";
import artsImage from "../../assets/images/03-creative-arts.webp";
import sportsImage from "../../assets/images/04-sports-basketball.webp";
import campusWalkImage from "../../assets/images/05-students-campus-walk.webp";
import communityImage from "../../assets/images/06-community-outdoors.webp";

const experiences = [
  {
    title: "Inspired Learning",
    text: "Thoughtful teaching that turns questions into understanding and ideas into confidence.",
    image: libraryImage,
  },
  {
    title: "Creative Expression",
    text: "Space to imagine, make and share through art, music, performance and design.",
    image: artsImage,
  },
  {
    title: "Active & Well",
    text: "Movement, teamwork and wellbeing woven into every student’s school experience.",
    image: sportsImage,
  },
];

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <span className="page-eyebrow page-eyebrow--badge">ADMISSIONS OPEN 2027–28</span>
          <h1>Where Curiosity Becomes Confidence.</h1>
          <p>
            At SSP, every child is encouraged to ask, explore and grow—building the knowledge,
            character and confidence to thrive in a changing world.
          </p>
          <div className="button-row">
            <Link className="school-button school-button--navy" to="/about">Explore Our School</Link>
            <Link className="school-button school-button--outline" to="/contact">Book a Campus Visit</Link>
          </div>
          <div className="home-hero__proof" aria-label="School highlights">
            <div><strong>25+</strong><span>Years of Excellence</span></div>
            <div><strong>20:1</strong><span>Student–Teacher Ratio</span></div>
            <div><strong>CBSE</strong><span>Affiliated</span></div>
          </div>
        </div>

        <div className="home-hero__visual gold-curve-frame">
          <img src={heroImage} alt="SSP students learning with their teacher in a classroom" />
          <div className="home-hero__card">
            <span className="home-hero__card-mark">✦</span>
            <div><strong>Learning beyond</strong><span>the classroom</span></div>
          </div>
        </div>
      </section>

      <div className="statement-strip">Nurturing Knowledge <i>•</i> Character <i>•</i> Creativity</div>

      <section className="school-section home-experience">
        <header className="section-heading section-heading--center">
          <span className="page-eyebrow">THE SSP EXPERIENCE</span>
          <h2>Every child deserves room to discover.</h2>
          <p>Learning at SSP is purposeful, joyful and connected to the world beyond school.</p>
        </header>
        <div className="experience-grid">
          {experiences.map((item) => (
            <article className="experience-card" key={item.title}>
              <img src={item.image} alt="" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link to="/academics" aria-label={`Explore ${item.title}`}>Explore <Arrow /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-story">
        <div className="home-story__image">
          <img src={campusWalkImage} alt="SSP students walking together on campus" />
        </div>
        <div className="home-story__copy">
          <span className="page-eyebrow">OUR STORY</span>
          <h2>Rooted in values. Ready for tomorrow.</h2>
          <p>
            For more than two decades, SSP Public School has helped young people grow in
            knowledge, character and confidence.
          </p>
          <p>
            Our classrooms are shaped by inspired educators, meaningful relationships and a
            belief that every child can make a positive difference.
          </p>
          <blockquote>“Education should open minds, strengthen character and awaken possibility.”</blockquote>
          <Link className="text-link" to="/about">Discover our story <Arrow /></Link>
        </div>
      </section>

      <section className="home-stats" aria-label="SSP at a glance">
        <div><strong>98%</strong><span>Academic Success</span></div>
        <div><strong>35+</strong><span>Activities</span></div>
        <div><strong>12</strong><span>Acre Green Campus</span></div>
        <div><strong>2,500+</strong><span>Alumni</span></div>
      </section>

      <section className="school-section home-cta">
        <div className="home-cta__image">
          <img src={communityImage} alt="SSP teacher and students talking outdoors" />
        </div>
        <div className="home-cta__copy gold-corner-lines">
          <span className="page-eyebrow">VISIT SSP</span>
          <h2>Come see where your child can flourish.</h2>
          <p>Walk our campus, meet our educators and experience the spirit of our community.</p>
          <div className="button-row">
            <Link className="school-button school-button--navy" to="/contact">Plan Your Visit</Link>
            <Link className="school-button school-button--outline" to="/admission">Start an Application</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
