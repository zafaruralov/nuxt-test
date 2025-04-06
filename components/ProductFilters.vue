<template>
  <div class="space-y-6">
    <div>
      <h4 class="font-medium mb-2">Categories</h4>
      <div class="space-y-2">
        <div v-for="category in categories" :key="category.id" class="flex items-center">
          <input 
            type="checkbox" 
            :id="`category-${category.id}`" 
            :checked="selectedCategories.includes(category.id)"
            @change="toggleCategory(category.id)"
            class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label :for="`category-${category.id}`" class="ml-2 text-gray-700">
            {{ category.name }}
          </label>
        </div>
      </div>
    </div>
    
    <div>
      <h4 class="font-medium mb-2">Price Range</h4>
      <div class="flex items-center space-x-2 mb-2">
        <input 
          type="number" 
          v-model.number="localPriceRange.min" 
          min="0"
          @change="updatePriceRange"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <span>-</span>
        <input 
          type="number" 
          v-model.number="localPriceRange.max" 
          min="0"
          @change="updatePriceRange"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div class="relative h-2 bg-gray-200 rounded-full">
        <div 
          class="absolute h-full bg-primary rounded-full"
          :style="{
            left: `${(localPriceRange.min / 1000) * 100}%`,
            right: `${100 - (localPriceRange.max / 1000) * 100}%`
          }"
        ></div>
      </div>
    </div>
    
    <div>
      <h4 class="font-medium mb-2">Rating</h4>
      <div class="space-y-2">
        <div v-for="rating in [4, 3, 2, 1]" :key="rating" class="flex items-center">
          <input 
            type="checkbox" 
            :id="`rating-${rating}`" 
            :checked="selectedRatings.includes(rating)"
            @change="toggleRating(rating)"
            class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label :for="`rating-${rating}`" class="ml-2 text-gray-700 flex items-center">
            <div class="flex">
              <Star 
                v-for="i in 5" 
                :key="i" 
                :class="[
                  'h-4 w-4', 
                  i <= rating ? 'text-yellow-400' : 'text-gray-300'
                ]" 
                :fill="i <= rating ? 'currentColor' : 'none'" 
              />
            </div>
            <span class="ml-1">& Up</span>
          </label>
        </div>
      </div>
    </div>
    
    <button 
      @click="$emit('reset')"
      class="w-full py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
    >
      Reset Filters
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Star } from 'lucide-vue-next'
import type { Category, PriceRange } from '~/types'

const props = defineProps<{
  categories: Category[]
  selectedCategories: number[]
  priceRange: PriceRange
  selectedRatings: number[]
}>()

const emit = defineEmits<{
  'update:categories': [categories: number[]]
  'update:price-range': [priceRange: PriceRange]
  'update:ratings': [ratings: number[]]
  'reset': []
}>()

const localPriceRange = ref({ ...props.priceRange })

// Watch for prop changes
watch(() => props.priceRange, (newValue) => {
  localPriceRange.value = { ...newValue }
}, { deep: true })

const toggleCategory = (categoryId: number) => {
  const categories = [...props.selectedCategories]
  const index = categories.indexOf(categoryId)
  
  if (index === -1) {
    categories.push(categoryId)
  } else {
    categories.splice(index, 1)
  }
  
  emit('update:categories', categories)
}

const toggleRating = (rating: number) => {
  const ratings = [...props.selectedRatings]
  const index = ratings.indexOf(rating)
  
  if (index === -1) {
    ratings.push(rating)
  } else {
    ratings.splice(index, 1)
  }
  
  emit('update:ratings', ratings)
}

const updatePriceRange = () => {
  // Ensure min is not greater than max
  if (localPriceRange.value.min > localPriceRange.value.max) {
    localPriceRange.value.min = localPriceRange.value.max
  }
  
  emit('update:price-range', { ...localPriceRange.value })
}
</script>