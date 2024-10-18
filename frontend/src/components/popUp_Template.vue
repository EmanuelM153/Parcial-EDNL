<template>
  <form class="popUp positionPopUP" @submit.prevent="guardar()">
    <span class="text-base md:text-lg encabezado">{{ titulo }}</span>
    <div class="mb-3">
      <slot :datosActualizados="props.datos"></slot>
    </div>
    <div style="display: flex; justify-content: center;">
      <table>
        <tbody>
          <tr>
            <td>
              <button @click="guardar()" class="boton mr-1">Guardar</button>
            </td>
            <td>
              <button @click="emit('evento-cancelar')" class="boton">Cancelar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>

<script lang="js" setup>
class mousePosClass {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

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
  datos: Object,
  altura: {
    type: String,
    default: "13rem"
  }
})

const height = ref("1rem")
const xPos = ref("0%")
const yPos = ref("0%")

const emit = defineEmits([
  "evento-guardar",
  "evento-cancelar"
])

function guardar() {
  emit("evento-guardar")
}

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

  height.value = props.altura.value
})

</script>

<style scoped>
.positionPopUP {
  top: v-bind(yPos);
  left: v-bind(xPos);
  height: v-bind(height);
}
</style>