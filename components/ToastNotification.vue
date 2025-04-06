<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
    <div 
      v-for="toast in toasts" 
      :key="toast.id"
      class="flex items-center p-4 rounded-lg shadow-lg animate-slide-in"
      :class="toastClasses[toast.type]"
    >
      <component :is="toastIcons[toast.type]" class="h-5 w-5 mr-3" />
      <p>{{ toast.message }}</p>
      <button 
        @click="removeToast(toast.id)"
        class="ml-3 p-1 rounded-full hover:bg-black hover:bg-opacity-10"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-vue-next'
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const toastClasses = {
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800'
}
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>