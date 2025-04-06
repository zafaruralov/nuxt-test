export interface Category {
  id: number
  name: string
  slug: string
  image: string
}

export interface Product {
  id: number
  name: string
  slug: string
  price: number
  image: string
  additionalImages?: string[]
  category: string
  rating: number
  reviews: number
  stock: number
  discount: number
  description: string
  specifications: Record<string, string>
  reviewsList?: ProductReview[]
}

export interface ProductReview {
  author: string
  date: string
  rating: number
  title: string
  content: string
}

export interface PriceRange {
  min: number
  max: number
}