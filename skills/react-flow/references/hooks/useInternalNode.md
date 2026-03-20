# useInternalNode

指定した ID のノードの内部表現を返す。ノードに変化があるたびに再レンダリングが発生する。

## Signature

```ts
useInternalNode<NodeType extends Node = Node>(
  id: string
): InternalNode<NodeType> | undefined
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | 取得するノードの ID |

## Returns

`InternalNode<NodeType> | undefined` — 指定ノードの内部表現。見つからない場合は `undefined`。

`InternalNode` には通常の `Node` プロパティに加え、`internals.positionAbsolute` などの内部計算値が含まれる。

## 使用例

```tsx
import { useInternalNode } from '@xyflow/react';

export default function AbsolutePositionDisplay() {
  const internalNode = useInternalNode('node-1');

  if (!internalNode) return null;

  const { x, y } = internalNode.internals.positionAbsolute;

  return (
    <div>
      Absolute position: x={x}, y={y}
    </div>
  );
}
```

## 注意点

- 選択・移動を含む**あらゆるノード変化**で再レンダリングが発生する
- 絶対座標など内部計算値へのアクセスに使用する（通常の座標は親ノード相対）
- カスタムノード型のジェネリクス引数に対応

## 関連

- [useNodes.md](./useNodes.md)
- [useNodesData.md](./useNodesData.md)
