# getIncomers

Returns all nodes that have an outgoing edge targeting the specified node (predecessor nodes).

## Signature

```typescript
getIncomers(
  node: NodeType | { id: string },
  nodes: NodeType[],
  edges: EdgeType[]
): NodeType[]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `node` | `NodeType \| { id: string }` | The node to get the connected incomers for |
| `nodes` | `NodeType[]` | The array of all nodes |
| `edges` | `EdgeType[]` | The array of all edges |

## Returns

`NodeType[]` — An array of nodes that are connected as the source of an edge whose target is the given node.

## 使用例

```tsx
import { getIncomers } from '@xyflow/react';

const nodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'A' } },
  { id: '2', position: { x: 100, y: 0 }, data: { label: 'B' } },
  { id: '3', position: { x: 200, y: 0 }, data: { label: 'C' } },
];

const edges = [
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-3', source: '2', target: '3' },
];

const incomers = getIncomers({ id: '3' }, nodes, edges);
// Result: nodes with id '1' and '2'
```

## 注意点

- ノードグラフ内のデータフロー方向（上流）を把握するために使用する
- 指定ノードに向かうエッジの `source` 側のノードがすべて返される

## 関連

- [getOutgoers.md](./getOutgoers.md)
- [getConnectedEdges.md](./getConnectedEdges.md)
