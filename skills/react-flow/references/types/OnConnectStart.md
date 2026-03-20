# OnConnectStart

ノード間のコネクション作成を開始したときに呼び出されるコールバック型。

## 型定義

```typescript
type OnConnectStart = (
  event: MouseEvent | TouchEvent,
  params: OnConnectStartParams,
) => void;
```

`OnConnectStartParams` 型の定義:

```typescript
type OnConnectStartParams = {
  nodeId: string | null;
  handleId: string | null;
  handleType: HandleType | null;
};
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `event` | `MouseEvent \| TouchEvent` | コネクション開始をトリガーしたマウスまたはタッチイベント |
| `params.nodeId` | `string \| null` | 接続元ノードの ID |
| `params.handleId` | `string \| null` | 接続元ハンドルの ID |
| `params.handleType` | `HandleType \| null` | ハンドルの種類（`'source'` または `'target'`） |

## 使用例

```tsx
import { ReactFlow, type OnConnectStart } from '@xyflow/react';

export default function Flow() {
  const onConnectStart: OnConnectStart = (event, { nodeId, handleId, handleType }) => {
    console.log(`コネクション開始: node=${nodeId}, handle=${handleId}, type=${handleType}`);
  };

  return <ReactFlow onConnectStart={onConnectStart} />;
}
```

## 注意点

- ハンドルのドラッグを開始した瞬間に呼び出される
- `nodeId` と `handleId` は、ハンドルが設定されていない場合 `null` になることがある
- コネクションの完了は `OnConnect`、終了・キャンセルは `OnConnectEnd` で検知する

## 関連

- [OnConnect](./OnConnect.md)
- [OnConnectEnd](./OnConnectEnd.md)
