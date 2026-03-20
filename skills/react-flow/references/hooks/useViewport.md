# useViewport

コンポーネント内でビューポートの現在状態を読み取るための便利なフック。

## Signature

```ts
useViewport(): Viewport
```

## Parameters

なし

## Returns

`Viewport` オブジェクト:

| Name | Type | Description |
|------|------|-------------|
| `x` | `number` | 水平方向のパン位置 |
| `y` | `number` | 垂直方向のパン位置 |
| `zoom` | `number` | 現在のズームレベル |

## 使用例

```tsx
import { useViewport } from '@xyflow/react';

export default function ViewportDisplay() {
  const { x, y, zoom } = useViewport();

  return (
    <div>
      <p>
        The viewport is currently at ({x}, {y}) and zoomed to {zoom}.
      </p>
    </div>
  );
}
```

## 注意点

- ビューポートが変化するたびにコンポーネントが**再レンダリングされる**
- `<ReactFlowProvider>` または `<ReactFlow>` の子コンポーネント内でのみ使用可能
- ビューポートを操作したい場合は `useReactFlow` の `setViewport`、`zoomIn`、`fitView` などを使用する

## 関連

- [useReactFlow.md](./useReactFlow.md)
- [useOnViewportChange.md](./useOnViewportChange.md)
