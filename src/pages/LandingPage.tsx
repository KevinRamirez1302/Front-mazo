import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import Courses from '../components/Courses'
import PlaySection from '../components/PlaySection'
import LeadForm from '../components/LeadForm'
import FAQ from '../components/FAQ'

export default function LandingPage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location])

  return (
    <>
      <Hero />
      <Benefits />
      <Courses />
      <PlaySection />
      <FAQ />
      <LeadForm />
    </>
  )
}
