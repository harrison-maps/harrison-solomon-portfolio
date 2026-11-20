import * as THREE from 'three'

// The shaders were tuned with raw sRGB colour values, so keep colour management off
// to make the scene look the same as the prototype.
THREE.ColorManagement.enabled = false

// Vertex shader: the GPU moves every point up or down. The height is a slow wave,
// plus a ring wave for each click, plus a bump under the cursor.
const VERT = /* glsl */ `
uniform float uTime;
uniform vec4 uR[8];      // x, z, start time, active flag for each ripple
uniform vec2 uMouse;
uniform float uPx;
varying float vH;
varying float vFade;
void main() {
  vec3 p = position;
  float h = 0.32 * sin(p.x * 0.32 + uTime * 0.6) * cos(p.z * 0.28 + uTime * 0.45);
  for (int i = 0; i < 8; i++) {
    vec4 r = uR[i];
    if (r.w > 0.5) {
      float age = uTime - r.z;
      float d = distance(p.xz, r.xy);
      float front = age * 6.5;
      float w = exp(-pow(d - front, 2.0) * 0.45) * exp(-age * 0.55);
      h += 2.1 * w * cos((d - front) * 2.4);
    }
  }
  float dm = distance(p.xz, uMouse);
  h += 1.0 * exp(-dm * dm * 0.07);
  p.y = h;
  vH = h;
  vFade = 1.0 - smoothstep(9.0, 15.5, abs(p.x) * 0.55 + max(-p.z, 0.0) * 0.9);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uPx * 46.0 / -mv.z * (1.0 + max(h, 0.0) * 0.55);
  gl_Position = projectionMatrix * mv;
}`

// Fragment shader: round soft dots that shift from lavender to coral as they rise.
const FRAG = /* glsl */ `
uniform vec3 uLav;
uniform vec3 uCoral;
varying float vH;
varying float vFade;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.15, d);
  vec3 col = mix(uLav, uCoral, smoothstep(0.35, 2.0, vH));
  gl_FragColor = vec4(col, a * vFade * (0.38 + clamp(vH, 0.0, 2.0) * 0.4));
}`

/**
 * Creates the hero sensor grid. `band` is the element that listens for the pointer.
 * Returns a dispose function that React calls on unmount.
 */
export function createSensorGrid(canvas, band, reduce) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200)
  camera.position.set(0, 8.5, 21)
  camera.lookAt(0, 0, -2)

  // A flat grid of points lying on the floor (y = 0). The shader lifts them.
  const COLS = 150, ROWS = 96, GAP = 0.34
  const positions = new Float32Array(COLS * ROWS * 3)
  let k = 0
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      positions[k++] = (c - COLS / 2) * GAP
      positions[k++] = 0
      positions[k++] = (r - ROWS / 2) * GAP - 4
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const ripples = Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, -99, 0))
  const uniforms = {
    uTime: { value: 0 },
    uR: { value: ripples },
    uMouse: { value: new THREE.Vector2(999, 999) },
    uPx: { value: renderer.getPixelRatio() },
    uLav: { value: new THREE.Color('#a99cff') },
    uCoral: { value: new THREE.Color('#ff7a63') },
  }
  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader: VERT, fragmentShader: FRAG,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  })
  scene.add(new THREE.Points(geometry, material))

  let nextRipple = 0
  const ping = (x, z, t) => { ripples[nextRipple].set(x, z, t, 1); nextRipple = (nextRipple + 1) % ripples.length }

  // Turn a pointer position into a point on the floor by casting a ray through the camera.
  const ray = new THREE.Raycaster()
  const floor = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  const hit = new THREE.Vector3()
  const ndc = new THREE.Vector2()
  const toFloor = (e) => {
    const b = canvas.getBoundingClientRect()
    ndc.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1)
    ray.setFromCamera(ndc, camera)
    return ray.ray.intersectPlane(floor, hit) ? hit : null
  }
  const onMove = (e) => { const p = toFloor(e); if (p) uniforms.uMouse.value.set(p.x, p.z) }
  const onLeave = () => uniforms.uMouse.value.set(999, 999)
  const onDown = (e) => {
    if (e.target.closest('a, button')) return
    const p = toFloor(e); if (p) ping(p.x, p.z, uniforms.uTime.value)
  }
  band.addEventListener('pointermove', onMove)
  band.addEventListener('pointerleave', onLeave)
  band.addEventListener('pointerdown', onDown)

  let nextAuto = 1.2
  const draw = (t) => {
    uniforms.uTime.value = t
    if (t > nextAuto) {
      ping((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 12 - 2, t)
      nextAuto = t + 2.8 + Math.random() * 2
    }
    renderer.render(scene, camera)
  }

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    if (reduce) draw(2.2)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  // Only render while the hero is on screen.
  let visible = true, raf = 0
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
  io.observe(canvas)
  const t0 = performance.now()
  const loop = (now) => { raf = requestAnimationFrame(loop); if (visible) draw((now - t0) / 1000) }
  if (reduce) { ping(2, 0, 0); draw(2.2) } else raf = requestAnimationFrame(loop)

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect(); ro.disconnect()
    band.removeEventListener('pointermove', onMove)
    band.removeEventListener('pointerleave', onLeave)
    band.removeEventListener('pointerdown', onDown)
    geometry.dispose(); material.dispose(); renderer.dispose()
  }
}
