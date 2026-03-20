# useEdges

Returns an array of all current edges in the flow; re-renders the component whenever any edge changes.

## Signature

```ts
useEdges<EdgeType extends Edge = Edge>(): EdgeType[]
```

## Parameters

なし

## Returns

`EdgeType[]` — フロー内の全エッジの配列

## 使用例

```tsx
import { useEdges } from '@xyflow/react';

export default function EdgeCounter() {
  const edges = useEdges();
  return <div>There are currently {edges.length} edges!</div>;
}
```

カスタム型を使う場合:

```tsx
const edges = useEdges<CustomEdgeType>();
```

## 注意点

- **パフォーマンス警告**: エッジが少しでも変化するたびに再レンダリングが発生する。エッジの数だけ知りたいなど特定のスライスのみ必要な場合は `useStore` の利用を検討する
- `<ReactFlow>` または `<ReactFlowProvider>` の子コンポーネント内でのみ使用可能

## 関連

- [useNodes.md](./useNodes.md)
- [useEdgesState.md](./useEdgesState.md)
- [useStore.md](./useStore.md)
