import { useEffect } from 'react'
import ScrollProgressBar from '../components/ScrollProgressBar'
import SectionScanInit from '../components/SectionScanInit'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import SectionSeam from '../components/SectionSeam'
import FeatureTheatre from '../components/FeatureTheatre'
import BrandBandTransition from '../components/BrandBandTransition'
import OutcomeCards from '../components/OutcomeCards'
import IndustryMatrix from '../components/IndustryMatrix'
import IntegrationEcosystem from '../components/IntegrationEcosystem'
import AboutStrip from '../components/AboutStrip'
import AboutContactBridge from '../components/AboutContactBridge'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { scrollToHash } from '../utils/scroll'

export default function HomePage({ loading }) {
  useEffect(() => {
    if (loading) return
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        if (window.location.hash) {
          scrollToHash(window.location.hash, { immediate: true })
        }
      })
    })
  }, [loading])

  return (
    <>
      <ScrollProgressBar />
      <SectionScanInit />
      <Nav />
      <main id="main-content">
        <Hero />
        <SectionSeam />
        <FeatureTheatre />
        <BrandBandTransition />
        <OutcomeCards />
        <IntegrationEcosystem />
        <IndustryMatrix />
        <AboutStrip />
        <AboutContactBridge />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
