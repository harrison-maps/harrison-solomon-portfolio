import { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownRight, ArrowUpRight, ArrowRight, Menu, X, Mail, ExternalLink,
  Code2, BrainCircuit, Smartphone, Database, Sparkles, HeartPulse, Flame,
  Users, ChevronDown, MapPin, Phone, Layers3, Sprout, Activity, Check,
} from 'lucide-react'
import './styles.css'

const EMAIL = 'ssempa3666@gmail.com'
const GITHUB = 'https://github.com/harrison-maps'
const LINKEDIN = 'https://www.linkedin.com/in/ssempala-undefined-a829813a7'
const PHONE = '+256 750 937 488'
const WHATSAPP = 'https://wa.me/256750937488'

const projects = [
  {
    id: 'mamasave', number: '01', title: 'MamaSave', category: 'Health & agriculture', eyebrow: 'MATERNAL HEALTH · RISK PREDICTION',
    description: 'A maternal-health monitoring concept bringing physiological signals, risk prediction, and timely alerts together to support earlier attention for mothers and babies.',
    contribution: 'Model experimentation, API integration, and prototype development. The model is a prototype, not a clinically validated diagnostic tool.',
    stack: ['Python', 'XGBoost', 'FastAPI', 'Mobile app'], icon: HeartPulse, theme: 'coral', status: 'Prototype', href: `mailto:${EMAIL}?subject=${encodeURIComponent('MamaSave project inquiry')}`, linkLabel: 'Ask about the project', publicRepo: false,
  },
  {
    id: 'jinja-fire', number: '02', title: 'Jinja Fire Detection', category: 'AI & data', eyebrow: 'IOT · PUBLIC SAFETY',
    description: 'An IoT-based smoke-detection and notification concept designed to alert building occupants and fire responders in Jinja.',
    contribution: 'Project concept and implementation work around sensing, detection, and alerting. The repository documents the prototype direction and intended workflow.',
    stack: ['IoT', 'Sensors', 'HTML', 'JavaScript'], icon: Flame, theme: 'ink', status: 'Public repository', href: 'https://github.com/harrison-maps/fire_project', linkLabel: 'View repository', publicRepo: true,
  },
  {
    id: 'fire-ml', number: '03', title: 'Fire Incident Prediction', category: 'AI & data', eyebrow: 'MACHINE LEARNING · JINJA',
    description: 'An exploratory data-analysis and machine-learning project investigating incident patterns and the factors associated with fire severity.',
    contribution: 'Data exploration, visualisation, feature preparation, and model experiments. The public README flags evaluation results for further verification, so no performance claim is made here.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost'], icon: Activity, theme: 'lavender', status: 'Public repository', href: 'https://github.com/harrison-maps/fire_incident_prediction', linkLabel: 'View repository', publicRepo: true,
  },
  {
    id: 'simplybridge', number: '04', title: 'SimplyBridge', category: 'Web & tools', eyebrow: 'WEB PLATFORM · DEVELOPER COMMUNITY',
    description: 'A platform concept helping developers in Uganda and across Africa showcase their skills, make projects discoverable, and connect with clients and collaborators.',
    contribution: 'Backend API and product planning, with a focus on developer profiles, authentication, and discovery.',
    stack: ['FastAPI', 'SQLAlchemy', 'SQLite', 'JWT'], icon: Users, theme: 'sage', status: 'In development', href: `mailto:${EMAIL}?subject=${encodeURIComponent('SimplyBridge collaboration')}`, linkLabel: 'Discuss collaboration', publicRepo: false,
  },
  {
    id: 'livestock', number: '05', title: 'Livestock Health Risk Predictor', category: 'Health & agriculture', eyebrow: 'AGRITECH · MACHINE LEARNING',
    description: 'A machine-learning project direction for helping farmers identify potential livestock health risks, developed in the context of the AYuTe Africa Challenge Uganda.',
    contribution: 'Problem framing and model-focused prototype work. Predictions should be treated as decision support, not veterinary diagnosis.',
    stack: ['Python', 'Machine learning', 'Agriculture'], icon: Sprout, theme: 'sage', status: 'Challenge project', href: `mailto:${EMAIL}?subject=${encodeURIComponent('Livestock Health Risk Predictor inquiry')}`, linkLabel: 'Ask about the project', publicRepo: false,
  },
  {
    id: 'aibos', number: '06', title: 'AIBOS Todo', category: 'Web & tools', eyebrow: 'FULL STACK · PRODUCTIVITY',
    description: 'A lightweight task manager that connects a Streamlit interface with a FastAPI backend, exploring practical CRUD workflows and persistence.',
    contribution: 'API routes, task operations, and application structure. The public repository includes setup instructions and the implementation.',
    stack: ['Python', 'FastAPI', 'Streamlit', 'SQLite'], icon: Code2, theme: 'cream', status: 'Public repository', href: 'https://github.com/harrison-maps/aibos_todo_app', linkLabel: 'View repository', publicRepo: true,
  },
]

const filters = ['All projects', 'Health & agriculture', 'AI & data', 'Web & tools']
const capabilities = [
  { icon: Code2, title: 'Software development', text: 'Building APIs, interfaces, and small end-to-end applications with an emphasis on clarity and usefulness.' },
  { icon: BrainCircuit, title: 'Machine learning & data', text: 'Exploring datasets, preparing features, testing models, and communicating what results can—and cannot—say.' },
  { icon: Smartphone, title: 'Prototyping products', text: 'Connecting web or mobile interfaces to backend services to turn an idea into something people can try.' },
  { icon: Layers3, title: 'Learning in public', text: 'Improving fundamentals through project work, documentation, collaboration, and honest iteration.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All projects')
  const [expandedProject, setExpandedProject] = useState(null)
  const [copied, setCopied] = useState(false)
  const visibleProjects = useMemo(() => activeFilter === 'All projects' ? projects : projects.filter(p => p.category === activeFilter), [activeFilter])
  const closeMenu = () => setMenuOpen(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <a href="#top" className="brand" onClick={closeMenu} aria-label="Ssempala Harrison Solomon home"><span className="brand-mark">HS<span>.</span></span><span className="brand-name">Ssempala Harrison Solomon<small>SOFTWARE · DATA · IMPACT</small></span></a>
        <button className="mobile-toggle" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#skills" onClick={closeMenu}>Expertise</a><a href="#journey" onClick={closeMenu}>Journey</a><a className="nav-contact" href="#contact" onClick={closeMenu}>Let's connect <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <main>
        <section className="hero content-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> COMPUTER SCIENCE · KAMPALA, UGANDA</p>
            <h1 id="hero-title">I build technology<br />for <em>real life.</em></h1>
            <p className="hero-summary">I'm Harrison Solomon, a Computer Science student at Makerere University building across software, data, and machine learning. I care about turning real problems into useful, thoughtful products.</p>
            <div className="hero-actions"><a className="button button-dark" href="#work">Explore selected work <ArrowDownRight size={16} /></a><a className="text-link" href={`mailto:${EMAIL}`}>Email me <ArrowUpRight size={15} /></a></div>
            <div className="hero-meta"><span><MapPin size={14} /> Kampala, Uganda</span><span className="meta-separator" /><span>Open to opportunities & collaboration</span></div>
          </div>
          <div className="hero-art-wrap">
            <div className="art-label art-label-top">A PRACTICE IN PROGRESS <span>✳</span></div>
            <div className="hero-art-frame"><img src="/harrison-editorial.webp" alt="Editorial artwork of Harrison working at a laptop, surrounded by code, coral and lavender graphic textures" fetchPriority="high" /></div>
            <div className="art-label art-label-bottom"><span>BUILD / SOLVE / IMPROVE</span><span>01 — 26</span></div>
            <div className="hero-art-note"><Sparkles size={15} /><span>Ideas → Code → Impact</span></div>
          </div>
          <a className="scroll-hint" href="#intro"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={14} /></a>
        </section>

        <section className="intro-band" id="intro"><div className="content-width intro-inner"><p className="eyebrow">THE THROUGH-LINE</p><p className="intro-statement">I’m interested in the space where <em>technology meets human needs</em> — maternal health, public safety, agriculture, and tools that help people connect.</p></div></section>

        <section className="work-section content-width" id="work">
          <div className="section-heading"><div><p className="eyebrow">SELECTED WORK · REAL PROJECTS</p><h2>Built with <em>purpose.</em></h2></div><p className="section-aside">A few projects, experiments, and<br className="desktop-break" /> ideas I'm learning through.</p></div>
          <div className="filter-row" role="group" aria-label="Filter projects">{filters.map(filter => <button key={filter} className={`filter-chip ${activeFilter === filter ? 'active' : ''}`} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          <div className="project-grid">{visibleProjects.map(project => {
            const Icon = project.icon
            const expanded = expandedProject === project.id
            return <article className={`project-card ${project.theme}`} key={project.id}>
              <div className="project-visual"><span className="project-number">{project.number} <i>/ 06</i></span><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="visual-icon"><Icon size={32} strokeWidth={1.35} /></div><span className="visual-caption">{project.eyebrow}</span><span className="visual-cross cross-one">+</span><span className="visual-cross cross-two">+</span></div>
              <div className="project-body"><div className="project-meta"><span>{project.category}</span><span className={`status-pill ${project.publicRepo ? 'status-public' : ''}`}>{project.status}</span></div><h3>{project.title}</h3><p className="project-description">{project.description}</p>
                {expanded && <div className="project-detail"><strong>My focus / context</strong><p>{project.contribution}</p></div>}
                <div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
                <div className="project-footer"><button className="detail-toggle" onClick={() => setExpandedProject(expanded ? null : project.id)} aria-expanded={expanded}>{expanded ? 'Less detail' : 'More about this'} <ChevronDown size={14} className={expanded ? 'chevron-open' : ''} /></button><a className="project-link" href={project.href} target={project.href.startsWith('http') ? '_blank' : undefined} rel={project.href.startsWith('http') ? 'noreferrer' : undefined}>{project.linkLabel} <ArrowUpRight size={14} /></a></div>
              </div>
            </article>
          })}</div>
          <div className="more-work"><p>There's more in the workshop.</p><a href={GITHUB} target="_blank" rel="noreferrer">Explore all public repositories <ArrowUpRight size={15} /></a></div>
          <p className="honesty-note">I label work honestly: some projects have public repositories, while others are prototypes or in-progress collaborations. I avoid claiming outcomes or model performance that haven't been validated.</p>
        </section>

        <section className="about-section" id="about"><div className="content-width about-grid"><div className="about-portrait-wrap"><div className="about-portrait"><img src="/harrison-portrait.webp" alt="Portrait of Ssempala Harrison Solomon" loading="lazy" /></div><span className="portrait-stamp">KAMPALA<br />UGANDA <ArrowDownRight size={15} /></span><div className="portrait-side-note">CURIOUS BY NATURE · BUILDER BY PRACTICE</div></div><div className="about-copy"><p className="eyebrow">A LITTLE ABOUT ME</p><h2>Still learning.<br />Already <em>building.</em></h2><p>I'm a second-year Computer Science student at Makerere University. I work across web development, APIs, data analysis, and machine learning, learning by making things and improving them as I go.</p><p>My favourite projects start with a practical problem. I like understanding the people affected, testing what technology can realistically do, and being clear about what still needs work.</p><div className="about-values"><span><Check size={14} /> Practical problem-solving</span><span><Check size={14} /> Honest experimentation</span><span><Check size={14} /> Learning with collaborators</span></div><a className="text-link" href={GITHUB} target="_blank" rel="noreferrer">Explore my GitHub <ArrowUpRight size={15} /></a></div></div></section>

        <section className="skills-section content-width" id="skills"><div className="section-heading"><div><p className="eyebrow">WHAT I BRING TO A TEAM</p><h2>Tools for <em>the work.</em></h2></div><p className="section-aside">A practical toolkit, still growing<br className="desktop-break" /> through study and projects.</p></div><div className="capability-grid">{capabilities.map((item, i) => {const Icon = item.icon; return <article className="capability" key={item.title}><div className="capability-top"><span>0{i + 1}</span><Icon size={23} strokeWidth={1.4} /></div><h3>{item.title}</h3><p>{item.text}</p></article>})}</div><div className="stack-line"><span>LANGUAGES</span><p>Python · JavaScript · Dart · SQL · HTML · CSS</p><span>TOOLS & FRAMEWORKS</span><p>FastAPI · React · Flutter · scikit-learn · XGBoost · TensorFlow · pandas · NumPy · SQLite · Git</p></div></section>

        <section className="journey-section" id="journey"><div className="content-width journey-grid"><div className="journey-intro"><p className="eyebrow">THE JOURNEY SO FAR</p><h2>Learning by<br /><em>making.</em></h2><p>I'm building the foundations to contribute to real teams and grow into a developer who can take an idea from a clear problem to a working prototype.</p></div><div className="timeline"><article><span className="timeline-dot" /><p className="timeline-label">EDUCATION</p><h3>Makerere University</h3><p>Computer Science · Strengthening fundamentals in programming, software, and computing.</p></article><article><span className="timeline-dot" /><p className="timeline-label">PROJECT WORK</p><h3>From ideas to prototypes</h3><p>Exploring maternal health, fire safety, agriculture, data analysis, and community platforms.</p></article><article><span className="timeline-dot" /><p className="timeline-label">COMMUNITY</p><h3>Technology with purpose</h3><p>Interested in youth empowerment, social impact, and widening access to useful opportunities.</p></article></div></div></section>

        <section className="contact-section content-width" id="contact"><p className="eyebrow">HAVE A GOOD PROBLEM?</p><h2>Let's build something<br /><em>that matters.</em></h2><p className="contact-summary">I'm open to internships, junior opportunities, freelance projects, hackathons, grants, and collaborations with people building useful things.</p><div className="contact-actions"><a className="button button-light" href={`mailto:${EMAIL}`}><Mail size={16} /> Email me <ArrowUpRight size={15} /></a><a className="button button-outline" href={WHATSAPP} target="_blank" rel="noreferrer"><Phone size={16} /> WhatsApp</a><button className="button button-outline copy-button" onClick={copyEmail}>{copied ? <Check size={15} /> : <Mail size={15} />}{copied ? 'Email copied' : 'Copy email'}</button></div><div className="contact-details"><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>{PHONE}</span><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href={GITHUB} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a></div><footer className="footer-line"><span>DESIGNED WITH INTENTION · BUILT WITH CODE</span><a href="#top">BACK TO TOP ↑</a><span>© {new Date().getFullYear()} SSEMPALA HARRISON SOLOMON</span></footer></section>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
