# useUpdateNodeInternals

ノードのハンドルをプログラムで変更した際に React Flow の内部寸法・位置情報を更新するよう通知する関数を返す。

## Signature

```ts
useUpdateNodeInternals(): (nodeId: string | string[]) => void
```

## Parameters

なし（返り値の関数がパラメータを受け取る）

## Returns

`(nodeId: string | string[]) => void` — ノード ID（単一または配列）を受け取り、内部状態の更新をトリガーする関数

## 使用例

```tsx
import { useCallback, useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from '@xyflow/react';

function DynamicHandleNode({ id }: { id: string }) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [handleCount, setHandleCount] = useState(1);

  const randomizeHandleCount = useCallback(() => {
    const newCount = Math.floor(Math.random() * 10);
    setHandleCount(newCount);
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  return (
    <div>
      {Array.from({ length: handleCount }, (_, i) => (
        <Handle key={i} type="target" position={Position.Left} id={`handle-${i}`} />
      ))}
      <button onClick={randomizeHandleCount}>Randomize handles</button>
    </div>
  );
}
```

## 注意点

- `<ReactFlowProvider>` または `<ReactFlow>` の子コンポーネント内でのみ使用可能
- ハンドルの動的な追加・削除・位置変更後に呼び出す必要がある
- 複数ノードを一度に更新する場合は配列で渡す

## 関連

- [useReactFlow.md](./useReactFlow.md)
- [useNodeId.md](./useNodeId.md)
