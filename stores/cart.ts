import { defineStore } from 'pinia'
import type { Product } from '~/types'
import { ref, computed } from 'vue'

interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  
  const count = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  })
  
  function addItem(product: Product, quantity = 1) {
    const existingItem = items.value.find(item => item.product.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }
  }
  
  function removeItem(productId: number) {
    items.value = items.value.filter(item => item.product.id !== productId)
  }
  
  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.product.id === productId)
    
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
      }
    }
  }
  
  function clearCart() {
    items.value = []
  }
  
  return {
    items,
    count,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})