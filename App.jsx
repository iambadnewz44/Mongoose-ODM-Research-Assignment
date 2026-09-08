import React from "react";
import styled from "styled-components";
import { css } from "@emotion/react";
import { keyframes } from "@emotion/react";

/* Styled Components demonstration */
const StyledButton = styled.a`
  display: inline-block;
  padding: 0.8rem 1.2rem;
  border-radius: 0.7rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
  }
`;

const Card = styled.article`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.4rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.1);
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`;

/* Emotion demonstration */
const emotionBadge = css`
  display: inline-block;
  margin-top: 0.8rem;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 0.8rem;
  font-weight: 700;
  animation: ${pulse} 2.2s ease-in-out infinite;
`;

const projects = [
  {
    title: "Task Manager",
    description: "A clean productivity app using reusable React components and state.",
    tags: ["React", "Components", "UI/UX"]
  },
  {
    title: "Weather Dashboard",
    description: "A responsive dashboard layout designed for desktop and mobile screens.",
    tags: ["Responsive", "Grid", "Flexbox"]
  },
  {
    title: "E-Commerce UI",
    description: "A product browsing interface focused on accessibility and visual hierarchy.",
    tags: ["CSS", "UX", "Responsive"]
  }
];

const skills = ["React", "JavaScript", "HTML5", "CSS3", "Git & GitHub", "Responsive Design"];

function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a className="logo" href="#home">PG<span>.</span></a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  // Inline style demonstration
  const heroTitleStyle = {
    fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
    lineHeight: 1.05,
    marginBottom: "1rem"
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">React Styling Assignment</p>
          <h1 style={heroTitleStyle}>
            Building clean interfaces with <span>React.</span>
          </h1>
          <p className="hero-text">
            A responsive portfolio demonstrating UI/UX principles, inline styles,
            Styled Components, Emotion, Flexbox, Grid, and media queries.
          </p>
          <div className="hero-actions">
            <StyledButton href="#projects">View Projects</StyledButton>
            <a className="secondary-button" href="#contact">Contact Me</a>
          </div>
        </div>

        <div className="code-card" aria-label="Styling techniques">
          <div className="code-top">
            <span></span><span></span><span></span>
          </div>
          <pre>{`const portfolio = {
  framework: "React",
  styling: [
    "Inline CSS",
    "Styled Components",
    "Emotion"
  ],
  layout: ["Flexbox", "Grid"],
  responsive: true
};`}</pre>
          <span css={emotionBadge}>Emotion CSS-in-JS</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container two-column">
        <div>
          <p className="section-label">01 — About</p>
          <h2>Good styling makes good products easier to use.</h2>
        </div>
        <div>
          <p>
            UI/UX is about more than making an application look attractive.
            Good design improves readability, accessibility, navigation, feedback,
            and overall user satisfaction.
          </p>
          <p>
            This project applies those principles through reusable React components,
            consistent spacing, visual hierarchy, responsive layouts, and multiple
            modern styling approaches.
          </p>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section soft-section">
      <div className="container">
        <p className="section-label">02 — Skills</p>
        <h2>Tools & techniques</h2>
        <div className="skills-flex">
          {skills.map((skill) => (
            <div className="skill-pill" key={skill}>{skill}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section-label">03 — Projects</p>
        <div className="section-heading-row">
          <h2>Selected work</h2>
          <p>CSS Grid is used here to create a flexible responsive project layout.</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <Card key={project.title}>
              <div className="project-number">0{projects.indexOf(project) + 1}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-box">
        <div>
          <p className="section-label">04 — Contact</p>
          <h2>Let's build something useful.</h2>
          <p>Thanks for reviewing my React styling assignment.</p>
        </div>
        <a className="contact-link" href="mailto:your-email@example.com">
          your-email@example.com →
        </a>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer>
        <div className="container footer-inner">
          <span>React Styling Portfolio</span>
          <span>Built with React + CSS</span>
        </div>
      </footer>
    </>
  );
}

export default App;