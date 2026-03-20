# NodeHandle

Defines handle properties for server-side rendering (SSR). Since React Flow cannot measure DOM nodes on the server, explicit handle position and dimension information must be provided.

## 型定義

```typescript
type NodeHandle = {
  width: number;
  height: number;
  id: string | null;
  x: number;
  y: number;
  position: Position;
  type: 'source' | 'target';
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `width` | `number` | The width of the handle element |
| `height` | `number` | The height of the handle element |
| `id` | `string \| null` | Unique identifier for the handle, or `null` for the default handle |
| `x` | `number` | The x-coordinate of the handle relative to the node |
| `y` | `number` | The y-coordinate of the handle relative to the node |
| `position` | `Position` | Which side of the node the handle is on (`Top`, `Bottom`, `Left`, `Right`) |
| `type` | `'source' \| 'target'` | Whether this handle is a source (outgoing) or target (incoming) |

## 使用例

```tsx
import { type Node, type NodeHandle, Position } from '@xyflow/react';

const nodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    handles: [
      {
        id: null,
        type: 'source',
        position: Position.Right,
        x: 150,
        y: 25,
        width: 8,
        height: 8,
      },
    ],
  },
];
```

## 注意点

- SSR（サーバーサイドレンダリング）専用の型。クライアントサイドでは React Flow が自動的にハンドルの寸法を計測する
- SSR を使用する場合、`Node.handles` に全ハンドルの情報を明示的に提供する必要がある

## 関連

- [./Node.md](./Node.md)
- [./NodeProps.md](./NodeProps.md)
