# useNodesData

指定したノードの `data` オブジェクトの変化を購読する。

## Signature

```ts
// 単一ノード
useNodesData<NodesType extends Node = Node>(
  nodeId: string
): Pick<NodesType, 'id' | 'type' | 'data'> | null

// 複数ノード
useNodesData<NodesType extends Node = Node>(
  nodeIds: string[]
): Pick<NodesType, 'id' | 'type' | 'data'>[]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `nodeId` / `nodeIds` | `string \| string[]` | データを取得するノードの ID（単一または配列） |

## Returns

- 単一 ID の場合: `{ id, type, data }` オブジェクト、または存在しなければ `null`
- 配列の場合: `{ id, type, data }` オブジェクトの配列

## 使用例

```tsx
import { useNodesData } from '@xyflow/react';

export default function Component() {
  // 単一ノード
  const nodeData = useNodesData('nodeId-1');

  // 複数ノード
  const nodesData = useNodesData(['nodeId-1', 'nodeId-2']);

  return (
    <div>
      <pre>{JSON.stringify(nodeData?.data, null, 2)}</pre>
    </div>
  );
}
```

## 注意点

- カスタムノード型のジェネリクス引数に対応: `useNodesData<CustomNodeType>()`
- 単一 ID と配列 ID の両方に対応しており、戻り値の型が異なる
- ノード全体ではなく `data` の変化のみを購読するため、`useNodes` より効率的

## 関連

- [useNodes.md](./useNodes.md)
- [useInternalNode.md](./useInternalNode.md)
