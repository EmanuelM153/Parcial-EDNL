<template>
  <div class="popUp positionPopUP">
    <span class="text-base md:text-lg encabezado">{{ titulo }}</span>
    <div class="mb-3">
      <slot></slot>
    </div>
    <div class="bottom-1.5 botonAceptar">
      <button @click="emit('evento-aceptar')" class="boton justify-center">Aceptar</button>
    </div>
  </div>
</template>

<script lang="js" setup>
import { onMounted, ref, } from "vue"

const props = defineProps({
  titulo: String,
  mousePos: {
    type: Object,
    default() {
      return {
        x: 0,
        y: 0
      }
    },
  },
  dimensiones: null,
})

const emit = defineEmits([
  "evento-aceptar",
])

const height = ref("")
const width = ref("")
const xPos = ref("0%")
const yPos = ref("0%")

onMounted(() => {
  const offset = 150
  const x = Math.trunc(props.mousePos.x) - offset
  const y = Math.trunc(props.mousePos.y) - offset + 40

  if (x < 0)
    xPos.value = 0
  else
    xPos.value = x + "px"

  if (y < 0)
    yPos.value = 0
  else
    yPos.value = y + "px"

  height.value = props.dimensiones[1]
  width.value = props.dimensiones[0]
})

</script>

<style scoped>
.positionPopUP {
  top: v-bind(yPos);
  left: v-bind(xPos);
  height: v-bind(height);
  width: v-bind(width);
}
</style>