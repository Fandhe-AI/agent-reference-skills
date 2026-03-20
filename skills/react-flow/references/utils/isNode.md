# isNode

TypeScript type guard that checks whether a given value is a valid React Flow `Node`.

## Signature

```typescript
isNode(element: unknown): element is Node
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `element` | `unknown` | The object to evaluate |

## Returns

`boolean` — Returns `true` if the value is a valid `Node`, narrowing the TypeScript type accordingly. Returns `false` otherwise.

## 使用例

```tsx
import { isNode } from '@xyflow/react';

const element = {
  id: 'node-a',
  data: { label: 'node' },
  position: { x: 0, y: 0 },
};

if (isNode(element)) {
  // element is now typed as Node
  console.log(element.position); // { x: 0, y: 0 }
}

// Useful when handling mixed arrays of nodes and edges:
const elements = [...nodes, ...edges];
const nodesOnly = elements.filter(isNode);
```

## 注意点

- TypeScript の型ガードとして機能し、`true` を返した後はその値が `Node` 型に絞り込まれる
- ノードとエッジが混在するデータ構造を扱う際に特に有用

## 関連

- [isEdge.md](./isEdge.md)
