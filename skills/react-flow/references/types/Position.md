# Position

Enum for specifying the side of a node where handles and edges connect. Less precise than `PanelPosition`, used primarily for edges and handles.

## 型定義

```typescript
enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}
```

## 値一覧

| Value | Description |
|-------|-------------|
| `Position.Left` | Left side of the node |
| `Position.Top` | Top side of the node |
| `Position.Right` | Right side of the node |
| `Position.Bottom` | Bottom side of the node |

## 使用例

```tsx
import { Handle, Position } from '@xyflow/react';

function CustomNode() {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div>Custom Node</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
```

## 注意点

- `PanelPosition` はコンテナのコーナー配置に使うのに対し、`Position` はノードの辺に対する配置に使う（より粗い精度）
- エッジとハンドルの方向制御に主に使用される

## 関連

- [PanelPosition](./PanelPosition.md)
- [Handle](./Handle.md)
