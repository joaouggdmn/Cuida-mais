import { CareAreaSection } from '../components/CareAreaSection'
import { ContactForm } from '../components/ContactForm'
import { EssenceSection } from '../components/EssenceSection'
import { Faq } from '../components/Faq'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { ServiceCategories } from '../components/ServiceCategories'

export function LandingPage() {
  return (
    <>
      <Hero />
      <CareAreaSection />
      <ServiceCategories />
      <HowItWorks />
      <EssenceSection />
      <Faq />
      <ContactForm />
    </>
  )
}
