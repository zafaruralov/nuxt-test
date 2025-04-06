<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">All Products</h1>
      <div class="flex items-center space-x-2">
        <button 
          @click="isFilterOpen = !isFilterOpen"
          class="md:hidden flex items-center text-gray-700 hover:text-primary"
        >
          <SlidersHorizontal class="h-5 w-5 mr-1" />
          Filters
        </button>
        <div class="flex items-center space-x-2">
          <span class="text-gray-600 hidden sm:inline">Sort by:</span>
          <select 
            v-model="sortBy"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Filters - Mobile -->
      <div 
        v-if="isFilterOpen" 
        class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex"
      >
        <div class="bg-white w-80 h-full overflow-y-auto p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-lg">Filters</h3>
            <button @click="isFilterOpen = false">
              <X class="h-5 w-5" />
            </button>
          </div>
          <ProductFilters 
            :categories="categories"
            :selected-categories="selectedCategories"
            :price-range="priceRange"
            :selected-ratings="selectedRatings"
            @update:categories="updateCategories"
            @update:price-range="updatePriceRange"
            @update:ratings="updateRatings"
            @reset="resetFilters"
          />
        </div>
      </div>
      
      <!-- Filters - Desktop -->
      <div class="hidden md:block w-64 bg-white p-6 rounded-lg shadow-sm h-fit sticky top-24">
        <h3 class="font-bold text-lg mb-4">Filters</h3>
        <ProductFilters 
          :categories="categories"
          :selected-categories="selectedCategories"
          :price-range="priceRange"
          :selected-ratings="selectedRatings"
          @update:categories="updateCategories"
          @update:price-range="updatePriceRange"
          @update:ratings="updateRatings"
          @reset="resetFilters"
        />
      </div>
      
      <!-- Product Grid -->
      <div class="flex-1">
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCardSkeleton v-for="i in 9" :key="i" />
        </div>
        <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        <div v-else class="text-center py-12">
          <PackageX class="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-xl font-medium text-gray-700 mb-2">No products found</h3>
          <p class="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
          <button 
            @click="resetFilters"
            class="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Reset Filters
          </button>
        </div>
        
        <!-- Pagination -->
        <div v-if="filteredProducts.length > 0" class="flex items-center justify-center mt-8">
          <Pagination 
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:page="updatePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SlidersHorizontal, X, PackageX } from 'lucide-vue-next'
import { useProductsApi } from '~/composables/useProductsApi'
import { useCategoriesApi } from '~/composables/useCategoriesApi'
import type { PriceRange, Product } from '~/types'

const route = useRoute()
const router = useRouter()

// SEO
useHead({
  title: 'All Products - NuxtMarket',
  meta: [
    { name: 'description', content: 'Browse our complete collection of products. Filter by category, price, and more to find exactly what you need.' },
    { property: 'og:title', content: 'All Products - NuxtMarket' },
    { property: 'og:description', content: 'Browse our complete collection of products. Filter by category, price, and more to find exactly what you need.' }
  ]
})

// State
const isFilterOpen = ref(false)
const currentPage = ref(1)
const itemsPerPage = 9
const sortBy = ref('newest')
const selectedCategories = ref<number[]>([])
const priceRange = ref<PriceRange>({ min: 0, max: 1000 })
const selectedRatings = ref<number[]>([])
const searchQuery = ref('')

// Data fetching
const { getProducts } = useProductsApi()
const { getCategories } = useCategoriesApi()

const { data: products, pending } = await useAsyncData('all-products', () => getProducts())
const { data: categories } = await useAsyncData('product-categories', () => getCategories())

// Initialize filters from URL query params
const initFiltersFromQuery = () => {
  const query = route.query
  
  if (query.q) {
    searchQuery.value = query.q as string
  }
  
  if (query.categories) {
    selectedCategories.value = (query.categories as string).split(',').map(Number)
  }
  
  if (query.minPrice && query.maxPrice) {
    priceRange.value = {
      min: Number(query.minPrice),
      max: Number(query.maxPrice)
    }
  }
  
  if (query.ratings) {
    selectedRatings.value = (query.ratings as string).split(',').map(Number)
  }
  
  if (query.sort) {
    sortBy.value = query.sort as string
  }
  
  if (query.page) {
    currentPage.value = Number(query.page)
  }
}

// Initialize on page load
initFiltersFromQuery()

// Computed
const filteredProducts = computed(() => {
  if (!products.value) return []
  
  let filtered = [...products.value]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    )
  }
  
  // Apply category filter
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(product => {
      const categoryId = categories.value?.find(c => c.name === product.category)?.id
      return categoryId && selectedCategories.value.includes(categoryId)
    })
  }
  
  // Apply price filter
  filtered = filtered.filter(product => 
    product.price >= priceRange.value.min && 
    product.price <= priceRange.value.max
  )
  
  // Apply rating filter
  if (selectedRatings.value.length > 0) {
    filtered = filtered.filter(product => 
      selectedRatings.value.includes(Math.floor(product.rating))
    )
  }
  
  // Apply sorting
  switch (sortBy.value) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'popular':
      filtered.sort((a, b) => b.reviews - a.reviews)
      break
    case 'newest':
    default:
      // Assuming newer products have higher IDs
      filtered.sort((a, b) => b.id - a.id)
      break
  }
  
  return filtered
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredProducts.value.length / itemsPerPage)
)

// Methods
const updateCategories = (categories: number[]) => {
  selectedCategories.value = categories
  currentPage.value = 1
  updateQueryParams()
}

const updatePriceRange = (range: PriceRange) => {
  priceRange.value = range
  currentPage.value = 1
  updateQueryParams()
}

const updateRatings = (ratings: number[]) => {
  selectedRatings.value = ratings
  currentPage.value = 1
  updateQueryParams()
}

const updatePage = (page: number) => {
  currentPage.value = page
  updateQueryParams()
}

const resetFilters = () => {
  selectedCategories.value = []
  priceRange.value = { min: 0, max: 1000 }
  selectedRatings.value = []
  searchQuery.value = ''
  sortBy.value = 'newest'
  currentPage.value = 1
  updateQueryParams()
}

const updateQueryParams = () => {
  const query: Record<string, string> = {}
  
  if (searchQuery.value) {
    query.q = searchQuery.value
  }
  
  if (selectedCategories.value.length > 0) {
    query.categories = selectedCategories.value.join(',')
  }
  
  if (priceRange.value.min > 0 || priceRange.value.max < 1000) {
    query.minPrice = priceRange.value.min.toString()
    query.maxPrice = priceRange.value.max.toString()
  }
  
  if (selectedRatings.value.length > 0) {
    query.ratings = selectedRatings.value.join(',')
  }
  
  if (sortBy.value !== 'newest') {
    query.sort = sortBy.value
  }
  
  if (currentPage.value > 1) {
    query.page = currentPage.value.toString()
  }
  
  router.replace({ query })
}

// Watch for sort changes
watch(sortBy, () => {
  updateQueryParams()
})

// Watch for route query changes
watch(() => route.query, () => {
  if (route.name === 'products') {
    initFiltersFromQuery()
  }
}, { deep: true })
</script>