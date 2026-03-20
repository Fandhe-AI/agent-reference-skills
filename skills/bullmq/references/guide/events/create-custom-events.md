# Create Custom Events

`QueueEventsProducer` クラスを使用して、BullMQ 上で汎用的な分散リアルタイムイベントエミッターを作成できます。コンシューマーは `QueueEvents` クラスでイベントをサブスクライブします。

## 基本的な使い方

```typescript
const queueName = 'customQueue';
const queueEventsProducer = new QueueEventsProducer(queueName, {
  connection,
});
const queueEvents = new QueueEvents(queueName, {
  connection,
});

interface CustomListener extends QueueEventsListener {
  example: (args: { custom: string }, id: string) => void;
}
queueEvents.on<CustomListener>('example', async ({ custom }) => {
  // custom logic
});

interface CustomEventPayload {
  eventName: string;
  custom: string;
}

await queueEventsProducer.publishEvent<CustomEventPayload>({
  eventName: 'example',
  custom: 'value',
});
```

## QueueEventsProducer API

| Name | Type | Description |
|------|------|-------------|
| queueName | string | イベントを発行するキュー名 |
| connection | ConnectionOptions | Redis 接続設定 |
| publishEvent | method | カスタムイベントを発行するメソッド |

## イベントペイロード

| Name | Type | Description |
|------|------|-------------|
| eventName | string | イベント名（必須） |
| その他のプロパティ | any | カスタムデータ |

## 注意点

- `eventName` 属性のみが必須です
- 一部のイベント名は予約されています（QueueListener API Reference を参照）
- カスタムリスナーのインターフェースを定義して型安全にイベントを扱えます

## 関連

- [./events.md](./events.md) — Worker イベントと QueueEvents の基本
