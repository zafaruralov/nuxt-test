import type { Product } from '~/types'

export const useProductsApi = () => {
  // In a real app, these would be API calls to your backend
  const getProducts = async (): Promise<Product[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return [
      { 
        id: 1, 
        name: 'Wireless Noise-Cancelling Headphones', 
        slug: 'wireless-noise-cancelling-headphones',
        price: 249.99, 
        image: '/placeholder.svg?height=400&width=400', 
        additionalImages: [
          '/placeholder.svg?height=400&width=400&text=Side+View',
          '/placeholder.svg?height=400&width=400&text=Folded',
          '/placeholder.svg?height=400&width=400&text=Case'
        ],
        category: 'Electronics', 
        rating: 4.7, 
        reviews: 128, 
        stock: 15,
        discount: 10,
        description: 'Premium wireless headphones with industry-leading noise cancellation, exceptional sound quality, and up to 30 hours of battery life. Perfect for travel, work, or anywhere you need to focus.',
        specifications: {
          brand: 'AudioTech',
          connectivity: 'Bluetooth 5.0',
          batteryLife: 'Up to 30 hours',
          weight: '250g',
          color: 'Matte Black',
          warranty: '2 years'
        },
        reviewsList: [
          {
            author: 'Michael T.',
            date: '2025-02-15',
            rating: 5,
            title: `Best headphones I've ever owned`,
            content: `The noise cancellation is incredible. I use these on my daily commute and can't hear anything but my music. Battery life is excellent too.`
          },
          {
            author: 'Sarah L.',
            date: '2025-01-28',
            rating: 4,
            title: 'Great sound, slightly tight fit',
            content: `Sound quality is amazing and the noise cancellation works well. They're a bit tight on my head after a few hours, but otherwise perfect.`
          }
        ]
      },
      { 
        id: 2, 
        name: 'Smart Fitness Watch', 
        slug: 'smart-fitness-watch',
        price: 199.99, 
        image: '/placeholder.svg?height=400&width=400', 
        additionalImages: [
          '/placeholder.svg?height=400&width=400&text=Side+View',
          '/placeholder.svg?height=400&width=400&text=On+Wrist',
          '/placeholder.svg?height=400&width=400&text=Charging'
        ],
        category: 'Electronics', 
        rating: 4.5, 
        reviews: 85, 
        stock: 23,
        discount: 0,
        description: 'Track your fitness goals with this advanced smartwatch. Features include heart rate monitoring, GPS tracking, sleep analysis, and water resistance up to 50 meters. Compatible with iOS and Android.',
        specifications: {
          brand: 'FitTech',
          display: '1.4" AMOLED',
          batteryLife: 'Up to 7 days',
          waterResistance: '50m',
          sensors: 'Heart rate, GPS, Accelerometer',
          compatibility: 'iOS 12+, Android 8+'
        },
        reviewsList: [
          {
            author: 'James R.',
            date: '2025-03-02',
            rating: 5,
            title: 'Perfect fitness companion',
            content: 'This watch has everything I need for tracking my workouts. The battery lasts almost a full week with heavy use.'
          }
        ]
      },
      { 
        id: 3, 
        name: 'Organic Cotton T-Shirt', 
        slug: 'organic-cotton-t-shirt',
        price: 29.99, 
        image: '/placeholder.svg?height=400&width=400', 
        additionalImages: [
          '/placeholder.svg?height=400&width=400&text=Back+View',
          '/placeholder.svg?height=400&width=400&text=Detail',
          '/placeholder.svg?height=400&width=400&text=Fabric'
        ],
        category: 'Clothing', 
        rating: 4.3, 
        reviews: 210, 
        stock: 45,
        discount: 15,
        description: 'Made from 100% organic cotton, this comfortable t-shirt is both stylish and sustainable. Available in multiple colors and sizes.',
        specifications: {
          material: '100% Organic Cotton',
          fit: 'Regular',
          care: 'Machine wash cold',
          origin: 'Ethically made in Portugal',
          certification: 'GOTS Certified Organic'
        },
        reviewsList: []
      },
      { 
        id: 4, 
        name: 'Professional Coffee Maker', 
        slug: 'professional-coffee-maker',
        price: 149.99, 
        image: '/placeholder.svg?height=400&width=400', 
        additionalImages: [
          '/placeholder.svg?height=400&width=400&text=Side+View',
          '/placeholder.svg?height=400&width=400&text=Control+Panel',
          '/placeholder.svg?height=400&width=400&text=Filter'
        ],
        category: 'Home & Kitchen', 
        rating: 4.8, 
        reviews: 156, 
        stock: 12,
        discount: 0,
        description: 'Brew barista-quality coffee at home with this professional-grade coffee maker. Features programmable settings, built-in grinder, and thermal carafe to keep your coffee hot for hours.',
        specifications: {
          capacity: '12 cups',
          programs: '5 brew settings',
          waterTank: '1.8L removable',
          dimensions: '12" x 8" x 15"',
          warranty: '3 years'
        },
        reviewsList: []
      },
      { 
        id: 5, 
        name: 'Natural Skincare Set', 
        slug: 'natural-skincare-set',
        price: 79.99, 
        image: '/placeholder.svg?height=400&width=400', 
        additionalImages: [
          '/placeholder.svg?height=400&width=400&text=Individual+Products',
          '/placeholder.svg?height=400&width=400&text=Ingredients',
          '/placeholder.svg?height=400&width=400&text=Gift+Box'
        ],
        category: 'Beauty', 
        rating: 4.6, 
        reviews: 98, 
        stock: 8,
        discount: 20,
        description: 'A complete skincare routine with all-natural ingredients. This set includes cleanser, toner, serum, and moisturizer suitable for all skin types. Free from parabens, sulfates, and artificial fragrances.',
        specifications: {
          skinType: 'All skin types',
          ingredients: 'Natural and organic',
          free: 'Paraben-free, Sulfate-free',
          size: '4 products, 50ml each',
          shelfLife: '12 months'
        },
        reviewsList: []
      },
      { 
        id: 6, 
        name: 'Portable Bluetooth Speaker', 
        slug: 'portable-bluetooth-speaker',
        price: 89.99, 
        image: '/placeholder.svg?height=400&width=400', 
        additionalImages: [
          '/placeholder.svg?height=400&width=400&text=Back+View',
          '/placeholder.svg?height=400&width=400&text=Controls',
          '/placeholder.svg?height=400&width=400&text=Charging'
        ],
        category: 'Electronics', 
        rating: 4.4, 
        reviews: 112, 
        stock: 19,
        discount: 0,
        description: `Take your music anywhere with this waterproof, portable Bluetooth speaker. Featuring 360° sound, 20-hour battery life, and durable design for indoor and outdoor use.',  Featuring 360° sound, 20-hour battery life, and durable design for indoor and outdoor use.`,
        specifications: {
          connectivity: 'Bluetooth 5.1',
          batteryLife: '20 hours',
          waterproof: 'IPX7 rated',
          dimensions: '4" x 4" x 7"',
          weight: '680g',
          warranty: '1 year'
        },
        reviewsList: []
      }
    ]
  }
  
  const getFeaturedProducts = async (): Promise<Product[]> => {
    const products = await getProducts()
    // Return a subset of products as featured
    return products.filter(p => [1, 4, 5].includes(p.id))
  }
  
  const getNewArrivals = async (): Promise<Product[]> => {
    const products = await getProducts()
    // Return a subset of products as new arrivals
    return products.filter(p => [2, 3, 6].includes(p.id))
  }
  
  const getProductBySlug = async (slug: string): Promise<Product | null> => {
    const products = await getProducts()
    return products.find(p => p.slug === slug) || null
  }
  
  const getRelatedProducts = async (productId: number, category: string): Promise<Product[]> => {
    const products = await getProducts()
    // Return products in the same category, excluding the current product
    return products
      .filter(p => p.category === category && p.id !== productId)
      .slice(0, 4)
  }
  
  return {
    getProducts,
    getFeaturedProducts,
    getNewArrivals,
    getProductBySlug,
    getRelatedProducts
  }
}