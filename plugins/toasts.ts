import { defineNuxtPlugin } from '#app'
import { defineAsyncComponent, createVNode, render } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Add ToastNotification component to the app
  nuxtApp.vueApp.component('ToastNotification', defineAsyncComponent(() => 
    import('~/components/ToastNotification.vue')
  ))
  
  // Add the component to the app template
  nuxtApp.hook('app:mounted', () => {
    const toastContainer = document.createElement('div')
    document.body.appendChild(toastContainer)
    
    const { vueApp } = nuxtApp
    const toastInstance = createVNode(defineAsyncComponent(() => 
      import('~/components/ToastNotification.vue')
    ))
    
    render(toastInstance, toastContainer)
  })
})