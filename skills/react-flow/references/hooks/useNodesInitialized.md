# useNodesInitialized

フロー内の全ノードが測定され、幅と高さが割り当てられているかどうかを返す。

## Signature

```ts
useNodesInitialized(options?: {
  includeHiddenNodes?: boolean;
}): boolean
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `options.includeHiddenNodes` | `boolean` | `false` | 初期化チェックに非表示ノードを含めるか |

## Returns

`boolean` — 全ノードが `<ReactFlow />` によって寸法を割り当てられていれば `true`、そうでなければ `false`

## 使用例

```tsx
import { useEffect, useState } from 'react';
import { useReactFlow, useNodesInitialized } from '@xyflow/react';

export default function useLayout() {
  const { getNodes } = useReactFlow();
  const nodesInitialized = useNodesInitialized();
  const [layoutedNodes, setLayoutedNodes] = useState(getNodes());

  useEffect(() => {
    if (nodesInitialized) {
      setLayoutedNodes(yourLayoutingFunction(getNodes()));
    }
  }, [nodesInitialized]);

  return layoutedNodes;
}
```

## 注意点

- 内部ノード配列が空の場合は常に `false` を返す
- ノードのレイアウト計算（dagre など）を行う前の初期化待ちに利用するのが典型的なユースケース

## 関連

- [useNodes.md](./useNodes.md)
- [useReactFlow.md](./useReactFlow.md)
