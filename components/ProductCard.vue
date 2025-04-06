<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div class="relative">
      <NuxtLink :to="`/products/${product.slug}`">
        <NuxtImg 
          :src="product.image" 
          :alt="product.name"
          width="400"
          height="300"
          class="w-full h-48 object-cover"
          loading="lazy"
        />
      </NuxtLink>
      <button 
        class="absolute top-2 right-2 p-1.5 bg-white rounded-full text-gray-700 hover:text-primary"
        @click="toggleFavorite"
        aria-label="Toggle favorite"
      >
        <Heart v-if="isFavorite" class="h-5 w-5" fill="currentColor" />
        <Heart v-else class="h-5 w-5" />
      </button>
      <div 
        v-if="product.discount > 0" 
        class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
      >
        -{{ product.discount }}%
      </div>
    </div>
    <div class="p-4">
      <div class="text-sm text-gray-500 mb-1">{{ product.category }}</div>
      <h3 class="font-medium text-gray-900 mb-2 line-clamp-2">
        <NuxtLink :to="`/products/${product.slug}`" class="hover:text-primary">
          {{ product.name }}
        </NuxtLink>
      </h3>
      <div class="flex items-center mb-2">
        <div class="flex">
          <Star 
            v-for="i in 5" 
            :key="i" 
            :class="[
              'h-4 w-4', 
              i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'
            ]" 
            :fill="i <= Math.round(product.rating) ? 'currentColor' : 'none'" 
          />
        </div>
        <span class="text-sm text-gray-500 ml-1">({{ product.reviews }})</span>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <span 
            v-if="product.discount > 0" 
            class="text-sm text-gray-500 line-through mr-2"
          >
            ${{ formatPrice(originalPrice) }}
          </span>
          <span class="font-bold text-gray-900">${{ formatPrice(product.price) }}</span>
        </div>
        <button 
          class="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
          @click="addToCart"
          aria-label="Add to cart"
        >
          <ShoppingBag class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Heart, Star, ShoppingBag } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useFavoriteStore } from '~/stores/favorites'
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

const isFavorite = computed(() => favoriteStore.isFavorite(props.product.id))
const originalPrice = computed(() => {
  if (props.product.discount > 0) {
    return props.product.price / (1 - props.product.discount / 100)
  }
  return props.product.price
})

const formatPrice = (price: number) => price.toFixed(2)

const toggleFavorite = () => {
  favoriteStore.toggle(props.product.id)
}

const addToCart = () => {
  cartStore.addItem(props.product)
}
</script>