<template>
  <div>
    <!-- Breadcrumbs Skeleton -->
    <div class="flex mb-6">
      <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      <div class="mx-2 h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
      <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      <div class="mx-2 h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
      <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <!-- Product Image Skeleton -->
      <div>
        <div class="bg-white rounded-lg overflow-hidden mb-4">
          <div class="w-full aspect-square bg-gray-200 animate-pulse"></div>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="i in 4" :key="i" class="border rounded-lg overflow-hidden p-1">
            <div class="w-full aspect-square bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <!-- Product Info Skeleton -->
      <div>
        <div class="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
        
        <div class="flex items-center mb-4">
          <div class="flex space-x-1">
            <div v-for="i in 5" :key="i" class="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div class="h-5 w-24 bg-gray-200 rounded animate-pulse ml-2"></div>
        </div>
        
        <div class="mb-6">
          <div class="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div class="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div class="mb-6">
          <div class="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div class="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
          <div class="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
          <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div class="mb-6">
          <div class="h-6 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div class="flex items-center">
            <div class="h-10 w-10 bg-gray-200 rounded-l-lg animate-pulse"></div>
            <div class="h-10 w-16 bg-gray-200 animate-pulse"></div>
            <div class="h-10 w-10 bg-gray-200 rounded-r-lg animate-pulse"></div>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-4 mb-8">
          <div class="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div class="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        
        <div class="border-t border-gray-200 pt-6">
          <div class="grid grid-cols-2 gap-4">
            <div v-for="i in 4" :key="i" class="flex items-center">
              <div class="h-5 w-5 bg-gray-200 rounded animate-pulse mr-2"></div>
              <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>