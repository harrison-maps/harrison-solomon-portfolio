import { ArrowUpRight, Check } from 'lucide-react'
import Reveal from './Reveal'
import { capabilities, GITHUB, journey } from '../data'

export default function About() {
  return (
    <>
      <section className="wrap about" id="about">
        <Reveal className="portrait">
          <img src="/harrison-portrait.webp" alt="Portrait of Ssempala Harrison Solomon" loading="lazy" />
          <span className="stamp mono">Kampala · Uganda</span>
        </Reveal>
        <Reveal>
          <p className="mono">A little about me</p>
          <h2 className="h2">Still learning. Already building.</h2>
          <p className="body-p">I am a third year Computer Science student at Makerere University. I work across web development, APIs, data analysis, and machine learning, learning by making things and improving them as I go.</p>
          <p className="body-p dim">My favourite projects start with a practical problem. I like understanding the people affected, testing what technology can realistically do, and being clear about what still needs work.</p>
          <ul className="values">
            <li><Check size={14} /> Practical problem solving</li>
            <li><Check size={14} /> Honest experimentation</li>
            <li><Check size={14} /> Learning with collaborators</li>
          </ul>
          <a className="plink" href={GITHUB} target="_blank" rel="noreferrer">Explore my GitHub <ArrowUpRight size={14} /></a>
        </Reveal>
      </section>

      <section className="wrap skills" id="skills">
        <p className="mono">What I bring to a team</p>
        <h2 className="h2">Tools for the work.</h2>
        <div className="caps">
          {capabilities.map((c, i) => (
            <Reveal as="article" className="cap" key={c.title}>
              <span className="mono">0{i + 1}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
        <dl className="stackline">
          <dt className="mono">Languages</dt><dd>Python · JavaScript · TypeScript · Dart · SQL · C++ · HTML · CSS</dd>
          <dt className="mono">Tools and frameworks</dt><dd>FastAPI · React · Flutter · React Native · scikit-learn · XGBoost · TensorFlow · pandas · NumPy · SQLite · PostgreSQL · Git</dd>
        </dl>
      </section>

      <section className="wrap journey" id="journey">
        <div>
          <p className="mono">The journey so far</p>
          <h2 className="h2">Learning by making.</h2>
          <p className="body-p dim">I am building the foundations to contribute to real teams and grow into a developer who can take an idea from a clear problem to a working prototype.</p>
        </div>
        <div className="timeline">
          {journey.map((j) => (
            <Reveal as="article" key={j.title}>
              <p className="mono">{j.label}</p>
              <h3>{j.title}</h3>
              <p>{j.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
