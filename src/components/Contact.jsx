import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Mail, Phone } from 'lucide-react'
import { EMAIL, GITHUB, LINKEDIN, PHONE, WHATSAPP } from '../data'

const kampalaTime = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Kampala' }).format(new Date()) + ' EAT'

export default function Contact() {
  const canvasRef = useRef(null)
  const [time, setTime] = useState(kampalaTime)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTime(kampalaTime()), 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let cancelled = false
    let dispose
    import('../three/globe')
      .then(({ createGlobe }) => {
        if (!cancelled) dispose = createGlobe(canvasRef.current, reduce)
      })
      .catch((err) => console.warn('3D globe unavailable', err))
    return () => { cancelled = true; if (dispose) dispose() }
  }, [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <div className="foot-band" id="contact">
      <footer className="wrap">
        <div className="foot">
          <div>
            <p className="mono">Have a good problem?</p>
            <h2 className="h2">Let's build something that matters.</h2>
            <p className="body-p dim">I am open to internships, junior opportunities, freelance projects, hackathons, grants, and collaborations with people building useful things.</p>
            <div className="cta">
              <a className="btn primary" href={`mailto:${EMAIL}`}><Mail size={16} /> Email me</a>
              <a className="btn" href={WHATSAPP} target="_blank" rel="noreferrer"><Phone size={16} /> WhatsApp</a>
              <button className="btn" type="button" onClick={copyEmail}>{copied ? <Check size={16} /> : <Mail size={16} />}{copied ? 'Email copied' : 'Copy email'}</button>
            </div>
            <div className="links">
              <span className="mono">{EMAIL}</span>
              <span className="mono">{PHONE}</span>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12} /></a>
              <a href={GITHUB} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a>
            </div>
          </div>
          <div className="gw">
            <div className="globe-box"><canvas ref={canvasRef} className="globe-canvas" aria-label="Globe centred on Kampala" /></div>
            <p className="gtag mono"><b>Kampala, Uganda</b>0.35° N · 32.58° E · {time}</p>
          </div>
        </div>
        <div className="bigname" aria-hidden="true">Harrison<br />Solomon</div>
        <div className="legal mono">
          <span>© {new Date().getFullYear()} Ssempala Harrison Solomon</span>
          <a href="#home">Back to top ↑</a>
          <span>Designed with intention · Built with code</span>
        </div>
      </footer>
    </div>
  )
}
