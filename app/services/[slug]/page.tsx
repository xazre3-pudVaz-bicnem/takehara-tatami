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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
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

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
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
