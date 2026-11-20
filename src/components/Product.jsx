import { useEffect, useRef, useState } from 'react'

const TABS = [
  { title: 'Risk score', text: 'One clear answer from the model.' },
  { title: 'Vitals', text: 'The inputs behind the score.' },
  { title: 'Next steps', text: 'What the mother or health worker does next.' },
]

export default function Product() {
  const [screen, setScreen] = useState(0)
  const [auto, setAuto] = useState(true)
  const stageRef = useRef(null)
  const phoneRef = useRef(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Cycle through the screens until the visitor picks one themselves.
  useEffect(() => {
    if (!auto || reduce) return
    const id = setInterval(() => setScreen((s) => (s + 1) % TABS.length), 4500)
    return () => clearInterval(id)
  }, [auto, reduce])

  // Tilt the phone toward the pointer.
  const onMove = (e) => {
    if (reduce) return
    const b = stageRef.current.getBoundingClientRect()
    const x = (e.clientX - b.left) / b.width - 0.5
    const y = (e.clientY - b.top) / b.height - 0.5
    phoneRef.current.style.transform = `rotateY(${x * 26}deg) rotateX(${-y * 18}deg)`
  }
  const onLeave = () => { phoneRef.current.style.transform = '' }

  return (
    <section className="wrap product" id="product">
      <div className="stage" ref={stageRef} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="phone" ref={phoneRef}>
          <div className="notch" />
          <div className={`screen ${screen === 0 ? 'on' : ''}`}>
            <div className="sh">MamaSave</div>
            <svg className="gauge" viewBox="0 0 200 110" aria-hidden="true">
              <defs><linearGradient id="mamasave-gauge"><stop offset="0" stopColor="#a99cff" /><stop offset="1" stopColor="#ff7a63" /></linearGradient></defs>
              <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="rgba(236,234,246,.12)" strokeWidth="14" strokeLinecap="round" />
              <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="url(#mamasave-gauge)" strokeWidth="14" strokeLinecap="round" pathLength="100" strokeDasharray="58 100" />
            </svg>
            <div className="big">Moderate</div>
            <div className="sm">Sample risk level</div>
            <div className="pillrow">
              <div><span>Blood pressure</span><span>Watch</span></div>
              <div><span>Hemoglobin</span><span>Normal</span></div>
              <div><span>Next check</span><span>2 weeks</span></div>
            </div>
          </div>
          <div className={`screen ${screen === 1 ? 'on' : ''}`}>
            <div className="sh">Vitals</div>
            <div className="vit"><span><b>Blood pressure</b><span>128 / 84</span></span><div className="bar"><i style={{ width: '68%' }} /></div></div>
            <div className="vit"><span><b>Heart rate</b><span>82 bpm</span></span><div className="bar"><i style={{ width: '46%' }} /></div></div>
            <div className="vit"><span><b>Hemoglobin</b><span>11.4 g/dL</span></span><div className="bar"><i style={{ width: '57%' }} /></div></div>
            <div className="vit"><span><b>Weight gain</b><span>+0.6 kg</span></span><div className="bar"><i style={{ width: '30%' }} /></div></div>
          </div>
          <div className={`screen ${screen === 2 ? 'on' : ''}`}>
            <div className="sh">Next steps</div>
            <div className="step"><b>01</b><span>Recheck blood pressure in 48 hours</span></div>
            <div className="step"><b>02</b><span>Share the summary with the health worker</span></div>
            <div className="step"><b>03</b><span>Find the nearest facility</span></div>
          </div>
        </div>
      </div>

      <div>
        <p className="mono">Product view</p>
        <h2 className="h2">MamaSave, from reading to action.</h2>
        <div className="tabs">
          {TABS.map((t, i) => (
            <button key={t.title} type="button" className={`tab ${screen === i ? 'on' : ''}`} aria-pressed={screen === i}
              onClick={() => { setScreen(i); setAuto(false) }}>
              <strong>{t.title}</strong><span>{t.text}</span>
            </button>
          ))}
        </div>
        <p className="mono note">Concept screens with sample values. MamaSave is a prototype, not a clinically validated tool, and not medical advice.</p>
      </div>
    </section>
  )
}
