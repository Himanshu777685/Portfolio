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
import { IoInfinite } from "react-icons/io5";
import { SiLeetcode } from "react-icons/si"


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
  'LeetCode',
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
    items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.IO'],
  },
  {
    title: 'Database',
    icon: Database,
    items: ['MongoDB', 'PostgreSQL'],
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
      'RazorPay',
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
      'Razorpay payment integration',
    ],
    tech: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'Redux',
      'JWT' ,
      'Razorpay',
      'Cloudinary',
    ],
    repo: 'https://github.com/Himanshu777685/EduFlow.git',
    demo: 'https://edu-flow-five-murex.vercel.app/',
    accent: 'amber',
  },

  {
    name: 'MERN Chat Application',
    type: 'Real-time messaging',
    description:
      'A full-stack real-time chat application with secure authentication, private messaging, and Socket.IO-powered communication.',
    features: [
      'JWT authentication',
      'HTTP-only cookies',
      'Real-time messaging with Socket.IO',
      'Responsive chat interface',
    ],
    tech: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Socket.IO',
      'JWT',
    ],
    repo: 'https://github.com/Himanshu777685/chat-app.git',
    demo: 'https://chat-app-one-snowy-54.vercel.app/',
    accent: 'blue',
  },
]
const repos = [
  {
    name: 'eduflow',
    description: 'A full-stack learning management system.',
    language: 'JavaScript',
    type: 'Full Stack',
    status: 'Completed',
  },
  {
    name: 'mern-chat-app',
    description: 'Real-time messaging with Socket.IO.',
    language: 'JavaScript',
    type: 'Real time',
    status: 'Completed',
  },
]

const leetcodeStats = [
  {
    label: 'Problems Solved',
    value: '250+',
    detail: 'Consistent DSA practice',
  },
  {
    label: 'Easy',
    value: '100+',
    detail: 'Foundation & patterns',
  },
  {
    label: 'Medium',
    value: '140+',
    detail: 'Problem solving',
  },
  {
    label: 'Hard',
    value: '15+',
    detail: 'Advanced challenges',
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
    <div className="section-heading reveal">
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


  useEffect(() => {
  const elements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .stagger-item'
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  elements.forEach((element) => observer.observe(element))

  return () => observer.disconnect()
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
        <div className="hero-copy reveal">
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

        <div className="hero-visual reveal-right">
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
            <b>

            <IoInfinite/>
            </b>
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
                className="skill-card reveal stagger-item"
                key={group.title}
                style={{
    '--delay': `${skillGroups.indexOf(group) * 80}ms`,
  } as React.CSSProperties}
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

          <div className="featured-project reveal">
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

            <div className="featured-copy reveal-right">
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
                className="project-card reveal stagger-item"
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
                      Live Demo
                      <ExternalLink />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
  id="leetcode"
  className="
    section
    container
    text-[#e9e8e3]
    [.light_&]:text-[#202124]
  "
>
  <div className="section-heading reveal">
    <span className="eyebrow">
      04 / PROBLEM SOLVING
    </span>

    <h2>
      Thinking in
      <br />
      <em>patterns &amp; solutions.</em>
    </h2>

    <p>
      Regular DSA practice on LeetCode to strengthen
      problem-solving, algorithms, and core computer
      science fundamentals.
    </p>
  </div>

  <div className="grid gap-3 md:grid-cols-[1.35fr_1fr]">

    {/* Main LeetCode Card */}
    <div
      className="
        relative overflow-hidden
        border border-[#2b2d30]
        bg-[#191a1d]
        p-7
        md:p-9

        [.light_&]:border-[#d9dad6]
        [.light_&]:bg-white
      "
    >

      {/* Grid */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.18]

          [background-image:linear-gradient(#2b2d30_1px,transparent_1px),linear-gradient(90deg,#2b2d30_1px,transparent_1px)]
          [background-size:42px_42px]

          [.light_&]:opacity-[0.35]
          [.light_&]:[background-image:linear-gradient(#d9dad6_1px,transparent_1px),linear-gradient(90deg,#d9dad6_1px,transparent_1px)]
        "
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-10">

        <div className="flex items-start justify-between gap-6">

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#e5a83b]">
              LeetCode
            </span>

            <h3
              className="
                mt-3
                text-4xl
                font-medium
                tracking-[-0.05em]
                text-[#e9e8e3]
                md:text-5xl

                [.light_&]:text-[#202124]
              "
            >
              250+
            </h3>

            <p
              className="
                mt-2
                max-w-sm
                text-sm
                text-[#85868a]
                [.light_&]:text-[#686a6d]
              "
            >
              Problems solved through consistent
              algorithm and data structure practice.
            </p>
          </div>

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              border
              border-[#2b2d30]
              bg-[#111214]
              
              text-[#e5a83b]

              [.light_&]:border-[#d9dad6]
              [.light_&]:bg-[#f3f3ef]
            "
          >
            <SiLeetcode size={25}/>
          </div>

        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">

          <div>
            <span
              className="
                block
                font-mono
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-[#85868a]
                [.light_&]:text-[#686a6d]
              "
            >
              Focus
            </span>

            <span
              className="
                mt-1
                block
                text-sm
                text-[#e9e8e3]
                [.light_&]:text-[#202124]
              "
            >
              DSA &amp; Algorithms
            </span>
          </div>

          <span
            className="
              h-8
              w-px
              bg-[#2b2d30]
              [.light_&]:bg-[#d9dad6]
            "
          />

          <div>
            <span
              className="
                block
                font-mono
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-[#85868a]
                [.light_&]:text-[#686a6d]
              "
            >
              Language
            </span>

            <span
              className="
                mt-1
                block
                text-sm
                text-[#e9e8e3]
                [.light_&]:text-[#202124]
              "
            >
              C++
            </span>
          </div>

          <span
            className="
              h-8
              w-px
              bg-[#2b2d30]
              [.light_&]:bg-[#d9dad6]
            "
          />

          <div>
            <span
              className="
                block
                font-mono
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-[#85868a]
                [.light_&]:text-[#686a6d]
              "
            >
              Practice
            </span>

            <span
              className="
                mt-1
                block
                text-sm
                text-[#e9e8e3]
                [.light_&]:text-[#202124]
              "
            >
              Consistent
            </span>
          </div>

        </div>

      </div>
    </div>


    {/* Difficulty cards */}
    <div className="grid grid-cols-2 gap-3">

      {leetcodeStats.slice(1).map((stat) => (
        <div
          key={stat.label}
          className="
            border
            border-[#2b2d30]
            bg-[#191a1d]
            p-5
            transition-all
            duration-200
            hover:-translate-y-1
            hover:border-[#e5a83b]

            [.light_&]:border-[#d9dad6]
            [.light_&]:bg-white
          "
        >

          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.12em]
              text-[#85868a]

              [.light_&]:text-[#686a6d]
            "
          >
            {stat.label}
          </span>

          <strong
            className="
              mt-4
              block
              text-2xl
              font-medium
              tracking-[-0.04em]
              text-[#e9e8e3]

              [.light_&]:text-[#202124]
            "
          >
            {stat.value}
          </strong>

          <p
            className="
              mt-2
              text-[11px]
              leading-relaxed
              text-[#85868a]

              [.light_&]:text-[#686a6d]
            "
          >
            {stat.detail}
          </p>

        </div>
      ))}

    </div>
  </div>


  {/* Bottom */}
  <div
    className="
      mt-5
      flex
      flex-wrap
      items-center
      justify-between
      gap-4
      border-t
      border-[#2b2d30]
      pt-5

      [.light_&]:border-[#d9dad6]
    "
  >

    <div className="flex items-center gap-3">

      <span
        className="
          h-1.5
          w-1.5
          rounded-full
          bg-[#e5a83b]
          shadow-[0_0_0_4px_#2a2418]
        "
      />

      <span
        className="
          font-mono
          text-[10px]
          uppercase
          tracking-[0.12em]
          text-[#85868a]

          [.light_&]:text-[#686a6d]
        "
      >
        Solving problems. Learning patterns. Improving daily.
      </span>

    </div>

    <a
      href="https://leetcode.com/u/Himanshu0112/"
      target="_blank"
      rel="noreferrer"
      className="
        inline-flex
        items-center
        gap-2
        border-b
        border-[#e5a83b]
        pb-1
        font-mono
        text-[11px]
        text-[#e5a83b]
        transition-colors
        hover:text-[#e9e8e3]

        [.light_&]:hover:text-[#202124]
      "
    >
      View LeetCode
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>

  </div>
</section>

      <section className="section container github-section">
        <SectionHeading
          eyebrow="05 / OPEN SOURCE"
          title="More from the workshop."
        />

        <div className="repo-list">
          {repos.map((repo) => (
            <div
              className="repo-row reveal stagger-item"
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
                 
                 {repo.type}
              </span>
                 
              <span className="repo-stat">
      
                {repo.status}
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
            eyebrow="06 / THE JOURNEY"
            title="Learning by doing."
            copy="I'm currently building projects and seeking opportunities to gain professional industry experience."
          />

          <div className="timeline">
            <div className="timeline-item reveal-left">
              <span className="timeline-dot" />

              <div>
                <span className="eyebrow">
                  2024 — PRESENT
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

            <div className="timeline-item muted-item reveal-left">
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
        <div className="resume-card reveal">
          <div>
            <span className="eyebrow">
              07 / RESUME
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
            eyebrow="08 / SAY HELLO"
            title="Let's build something together."
            copy="Have an idea, an opportunity, or just want to talk tech? My inbox is always open."
          />

          <div className="contact-links reveal-left">
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

        <div className='reveal-right'>
          <ContactForm />
        </div>
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