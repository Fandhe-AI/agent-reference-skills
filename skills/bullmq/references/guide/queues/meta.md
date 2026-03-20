# BullMQ — Meta

キューのメタデータを取得するための機能。concurrency、rate limit、イベント設定、一時停止状態などの情報を一括で取得できる。

## メタデータの取得

```typescript
import { Queue } from 'bullmq';

const { concurrency, max, duration, maxLenEvents, paused, version } =
  await queue.getMeta();
```

## 返却されるプロパティ

| Name | Type | Description |
|------|------|-------------|
| `concurrency` | `number` | グローバル並行数の設定値 |
| `max` | `number` | グローバルレート制限の最大ジョブ数 |
| `duration` | `number` | グローバルレート制限の時間枠（ミリ秒） |
| `maxLenEvents` | `number` | イベントストリームの最大長 |
| `paused` | `boolean` | キューが一時停止中かどうか |
| `version` | `string` | BullMQ のバージョン |

## 注意点

- メタデータはキューの現在の状態を反映する
- グローバル並行数やレート制限が設定されていない場合、対応するプロパティは `undefined` となる

## 関連

- [Global Concurrency](./global-concurrency.md)
- [Global Rate Limit](./global-rate-limit.md)
- [Get Meta API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#getmeta)
