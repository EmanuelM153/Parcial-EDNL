<template>
    <popUp_Template @evento-cancelar="emit('evento-cancelar')" @evento-guardar="emit('evento-guardar')"

        :titulo="props.titulo"
        :datos="props.datos" 
        :mouse-pos="props.mousePos"
    >
      <template v-slot="{ datosActualizados }">
        <p class="mb-2 text-left ml-2">{{ props.argumento }}</p>
        <input v-model="datosActualizados.input" autocomplete="on" type="text" />
      </template>
    </popUp_Template>
</template>

<script setup lang="ts">
import popUp_Template from "./popUp_Template.vue"

const props = defineProps({
  titulo: String,
  argumento: String,
  mousePos: Object,
  datos: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits([
  "evento-guardar",
  "evento-cancelar"
])
</script>
