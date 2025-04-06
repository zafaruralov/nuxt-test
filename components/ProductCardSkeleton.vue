<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden">
    <div class="relative">
      <div class="w-full h-48 bg-gray-200 animate-pulse"></div>
    </div>
    <div class="p-4">
      <div class="h-4 w-1/3 bg-gray-200 rounded animate-pulse mb-1"></div>
      <div class="h-5 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
      <div class="flex items-center mb-2">
        <div class="flex space-x-1">
          <div v-for="i in 5" :key="i" class="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div class="h-4 w-10 bg-gray-200 rounded animate-pulse ml-1"></div>
      </div>
      <div class="flex items-center justify-between">
        <div class="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  </div>
</template>