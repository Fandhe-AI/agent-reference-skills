# ConnectionState

A discriminated union representing the current state of an in-progress connection (edge creation) interaction. Retrieved via the `useConnection` hook.

## 型定義

```typescript
type NoConnection = {
  inProgress: false;
  isValid: null;
  from: null;
  fromHandle: null;
  fromPosition: null;
  fromNode: null;
  to: null;
  toHandle: null;
  toPosition: null;
  toNode: null;
};

type ConnectionInProgress = {
  inProgress: true;
  isValid: boolean | null;
  from: XYPosition;
  fromHandle: Handle;
  fromPosition: Position;
  fromNode: NodeBase;
  to: XYPosition;
  toHandle: Handle | null;
  toPosition: Position;
  toNode: NodeBase | null;
};

type ConnectionState = ConnectionInProgress | NoConnection;
```

## プロパティ

| Name | Type (in progress) | Type (no connection) | Description |
|------|-------------------|---------------------|-------------|
| `inProgress` | `true` | `false` | Whether a connection is actively being created |
| `isValid` | `boolean \| null` | `null` | Validity state when hovering a handle. `null` if no `isValidConnection` callback |
| `from` | `XYPosition` | `null` | Starting coordinates of the connection drag |
| `fromHandle` | `Handle` | `null` | The handle where the connection started |
| `fromPosition` | `Position` | `null` | Position side (Top/Bottom/Left/Right) of the source handle |
| `fromNode` | `NodeBase` | `null` | The source node |
| `to` | `XYPosition` | `null` | Current cursor coordinates during drag |
| `toHandle` | `Handle \| null` | `null` | The target handle if hovering over one |
| `toPosition` | `Position` | `null` | Position side of the target handle |
| `toNode` | `NodeBase \| null` | `null` | The target node if hovering over one |

## 使用例

```tsx
import { useConnection } from '@xyflow/react';

function ConnectionStatus() {
  const connection = useConnection();

  if (!connection.inProgress) {
    return <div>No connection in progress</div>;
  }

  return (
    <div>
      Connecting from node: {connection.fromNode.id}
      {connection.toNode && ` to node: ${connection.toNode.id}`}
      {connection.isValid !== null && (
        <span>{connection.isValid ? ' (valid)' : ' (invalid)'}</span>
      )}
    </div>
  );
}
```

## 注意点

- `inProgress` が `true` の場合のみ他のプロパティが非 null 値を持つ（判別型）
- `useConnection` フックで取得する
- `isValid` は `isValidConnection` コールバックが設定されている場合のみ `boolean` になる。未設定の場合は常に `null`

## 関連

- [./Connection.md](./Connection.md)
- [./IsValidConnection.md](./IsValidConnection.md)
- [./ConnectionLineComponentProps.md](./ConnectionLineComponentProps.md)
