import { useEffect, useRef } from 'react'

// A soft ring that trails the mouse and grows over links and buttons. Hidden on touch screens.
export default function CursorRing() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0
    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      tx = e.clientX; ty = e.clientY
      el.classList.add('on')
      el.classList.toggle('big', !!e.target.closest('a, button, .row, .tab'))
    }
    const onLeave = () => el.classList.remove('on')
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2
      el.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave) }
  }, [])

  return <div className="cursor" ref={ref} aria-hidden="true" />
}
