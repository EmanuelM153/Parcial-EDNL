<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import "@/assets/config.css"

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex flex-row list-none">
      <header class="p-8 mb-3">
        <nav>
          <RouterLink to="/" class="ml-4 hover:text-purple-700">Inicio</RouterLink>
          <RouterLink to="/grafos" class="ml-4 hover:text-purple-700">Grafos</RouterLink>
        </nav>
      </header>
    </div>
    <main>
      <RouterView />
    </main>
  </div>
</template>