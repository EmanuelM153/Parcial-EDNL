<template>
    <div ref="mynetwork" style="width: 600px; height: 400px;"></div>
    <!-- Pop-up para editar nodos -->
    <div id="network-popUp">
        <span id="operation">node</span> <br />
        <br>
        <table style="margin: auto">
            <tr>
                <td>Etiqueta</td>
                <td><input id="node-label" value="new value" /></td>
            </tr>
        </table>
        <br>
        <input type="button" value="Guardar    " id="saveButton" />
        <input type="button" value="Cancelar" id="cancelButton" />
    </div>
</template>

<script lang="ts" setup>
import '../assets/visjs.css'
import {options } from '../config/visjs'
import { ref, onMounted } from 'vue';
import { DataSet, Network } from "vis-network/standalone";

const mynetwork = ref<HTMLElement | null>(null);
onMounted(() => {
    if (mynetwork.value) {
        const net = new Network(mynetwork.value, {}, options);
        net.once('stabilized', function () {
            var scaleOption = { scale: 2 };
            net.moveTo(scaleOption);
        })
    }
})
</script>