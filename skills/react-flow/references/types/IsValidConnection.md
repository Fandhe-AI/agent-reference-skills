# IsValidConnection

A validation function type that determines whether a connection between nodes is valid.

## 型定義

```typescript
type IsValidConnection = (edge: Edge | Connection) => boolean;
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `edge` | `Edge \| Connection` | The connection or edge being validated |

戻り値: `boolean` — `true` の場合は接続が有効（作成される）、`false` の場合は無効（作成されない）

## 使用例

```tsx
import { ReactFlow, type Connection, type Edge } from '@xyflow/react';

// Prevent self-connections and limit edge types
const isValidConnection = (connection: Edge | Connection): boolean => {
  // Prevent connecting a node to itself
  if (connection.source === connection.target) {
    return false;
  }

  // Only allow connections from specific handle types
  if (connection.sourceHandle === 'output-a' && connection.targetHandle !== 'input-a') {
    return false;
  }

  return true;
};

export default function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      isValidConnection={isValidConnection}
    />
  );
}
```

## 注意点

- `ReactFlow` コンポーネントの `isValidConnection` プロパティに渡す
- この関数が `false` を返すと、接続ドラッグ中に無効であることを視覚的にフィードバックする（`ConnectionLineComponentProps.connectionStatus` が `"invalid"` になる）
- 個別の `Handle` コンポーネントにも同名の `isValidConnection` プロパティがあり、ハンドル単位で検証できる

## 関連

- [./Connection.md](./Connection.md)
- [./ConnectionState.md](./ConnectionState.md)
- [./ConnectionLineComponentProps.md](./ConnectionLineComponentProps.md)
