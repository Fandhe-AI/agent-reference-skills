# useNodeId

このフックを使用しているコンポーネントが属するノードの ID を返す。

## Signature

```ts
useNodeId(): string | null
```

## Parameters

なし

## Returns

`string | null` — 現在のノードの ID。ノードコンテキスト外では `null`。

## 使用例

```tsx
import { useNodeId } from '@xyflow/react';

function NodeIdDisplay() {
  const nodeId = useNodeId();
  return <span>{nodeId}</span>;
}

export default function CustomNode() {
  return (
    <div>
      <span>This node has an id of </span>
      <NodeIdDisplay />
    </div>
  );
}
```

## 注意点

- カスタムノードコンポーネント、またはその子コンポーネント内でのみ使用すること
- ノード ID をプロップとしてドリルダウンせずに深いコンポーネント階層で取得したい場合に便利

## 関連

- [useNodeConnections.md](./useNodeConnections.md)
- [useInternalNode.md](./useInternalNode.md)
