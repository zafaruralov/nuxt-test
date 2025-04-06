import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoriteStore = defineStore('favorites', () => {
  const favoriteIds = ref<number[]>([])
  
  const count = computed(() => favoriteIds.value.length)
  
  function toggle(productId: number) {
    const index = favoriteIds.value.indexOf(productId)
    
    if (index === -1) {
      favoriteIds.value.push(productId)
    } else {
      favoriteIds.value.splice(index, 1)
    }
  }
  
  function isFavorite(productId: number) {
    return favoriteIds.value.includes(productId)
  }
  
  function clear() {
    favoriteIds.value = []
  }
  
  return {
    favoriteIds,
    count,
    toggle,
    isFavorite,
    clear
  }
})