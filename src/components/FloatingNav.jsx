import { useEffect, useRef, useState } from 'react'

const LINKS = [
  ['home', 'Home'], ['story', 'Story'], ['product', 'Product'], ['work', 'Work'], ['about', 'About'], ['contact', 'Contact'],
]

// Glass pill nav that follows you, plus a thin scroll progress bar at the top.
export default function FloatingNav() {
  const [active, setActive] = useState('home')
  const barRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
      let current = LINKS[0][0]
      for (const [id] of LINKS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id
      }
      setActive(current)
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  return (
    <>
      <div className="progress" ref={barRef} aria-hidden="true" />
      <nav className="fnav" aria-label="Sections">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>{label}</a>
        ))}
      </nav>
    </>
  )
}
