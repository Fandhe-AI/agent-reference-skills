# getNodesBounds

Returns a bounding box rectangle that encloses all the given nodes.

## Signature

```typescript
getNodesBounds(
  nodes: (string | NodeType | InternalNodeBase<NodeType>)[],
  params?: {
    nodeOrigin?: NodeOrigin;
    nodeLookup?: NodeLookup<InternalNodeBase<NodeType>>;
  }
): Rect
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `nodes` | `(string \| NodeType \| InternalNodeBase<NodeType>)[]` | — | Array of nodes (or node IDs) to calculate bounds for |
| `params.nodeOrigin` | `NodeOrigin` | `[0, 0]` | Node origin point: `[0, 0]` = top-left, `[0.5, 0.5]` = center |
| `params.nodeLookup` | `NodeLookup<InternalNodeBase<NodeType>>` | — | Optional node lookup map for reference |

## Returns

`Rect` — A bounding box object `{ x, y, width, height }` that encloses all provided nodes.

## 使用例

```tsx
import { getNodesBounds, getViewportForBounds } from '@xyflow/react';

const nodes = [
  {
    id: 'a',
    position: { x: 0, y: 0 },
    data: { label: 'a' },
    width: 50,
    height: 25,
  },
  {
    id: 'b',
    position: { x: 100, y: 100 },
    data: { label: 'b' },
    width: 50,
    height: 25,
  },
];

const bounds = getNodesBounds(nodes);
// bounds = { x: 0, y: 0, width: 150, height: 125 }

// Often combined with getViewportForBounds:
const viewport = getViewportForBounds(bounds, 1200, 800, 0.5, 2);
```

## 注意点

- 旧バージョンの React Flow では `getRectOfNodes` という名称だった（リネームされた）
- `getViewportForBounds` と組み合わせてビューポートをノード群に合わせる用途によく使われる

## 関連

- [getViewportForBounds.md](./getViewportForBounds.md)
