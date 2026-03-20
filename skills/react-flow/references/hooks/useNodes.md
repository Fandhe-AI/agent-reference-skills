# useNodes

フロー内の全ノードの配列を返す。選択・移動を含むあらゆるノード変化で再レンダリングが発生する。

## Signature

```ts
useNodes<NodeType extends Node = Node>(): NodeType[]
```

## Parameters

なし

## Returns

`NodeType[]` — フロー内の全ノードの配列

## 使用例

```tsx
import { useNodes } from '@xyflow/react';

export default function NodeCounter() {
  const nodes = useNodes();
  return <div>There are currently {nodes.length} nodes!</div>;
}
```

カスタム型を使う場合:

```tsx
const nodes = useNodes<CustomNodeType>();
```

## 注意点

- **パフォーマンス警告**: 選択・移動を含む**あらゆるノード変化**で再レンダリングが発生する。ノード数の変化だけ追いたい場合など特定スライスのみ必要な場合は `useStore` の利用を検討する
- `<ReactFlow>` または `<ReactFlowProvider>` の子コンポーネント内でのみ使用可能

## 関連

- [useEdges.md](./useEdges.md)
- [useNodesState.md](./useNodesState.md)
- [useStore.md](./useStore.md)
