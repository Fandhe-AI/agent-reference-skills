# OnConnectEnd

コネクション操作が完了またはキャンセルされたときに呼び出されるコールバック型。

## 型定義

```typescript
type OnConnectEnd = (
  event: MouseEvent | TouchEvent,
  connectionState: FinalConnectionState,
) => void;
```

`FinalConnectionState` は `ConnectionState` から `inProgress` プロパティを除いた型:

```typescript
type FinalConnectionState<NodeType extends InternalNodeBase = InternalNodeBase> = Omit<
  ConnectionState<NodeType>,
  'inProgress'
>;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `event` | `MouseEvent \| TouchEvent` | コネクション終了をトリガーしたマウスまたはタッチイベント |
| `connectionState` | `FinalConnectionState` | コネクション試行の最終状態 |

## 使用例

```tsx
import { ReactFlow, type OnConnectEnd } from '@xyflow/react';

export default function Flow() {
  const onConnectEnd: OnConnectEnd = (event, connectionState) => {
    // コネクションが無効な場所で終了した場合（例: ノード外にドロップ）
    if (!connectionState.isValid) {
      console.log('コネクションがキャンセルされました', event);
    }
  };

  return <ReactFlow onConnectEnd={onConnectEnd} />;
}
```

## 注意点

- コネクションが成功・失敗・キャンセルいずれの場合でも呼び出される
- ノード外にドロップして新規ノードを作成する「ドロップ to クリエイト」パターンの実装に活用できる
- `event` はマウスとタッチ両方に対応している

## 関連

- [OnConnectStart](./OnConnectStart.md)
- [OnConnect](./OnConnect.md)
