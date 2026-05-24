import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceDetailContent from '@/components/ServiceDetailContent'
import { getServiceBySlug, getRelatedServices, servicesData } from '@/lib/services-data'

export function generateStaticParams() {
  return servicesData.map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const { slug } = params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      locale: 'ja_JP',
      type: 'website',
    },
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const related = getRelatedServices(service.related)

  return (
    <>
      <Header />
      <main>
        <ServiceDetailContent service={service} related={related} />
      </main>
      <Footer />
    </>
  )
}
