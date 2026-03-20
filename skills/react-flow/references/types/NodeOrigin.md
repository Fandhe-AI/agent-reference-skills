# NodeOrigin

A tuple defining the origin (anchor point) of a node, controlling how it is positioned relative to its coordinates.

## 型定義

```typescript
type NodeOrigin = [number, number];
```

## プロパティ

タプルの各要素は 0〜1 の範囲の数値:

| Index | Description |
|-------|-------------|
| `[0]` | X 軸方向のアンカー位置。`0` = 左端、`0.5` = 中央、`1` = 右端 |
| `[1]` | Y 軸方向のアンカー位置。`0` = 上端、`0.5` = 中央、`1` = 下端 |

よく使われる値:

| Value | Effect |
|-------|--------|
| `[0, 0]` | Node's top-left corner is placed at the coordinate (default) |
| `[0.5, 0.5]` | Node is centered at the coordinate |
| `[1, 1]` | Node's bottom-right corner is placed at the coordinate |

## 使用例

```tsx
import { ReactFlow } from '@xyflow/react';

export default function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeOrigin={[0.5, 0.5]}
    />
  );
}
```

## 注意点

- `ReactFlow` コンポーネントの `nodeOrigin` プロパティとして使用し、全ノードのデフォルト原点を設定する
- 個別ノードの `Node.origin` プロパティでも指定可能

## 関連

- [./Node.md](./Node.md)
