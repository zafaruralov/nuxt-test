<template>
  <div>
    <!-- Hero Section -->
    <section class="mb-12">
      <div class="bg-primary rounded-xl p-8 text-white">
        <h1 class="text-3xl font-bold mb-4">Spring Collection {{ new Date().getFullYear() }}</h1>
        <p class="text-lg mb-6">Discover our latest products with amazing discounts</p>
        <NuxtLink 
          to="/products?filter=new" 
          class="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
        >
          Shop Now
        </NuxtLink>
      </div>
    </section>

    <!-- Categories -->
    <section class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Shop by Category</h2>
        <NuxtLink to="/categories" class="text-primary font-medium flex items-center">
          View All
          <ChevronRight class="h-5 w-5 ml-1" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NuxtLink 
          v-for="category in categories" 
          :key="category.id" 
          :to="`/categories/${category.slug}`"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="h-32 bg-gray-200 relative">
            <NuxtImg 
              :src="category.image" 
              :alt="category.name"
              width="300"
              height="150"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="p-4">
            <h3 class="font-medium text-gray-900">{{ category.name }}</h3>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Featured Products</h2>
        <NuxtLink to="/products?filter=featured" class="text-primary font-medium flex items-center">
          View All
          <ChevronRight class="h-5 w-5 ml-1" />
        </NuxtLink>
      </div>
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCardSkeleton v-for="i in 4" :key="i" />
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="mt-16">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">New Arrivals</h2>
        <NuxtLink to="/products?filter=new" class="text-primary font-medium flex items-center">
          View All
          <ChevronRight class="h-5 w-5 ml-1" />
        </NuxtLink>
      </div>
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCardSkeleton v-for="i in 4" :key="i" />
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in newArrivals" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </section>

    <!-- Newsletter -->
    <section class="mt-16 bg-gray-100 rounded-xl p-8">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p class="text-gray-600 mb-6">Get the latest updates on new products and upcoming sales</p>
        <form @submit.prevent="subscribeToNewsletter" class="flex flex-col sm:flex-row gap-2">
          <input 
            v-model="email"
            type="email" 
            placeholder="Your email address" 
            required
            class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button 
            type="submit"
            class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { useToast } from '~/composables/useToast'
import { useProductsApi } from '~/composables/useProductsApi'
import { useCategoriesApi } from '~/composables/useCategoriesApi'

const { showToast } = useToast()
const email = ref('')
definePageMeta({
  layout: 'market'
})

// SEO
useHead({
  title: 'NuxtMarket - Your One-Stop Shop',
  meta: [
    { name: 'description', content: 'Discover the best products at the best prices. Shop electronics, clothing, home goods and more.' },
    { property: 'og:title', content: 'NuxtMarket - Your One-Stop Shop' },
    { property: 'og:description', content: 'Discover the best products at the best prices. Shop electronics, clothing, home goods and more.' },
    { property: 'og:image', content: '/og-image.jpg' },
    { property: 'og:url', content: 'https://nuxtmarket.example.com' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

// Data fetching
const { getCategories } = useCategoriesApi()
const { getFeaturedProducts, getNewArrivals } = useProductsApi()

const { data: categories } = await useAsyncData('home-categories', () => getCategories())
const { data: featuredProducts, pending } = await useAsyncData('featured-products', () => getFeaturedProducts())
const { data: newArrivals } = await useAsyncData('new-arrivals', () => getNewArrivals())

const subscribeToNewsletter = async () => {
  try {
    // In a real app, you would call an API here
    await new Promise(resolve => setTimeout(resolve, 500))
    showToast({
      type: 'success',
      message: 'Successfully subscribed to our newsletter!'
    })
    email.value = ''
  } catch (error) {
    showToast({
      type: 'error',
      message: 'Failed to subscribe. Please try again.'
    })
  }
}
</script>