<template>
    <popUp_Input v-if="popUpNodo.mostrar" @evento-cancelar="cancelarEdicionNodo" @evento-guardar="guardarNodo"
        :datos="popUpNodo" :argumento="popUpNodo.argumento" :titulo="popUpNodo.titulo" :mouse-pos="mousePos" />

    <popUp_Input_ComboBox v-if="popUpArista.mostrar" @evento-cancelar="cancelarEdicionArista"
        @evento-guardar="guardarArista" :datos="popUpArista" :argumento-input="popUpArista.argumento"
        :argumento-combo-box="popUpArista.argumentoComboBox" :titulo="popUpArista.titulo" :mouse-pos="mousePos"
        :combo-box-options="popUpArista.comboBoxOptions" />

    <popUp_Matriz v-if="popUpMatriz.mostrar"
        :titulo="popUpMatriz.titulo"
        :mouse-pos="{
            x: windowWidth / 2,
            y: windowHeight / 2,
        }"
        :dimensiones="popUpMatriz.dimensiones"
        :matriz="popUpMatriz.matriz"
        :rowLabels="popUpMatriz.rowLabels"
        :colLabels="popUpMatriz.colLabels"

        @evento-aceptar="popUpMatriz.mostrar = false"
    />

    <popUp_Rutas v-if="popUpRutas.mostrar"
      titulo="Ruta Crítica y Mínima"
      :mouse-pos="{
          x: windowWidth / 2,
          y: windowHeight / 2,
      }"
      :rutaMinima="popUpRutas.rutaMinima"
      :rutaCritica="popUpRutas.rutaCritica"
      :nombresNodos="popUpRutas.nombresNodos"
      :peso-critico="popUpRutas.pesoCritico"
      :peso-minimo="popUpRutas.pesoMinimo"
      @evento-aceptar="popUpRutas.mostrar = false"
    />

    <button @click="mostrarMatrizAdyacencia" class="boton mb-3 ml-2">Matriz Adyacencia</button>
    <button @click="mostrarMatrizIncidencia" class="boton mb-3 ml-2">Matriz Incidencia</button>
    <button @click="descargarGrafo" class="boton mb-3 ml-2">Descargar Grafo</button>
    <button @click="cargarGrafo" class="boton mb-3 ml-2">Cargar Grafo</button>
    <button @click="dijkstra" class="boton mb-3 ml-2">Encontrar ruta mínima y máxima con Dijkstra</button>
    <div class="flex h-screen">
        <div ref="mynetwork" class="w-full h-full mx-0 md:mx-2" @mousemove="moverMouse"></div>
    </div>
</template>

<script lang="ts" setup>
import popUp_Input from "../components/popUp_Input.vue"
import popUp_Input_ComboBox from "../components/popUp_Input_ComboBox.vue"
import popUp_Matriz from "@/components/popUp_Matriz.vue";
import popUp_Rutas from "@/components/popUp_Rutas.vue"
import { verificarNombre } from "@/utils/visjs";
import { options } from "../config/visjs"
import { ref, onMounted } from "vue";
import { Network } from "vis-network/standalone";
import { crearMapaNodos, crearMatrizAdyacencia, crearMatrizIncidencia, ajustarPopUpMatriz_dimensiones } from "@/utils/grafos"
import { calcularPesoRuta, calcularRutaMinima, calcularRutaCritica } from "@/utils/dijkstra"
import { resetearColorAristas, obtenerGrafo, resaltarCamino } from "@/utils/dijkstra_view";

const windowHeight = window.innerHeight
const windowWidth = window.innerWidth
const nombres: Object = {}
let net: any = null

const popUpRutas = ref({
  mostrar: false,
  rutaMinima: [],
  rutaCritica: [],
  nombresNodos: {},
  pesoCritico: 0,
  pesoMinimo: 0
})

const popUpNodo = ref({
    mostrar: false,
    titulo: "",
    argumento: "",
    input: "",
})

const popUpMatriz = ref({
    mostrar: false,
    titulo: '',
    dimensiones: [],
    matriz: [[]],
    type: "",
    rowLabels: null,
    colLabels: null
})

const popUpArista = ref({
    mostrar: false,
    titulo: "",
    argumento: "",
    argumentoComboBox: "Tipo",
    input: "",
    comboBox: "to",
    comboBoxOptions: [
        { valor: "to", nombre: "Dirigida" },
        { valor: "", nombre: "No Dirigida" }
    ]
})

const mousePos = ref({
    x: 0,
    y: 0
})
var _data: any
var _callback: Function

const nodosSeleccionados = ref([]);

function dijkstra() {
  nodosSeleccionados.value = [];
  alert('Seleccione el nodo de inicio');
  net.once('click', onNodeSelected);
}

function mostrarRutasEnPopUp(shortestPathResult: any, longestPathResult: any) {
  const nodos = net.body.data.nodes.get();
  const nombresNodosMap = {};
  nodos.forEach((nodo: any) => {
    nombresNodosMap[nodo.id] = nodo.label || nodo.id;
  });

  const pesoRutaMinima = calcularPesoRuta(shortestPathResult, net.body.data.edges);
  const pesoRutaCritica = calcularPesoRuta(longestPathResult, net.body.data.edges);

  popUpRutas.value.rutaMinima = shortestPathResult;
  popUpRutas.value.rutaCritica = longestPathResult;
  popUpRutas.value.nombresNodos = nombresNodosMap;
  popUpRutas.value.pesoCritico = pesoRutaCritica
  popUpRutas.value.pesoMinimo = pesoRutaMinima
  popUpRutas.value.mostrar = true;
}

function onNodeSelected(params: any) {
  if (params.nodes.length > 0) {
    nodosSeleccionados.value.push(params.nodes[0]);
    if (nodosSeleccionados.value.length === 1) {
      alert('Seleccione el nodo de destino');
      net.once('click', onNodeSelected);
    } else if (nodosSeleccionados.value.length === 2) {
      let nodoInicio = nodosSeleccionados.value[0]
      let nodoFinal = nodosSeleccionados.value[1]

      let rutaMinima = calcularRutaMinima(nodoInicio, nodoFinal, obtenerGrafo(net))
      let rutaCritica = calcularRutaCritica(nodoInicio, nodoFinal, obtenerGrafo(net))

      nodosSeleccionados.value = [];
      resetearColorAristas(net);

      if (rutaMinima.length > 0)
        resaltarCamino(rutaMinima, 'blue', net);
      else
        alert('No se encontró una ruta mínima entre los nodos seleccionados.');

      if (rutaCritica.length > 0)
        resaltarCamino(rutaCritica, 'red', net);
      else
        alert('No se encontró una ruta crítica entre los nodos seleccionados.');

      if (rutaCritica.length > 0 || rutaMinima.length > 0)
        mostrarRutasEnPopUp(rutaMinima, rutaCritica)
    }
  } else {
    net.once('click', onNodeSelected);
  }
}

function descargarGrafo() {
  const nodos = net.body.data.nodes.get();
  const aristas = net.body.data.edges.get();
  const data = {
    nodes: nodos,
    edges: aristas
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "grafo.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function cargarGrafo() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  input.onchange = e => {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const data = JSON.parse(event.target.result as string);
      net.setData(data);
    };
    reader.readAsText(file);
  };

  input.click();
}

function mostrarMatrizAdyacencia() {
    const nodos = net.body.data.nodes.get();
    const aristas = net.body.data.edges.get();
    const mapa = crearMapaNodos(nodos)
    const matrizAdyacencia = crearMatrizAdyacencia(mapa, aristas, nodos.length)

    popUpMatriz.value.dimensiones = ajustarPopUpMatriz_dimensiones(matrizAdyacencia)

    popUpMatriz.value.titulo = "Matriz Adyacencia"
    popUpMatriz.value.matriz = matrizAdyacencia
    popUpMatriz.value.mostrar = true
    popUpMatriz.value.type = 'adjacency'
    popUpMatriz.value.rowLabels = nodos.map(nodo => nodo.label)
    popUpMatriz.value.colLabels = nodos.map(nodo => nodo.label)
}

function mostrarMatrizIncidencia() {
    const nodos = net.body.data.nodes.get();
    const aristas = net.body.data.edges.get();
    const mapa = crearMapaNodos(nodos)
    const matrizIncidencia = crearMatrizIncidencia(mapa, aristas, nodos.length)

    popUpMatriz.value.dimensiones = ajustarPopUpMatriz_dimensiones(matrizIncidencia)

    popUpMatriz.value.titulo = "Matriz Incidencia"
    popUpMatriz.value.matriz = matrizIncidencia
    popUpMatriz.value.mostrar = true
    popUpMatriz.value.type = 'incidence'
    popUpMatriz.value.rowLabels = nodos.map(nodo => nodo.label)
    popUpMatriz.value.colLabels = aristas.map(arista => arista.label || `${arista.from}-${arista.to}`)
}

function moverMouse(event: any) {
    mousePos.value.x = event.clientX;
    mousePos.value.y = event.clientY;
}

function guardarNodo() {
    if (verificarNombre(popUpNodo.value.input, Object.values(nombres))) {
        nombres[_data.id] = popUpNodo.value.input
        _data.label = popUpNodo.value.input
        _callback(_data)
        popUpNodo.value.input = ""
        popUpNodo.value.mostrar = false
    }
}

function guardarArista() {
    _data.arrows = popUpArista.value.comboBox
    _data.label = String(popUpArista.value.input)
    _callback(_data)
    popUpArista.value.input = ""
    popUpArista.value.mostrar = false
}

function cancelarEdicionNodo() {
    _callback(null)
    _data = null
    popUpNodo.value.mostrar = false
}

function cancelarEdicionArista() {
    _callback(null)
    _data = null
    popUpArista.value.mostrar = false
}

const mynetwork = ref<HTMLElement | null>(null);
onMounted(() => {
    if (mynetwork.value) {
        options.manipulation = {
            enabled: true,
            initiallyActive: true,
            editNode: function(data: any, callback: Function) {
                popUpNodo.value.input = data.label
                popUpNodo.value.mostrar = true;
                popUpNodo.value.titulo = "Editar Nodo"
                popUpNodo.value.argumento = "Nuevo nombre"
                _callback = callback
                _data = data
            },
            addNode: function(data: any, callback: Function) {
                popUpNodo.value.mostrar = true
                popUpNodo.value.titulo = "Agregar Nodo"
                popUpNodo.value.argumento = "Nombre"
                _callback = callback
                _data = data
            },
            editEdge: {
                editWithoutDrag: function(data: any, callback: Function) {
                    popUpArista.value.input = data.label
                    popUpArista.value.mostrar = true
                    popUpArista.value.titulo = "Editar Arista"
                    popUpArista.value.argumento = "Nuevo Valor"
                    _callback = callback
                    _data = data
                }
            },
            addEdge(data: any, callback: Function) {
                popUpArista.value.mostrar = true
                popUpArista.value.titulo = "Agregar Arista"
                popUpArista.value.argumento = "Valor"
                _callback = callback
                _data = data
            },
            deleteNode(data: any, callback: Function) {
                popUpNodo.value.input = ""
                delete nombres[data.nodes[0]]
                callback(data)
            }
        }

        net = new Network(mynetwork.value, {}, options);
        net.once("stabilized", function () {
            var scaleOption = { scale: 2 };
            net.moveTo(scaleOption);
        })
    }
})
</script>
