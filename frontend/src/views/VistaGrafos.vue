<template>
    <popUp_Input v-if="popUpNodo.mostrar" @evento-cancelar="cancelarEdicionNodo" @evento-guardar="guardarNodo"
        :datos="popUpNodo"
        :argumento = "popUpNodo.argumento"
        :titulo = "popUpNodo.titulo"
        :mouse-pos = "mousePos"
    />
    <popUp_Input_ComboBox v-if="popUpArista.mostrar" @evento-cancelar="cancelarEdicionArista" @evento-guardar="guardarArista"
        :datos="popUpArista"
        :argumento-input = "popUpArista.argumento"
        :argumento-combo-box = "popUpArista.argumentoComboBox"
        :titulo = "popUpArista.titulo"
        :mouse-pos = "mousePos"
        :combo-box-options = "popUpArista.comboBoxOptions"
    />
    <div @mousemove="moverMouse" class="mx-0 md:mx-2">
        <div ref="mynetwork" class="w-full h-96"></div>
    </div>
</template>

<script lang="ts" setup>
import popUp_Input from "../components/popUp_Input.vue"
import popUp_Input_ComboBox from "../components/popUp_Input_ComboBox.vue"
import { verificarNombre } from "@/utils/visjs";
import { options } from "../config/visjs"
import { ref, onMounted } from "vue";
import { Network } from "vis-network/standalone";

const nombres: Array<String> = []

const popUpNodo = ref({
    mostrar: false,
    titulo: "",
    argumento: "",
    input: ""
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

function moverMouse(event: any) {
    mousePos.value.x = event.clientX;
    mousePos.value.y = event.clientY;
}

function guardarNodo() {
    if (verificarNombre(popUpNodo.value.input, nombres)) {
        nombres.push(popUpNodo.value.input)
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
                popUpNodo.value.mostrar = true;
                popUpNodo.value.titulo = "Agregar Nodo"
                popUpNodo.value.argumento = "Nombre"
                _callback = callback
                _data = data
            },
            addEdge(data: any, callback: Function) {
                popUpArista.value.mostrar = true;
                popUpArista.value.titulo = "Agregar Arista"
                popUpArista.value.argumento = "Valor"
                _callback = callback
                _data = data
            }
        }

        const net = new Network(mynetwork.value, {}, options);
        net.once("stabilized", function () {
            var scaleOption = { scale: 2 };
            net.moveTo(scaleOption);
        })
    }
})
</script>