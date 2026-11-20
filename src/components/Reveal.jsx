import { useEffect, useRef, useState } from 'react'

// Slides an element up once it scrolls into view. It is fully visible at rest,
// so a screenshot or a skim never sees an empty page.
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <Tag ref={ref} className={`rv ${seen ? 'in' : ''} ${className}`} {...rest}>{children}</Tag>
}
