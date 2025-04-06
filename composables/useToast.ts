import { ref } from 'vue'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: number
  type: ToastType
  message: string
}

const toasts = ref<Toast[]>([])
let toastId = 0

export const useToast = () => {
  const showToast = ({ type, message }: { type: ToastType; message: string }) => {
    const id = toastId++
    
    toasts.value.push({
      id,
      type,
      message
    })
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }
  
  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }
  
  return {
    toasts,
    showToast,
    removeToast
  }
}