# Computing Flows

ノードをデータ変換の処理単位として扱い、接続されたノードのデータを読み取って計算結果を書き込む。

```tsx
// InputNode — ユーザー入力を受け取り updateNodeData でデータを書き込む
import { useCallback, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

function NumberInput({ id, data }) {
  const [number, setNumber] = useState(0);
  const { updateNodeData } = useReactFlow();

  const onChange = useCallback(
    (evt) => {
      const value = Math.round(Math.min(255, Math.max(0, Number(evt.target.value))));
      setNumber(value);
      updateNodeData(id, { value });
    },
    [id, updateNodeData],
  );

  return (
    <div style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
      <div>{data.label}</div>
      <input
        type="number"
        min="0"
        max="255"
        value={number}
        onChange={onChange}
        className="nodrag"
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
```

```tsx
// OutputNode — 接続元ノードのデータを useNodeConnections + useNodesData で読み取る
import { useNodeConnections, useNodesData } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

function ColorPreview({ id }) {
  const connections = useNodeConnections({ nodeId: id, handleType: 'target' });
  const sourceIds = connections.map((c) => c.source);
  const nodesData = useNodesData(sourceIds);

  const r = nodesData.find((n) => n.id === sourceIds[0])?.data.value ?? 0;
  const g = nodesData.find((n) => n.id === sourceIds[1])?.data.value ?? 0;
  const b = nodesData.find((n) => n.id === sourceIds[2])?.data.value ?? 0;

  return (
    <div
      style={{
        width: 60,
        height: 60,
        background: `rgb(${r}, ${g}, ${b})`,
        border: '1px solid #ccc',
        borderRadius: 4,
      }}
    >
      <Handle type="target" position={Position.Left} id="red" />
      <Handle type="target" position={Position.Left} id="green" />
      <Handle type="target" position={Position.Left} id="blue" />
    </div>
  );
}
```

## Notes

- 入力フィールドの UI 状態は `useState` で管理し、`updateNodeData` はその値を書き込む用途に限定する。ノードの `data` を直接 UI 状態として使うとカーソルが飛ぶ不具合が発生する
- `updateNodeData` はデフォルトでマージ動作。`{ replace: true }` を渡すとデータオブジェクト全体を置き換える
- `useNodeConnections` / `useNodesData` を使うと接続状態が変わるたびに自動で再レンダリングされる
- ノード全体でデータ構造を統一しておくと処理ノードの実装が単純になる
