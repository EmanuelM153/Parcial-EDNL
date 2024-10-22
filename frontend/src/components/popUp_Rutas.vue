<template>
  <popUp_Template @evento-aceptar="emit('evento-aceptar')"
      :titulo="titulo"
      :mouse-pos="mousePos"
      :dimensiones="dimensiones"
  >
    <div class="routes-container overflow-auto">
      <h3>Ruta Mínima: ({{ pesoMinimo }})</h3>
      <p>{{ rutaMinimaTexto }}</p>
      <h3>Ruta Crítica: ({{ pesoCritico }})</h3>
      <p>{{ rutaCriticaTexto }}</p>
    </div>
  </popUp_Template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import popUp_Template from "./popUp_Template_Texto.vue"

const props = defineProps({
  titulo: String,
  mousePos: Object,
  dimensiones: {
    type: null,
    default: ["25rem", "17rem"]
  },
  rutaMinima: {
    type: Array,
    required: true
  },
  rutaCritica: {
    type: Array,
    required: true
  },
  pesoMinimo: {
    type: Number,
    required: true
  },
  pesoCritico: {
    type: Number,
    required: true
  },
  nombresNodos: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  "evento-aceptar",
])

const rutaMinimaTexto = computed(() => {
  return props.rutaMinima.map(id => props.nombresNodos[id]).join(' -> ')
})
const rutaCriticaTexto = computed(() => { 
  return props.rutaCritica.map(id => props.nombresNodos[id]).join(' -> ')
})
</script>

<style scoped>
.routes-container {
  margin-top: 20px;
}
h3 {
  margin-bottom: 5px;
}
p {
  margin-bottom: 15px;
  word-wrap: break-word;
}
</style>