# useEdgesState

Controlled フローのプロトタイプ作成を容易にするフック。エッジの状態を `ReactFlowInstance` の外部で管理する。

## Signature

```ts
useEdgesState<EdgeType extends Edge = Edge>(
  initialEdges: EdgeType[]
): [
  edges: EdgeType[],
  setEdges: Dispatch<SetStateAction<EdgeType[]>>,
  onEdgesChange: OnEdgesChange<EdgeType>
]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `initialEdges` | `EdgeType[]` | フローの初期エッジ配列 |

## Returns

3要素のタプル:

| Index | Name | Type | Description |
|-------|------|------|-------------|
| 0 | `edges` | `EdgeType[]` | 現在のエッジ配列。`<ReactFlow edges={edges} />` に渡す |
| 1 | `setEdges` | `Dispatch<SetStateAction<EdgeType[]>>` | React の `useState` と同様の状態セッター |
| 2 | `onEdgesChange` | `OnEdgesChange<EdgeType>` | エッジ変更ハンドラー。`onEdgesChange` プロパティに渡す |

## 使用例

```tsx
import { ReactFlow, useNodesState, useEdgesState } from '@xyflow/react';

const initialNodes = [];
const initialEdges = [];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
    />
  );
}
```

## 注意点

- プロトタイピングやドキュメント例用に設計されており、本番環境では Zustand などより高度な状態管理の利用を推奨
- カスタムエッジ型のジェネリクス引数に対応

## 関連

- [useNodesState.md](./useNodesState.md)
- [useEdges.md](./useEdges.md)
