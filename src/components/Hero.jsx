import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import { EMAIL } from '../data'

export default function Hero() {
  const bandRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let cancelled = false
    let dispose
    // Three.js is loaded on demand so the text paints before the 3D code arrives.
    import('../three/sensorGrid')
      .then(({ createSensorGrid }) => {
        if (!cancelled) dispose = createSensorGrid(canvasRef.current, bandRef.current, reduce)
      })
      .catch((err) => console.warn('3D hero unavailable', err)) // the page still works without WebGL
    return () => { cancelled = true; if (dispose) dispose() }
  }, [])

  return (
    <div className="hero-band" id="home" ref={bandRef}>
      <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="wrap rel">
        <header className="hero">
          <div className="hero-copy">
            <p className="eyebrow mono"><span className="dot" /> Computer science · Kampala, Uganda</p>
            <h1><span>Harrison</span><span className="g">Solomon</span></h1>
            <p className="lede">I build technology for real life. Software, data, and machine learning that turn real problems into useful, thoughtful products.</p>
            <div className="cta">
              <a className="btn primary" href="#work">Explore selected work <ArrowDownRight size={16} /></a>
              <a className="btn" href={`mailto:${EMAIL}`}>Email me <ArrowUpRight size={16} /></a>
            </div>
            <p className="hero-meta mono"><MapPin size={13} /> Open to opportunities and collaboration</p>
          </div>
          <div className="cue mono" aria-hidden="true"><span>Scroll</span><i /></div>
        </header>
      </div>
    </div>
  )
}
