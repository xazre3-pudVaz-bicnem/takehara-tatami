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

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.summary,
      url: `https://www.takeharatatamiten.com/services/${service.slug}`,
      provider: { '@type': 'LocalBusiness', name: '有限会社 竹原タタミ店', telephone: '099-267-1577' },
      areaServed: { '@type': 'State', name: '鹿児島県' },
      offers: { '@type': 'Offer', priceSpecification: { '@type': 'UnitPriceSpecification', price: service.priceFrom.replace(/[^0-9]/g, ''), priceCurrency: 'JPY' } },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.takeharatatamiten.com' },
        { '@type': 'ListItem', position: 2, name: 'サービス', item: 'https://www.takeharatatamiten.com/services' },
        { '@type': 'ListItem', position: 3, name: service.title, item: `https://www.takeharatatamiten.com/services/${service.slug}` },
      ],
    },
    ...(() => {
      const allFaqs = [...service.faqs, ...(service.extendedFaqs ?? [])]
      return allFaqs.length > 0 ? [{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: allFaqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }] : []
    })(),
  ]

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Header />
      <main>
        <ServiceDetailContent service={service} related={related} />
      </main>
      <Footer />
    </>
  )
}
