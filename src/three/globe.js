import * as THREE from 'three'

THREE.ColorManagement.enabled = false

const R = 3
const LAT = (0.35 * Math.PI) / 180 // Kampala
const LON = (32.58 * Math.PI) / 180

/** Dotted globe turned to face Kampala, with a pulsing marker. Returns a dispose function. */
export function createGlobe(canvas, reduce) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.set(0, 0, 11)

  // Fibonacci sphere: spreads points evenly with no clumping at the poles.
  const COUNT = 1800
  const pts = new Float32Array(COUNT * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let n = 0; n < COUNT; n++) {
    const y = 1 - (n / (COUNT - 1)) * 2
    const ring = Math.sqrt(1 - y * y)
    const th = golden * n
    pts[n * 3] = Math.cos(th) * ring * R
    pts[n * 3 + 1] = y * R
    pts[n * 3 + 2] = Math.sin(th) * ring * R
  }
  const dotGeo = new THREE.BufferGeometry()
  dotGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3))
  const dotMat = new THREE.PointsMaterial({ color: 0xa99cff, size: 0.045, transparent: true, opacity: 0.8 })
  const coreGeo = new THREE.SphereGeometry(R * 0.985, 40, 28)
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x141729 }) // hides the dots on the far side

  // `face` turns the sphere so Kampala points at the camera; `spin` sways around that.
  const spin = new THREE.Group()
  const face = new THREE.Group()
  face.rotation.y = -LON
  face.rotation.x = LAT
  spin.add(face)
  scene.add(spin)
  face.add(new THREE.Points(dotGeo, dotMat))
  face.add(new THREE.Mesh(coreGeo, coreMat))

  const marker = new THREE.Group()
  const at = new THREE.Vector3(
    R * Math.cos(LAT) * Math.sin(LON), R * Math.sin(LAT), R * Math.cos(LAT) * Math.cos(LON),
  ).multiplyScalar(1.004)
  marker.position.copy(at)
  marker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), at.clone().normalize())
  const dotM = new THREE.Mesh(new THREE.CircleGeometry(0.09, 24), new THREE.MeshBasicMaterial({ color: 0xff7a63 }))
  marker.add(dotM)
  const ringGeo = new THREE.RingGeometry(0.95, 1, 48)
  const rings = [0, 1, 2].map(() => {
    const m = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xff7a63, transparent: true, opacity: 0, side: THREE.DoubleSide }))
    marker.add(m)
    return m
  })
  face.add(marker)

  const draw = (t) => {
    spin.rotation.y = Math.sin(t * 0.35) * 0.55
    spin.rotation.x = Math.sin(t * 0.22) * 0.08
    rings.forEach((r, i) => {
      const phase = ((t * 0.5) + i / 3) % 1
      r.scale.setScalar(0.12 + phase * 0.9)
      r.material.opacity = (1 - phase) * 0.7
    })
    renderer.render(scene, camera)
  }

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    if (reduce) draw(0.4)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  let visible = true, raf = 0
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
  io.observe(canvas)
  const t0 = performance.now()
  const loop = (now) => { raf = requestAnimationFrame(loop); if (visible) draw((now - t0) / 1000) }
  if (reduce) draw(0.4); else raf = requestAnimationFrame(loop)

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect(); ro.disconnect()
    dotGeo.dispose(); dotMat.dispose(); coreGeo.dispose(); coreMat.dispose(); ringGeo.dispose()
    dotM.geometry.dispose(); dotM.material.dispose()
    rings.forEach((r) => r.material.dispose())
    renderer.dispose()
  }
}
