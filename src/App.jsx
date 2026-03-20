import { lazy, Suspense, memo } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'

const LogoBar      = lazy(() => import('./sections/LogoBar'))
const Features     = lazy(() => import('./sections/Features'))
const HowItWorks   = lazy(() => import('./sections/HowItWorks'))
const Testimonials = lazy(() => import('./sections/Testimonials'))
const Pricing      = lazy(() => import('./sections/Pricing'))
const Footer       = lazy(() => import('./sections/Footer'))

const SectionFallback = () => (
  <div className="w-full h-32 bg-[var(--surface)] opacity-20" aria-hidden="true" />
)

const App = memo(() => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Suspense fallback={<SectionFallback />}><LogoBar /></Suspense>
      <Suspense fallback={<SectionFallback />}><Features /></Suspense>
      <Suspense fallback={<SectionFallback />}><HowItWorks /></Suspense>
      <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
      <Suspense fallback={<SectionFallback />}><Pricing /></Suspense>
      <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
    </main>
  </>
))

App.displayName = 'App'
export default App
