# ConnectionMode

An enum controlling how connections between nodes can be established.

## 型定義

```typescript
enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose',
}
```

## 値

| Value | String | Description |
|-------|--------|-------------|
| `ConnectionMode.Strict` | `'strict'` | Connections can only be made from a source handle to a target handle |
| `ConnectionMode.Loose` | `'loose'` | Connections can be made between any handles regardless of type |

## 使用例

```tsx
import { ReactFlow, ConnectionMode } from '@xyflow/react';

export default function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      connectionMode={ConnectionMode.Loose}
    />
  );
}
```

## 注意点

- `ReactFlow` コンポーネントの `connectionMode` プロパティで設定する
- `Strict` モード（デフォルト）では source ハンドルから target ハンドルへの接続のみ許可される
- `Loose` モードでは source → source や target → target といった同種ハンドル間の接続も許可される

## 関連

- [./Connection.md](./Connection.md)
- [./IsValidConnection.md](./IsValidConnection.md)
