import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Concept from '@/components/Concept'
import Reasons from '@/components/Reasons'
import Services from '@/components/Services'
import Timing from '@/components/Timing'
import WorksPreview from '@/components/WorksPreview'
import BlogPreview from '@/components/BlogPreview'
import Pricing from '@/components/Pricing'
import Flow from '@/components/Flow'
import FAQ from '@/components/FAQ'
import ServiceArea from '@/components/ServiceArea'
import Contact from '@/components/Contact'
import CompanyInfo from '@/components/CompanyInfo'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <Reasons />
        <Services />
        <Timing />
        <WorksPreview />
        <BlogPreview />
        <Pricing />
        <Flow />
        <FAQ />
        <ServiceArea />
        <Contact />
        <CompanyInfo />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
