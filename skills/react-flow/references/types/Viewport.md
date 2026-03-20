# Viewport

Represents the current view state of a React Flow canvas, tracking both position and zoom level within the internal coordinate system.

## 型定義

```typescript
type Viewport = {
  x: number;
  y: number;
  zoom: number;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `x` | `number` | Horizontal position in the viewport coordinate system |
| `y` | `number` | Vertical position in the viewport coordinate system |
| `zoom` | `number` | Current zoom level of the flow |

## 使用例

```tsx
import { useViewport } from '@xyflow/react';

function ViewportInfo() {
  const { x, y, zoom } = useViewport();
  return (
    <div>
      x: {x}, y: {y}, zoom: {zoom}
    </div>
  );
}
```

## 注意点

- `Transform` 型も同じプロパティを持つが、表すものが異なる。混同しないよう注意すること
- React Flow は独立した座標系をページと別に管理しており、`Viewport` はその座標系における現在の表示位置とズームを表す

## 関連

- [FitViewOptions](./FitViewOptions.md)
- [ReactFlowInstance](./ReactFlowInstance.md)
