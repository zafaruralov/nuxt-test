<template>
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center">
        <NuxtLink to="/" class="text-xl font-bold text-gray-900">NuxtMarket</NuxtLink>
        <nav class="ml-10 hidden md:flex space-x-8">
          <NuxtLink 
            v-for="item in navigationItems" 
            :key="item.path" 
            :to="item.path" 
            class="text-gray-700 hover:text-primary"
            active-class="text-primary font-medium"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            class="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <button 
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            @click="handleSearch"
          >
            <Search class="h-5 w-5" />
          </button>
        </div>
        <NuxtLink to="/cart" class="relative p-2 text-gray-700 hover:text-primary">
          <ShoppingCart class="h-6 w-6" />
          <span 
            v-if="cartStore.count > 0" 
            class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cartStore.count }}
          </span>
        </NuxtLink>
        <NuxtLink to="/account" class="p-2 text-gray-700 hover:text-primary">
          <User class="h-6 w-6" />
        </NuxtLink>
        <button 
          class="md:hidden p-2 text-gray-700"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div 
      v-if="isMobileMenuOpen" 
      class="md:hidden bg-white border-t border-gray-100 py-4"
    >
      <div class="container mx-auto px-4">
        <nav class="flex flex-col space-y-4">
          <NuxtLink 
            v-for="item in navigationItems" 
            :key="item.path" 
            :to="item.path" 
            class="text-gray-700 hover:text-primary py-2"
            active-class="text-primary font-medium"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart, User, Search, Menu, X } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Categories', path: '/categories' },
  { name: 'Deals', path: '/deals' }
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { q: searchQuery.value }
    })
    isMobileMenuOpen.value = false
  }
}
</script>