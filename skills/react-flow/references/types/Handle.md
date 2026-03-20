# Handle

Type representing the attributes of a connection handle on a node, including its position, dimensions, and connection type.

## 型定義

```typescript
type Handle = {
  id: string | null;
  nodeId: string;
  x: number;
  y: number;
  position: Position;
  type: 'source' | 'target';
  width: number;
  height: number;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `id` | `string \| null` | Optional identifier for the handle |
| `nodeId` | `string` | ID of the parent node |
| `x` | `number` | Horizontal position coordinate (relative to the node) |
| `y` | `number` | Vertical position coordinate (relative to the node) |
| `position` | `Position` | The side of the node where the handle is placed |
| `type` | `'source' \| 'target'` | Whether the handle is for outgoing (`source`) or incoming (`target`) edges |
| `width` | `number` | Width of the handle in pixels |
| `height` | `number` | Height of the handle in pixels |

## 使用例

```tsx
import { useReactFlow } from '@xyflow/react';

function NodeInfo({ nodeId }: { nodeId: string }) {
  const { getHandleConnections } = useReactFlow();

  const connections = getHandleConnections({
    type: 'source',
    nodeId,
  });

  return <div>Connections: {connections.length}</div>;
}
```

## 注意点

- `x`, `y` はノード内の相対座標（ページ座標ではない）
- `type: 'source'` は接続の始点、`type: 'target'` は終点を表す
- このデータ型は `<Handle />` コンポーネントとは別物（コンポーネントの設定型ではなく、内部データの型）

## 関連

- [Position](./Position.md)
- [ReactFlowInstance](./ReactFlowInstance.md)
