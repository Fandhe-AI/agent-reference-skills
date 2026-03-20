# getOutgoers

Returns all nodes that are targets of edges originating from the specified node (successor nodes).

## Signature

```typescript
getOutgoers(
  node: NodeType | { id: string },
  nodes: NodeType[],
  edges: EdgeType[]
): NodeType[]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `node` | `NodeType \| { id: string }` | The node from which to retrieve connected outgoing nodes |
| `nodes` | `NodeType[]` | Complete array of all nodes in the flow |
| `edges` | `EdgeType[]` | Complete array of all edges in the flow |

## Returns

`NodeType[]` — An array of nodes that are connected as the target of an edge whose source is the given node.

## 使用例

```tsx
import { getOutgoers } from '@xyflow/react';

const nodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'A' } },
  { id: '2', position: { x: 100, y: 100 }, data: { label: 'B' } },
  { id: '3', position: { x: 200, y: 100 }, data: { label: 'C' } },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

const outgoers = getOutgoers({ id: '1' }, nodes, edges);
// Result: nodes with id '2' and '3'
```

## 注意点

- ノードグラフ内のデータフロー方向（下流）を把握するために使用する
- 指定ノードから出るエッジの `target` 側のノードがすべて返される

## 関連

- [getIncomers.md](./getIncomers.md)
- [getConnectedEdges.md](./getConnectedEdges.md)
