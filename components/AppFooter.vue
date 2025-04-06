<template>
  <footer class="bg-white border-t border-gray-200 mt-12">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="font-bold text-lg mb-4">NuxtMarket</h3>
          <p class="text-gray-600">Your one-stop shop for all your needs.</p>
        </div>
        <div>
          <h4 class="font-medium mb-4">Shop</h4>
          <ul class="space-y-2">
            <li v-for="link in shopLinks" :key="link.text">
              <NuxtLink :to="link.url" class="text-gray-600 hover:text-primary">
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium mb-4">Company</h4>
          <ul class="space-y-2">
            <li v-for="link in companyLinks" :key="link.text">
              <NuxtLink :to="link.url" class="text-gray-600 hover:text-primary">
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium mb-4">Stay Connected</h4>
          <div class="flex space-x-4 mb-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name" 
              :href="social.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-primary"
            >
              <!-- <component :is="social.icon" class="h-6 w-6" /> -->
            </a>
          </div>
          <div>
            <h5 class="font-medium mb-2">Subscribe to our newsletter</h5>
            <form @submit.prevent="subscribeToNewsletter" class="flex">
              <input 
                v-model="email"
                type="email" 
                placeholder="Your email" 
                required
                class="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit"
                class="bg-primary text-white px-4 py-2 rounded-r-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
        <p>&copy; {{ new Date().getFullYear() }} NuxtMarket. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '~/composables/useToast'

const { showToast } = useToast()
const email = ref('')

const shopLinks = [
  { text: 'All Products', url: '/products' },
  { text: 'New Arrivals', url: '/products?filter=new' },
  { text: 'Featured', url: '/products?filter=featured' },
  { text: 'Discounts', url: '/deals' }
]

const companyLinks = [
  { text: 'About Us', url: '/about' },
  { text: 'Contact', url: '/contact' },
  { text: 'Careers', url: '/careers' },
  { text: 'Privacy Policy', url: '/privacy' }
]

const socialLinks = [
  { name: 'Facebook',  url: 'https://facebook.com' },
  { name: 'Twitter',  url: 'https://twitter.com' },
  { name: 'Instagram',  url: 'https://instagram.com' },
  { name: 'LinkedIn',  url: 'https://linkedin.com' }
]

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