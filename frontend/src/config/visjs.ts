import { DataSet, Network } from "vis-network/standalone";

// Función para guardar datos
function saveData(data: any, callback: Function) {
  data.label = (
    document.getElementById("node-label") as HTMLInputElement
  ).value;
  document.getElementById("network-popUp")!.style.display = "none";
  callback(data); // Confirmar el cambio
}

// Función para cancelar la edición
function cancelEdit(callback: Function) {
  document.getElementById("network-popUp")!.style.display = "none";
  callback(null); // Cancelar la operación
}

// Ejecutar cuando el componente esté montado
const locales = {
  en: {
    edit: "Editar",
    del: "Borrar Seleccionado",
    back: "Atrás",
    addNode: "Agregar Nodo",
    addEdge: "Agregar Arista",
    editNode: "Editar Nodo",
    editEdge: "Editar Arista",
  },
};
export const options = {
  autoResize: true,
  locale: "en",
  locales: locales,
  height: "200%",
  width: "300%",
  nodes: {
    color: "#a855f7",
    fixed: false,
    font: "12px arial black",
    borderWidth: 0,
    scaling: { label: true },
    shadow: true,
  },
  edges: {
    color: "#e879f9",
  },
  interaction: {
    hover: true,
    multiselect: true,
    navigationButtons: true,
  },
  manipulation: {
    enabled: true,
    initiallyActive: true,
    editNode: function (data: any, callback: Function) {
      // Rellenar los elementos del DOM del popup
      document.getElementById("operation")!.innerText = "Editar Nodo";
      (document.getElementById("node-label") as HTMLInputElement).value =
        data.label;
      document.getElementById("saveButton")!.onclick = saveData.bind(
        this,
        data,
        callback
      );
      document.getElementById("cancelButton")!.onclick = cancelEdit.bind(
        this,
        callback
      );
      document.getElementById("network-popUp")!.style.display = "block";
    },
  },
};
