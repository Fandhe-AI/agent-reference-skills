# isEdge

TypeScript type guard that checks whether a given value is a valid React Flow `Edge`.

## Signature

```typescript
isEdge(element: unknown): element is Edge
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `element` | `unknown` | The value to validate |

## Returns

`boolean` — Returns `true` if the value is a valid `Edge`, narrowing the TypeScript type accordingly. Returns `false` otherwise.

## 使用例

```tsx
import { isEdge } from '@xyflow/react';

const element = {
  id: 'edge-a',
  source: 'a',
  target: 'b',
};

if (isEdge(element)) {
  // element is now typed as Edge
  console.log(element.source); // 'a'
}

// Useful when handling mixed arrays of nodes and edges:
const elements = [...nodes, ...edges];
const edgesOnly = elements.filter(isEdge);
```

## 注意点

- TypeScript の型ガードとして機能し、`true` を返した後はその値が `Edge` 型に絞り込まれる
- ノードとエッジが混在するデータ構造を扱う際に特に有用

## 関連

- [isNode.md](./isNode.md)
