import { useEffect, useRef, useState } from 'react'
import { chapters } from '../data'

const N = 260 // number of dots

// Four layouts for the same 260 dots. All coordinates are fractions of the canvas (0 to 1).
function buildLayouts() {
  let seed = 7
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647 // tiny seeded random, so it never changes between loads
  const L = [[], [], [], []]
  for (let i = 0; i < N; i++) L[0].push([rnd(), rnd()])                                      // scattered
  for (let i = 0; i < N; i++) L[1].push([0.1 + 0.8 * ((i % 20) / 19), 0.14 + 0.72 * (Math.floor(i / 20) / 12)]) // grid
  for (let i = 0; i < N; i++) {                                                               // four signal lines
    const line = Math.floor(i / 65), k = (i % 65) / 64
    L[2].push([0.06 + 0.88 * k, 0.2 + line * 0.19 + 0.05 * Math.sin(k * 6.283 * (1 + line * 0.5) + line)])
  }
  for (let i = 0; i < N; i++) {                                                               // a phone outline
    const a = (i / N) * 6.283, c = Math.cos(a), s = Math.sin(a)
    L[3].push([0.5 + 0.17 * Math.sign(c) * Math.abs(c) ** 0.3, 0.5 + 0.4 * Math.sign(s) * Math.abs(s) ** 0.3])
  }
  return L
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const ease = (t) => t * t * (3 - 2 * t)

export default function Story() {
  const secRef = useRef(null)
  const cvRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const sec = secRef.current, cv = cvRef.current, ctx = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const layouts = buildLayouts()
    let W = 0, H = 0, prog = 0, last = 0, visible = true, raf = 0

    const size = () => {
      W = cv.clientWidth; H = cv.clientHeight
      if (!W || !H) return
      cv.width = W * dpr; cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t) => {
      if (!W) { size(); if (!W) return }
      ctx.clearRect(0, 0, W, H)
      // prog runs 0 to 3. The whole part picks the layout pair, the fraction is how far to morph.
      const a = clamp(Math.floor(prog), 0, 2)
      const f = ease(clamp(prog - a, 0, 1))
      const wobble = reduce ? 0 : 0.012 * (1 - Math.min(prog, 1))
      const P = layouts[a].map((p0, n) => {
        const p1 = layouts[a + 1][n]
        const x = p0[0] + (p1[0] - p0[0]) * f + Math.sin(t * 0.8 + n) * wobble
        const y = p0[1] + (p1[1] - p0[1]) * f + Math.cos(t * 0.7 + n * 1.3) * wobble
        return [x * W, y * H]
      })
      const lineAlpha = clamp((prog - 1.4) / 0.8, 0, 1) * 0.35
      if (lineAlpha > 0) {
        ctx.strokeStyle = `rgba(255,122,99,${lineAlpha})`; ctx.lineWidth = 1; ctx.beginPath()
        for (let n = 0; n < N - 1; n++) {
          if (n % 65 === 64 && prog < 2.6) continue // do not join one signal line to the next
          ctx.moveTo(P[n][0], P[n][1]); ctx.lineTo(P[n + 1][0], P[n + 1][1])
        }
        ctx.stroke()
      }
      const m = prog / 3
      ctx.fillStyle = `rgb(${Math.round(169 + 86 * m)},${Math.round(156 - 34 * m)},${Math.round(255 - 156 * m)})`
      for (const [x, y] of P) { ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 6.283); ctx.fill() }
    }

    // Scroll position inside the tall section becomes the 0 to 3 progress value.
    const update = () => {
      const r = sec.getBoundingClientRect()
      prog = clamp(-r.top / (r.height - window.innerHeight), 0, 1) * 3
      const ci = Math.round(prog)
      if (ci !== last) { last = ci; setActive(ci) }
      draw(performance.now() / 1000)
    }

    const ro = new ResizeObserver(() => { size(); update() })
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(sec)
    window.addEventListener('scroll', update, { passive: true })
    const idle = () => { raf = requestAnimationFrame(idle); if (visible) draw(performance.now() / 1000) }
    size(); update()
    if (!reduce) raf = requestAnimationFrame(idle)

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <section className="story" id="story" ref={secRef}>
      <div className="wrap story-in">
        <canvas className="story-canvas" ref={cvRef} aria-label="Dots that move from scattered, to a sensor grid, to signal lines, to a phone outline as you scroll" />
        <div>
          <p className="label mono">How I work · scroll</p>
          {chapters.map((c, i) => (
            <div className={`chap ${active === i ? 'on' : ''}`} key={c.title}>
              <h3><b>0{i + 1}</b>{c.title}</h3>
              <div className="pp"><p>{c.text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
