import type { MetadataRoute } from 'next'
import { areasData } from '@/lib/areas-data'
import { problemsData } from '@/lib/problems-data'
import { materialsData } from '@/lib/materials-data'
import { servicesData } from '@/lib/services-data'
import { useCasesData } from '@/lib/usecases-data'
import { guidesData } from '@/lib/guide-data'

const BASE_URL = 'https://www.takeharatatamiten.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tatami`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tatami-beri`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/works`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/problems`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/materials`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/use-cases`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const areaPages: MetadataRoute.Sitemap = areasData.map(area => ({
    url: `${BASE_URL}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: area.priority === 'primary' ? 0.9 : area.priority === 'secondary' ? 0.8 : 0.7,
  }))

  const problemPages: MetadataRoute.Sitemap = problemsData.map(problem => ({
    url: `${BASE_URL}/problems/${problem.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const materialPages: MetadataRoute.Sitemap = materialsData.map(material => ({
    url: `${BASE_URL}/materials/${material.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: material.isFeatured ? 0.9 : 0.7,
  }))

  const servicePages: MetadataRoute.Sitemap = servicesData.map(service => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const useCasePages: MetadataRoute.Sitemap = useCasesData.map(u => ({
    url: `${BASE_URL}/use-cases/${u.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const guidePages: MetadataRoute.Sitemap = guidesData.map(g => ({
    url: `${BASE_URL}/guide/${g.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...areaPages,
    ...problemPages,
    ...materialPages,
    ...servicePages,
    ...useCasePages,
    ...guidePages,
  ]
}
