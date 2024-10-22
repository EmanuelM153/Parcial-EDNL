export function resetearColorAristas(net: any) {
  const edges = net.body.data.edges.get();
  net.body.data.edges.update(edges.map((edge: any) => ({ id: edge.id, color: '#e879f9' })));
}

export function obtenerGrafo(net: any) {
  const nodes = net.body.data.nodes.get();
  const edges = net.body.data.edges.get();
  const graph = {};

  nodes.forEach((node: any) => {
    graph[node.id] = [];
  });

  edges.forEach((edge: any) => {
    const from = edge.from;
    const to = edge.to;
    const weight = parseFloat(edge.label) || 1;

    graph[from].push({ node: to, weight: weight });

    if (!edge.arrows || edge.arrows === '')
      graph[to].push({ node: from, weight: weight });
  });

  return graph;
}

export function resaltarCamino(path: any, color: string, net: any) {
  const edges = net.body.data.edges.get();

  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i];
    const to = path[i + 1];

    const edgeBetween = edges.filter((edge: any) => {
      return (
        (edge.from === from && edge.to === to) ||
        (!edge.arrows && edge.from === to && edge.to === from)
      );
    });

    edgeBetween.forEach((edge: any) => {
      net.body.data.edges.update({ id: edge.id, color: color });
    });
  }
}
