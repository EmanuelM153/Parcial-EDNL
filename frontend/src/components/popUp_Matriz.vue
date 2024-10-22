<script setup lang="ts">
import popUp_Template from "./popUp_Template_Texto.vue"

const props = defineProps({
  titulo: String,
  mousePos: Object,
  dimensiones: null,
  matriz: {
    type: Array,
    required: true
  },
  rowLabels: {
    type: Array,
    default: () => []
  },
  colLabels: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  "evento-aceptar",
])
</script>

<template>
  <popUp_Template @evento-aceptar="emit('evento-aceptar')"
      :titulo="props.titulo"
      :mouse-pos="props.mousePos"
      :dimensiones="props.dimensiones"
  >
    <div class="matrix-container overflow-auto">
      <table class="matrix-table">
        <thead>
          <tr>
            <th></th>
            <th v-for="(colLabel, index) in colLabels" :key="'col'+index" class="matrix-header-cell">
              {{ colLabel }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in matriz" :key="rowIndex">
            <td class="matrix-header-cell">{{ rowLabels[rowIndex] }}</td>
            <td v-for="(col, colIndex) in row" :key="colIndex" class="matrix-cell">
              {{ col }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </popUp_Template>
</template>

<style scoped>
.matrix-container {
  margin-top: 20px;
  overflow: auto;
}

.matrix-table {
  border-collapse: collapse;
  margin: 0 auto;
}

.matrix-header-cell {
  font-weight: bold;
  padding: 5px;
  text-align: center;
  border: 1px solid #000;
}

.matrix-cell {
  padding: 5px;
  text-align: center;
  border: 1px solid #000;
}
</style>