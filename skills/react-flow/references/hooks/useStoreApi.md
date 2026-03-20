# useStoreApi

React Flow ストアへの直接アクセスを提供し、オンデマンドの状態取得とアクションのディスパッチを可能にする低レベルフック。

## Signature

```ts
useStoreApi<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge
>(): {
  getState: () => ReactFlowState<NodeType, EdgeType>;
  setState: (
    partial:
      | ReactFlowState<NodeType, EdgeType>
      | Partial<ReactFlowState<NodeType, EdgeType>>
      | ((state: ReactFlowState<NodeType, EdgeType>) => ReactFlowState<NodeType, EdgeType> | Partial<ReactFlowState<NodeType, EdgeType>>),
    replace?: boolean
  ) => void;
  subscribe: (
    listener: (
      state: ReactFlowState<NodeType, EdgeType>,
      prevState: ReactFlowState<NodeType, EdgeType>
    ) => void
  ) => () => void;
}
```

## Parameters

なし

## Returns

3つのメソッドを持つストアオブジェクト:

| Method | Description |
|--------|-------------|
| `getState()` | 現在の React Flow 状態をオンデマンドで取得する |
| `setState(partial, replace?)` | ストア状態を更新する（部分更新または完全置換） |
| `subscribe(listener)` | 状態変化のリスナーを登録する。登録解除関数を返す |

## 使用例

```tsx
import { useCallback, useState } from 'react';
import { useStoreApi } from '@xyflow/react';

function NodesLengthDisplay() {
  const [nodesLength, setNodesLength] = useState(0);
  const store = useStoreApi();

  const onClick = useCallback(() => {
    const { nodes } = store.getState();
    setNodesLength(nodes.length ?? 0);
  }, [store]);

  return (
    <div>
      <p>The current number of nodes is: {nodesLength}</p>
      <button onClick={onClick}>Update node length</button>
    </div>
  );
}
```

## 注意点

- **他に手段がない場合のみ使用すること**。`useReactFlow`、`useViewport` など専用フックが利用できる場合はそちらを優先する
- `useStore` と異なり状態変化で自動再レンダリングしない。イベントハンドラー内などで都度取得する場合に適している
- カスタムノード型・エッジ型のジェネリクス引数に対応

## 関連

- [useStore.md](./useStore.md)
- [useReactFlow.md](./useReactFlow.md)
