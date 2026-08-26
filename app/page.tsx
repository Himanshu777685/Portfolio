'use client'

import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

import {
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Mail,
  Menu,
  Moon,
  Send,
  Server,
  Sun,
  X,
  Database,
  Layers3,
  MapPin,
  Download,
  ArrowUp,
  Terminal,
  BookOpen,
  Star,
  GitFork,
  Braces,
} from 'lucide-react'

import { FaGithub, FaLinkedin } from 'react-icons/fa'

const profile = {
  name: 'Himanshu Kumar',
  role: 'Full-Stack Developer',
  email: 'himanshu.20051231@gmail.com',
  github: 'https://github.com/Himanshu777685',
  linkedin: 'https://www.linkedin.com/in/himanshu-kumar-317408317/',
  resume: '/Himanshu_Kumar_Resume.pdf',
  location: 'India',
}

const navItems = [
  'About',
  'Skills',
  'Projects',
  'Journey',
  'Resume',
  'Contact',
]

const skillGroups = [
  {
    title: 'Languages',
    icon: Braces,
    items: ['C', 'C++', 'JavaScript', 'TypeScript', 'Python'],
  },
  {
    title: 'Frontend',
    icon: Layers3,
    items: ['HTML', 'CSS', 'React', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Socket.IO'],
  },
  {
    title: 'Database',
    icon: Database,
    items: ['MongoDB', 'PostgreSQL', 'Prisma'],
  },
  {
    title: 'Tools & Platforms',
    icon: Terminal,
    items: [
      'Git',
      'GitHub',
      'Vercel',
      'Render',
      'Cloudinary',
      'Postman',
    ],
  },
]

const projects = [
  {
    name: 'EduFlow',
    type: 'Learning Management System',
    description:
      'A full-stack LMS where students enroll in courses and educators create, publish, and manage learning experiences.',
    features: [
      'Role-based authentication',
      'Student & educator dashboards',
      'Course and lecture management',
      'Razorpay payments',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Redux'],
    repo: 'https://github.com/Himanshu777685/EduFlow.git',
    demo: '#',
    accent: 'amber',
  },
  {
    name: 'MERN Chat Application',
    type: 'Real-time messaging',
    description:
      'A responsive messaging experience built for fast, private conversations with a dependable real-time layer.',
    features: [
      'JWT authentication',
      'HTTP-only cookies',
      'Socket.IO messaging',
      'Responsive interface',
    ],
    tech: ['React', 'Express', 'MongoDB', 'Socket.IO'],
    repo: 'https://github.com/Himanshu777685/chat-app.git',
    demo: '#',
    accent: 'blue',
  },
]

const repos = [
  {
    name: 'eduflow',
    description: 'A full-stack learning management system.',
    language: 'JavaScript',
    stars: 12,
    forks: 3,
  },
  {
    name: 'mern-chat-app',
    description: 'Real-time messaging with Socket.IO.',
    language: 'JavaScript',
    stars: 8,
    forks: 2,
  },
]

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>

      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>
    </div>
  )
}

function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setStatus('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.')
      }

      setStatus('Message sent successfully.')
      form.reset()
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : 'Something went wrong.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          required
          name="name"
          placeholder="Your name"
          disabled={loading}
        />
      </label>

      <label>
        Email
        <input
          required
          type="email"
          name="email"
          placeholder="you@example.com"
          disabled={loading}
        />
      </label>

      <label>
        Message
        <textarea
          required
          name="message"
          placeholder="Tell me a little about your idea..."
          rows={4}
          disabled={loading}
        />
      </label>

      <button
        className="button button-primary"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <>
            Sending...
            <Send />
          </>
        ) : (
          <>
            Send message
            <Send />
          </>
        )}
      </button>

      {status && (
        <p className="form-note">
          {status}
        </p>
      )}
    </form>
  )
}

export default function Page() {
  const [dark, setDark] = useState(true)
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('About')

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const current =
        navItems.find((item) => {
          const el = document.getElementById(
            item.toLowerCase()
          )

          return (
            el &&
            window.scrollY >= el.offsetTop - 140
          )
        }) || 'About'

      setActive(current)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const go = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth' })

    setMenu(false)
  }

  return (
    <main>
      <header
        className={`nav ${
          scrolled ? 'nav-scrolled' : ''
        }`}
      >
        <div className="nav-inner">
          <button
            className="logo"
            onClick={() => go('about')}
            aria-label="Go home"
          >
            <span>HK</span>
            <small>HIMANSHU KUMAR</small>
          </button>

          <nav className={menu ? 'mobile-open' : ''}>
            {navItems.map((item) => (
              <button
                key={item}
                className={
                  active === item ? 'active' : ''
                }
                onClick={() =>
                  go(item.toLowerCase())
                }
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <SocialLinks />

            <button
              className="theme-toggle"
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
            >
              {dark ? <Sun /> : <Moon />}
            </button>

            <button
              className="menu-button"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle menu"
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <section
        id="about"
        className="hero container"
      >
        <div className="hero-copy">
          <div className="status">
            <span />
            Open to internship opportunities
          </div>

          <p className="hero-kicker">
            B.Tech CSE · Data Science
          </p>

          <h1>
            Building useful things
            <br />
            <em>with thoughtful code.</em>
          </h1>

          <p className="hero-description">
            I&apos;m Himanshu Kumar, a full-stack
            developer and Computer Science student
            focused on backend engineering, data,
            and practical products.
          </p>

          <div className="hero-buttons">
            <button
              className="button button-primary"
              onClick={() => go('projects')}
            >
              View projects
              <ArrowUpRight />
            </button>

            <a
              className="button button-ghost"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              View resume
              <Download />
            </a>
          </div>

          <div className="hero-meta">
            <span>
              <MapPin />
              {profile.location}
            </span>

            <span className="meta-line" />

            <span>
              Available for opportunities
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
              <label>himanshu.ts</label>
            </div>

            <pre>
              <code>
                <i>const</i> developer = {'{'}
                {'\n'} name: <b>&quot;Himanshu&quot;</b>,
                {'\n'} focus: [
                <b>&quot;web&quot;</b>,{' '}
                <b>&quot;data&quot;</b>],
                {'\n'} status: <b>&quot;building&quot;</b>
                {'\n'}
                {'}'};
              </code>
            </pre>

            <div className="window-footer">
              <span>
                <Check />
                compiled successfully
              </span>

              <span>v1.0.0</span>
            </div>
          </div>

          <div className="visual-note">
            01 / INTRODUCTION
          </div>
        </div>
      </section>

      <section className="intro-strip">
        <div className="container strip-grid">
          <p>
            Currently learning, building,
            <br />
            <strong>and shipping.</strong>
          </p>

          <div className="highlight">
            <span>01</span>
            <b>250+</b>
            <small>LeetCode problems</small>
          </div>

          <div className="highlight">
            <span>02</span>
            <b>MERN</b>
            <small>Stack projects</small>
          </div>

          <div className="highlight">
            <span>03</span>
            <b>∞</b>
            <small>Curiosity to learn</small>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="section container"
      >
        <SectionHeading
          eyebrow="02 / TOOLKIT"
          title="Tools I use to turn ideas into products."
          copy="A practical toolkit that grows with every project. I care more about solving the right problem than collecting technologies."
        />

        <div className="skill-grid">
          {skillGroups.map((group) => {
            const Icon = group.icon

            return (
              <div
                className="skill-card"
                key={group.title}
              >
                <div className="skill-title">
                  <Icon />
                  <h3>{group.title}</h3>
                </div>

                <div className="chips">
                  {group.items.map((item) => (
                    <span key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section
        id="projects"
        className="section projects-section"
      >
        <div className="container">
          <SectionHeading
            eyebrow="03 / SELECTED WORK"
            title="Things I've been building."
            copy="A selection of projects where I've explored full-stack development, real-time systems, and data."
          />

          <div className="featured-project">
            <div className="project-art amber-art">
              <div className="art-grid" />

              <div className="art-label">
                EDUFLOW <span>/// LMS</span>
              </div>

              <div className="art-card">
                <BookOpen />
                <span>Course dashboard</span>
                <b>Learn. Create. Grow.</b>
              </div>
            </div>

            <div className="featured-copy">
              <span className="eyebrow">
                FEATURED PROJECT
              </span>

              <h3>EduFlow</h3>

              <p>
                {projects[0].description}
              </p>

              <div className="feature-list">
                {projects[0].features.map((feature) => (
                  <span key={feature}>
                    <Check />
                    {feature}
                  </span>
                ))}
              </div>

              <div className="chips">
                {projects[0].tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={projects[0].repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <Code2 />
                </a>

                <a href={projects[0].demo}>
                  Live demo
                  <ExternalLink />
                </a>
              </div>
            </div>
          </div>

          <div className="project-grid">
            {projects.slice(1).map((project) => (
              <article
                className="project-card"
                key={project.name}
              >
                <div
                  className={`project-thumb ${project.accent}-art`}
                >
                  <div className="thumb-lines" />
                  <Code2 />
                </div>

                <div className="project-card-body">
                  <span className="eyebrow">
                    {project.type}
                  </span>

                  <h3>{project.name}</h3>

                  <p>
                    {project.description}
                  </p>

                  <div className="chips">
                    {project.tech.map((tech) => (
                      <span key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repository
                      <Code2 />
                    </a>

                    <a href={project.demo}>
                      Demo
                      <ArrowUpRight />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container github-section">
        <SectionHeading
          eyebrow="04 / OPEN SOURCE"
          title="More from the workshop."
        />

        <div className="repo-list">
          {repos.map((repo) => (
            <div
              className="repo-row"
              key={repo.name}
            >
              <div className="repo-icon">
                <Code2 />
              </div>

              <div className="repo-info">
                <h3>
                  {repo.name}
                  <ArrowUpRight />
                </h3>

                <p>{repo.description}</p>
              </div>

              <span className="repo-language">
                <i />
                {repo.language}
              </span>

              <span className="repo-stat">
                <Star />
                {repo.stars}
              </span>

              <span className="repo-stat">
                <GitFork />
                {repo.forks}
              </span>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="repo-open"
              >
                Open
              </a>
            </div>
          ))}
        </div>

        <a
          className="all-repos"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          View all repositories
          <ArrowUpRight />
        </a>
      </section>

      <section
        id="journey"
        className="section journey-section"
      >
        <div className="container two-col">
          <SectionHeading
            eyebrow="05 / THE JOURNEY"
            title="Learning by doing."
            copy="I'm currently building projects and seeking opportunities to gain professional industry experience."
          />

          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-dot" />

              <div>
                <span className="eyebrow">
                  2022 — PRESENT
                </span>

                <h3>
                  B.Tech — Computer Science &
                  Engineering
                </h3>

                <p>
                  Specialization in Data Science
                </p>

                <small>
                  Relevant coursework: Data
                  Structures, DBMS, Operating
                  Systems, Machine Learning
                </small>
              </div>
            </div>

            <div className="timeline-item muted-item">
              <span className="timeline-dot" />

              <div>
                <span className="eyebrow">
                  NEXT CHAPTER
                </span>

                <h3>
                  Open to opportunities
                </h3>

                <p>
                  Looking forward to
                  contributing, learning, and
                  growing with a great engineering
                  team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="resume"
        className="section container resume-section"
      >
        <div className="resume-card">
          <div>
            <span className="eyebrow">
              06 / RESUME
            </span>

            <h2>
              Let's make something
              <br />
              <em>worth remembering.</em>
            </h2>

            <p>
              A snapshot of my skills, projects,
              and the path I'm on.
            </p>
          </div>

          <div className="resume-actions">
            <a
              className="button button-primary"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              View resume
              <ArrowUpRight />
            </a>

            <a
              className="button button-outline"
              href={profile.resume}
              download
            >
              Download PDF
              <Download />
            </a>
          </div>

          <span className="resume-mark">HK</span>
        </div>
      </section>

      <section
        id="contact"
        className="section container contact-section"
      >
        <div>
          <SectionHeading
            eyebrow="07 / SAY HELLO"
            title="Let's build something together."
            copy="Have an idea, an opportunity, or just want to talk tech? My inbox is always open."
          />

          <div className="contact-links">
            <a
              href={`mailto:${profile.email}`}
            >
              <Mail />

              <span>
                Email me
                <b>{profile.email}</b>
              </span>

              <ArrowUpRight />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />

              <span>
                Connect on LinkedIn
                <b>Let's connect</b>
              </span>

              <ArrowUpRight />
            </a>
          </div>
        </div>

        <ContactForm />
      </section>

      <footer>
        <div className="container footer-inner">
          <button
            className="logo"
            onClick={() => go('about')}
          >
            <span>HK</span>
            <small>HIMANSHU KUMAR</small>
          </button>

          <p>
            Built with React, TypeScript &
            curiosity.
          </p>

          <SocialLinks />

          <small>
            © {new Date().getFullYear()} Himanshu
            Kumar
          </small>
        </div>
      </footer>

      <button
        className="to-top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
        aria-label="Scroll to top"
      >
        <ArrowUp />
      </button>
    </main>
  )
}