<template>
  <div class="flex items-center">
    <button 
      class="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="currentPage <= 1"
      @click="updatePage(currentPage - 1)"
      aria-label="Previous page"
    >
      <ChevronLeft class="h-5 w-5" />
    </button>
    
    <div class="flex mx-2">
      <!-- First page -->
      <button 
        v-if="showFirstPage"
        @click="updatePage(1)"
        :class="[
          'w-10 h-10 rounded-lg flex items-center justify-center',
          currentPage === 1 ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'
        ]"
      >
        1
      </button>
      
      <!-- Ellipsis if needed -->
      <span v-if="showLeftEllipsis" class="w-10 h-10 flex items-center justify-center">...</span>
      
      <!-- Page numbers around current page -->
      <button 
        v-for="page in visiblePageNumbers" 
        :key="page"
        @click="updatePage(page)"
        :class="[
          'w-10 h-10 rounded-lg flex items-center justify-center',
          currentPage === page ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'
        ]"
      >
        {{ page }}
      </button>
      
      <!-- Ellipsis if needed -->
      <span v-if="showRightEllipsis" class="w-10 h-10 flex items-center justify-center">...</span>
      
      <!-- Last page -->
      <button 
        v-if="showLastPage"
        @click="updatePage(totalPages)"
        :class="[
          'w-10 h-10 rounded-lg flex items-center justify-center',
          currentPage === totalPages ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'
        ]"
      >
        {{ totalPages }}
      </button>
    </div>
    
    <button 
      class="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="currentPage >= totalPages"
      @click="updatePage(currentPage + 1)"
      aria-label="Next page"
    >
      <ChevronRight class="h-5 w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'update:page': [page: number]
}>()

// Calculate which page numbers to show
const visiblePageNumbers = computed(() => {
  const delta = 1 // Number of pages to show on each side of current page
  const range = []
  
  let start = Math.max(2, props.currentPage - delta)
  let end = Math.min(props.totalPages - 1, props.currentPage + delta)
  
  // Adjust if we're near the beginning
  if (props.currentPage - delta <= 2) {
    end = Math.min(props.totalPages - 1, end + (2 - (props.currentPage - delta)))
  }
  
  // Adjust if we're near the end
  if (props.currentPage + delta >= props.totalPages - 1) {
    start = Math.max(2, start - ((props.currentPage + delta) - (props.totalPages - 1)))
  }
  
  // Generate the range
  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  
  return range
})

// Determine if we need to show ellipsis and first/last pages
const showFirstPage = computed(() => props.totalPages > 1)
const showLastPage = computed(() => props.totalPages > 1 && props.totalPages !== 1)
const showLeftEllipsis = computed(() => props.currentPage > 3)
const showRightEllipsis = computed(() => props.currentPage < props.totalPages - 2)

// Update page and emit event
const updatePage = (page: number) => {
  if (page !== props.currentPage) {
    emit('update:page', page)
  }
}
</script>