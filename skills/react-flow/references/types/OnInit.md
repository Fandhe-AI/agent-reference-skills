# OnInit

ReactFlow コンポーネントの初期化完了時に呼び出されるコールバック型。

## 型定義

```typescript
type OnInit = (reactFlowInstance: ReactFlowInstance) => void;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `reactFlowInstance` | `ReactFlowInstance<NodeType, EdgeType>` | 初期化された React Flow インスタンス |

## 使用例

```tsx
import { ReactFlow, type OnInit } from '@xyflow/react';

export default function Flow() {
  const onInit: OnInit = (instance) => {
    // 初期化後にビューポートをフィットさせる
    instance.fitView();
    console.log('React Flow initialized:', instance);
  };

  return <ReactFlow onInit={onInit} />;
}
```

## 注意点

- コンポーネントのマウント・初期化が完了したタイミングで一度だけ呼び出される
- `ReactFlowInstance` を通じてビューポートの操作、ノード・エッジへのアクセス、その他のメソッドが利用できる
- `useReactFlow` フックでも同様のインスタンスにアクセス可能。コンポーネント内でインスタンスを保持する必要がなければそちらを推奨

## 関連

- [OnError](./OnError.md)
