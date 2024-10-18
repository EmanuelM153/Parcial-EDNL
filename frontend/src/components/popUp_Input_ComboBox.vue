<template>
  <popUp_Template @evento-cancelar="emit('evento-cancelar')" @evento-guardar="emit('evento-guardar')"
      :titulo="props.titulo"
      :datos="props.datos" 
      :mouse-pos="props.mousePos"
      altura="18rem"
  >
    <template v-slot="{ datosActualizados }">
        <p class="mb-2 text-left ml-2">{{ props.argumentoInput }}</p>
        <input v-model="datosActualizados.input" type="text"/>

        <p class="mb-2 text-left ml-2">{{ props.argumentoComboBox }}</p>
        <select v-model="datosActualizados.comboBox" class="mb-2 w-full">
          <option v-for="opcion in props.comboBoxOptions" :value="opcion.valor">{{ opcion.nombre }}</option>
        </select>
    </template>
  </popUp_Template>
</template>

<script setup lang="ts">
import popUp_Template from "./popUp_Template.vue"

const props = defineProps({
  titulo: String,
  argumentoInput: String,
  argumentoComboBox: String,
  comboBoxOptions: Array<Object>,
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