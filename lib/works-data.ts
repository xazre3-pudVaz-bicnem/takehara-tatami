/**
 * 施工事例の静的データ
 *
 * WordPress カスタム投稿タイプ "works" から取得する構造に合わせています。
 * WordPress 連携後は getWorks() の戻り値と同じ型で扱えます。
 *
 * 画像追加時: imagePath に '/images/works/ファイル名.jpg' を設定
 * WordPress 連携時: lib/wordpress.ts の getWorks() に差し替え
 */

export interface WorkItem {
  id: number
  slug: string
  title: string
  category: string
  location: string
  service: string
  description: string
  imagePath: string | null
  gradientFrom: string
  gradientTo: string
  isBeforeAfter?: boolean
}

export const WORK_CATEGORIES = [
  { id: 'all', label: 'すべて' },
  { id: 'omotegae', label: '表替え' },
  { id: 'shinchou', label: '新調' },
  { id: 'fuchinas', label: '縁なし畳' },
  { id: 'ryukyu', label: '琉球畳風' },
  { id: 'wamodan', label: '和モダン' },
  { id: 'before-after', label: 'ビフォーアフター' },
] as const

export type WorkCategoryId = (typeof WORK_CATEGORIES)[number]['id']

export const worksData: WorkItem[] = [
  {
    id: 1,
    slug: 'omotegae-8jo-kagoshima-shi-1',
    title: '8畳和室 表替え',
    category: 'omotegae',
    location: '鹿児島市郡元',
    service: '畳の表替え',
    description: 'い草の香りが広がる清々しい仕上がり。色あせた表面が蘇りました。',
    imagePath: null,
    gradientFrom: '#D4C9A0',
    gradientTo: '#C4B882',
  },
  {
    id: 2,
    slug: 'omotegae-6jo-kagoshima-shi-2',
    title: '6畳 + 4.5畳 表替え',
    category: 'omotegae',
    location: '鹿児島市谷山',
    service: '畳の表替え',
    description: '続き間の表替え。素材を合わせ、統一感ある仕上がりに。',
    imagePath: null,
    gradientFrom: '#C8C490',
    gradientTo: '#B8B478',
  },
  {
    id: 3,
    slug: 'shinchou-8jo-nakayama-1',
    title: '8畳 畳新調',
    category: 'shinchou',
    location: '鹿児島市中山',
    service: '畳の新調',
    description: '新築住宅への畳新調。現地で丁寧に採寸し、ぴったりの畳をお届け。',
    imagePath: null,
    gradientFrom: '#A8C890',
    gradientTo: '#90B878',
  },
  {
    id: 4,
    slug: 'shinchou-chashitsu-murasakihara-1',
    title: '4.5畳 茶室 新調',
    category: 'shinchou',
    location: '鹿児島市紫原',
    service: '畳の新調',
    description: '茶室用の上質な畳で、凛とした和の空間に。',
    imagePath: null,
    gradientFrom: '#B4C89C',
    gradientTo: '#A0B884',
  },
  {
    id: 5,
    slug: 'fuchinas-6jo-wada-1',
    title: '縁なし畳 6畳',
    category: 'fuchinas',
    location: '鹿児島市和田',
    service: '縁なし畳',
    description: 'スッキリとしたモダンな和室へ一変。シンプルで飽きのこないデザイン。',
    imagePath: null,
    gradientFrom: '#D0CCBC',
    gradientTo: '#C0BCA8',
  },
  {
    id: 6,
    slug: 'fuchinas-wamodan-higashitanyama-1',
    title: '縁なし畳 + 置き畳',
    category: 'fuchinas',
    location: '鹿児島市東谷山',
    service: '縁なし畳',
    description: 'フローリングに置き畳を組み合わせた和モダン空間。',
    imagePath: null,
    gradientFrom: '#C8CAC0',
    gradientTo: '#B8BAAC',
  },
  {
    id: 7,
    slug: 'ryukyu-8jo-koriyama-1',
    title: '琉球畳風 8畳',
    category: 'ryukyu',
    location: '鹿児島市郡元',
    service: '琉球畳風',
    description: '市松模様が美しい。洗練された和の空間に。',
    imagePath: null,
    gradientFrom: '#D0C494',
    gradientTo: '#C0B47C',
  },
  {
    id: 8,
    slug: 'wamodan-living-nakayama-1',
    title: '和モダンリビング',
    category: 'wamodan',
    location: '鹿児島市中山',
    service: '和モダン施工',
    description: 'LDKに畳エリアを設けた開放的な和モダン空間。',
    imagePath: null,
    gradientFrom: '#C4C8B8',
    gradientTo: '#B4B8A4',
  },
  {
    id: 9,
    slug: 'before-after-sakanoue-1',
    title: '築40年 全室 ビフォーアフター',
    category: 'before-after',
    location: '鹿児島市坂之上',
    service: '畳の新調',
    description: '全室の畳を新調。家全体が明るく生まれ変わりました。',
    imagePath: null,
    gradientFrom: '#B8C8D4',
    gradientTo: '#A4B4C4',
    isBeforeAfter: true,
  },
]
