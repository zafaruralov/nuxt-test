<template>
  <div>
    <div v-if="pending">
      <ProductDetailSkeleton />
    </div>
    <div v-else-if="product">
      <!-- Breadcrumbs -->
      <nav class="flex mb-6 text-sm">
        <NuxtLink to="/" class="text-gray-500 hover:text-primary">Home</NuxtLink>
        <ChevronRight class="h-4 w-4 mx-2 text-gray-400" />
        <NuxtLink to="/products" class="text-gray-500 hover:text-primary">Products</NuxtLink>
        <ChevronRight class="h-4 w-4 mx-2 text-gray-400" />
        <NuxtLink 
          :to="`/categories/${getCategorySlug(product.category)}`" 
          class="text-gray-500 hover:text-primary"
        >
          {{ product.category }}
        </NuxtLink>
        <ChevronRight class="h-4 w-4 mx-2 text-gray-400" />
        <span class="text-gray-700">{{ product.name }}</span>
      </nav>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- Product Images -->
        <div>
          <div class="bg-white rounded-lg overflow-hidden mb-4">
            <NuxtImg 
              :src="selectedImage || product.image" 
              :alt="product.name"
              width="600"
              height="600"
              class="w-full h-auto object-contain aspect-square"
            />
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button 
              @click="selectedImage = product.image"
              class="border rounded-lg overflow-hidden p-1"
              :class="{ 'border-primary': !selectedImage }"
            >
              <NuxtImg 
                :src="product.image" 
                :alt="product.name"
                width="100"
                height="100"
                class="w-full h-auto aspect-square object-cover"
              />
            </button>
            <button 
              v-for="(image, index) in product.additionalImages || []" 
              :key="index"
              @click="selectedImage = image"
              class="border rounded-lg overflow-hidden p-1"
              :class="{ 'border-primary': selectedImage === image }"
            >
              <NuxtImg 
                :src="image" 
                :alt="`${product.name} - view ${index + 1}`"
                width="100"
                height="100"
                class="w-full h-auto aspect-square object-cover"
              />
            </button>
          </div>
        </div>
        
        <!-- Product Info -->
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
          
          <div class="flex items-center mb-4">
            <div class="flex">
              <Star 
                v-for="i in 5" 
                :key="i" 
                :class="[
                  'h-5 w-5', 
                  i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                ]" 
                :fill="i <= Math.round(product.rating) ? 'currentColor' : 'none'" 
              />
            </div>
            <span class="text-sm text-gray-500 ml-2">{{ product.rating.toFixed(1) }} ({{ product.reviews }} reviews)</span>
          </div>
          
          <div class="mb-6">
            <div class="flex items-center">
              <span 
                v-if="product.discount > 0" 
                class="text-lg text-gray-500 line-through mr-2"
              >
                ${{ formatPrice(originalPrice) }}
              </span>
              <span class="text-3xl font-bold text-gray-900">${{ formatPrice(product.price) }}</span>
              <span 
                v-if="product.discount > 0" 
                class="ml-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded"
              >
                Save {{ product.discount }}%
              </span>
            </div>
            <p v-if="product.stock > 0" class="text-green-600 text-sm mt-1">
              <CheckCircle class="h-4 w-4 inline mr-1" /> In Stock ({{ product.stock }} available)
            </p>
            <p v-else class="text-red-600 text-sm mt-1">
              <XCircle class="h-4 w-4 inline mr-1" /> Out of Stock
            </p>
          </div>
          
          <div class="mb-6">
            <h3 class="font-medium mb-2">Description</h3>
            <p class="text-gray-700">{{ product.description }}</p>
          </div>
          
          <div class="mb-6">
            <h3 class="font-medium mb-2">Quantity</h3>
            <div class="flex items-center">
              <button 
                @click="decrementQuantity"
                class="p-2 border border-gray-300 rounded-l-lg"
                :disabled="quantity <= 1"
                :class="{ 'opacity-50 cursor-not-allowed': quantity <= 1 }"
              >
                <Minus class="h-4 w-4" />
              </button>
              <input 
                v-model="quantity"
                type="number"
                min="1"
                :max="product.stock"
                class="w-16 text-center border-t border-b border-gray-300 py-2"
              />
              <button 
                @click="incrementQuantity"
                class="p-2 border border-gray-300 rounded-r-lg"
                :disabled="quantity >= product.stock"
                :class="{ 'opacity-50 cursor-not-allowed': quantity >= product.stock }"
              >
                <Plus class="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 mb-8">
            <button 
              @click="addToCart"
              class="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center"
              :disabled="product.stock <= 0"
              :class="{ 'opacity-50 cursor-not-allowed': product.stock <= 0 }"
            >
              <ShoppingCart class="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button 
              @click="toggleFavorite"
              class="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              :class="{ 'text-primary': isFavorite }"
            >
              <Heart v-if="isFavorite" class="h-5 w-5" fill="currentColor" />
              <Heart v-else class="h-5 w-5" />
            </button>
          </div>
          
          <div class="border-t border-gray-200 pt-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center">
                <Truck class="h-5 w-5 text-gray-600 mr-2" />
                <span class="text-sm">Free shipping over $50</span>
              </div>
              <div class="flex items-center">
                <RefreshCw class="h-5 w-5 text-gray-600 mr-2" />
                <span class="text-sm">30-day returns</span>
              </div>
              <div class="flex items-center">
                <Shield class="h-5 w-5 text-gray-600 mr-2" />
                <span class="text-sm">Secure checkout</span>
              </div>
              <div class="flex items-center">
                <Clock class="h-5 w-5 text-gray-600 mr-2" />
                <span class="text-sm">24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Product Details Tabs -->
      <div class="mb-12">
        <div class="border-b border-gray-200">
          <div class="flex overflow-x-auto">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-6 py-3 font-medium whitespace-nowrap"
              :class="activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-gray-900'"
            >
              {{ tab.name }}
            </button>
          </div>
        </div>
        
        <div class="py-6">
          <!-- Specifications Tab -->
          <div v-if="activeTab === 'specifications'" class="bg-white p-6 rounded-lg">
            <table class="w-full">
              <tbody>
                <tr v-for="(value, key) in product.specifications" :key="key" class="border-b border-gray-200">
                  <td class="py-3 font-medium text-gray-700 w-1/3">{{ formatSpecKey(key) }}</td>
                  <td class="py-3 text-gray-600">{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Reviews Tab -->
          <div v-else-if="activeTab === 'reviews'" class="bg-white p-6 rounded-lg">
            <div v-if="product.reviewsList && product.reviewsList.length > 0">
              <div v-for="(review, index) in product.reviewsList" :key="index" class="mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                <div class="flex items-center mb-2">
                  <div class="flex">
                    <Star 
                      v-for="i in 5" 
                      :key="i" 
                      :class="[
                        'h-4 w-4', 
                        i <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                      ]" 
                      :fill="i <= review.rating ? 'currentColor' : 'none'" 
                    />
                  </div>
                  <span class="ml-2 font-medium">{{ review.title }}</span>
                </div>
                <p class="text-sm text-gray-500 mb-2">
                  By {{ review.author }} on {{ formatDate(review.date) }}
                </p>
                <p class="text-gray-700">{{ review.content }}</p>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <MessageSquare class="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 class="text-lg font-medium text-gray-700 mb-1">No reviews yet</h3>
              <p class="text-gray-500 mb-4">Be the first to review this product</p>
              <button class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                Write a Review
              </button>
            </div>
          </div>
          
          <!-- Shipping Tab -->
          <div v-else-if="activeTab === 'shipping'" class="bg-white p-6 rounded-lg">
            <h3 class="font-medium text-lg mb-4">Shipping Information</h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-medium mb-2">Delivery Options</h4>
                <ul class="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Standard Shipping (3-5 business days): Free on orders over $50, otherwise $4.99</li>
                  <li>Express Shipping (1-2 business days): $9.99</li>
                  <li>Same Day Delivery (select areas): $14.99</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium mb-2">International Shipping</h4>
                <p class="text-gray-700">We ship to over 100 countries worldwide. International shipping rates and delivery times vary by location.</p>
              </div>
              <div>
                <h4 class="font-medium mb-2">Shipping Restrictions</h4>
                <p class="text-gray-700">Some products cannot be shipped to certain locations due to local regulations. Any restrictions will be noted on the product page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related Products -->
      <div>
        <h2 class="text-2xl font-bold mb-6">You May Also Like</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id" 
            :product="relatedProduct" 
          />
        </div>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <PackageX class="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h2 class="text-xl font-medium text-gray-700 mb-2">Product not found</h2>
      <p class="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed</p>
      <NuxtLink 
        to="/products" 
        class="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors inline-block"
      >
        Browse Products
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  ChevronRight, 
  Star, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Truck, 
  RefreshCw, 
  Shield, 
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  PackageX
} from 'lucide-vue-next'
import { useProductsApi } from '~/composables/useProductsApi'
import { useCategoriesApi } from '~/composables/useCategoriesApi'
import { useCartStore } from '~/stores/cart'
import { useFavoriteStore } from '~/stores/favorites'
import { useToast } from '~/composables/useToast'
import type { Product } from '~/types'

const route = useRoute()
const slug = route.params.slug as string

const { showToast } = useToast()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

// State
const quantity = ref(1)
const selectedImage = ref('')
const activeTab = ref('specifications')

const tabs = [
  { id: 'specifications', name: 'Specifications' },
  { id: 'reviews', name: 'Reviews' },
  { id: 'shipping', name: 'Shipping' }
]

// Data fetching
const { getProductBySlug, getRelatedProducts } = useProductsApi()
const { getCategoryByName } = useCategoriesApi()

const { data: product, pending } = await useAsyncData(
  `product-${slug}`,
  () => getProductBySlug(slug)
)

const { data: relatedProducts } = await useAsyncData(
  `related-products-${slug}`,
  () => product.value ? getRelatedProducts(product.value.id, product.value.category) : []
)

// SEO
useHead(() => {
  if (!product.value) return {}
  
  return {
    title: `${product.value.name} - NuxtMarket`,
    meta: [
      { name: 'description', content: product.value.description },
      { property: 'og:title', content: `${product.value.name} - NuxtMarket` },
      { property: 'og:description', content: product.value.description },
      { property: 'og:image', content: product.value.image },
      { property: 'og:type', content: 'product' },
      { property: 'product:price:amount', content: product.value.price.toString() },
      { property: 'product:price:currency', content: 'USD' }
    ]
  }
})

// Computed
const isFavorite = computed(() => 
  product.value ? favoriteStore.isFavorite(product.value.id) : false
)

const originalPrice = computed(() => {
  if (product.value && product.value.discount > 0) {
    return product.value.price / (1 - product.value.discount / 100)
  }
  return product.value?.price || 0
})

// Methods
const formatPrice = (price: number) => price.toFixed(2)

const formatSpecKey = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const getCategorySlug = (categoryName: string) => {
  return categoryName.toLowerCase().replace(/\s+/g, '-')
}

const incrementQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value)
    showToast({
      type: 'success',
      message: `${quantity.value} ${quantity.value > 1 ? 'items' : 'item'} added to cart`
    })
  }
}

const toggleFavorite = () => {
  if (product.value) {
    favoriteStore.toggle(product.value.id)
    showToast({
      type: isFavorite.value ? 'info' : 'success',
      message: isFavorite.value 
        ? 'Product removed from favorites' 
        : 'Product added to favorites'
    })
  }
}
</script>