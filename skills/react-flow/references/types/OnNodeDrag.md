# OnNodeDrag

ノードがドラッグされているときに呼び出されるコールバック型。

## 型定義

```typescript
type OnNodeDrag = (event: React.MouseEvent, node: Node) => void;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `event` | `React.MouseEvent<Element, MouseEvent>` | ドラッグ操作中のマウスイベント |
| `node` | `Node` | ドラッグされているノードオブジェクト |

## 使用例

```tsx
import { ReactFlow, type OnNodeDrag } from '@xyflow/react';

export default function Flow() {
  const onNodeDrag: OnNodeDrag = (event, node) => {
    console.log(`ノード ${node.id} の位置: x=${node.position.x}, y=${node.position.y}`);
  };

  return (
    <ReactFlow
      onNodeDragStart={onNodeDrag}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDrag}
    />
  );
}
```

## 注意点

- `onNodeDrag`（ドラッグ中）、`onNodeDragStart`（開始）、`onNodeDragStop`（終了）の 3 つの props で同じ型を使用する
- `node` オブジェクトにはドラッグ中の現在位置 (`node.position`) が含まれる
- 複数ノードを同時にドラッグした場合のコールバックには `onSelectionDrag` 系の props を使用する

## 関連

- [OnMove](./OnMove.md)
- [OnNodesChange](./OnNodesChange.md)
