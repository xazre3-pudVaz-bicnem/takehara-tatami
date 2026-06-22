import {
  Leaf, Search, Scissors, Wind, TrendingDown, Palette, ArrowDown, ArrowLeftRight,
  Sun, Calendar, Sparkles, Droplets, Heart, Users, Building2, Hotel, Landmark,
  Home, Hammer, Building, RefreshCw, Banknote, Truck, CloudRain, Clock, Scale,
  FileText, Shield, Sprout, Star, Layers, Waves, Baby, PawPrint, Wheat,
  CornerDownLeft, type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Leaf, Search, Scissors, Wind, TrendingDown, Palette, ArrowDown, ArrowLeftRight,
  Sun, Calendar, Sparkles, Droplets, Heart, Users, Building2, Hotel, Landmark,
  Home, Hammer, Building, RefreshCw, Banknote, Truck, CloudRain, Clock, Scale,
  FileText, Shield, Sprout, Star, Layers, Waves, Baby, PawPrint, Wheat,
  CornerDownLeft,
}

interface Props {
  name: string
  size?: number
  className?: string
}

export default function IconByName({ name, size = 20, className = '' }: Props) {
  const Icon = ICONS[name]
  if (!Icon) return null
  return <Icon size={size} className={className} />
}
