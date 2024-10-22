export function crearMapaNodos(nodos: Array<Node>) {
  const mapa = {};
  nodos.forEach((nodo, i) => {
    mapa[nodo.id] = i
  });

  return mapa
}

export function crearMatrizAdyacencia(mapa: Object, aristas: Array<Edge>, numNodos: Number) {
  const matriz = Array(numNodos)
    .fill(Infinity)
    .map(() => Array(numNodos).fill(Infinity));

  aristas.forEach((arista) => {
    const indiceDesde = mapa[arista.from];
    const indiceHacia = mapa[arista.to];

    matriz[indiceDesde][indiceHacia] = arista.label ? parseFloat(arista.label) : 1;

    const esDireccionado = arista.arrows === "to"
    if (!esDireccionado)
      matriz[indiceHacia][indiceDesde] = matriz[indiceDesde][indiceHacia];
  });

  return matriz
}

export function crearMatrizIncidencia(mapa: Object, aristas: Array<Edge>, numNodos: Number) {
  const numAristas = aristas.length

  const matriz = Array(numNodos)
    .fill(0)
    .map(() => Array(numAristas).fill(0))

  aristas.forEach((arista, i) => {
    const indiceDesde = mapa[arista.from]
    const indiceHacia = mapa[arista.to]

    const esDireccionado = arista.arrows === "to"

    if (esDireccionado) {
      matriz[indiceDesde][i] = -1
      matriz[indiceHacia][i] = 1
    } else {
      matriz[indiceDesde][i] = 1
      matriz[indiceHacia][i] = 1
    }
  });

  return matriz;
}

export function ajustarPopUpMatriz_dimensiones(matrizAdyacencia: any) {
    const baseWidth = 18
    const baseHeight = 17 + 2 * Math.floor((matrizAdyacencia.length / 8))
    const width = matrizAdyacencia.length * 2 + baseWidth
    const height = matrizAdyacencia.length * 1.5 + baseHeight

    let dimensiones = [
        `${width}rem`,
        `${height}rem`
    ];

    return dimensiones
}