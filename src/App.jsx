import FloatingNav from './components/FloatingNav'
import CursorRing from './components/CursorRing'
import Hero from './components/Hero'
import Story from './components/Story'
import Product from './components/Product'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <FloatingNav />
      <CursorRing />
      <main>
        <Hero />
        <Story />
        <Product />
        <Work />
        <About />
      </main>
      <Contact />
    </>
  )
}
