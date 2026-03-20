# OnEdgesChange

エッジへの変更（追加・削除・選択など）が発生したときに呼び出されるコールバック型。

## 型定義

```typescript
type OnEdgesChange<EdgeType extends Edge = Edge> = (
  changes: EdgeChange<EdgeType>[],
) => void;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `changes` | `EdgeChange<EdgeType>[]` | エッジへの変更を表すオブジェクトの配列 |

## 使用例

```tsx
import { ReactFlow, applyEdgeChanges, type OnEdgesChange } from '@xyflow/react';
import { useCallback, useState } from 'react';

export default function Flow() {
  const [edges, setEdges] = useState([]);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return <ReactFlow edges={edges} onEdgesChange={onEdgesChange} />;
}
```

## 注意点

- `applyEdgeChanges` ユーティリティと組み合わせて使うのが標準パターン
- カスタムエッジ型を使う場合はジェネリクスで指定する: `OnEdgesChange<CustomEdgeType>`
- `useEdgesState` フックを使うと `onEdgesChange` ハンドラが自動的にセットアップされる

## 関連

- [OnNodesChange](./OnNodesChange.md)
- [OnEdgesDelete](./OnEdgesDelete.md)
