# getConnectedEdges

Filters an edge array, returning only edges that connect to at least one of the specified nodes.

## Signature

```typescript
getConnectedEdges(
  nodes: NodeType[],
  edges: EdgeType[]
): EdgeType[]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `nodes` | `NodeType[]` | Nodes to get the connected edges for |
| `edges` | `EdgeType[]` | All edges in the flow |

## Returns

`EdgeType[]` — Array of edges that have their source or target in the given nodes array.

## 使用例

```tsx
import { getConnectedEdges } from '@xyflow/react';

const nodes = [
  { id: 'a', position: { x: 0, y: 0 }, data: {} },
  { id: 'b', position: { x: 100, y: 0 }, data: {} },
];

const edges = [
  { id: 'a->c', source: 'a', target: 'c' },
  { id: 'c->d', source: 'c', target: 'd' },
];

const connectedEdges = getConnectedEdges(nodes, edges);
// Result: [{ id: 'a->c', source: 'a', target: 'c' }]
// 'c->d' is excluded because neither 'c' nor 'd' is in the nodes array
```

## 注意点

- `source` または `target` のいずれかが対象ノード配列に含まれていれば、そのエッジは結果に含まれる

## 関連

- [getIncomers.md](./getIncomers.md)
- [getOutgoers.md](./getOutgoers.md)
