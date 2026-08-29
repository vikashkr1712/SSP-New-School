import { Link } from "react-router-dom";
import "../../styles/layout/CampusLife.css";

import sportsImage from "../../assets/images/04-sports-basketball.webp";
import artsImage from "../../assets/images/03-creative-arts.webp";
import roboticsImage from "../../assets/images/10-robotics-innovation.webp";
import wellbeingImage from "../../assets/images/13-student-wellbeing.webp";
import libraryImage from "../../assets/images/02-library-learning.webp";
import debateImage from "../../assets/images/11-debate-public-speaking.webp";
import communityImage from "../../assets/images/06-community-outdoors.webp";

const categories = [
  { title: "Sports", icon: "ball" },
  { title: "Arts & Culture", icon: "palette" },
  { title: "Clubs & Societies", icon: "people" },
  { title: "Service & Leadership", icon: "heart" },
];

const weeklyCards = [
  { title: "Move", text: "Stay active, build strength and learn teamwork on and off the field.", links: "Football · Basketball · Athletics", image: sportsImage },
  { title: "Create", text: "Express ideas, explore talents and discover your creative voice.", links: "Music · Theatre · Visual Arts", image: artsImage },
  { title: "Lead", text: "Take initiative, serve others and shape a better tomorrow.", links: "Model UN · Student Council · Service", image: debateImage },
];

const events = [
  { day: "18", month: "OCT", title: "Open Morning", place: "Main Campus Auditorium", time: "9:30 AM – 11:30 AM" },
  { day: "02", month: "NOV", title: "Annual Arts Showcase", place: "Innovation & Arts Centre", time: "5:00 PM – 7:30 PM" },
  { day: "21", month: "NOV", title: "Inter-House Sports Day", place: "Sports Complex", time: "8:30 AM – 1:00 PM" },
];

function CampusIcon({ name }) {
  const icons = {
    ball: <><circle cx="36" cy="36" r="24"/><path d="m36 12 9 13-9 9-9-9 9-13ZM13 32l14-7M59 32l-14-7M17 50l15-16M55 50 40 34M30 59l6-25 6 25"/></>,
    palette: <><path d="M36 11c-15 0-26 10-26 24 0 13 10 23 22 23h5c4 0 6-4 4-7l-2-3c-2-4 1-8 6-8h8c6 0 9-6 7-11-4-11-13-18-24-18Z"/><circle cx="24" cy="28" r="2"/><circle cx="34" cy="21" r="2"/><circle cx="46" cy="25" r="2"/><circle cx="20" cy="40" r="2"/></>,
    people: <><circle cx="26" cy="28" r="8"/><circle cx="48" cy="28" r="8"/><path d="M10 57c1-11 7-17 16-17 5 0 9 2 12 6M62 57c-1-11-7-17-14-17-5 0-9 2-12 6"/></>,
    heart: <><path d="M36 30c-5-12-22-10-22 4 0 9 10 16 22 25 12-9 22-16 22-25 0-14-17-16-22-4Z"/><path d="M10 58h13l7-6h12l7 6h13"/></>,
  };
  return <svg viewBox="0 0 72 72" aria-hidden="true">{icons[name]}</svg>;
}

function CampusLife() {
  return (
    <main className="campus-page">
      <section className="campus-hero">
        <div className="campus-hero__copy">
          <span className="page-eyebrow">CAMPUS LIFE</span>
          <h1>More than a school day.</h1>
          <p>Friendships, passions and experiences shape who our students become.</p>
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Campus Life</span></nav>
        </div>
        <div className="campus-hero__visual">
          <img src={communityImage} alt="SSP students sharing campus life with an educator outdoors" />
        </div>
      </section>

      <div className="statement-strip">Discover <i>•</i> Participate <i>•</i> Belong</div>

      <section className="passion-section">
        <header className="section-heading section-heading--center">
          <h2>There is a place for every passion.</h2>
          <p>From the field to the stage, from ideas to impact—every student finds their space to shine.</p>
        </header>
        <div className="passion-grid">
          {categories.map((category) => <a href="#weekly-possibilities" key={category.title}><CampusIcon name={category.icon}/><span>{category.title}</span></a>)}
        </div>
      </section>

      <section className="explore-grow">
        <div className="explore-grow__left">
          <img src={sportsImage} alt="SSP students growing through team sport" />
          <div>
            <span className="page-eyebrow">EXPLORE &amp; GROW</span>
            <h2>Confidence is built through experience.</h2>
            <p>At SSP, every opportunity is designed to help students discover their strengths, step outside their comfort zones and grow with purpose.</p>
            <p>Whether it’s on the field, on stage or in the community—we learn by doing, we lead by example, and we grow together.</p>
            <a className="school-button school-button--navy" href="#weekly-possibilities">Explore Activities</a>
          </div>
        </div>
        <div className="explore-grow__right">
          <img src={artsImage} alt="Creative arts at SSP" />
          <img src={roboticsImage} alt="Robotics club at SSP" />
        </div>
      </section>

      <section className="weekly-section" id="weekly-possibilities">
        <header className="section-heading section-heading--center"><h2>A week full of possibilities.</h2></header>
        <div className="weekly-grid">
          {weeklyCards.map((card) => (
            <article key={card.title}><img src={card.image} alt=""/><div><h3>{card.title}</h3><p>{card.text}</p><span>{card.links}</span></div></article>
          ))}
        </div>
      </section>

      <section className="wellbeing-section">
        <div className="wellbeing-section__copy">
          <h2>Wellbeing comes first.</h2>
          <p>We care about every student’s wellbeing—mind, body and heart. Our counsellors and mentors are here to listen, support and guide.</p>
          <p>Because when students feel safe and supported, they can truly thrive.</p>
          <Link className="school-button wellbeing-button" to="/contact">Student Support</Link>
        </div>
        <div className="wellbeing-section__image"><img src={wellbeingImage} alt="Students speaking with an SSP wellbeing counsellor" /></div>
        <div className="wellbeing-services"><span>♡ &nbsp; Pastoral care</span><span>♙ &nbsp; Counselling</span><span>♧ &nbsp; Peer support</span></div>
      </section>

      <section className="events-section">
        <div className="events-section__heading"><h2>Coming up at SSP</h2><Link to="/contact">View Full Calendar &nbsp; →</Link></div>
        <div className="event-list">
          {events.map((event) => (
            <article key={event.title}><time><strong>{event.day}</strong><span>{event.month}</span></time><h3>{event.title}</h3><p><strong>{event.place}</strong><span>{event.time}</span></p></article>
          ))}
        </div>
      </section>

      <section className="campus-spaces">
        <div className="campus-spaces__image"><img src={libraryImage} alt="An SSP learning space" /></div>
        <div className="campus-spaces__copy">
          <span className="page-eyebrow">SPACES TO THRIVE</span>
          <h2>A campus designed for discovery.</h2>
          <p>Our spaces inspire curiosity, creativity and connection.</p>
          <div className="space-list"><span>⚙ &nbsp; Innovation Labs</span><span>✤ &nbsp; Creative Arts Studios</span><span>◉ &nbsp; Sports Complex</span><span>♧ &nbsp; Green Learning Spaces</span></div>
          <Link className="school-button school-button--navy" to="/contact">Explore Our Campus</Link>
        </div>
      </section>

      <section className="student-story">
        <div className="student-story__image"><img src={debateImage} alt="Aarav speaking confidently at SSP" /></div>
        <blockquote><p>“At SSP, I found the confidence to try things I never imagined.”</p><strong>Aarav, Grade 10</strong><Link to="/about">Read Student Stories &nbsp; →</Link></blockquote>
      </section>

      <section className="campus-final-cta">
        <div className="campus-final-cta__copy gold-corner-lines"><h2>Find your place in the SSP community.</h2><div className="button-row"><Link className="school-button school-button--navy" to="/contact">Book a Campus Visit</Link><Link className="school-button school-button--outline" to="/admission">View Admissions</Link></div></div>
        <div className="campus-final-cta__image"><img src={communityImage} alt="The SSP school community together outdoors" /></div>
      </section>
    </main>
  );
}

export default CampusLife;
