import type { Category } from '~/types'

export const useCategoriesApi = () => {
  // In a real app, these would be API calls to your backend
  const getCategories = async (): Promise<Category[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return [
      { id: 1, name: 'Electronics', slug: 'electronics', image: '/placeholder.svg?height=150&width=300' },
      { id: 2, name: 'Clothing', slug: 'clothing', image: '/placeholder.svg?height=150&width=300' },
      { id: 3, name: 'Home & Kitchen', slug: 'home-kitchen', image: '/placeholder.svg?height=150&width=300' },
      { id: 4, name: 'Beauty', slug: 'beauty', image: '/placeholder.svg?height=150&width=300' },
      { id: 5, name: 'Sports', slug: 'sports', image: '/placeholder.svg?height=150&width=300' },
      { id: 6, name: 'Books', slug: 'books', image: '/placeholder.svg?height=150&width=300' }
    ]
  }
  
  const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
    const categories = await getCategories()
    return categories.find(c => c.slug === slug) || null
  }
  
  const getCategoryByName = async (name: string): Promise<Category | null> => {
    const categories = await getCategories()
    return categories.find(c => c.name === name) || null
  }
  
  return {
    getCategories,
    getCategoryBySlug,
    getCategoryByName
  }
}