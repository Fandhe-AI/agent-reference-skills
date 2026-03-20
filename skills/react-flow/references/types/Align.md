# Align

Union type for specifying the alignment of `NodeToolbar` relative to its associated node.

## 型定義

```typescript
type Align = 'center' | 'start' | 'end';
```

## 値一覧

| Value | Description |
|-------|-------------|
| `'center'` | Aligns the toolbar to the center position |
| `'start'` | Aligns the toolbar to the start position |
| `'end'` | Aligns the toolbar to the end position |

## 使用例

```tsx
import { NodeToolbar, Position } from '@xyflow/react';

function CustomNode() {
  return (
    <>
      <NodeToolbar position={Position.Top} align="center">
        <button>Edit</button>
        <button>Delete</button>
      </NodeToolbar>
      <div>Node Content</div>
    </>
  );
}
```

## 注意点

- `<NodeToolbar />` コンポーネントの `align` prop にのみ使用される
- `position` prop（`Position` 型）と組み合わせてツールバーの表示位置を細かく制御できる

## 関連

- [Position](./Position.md)
