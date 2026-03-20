# useStore

Zustand のセレクターパターンを使用して React Flow の内部状態の変化を購読する低レベルフック。

## Signature

```ts
useStore<StateSlice>(
  selector: (state: ReactFlowState) => StateSlice,
  equalityFn?: (a: StateSlice, b: StateSlice) => boolean
): StateSlice
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `selector` | `(state: ReactFlowState) => StateSlice` | 購読する内部状態のスライスを抽出するセレクター関数 |
| `equalityFn` | `(a: StateSlice, b: StateSlice) => boolean` | 不要な再レンダリングを防ぐ比較関数（省略時は `Object.is` 相当） |

## Returns

セレクターの戻り値の型 (`StateSlice`) — 選択した状態スライス

## 使用例

```tsx
import { ReactFlow, useStore } from '@xyflow/react';

const nodesLengthSelector = (state) => state.nodes.length ?? 0;

function NodesLengthDisplay() {
  const nodesLength = useStore(nodesLengthSelector);
  return <div>The current number of nodes is: {nodesLength}</div>;
}
```

## 注意点

- **他に手段がない場合のみ使用すること**。`useReactFlow`、`useViewport`、`useNodes` など専用フックが利用できる場合はそちらを優先する
- セレクター関数はコンポーネント外で定義するかメモ化することで、不要な再レンダリングを防ぐ
- 内部状態のメソッド（例: `setMinZoom`）を選択してアクションをディスパッチすることも可能
- オンデマンドで値を計算したい場合は `useStoreApi` と組み合わせる

## 関連

- [useStoreApi.md](./useStoreApi.md)
- [useReactFlow.md](./useReactFlow.md)
