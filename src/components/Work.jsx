import { useMemo, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import Reveal from './Reveal'
import { filters, projects, GITHUB } from '../data'

export default function Work() {
  const [filter, setFilter] = useState('All projects')
  const [open, setOpen] = useState(null)
  const visible = useMemo(
    () => (filter === 'All projects' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section className="wrap work" id="work">
      <p className="mono">Selected work · real projects</p>
      <h2 className="h2">Built with purpose.</h2>

      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button key={f} type="button" className={`fchip ${filter === f ? 'on' : ''}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="rows">
        {visible.map((p) => {
          const expanded = open === p.id
          const external = p.href.startsWith('http')
          return (
            <Reveal as="article" className="row" key={p.id}>
              <div className="mono row-cat"><span>{p.number} / 06</span><span>{p.eyebrow}</span></div>
              <div className="row-main">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {expanded && <div className="detail"><strong className="mono">My focus and context</strong><p>{p.contribution}</p></div>}
                <div className="chips">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
                <button type="button" className="toggle" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : p.id)}>
                  {expanded ? 'Less detail' : 'More about this'} <ChevronDown size={14} className={expanded ? 'flip' : ''} />
                </button>
              </div>
              <div className="row-side">
                <span className={`status ${p.publicRepo ? 'public' : ''}`}>{p.status}</span>
                <a className="plink" href={p.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{p.linkLabel} <ArrowUpRight size={14} /></a>
              </div>
            </Reveal>
          )
        })}
      </div>

      <p className="more">There is more in the workshop. <a href={GITHUB} target="_blank" rel="noreferrer">Explore all public repositories <ArrowUpRight size={14} /></a></p>
      <p className="note-honest">I label work honestly. Some projects have public repositories, while others are prototypes or in progress collaborations. I avoid claiming outcomes or model performance that have not been validated.</p>
    </section>
  )
}
