import VistaInicio from '@/views/VistaInicio.vue'
import VistaGrafos from '@/views/VistaGrafos.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VistaInicio
    },
    {
      path: '/grafos',
      name: 'grafos',
      component: VistaGrafos
    },
  ]
})

router.beforeEach(async (to, from) => {
  if (from.path === "/grafos") {
    let continuar = confirm("Asegurate de guardar el grafo\n¿Salir?")
    if (!continuar) return "/grafos"
  }
})

export default router
