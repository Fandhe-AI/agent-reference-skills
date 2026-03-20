# PanOnScrollMode

Enum that controls the directional panning behavior of the viewport when the user scrolls.

## 型定義

```typescript
enum PanOnScrollMode {
  Free = 'free',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}
```

## 値一覧

| Value | Description |
|-------|-------------|
| `PanOnScrollMode.Free` | Allows unrestricted panning in all directions |
| `PanOnScrollMode.Vertical` | Restricts panning to vertical (up/down) only |
| `PanOnScrollMode.Horizontal` | Restricts panning to horizontal (left/right) only |

## 使用例

```tsx
import { ReactFlow, PanOnScrollMode } from '@xyflow/react';

<ReactFlow
  nodes={nodes}
  edges={edges}
  panOnScroll
  panOnScrollMode={PanOnScrollMode.Vertical}
/>
```

## 注意点

- `panOnScroll` prop を `true` にした場合のみこの設定が有効になる
- デフォルトでは `PanOnScrollMode.Free`（全方向）

## 関連

- [Viewport](./Viewport.md)
