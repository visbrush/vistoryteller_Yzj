//查找可以到达某个node的节点
function findReachableFromNodes(startNodeId, links, nodes) {
    const visited = new Set();
    const stack = [startNodeId];
    const reachableFromNodes = [];
    while (stack.length > 0) {
        const currentNodeId = stack.pop();
        if (!visited.has(currentNodeId)) {
            visited.add(currentNodeId);
            const currentNode = nodes.find(node => node.id === currentNodeId);
            if (currentNode) {
                reachableFromNodes.push(currentNode);
                const neighbors = links
                    .filter(link => link.target.id === currentNodeId)
                    .map(link => link.source);
                const neighborIds = neighbors.map(neighbor => neighbor.id);
                stack.push(...neighborIds);
            }
        }
    }
    return reachableFromNodes;
}