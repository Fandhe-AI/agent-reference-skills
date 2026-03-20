# OnError

React Flow 内でエラーが発生したときに呼び出されるコールバック型。

## 型定義

```typescript
type OnError = (id: string, error: string) => void;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | 発生したエラーの識別子 |
| `error` | `string` | エラーの詳細メッセージ |

## 使用例

```tsx
import { ReactFlow, type OnError } from '@xyflow/react';

export default function Flow() {
  const onError: OnError = (id, error) => {
    console.error(`React Flow エラー [${id}]:`, error);
    // エラー監視サービス（Sentry など）へ送信することも可能
  };

  return <ReactFlow onError={onError} />;
}
```

## 注意点

- デフォルトでは React Flow は内部エラーをコンソールに出力する。`onError` を指定するとそのデフォルト動作を上書きできる
- `id` はエラーの種類を識別するための文字列コードである
- エラーロギングやモニタリングサービスとの統合に活用する

## 関連

- [OnInit](./OnInit.md)
