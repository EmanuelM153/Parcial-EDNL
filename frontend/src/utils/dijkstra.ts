export function calcularPesoRuta(path: any[], edges: any): number {
    let totalPeso = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];
 
        const edge = edges.get({
            filter: (item: any) => {
                return (
                    (item.from === from && item.to === to) ||
                    (item.from === to && item.to === from)
                );
            }
        })[0];

        if (edge) {
            const peso = parseFloat(edge.label) || 1;
            totalPeso += peso;
        }
    }
    return totalPeso;
}

export function calcularRutaMinima(startNode: any, endNode: any, graph: any) {
  const distances = {};
  const previous = {};
  const queue = new Set(Object.keys(graph));

  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  distances[startNode] = 0;

  while (queue.size > 0) {
    const currentNode = Array.from(queue).reduce((minNode: any, node: any) => {
      if (distances[node] < distances[minNode]) {
        return node;
      } else {
        return minNode;
      }
    }, Array.from(queue)[0]);

    if (currentNode === endNode) {
      break;
    }

    queue.delete(currentNode);

    graph[currentNode].forEach((neighbor: any) => {
      const alt = distances[currentNode] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = currentNode;
      }
    });
  }

  const path = [];
  let currentNode = endNode;
  while (currentNode) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  if (path[0] !== startNode)
    return [];

  return path;
}

export function calcularRutaCritica(startNode: any, endNode: any, graph: any) {
  const maxPath = { length: -Infinity, path: [] };

  function dfs(currentNode: any, endNode: any, path: any[], totalWeight: number, visited: Set<any>) {
    if (visited.has(currentNode)) {
      return;
    }

    if (currentNode === endNode) {
      if (totalWeight > maxPath.length) {
        maxPath.length = totalWeight;
        maxPath.path = [...path, currentNode];
      }
      return;
    }

    visited.add(currentNode);

    for (let neighbor of graph[currentNode]) {
      const weight = parseFloat(neighbor.weight) || 1;
      dfs(neighbor.node, endNode, [...path, currentNode], totalWeight + weight, visited);
    }

    visited.delete(currentNode);
  }

  dfs(startNode, endNode, [], 0, new Set());

  return maxPath.path;
}