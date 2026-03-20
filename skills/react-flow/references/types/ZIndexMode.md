# ZIndexMode

Union type specifying how React Flow automatically manages z-index (stacking order) of nodes and edges.

## 型定義

```typescript
type ZIndexMode = 'auto' | 'basic' | 'manual';
```

## 値一覧

| Value | Description |
|-------|-------------|
| `'auto'` | Automatically manages z-index for both selections and sub-flows (nested flows) |
| `'basic'` | Only manages z-index for selections |
| `'manual'` | Does not apply any automatic z-index management |

## 使用例

```tsx
import { ReactFlow } from '@xyflow/react';

<ReactFlow
  nodes={nodes}
  edges={edges}
  zIndexMode="manual"
/>
```

## 注意点

- `'auto'` が最も包括的で、選択状態とネストされたフロー（サブフロー）の両方の z-index を管理する
- `'basic'` は選択時の重なり順のみ管理する中間的なモード
- `'manual'` はすべての z-index 制御を開発者に委ねる（ノードの `zIndex` プロパティで個別設定可能）
- 複雑な視覚階層が必要な場合は `'manual'` モードを選択する
