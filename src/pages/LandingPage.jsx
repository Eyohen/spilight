import GridBackground from '../components/landing/GridBackground.jsx'
import Navbar from '../components/landing/Navbar.jsx'
import Hero from '../components/landing/Hero.jsx'
import Features from '../components/landing/Features.jsx'
import Stats from '../components/landing/Stats.jsx'
import Pricing from '../components/landing/Pricing.jsx'
import CTA from '../components/landing/CTA.jsx'
import Footer from '../components/landing/Footer.jsx'
import '../landing.css'

export default function LandingPage() {
  return (
    <div id="top" className="landing-page">
      <GridBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
