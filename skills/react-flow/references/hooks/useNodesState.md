# useNodesState

Controlled フローのプロトタイプ作成を容易にするフック。ノードの状態を `ReactFlowInstance` の外部で管理する。

## Signature

```ts
useNodesState<NodeType extends Node = Node>(
  initialNodes: NodeType[]
): [
  nodes: NodeType[],
  setNodes: Dispatch<SetStateAction<NodeType[]>>,
  onNodesChange: OnNodesChange<NodeType>
]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `initialNodes` | `NodeType[]` | フローの初期ノード配列 |

## Returns

3要素のタプル:

| Index | Name | Type | Description |
|-------|------|------|-------------|
| 0 | `nodes` | `NodeType[]` | 現在のノード配列。`<ReactFlow nodes={nodes} />` に渡す |
| 1 | `setNodes` | `Dispatch<SetStateAction<NodeType[]>>` | React の `useState` と同様の状態セッター |
| 2 | `onNodesChange` | `OnNodesChange<NodeType>` | ノード変更ハンドラー。`onNodesChange` プロパティに渡す |

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
- カスタムノード型のジェネリクス引数に対応

## 関連

- [useEdgesState.md](./useEdgesState.md)
- [useNodes.md](./useNodes.md)
