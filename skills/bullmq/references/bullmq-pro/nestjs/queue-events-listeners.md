# BullMQ Pro NestJS Queue Events Listeners

NestJS で BullMQ Pro のキューイベントをデコレータベースでリッスンする方法。`@QueueEventsListener` と `@OnQueueEvent` デコレータでジョブのライフサイクルイベントに応答する。

## イベントリスナークラスの作成

`@QueueEventsListener` デコレータで監視対象のキューを指定し、`QueueEventsHost` を継承する:

```typescript
import {
  QueueEventsListener,
  QueueEventsHost,
  OnQueueEvent,
} from '@taskforcesh/nestjs-bullmq-pro';

@QueueEventsListener('queueName')
export class TestQueueEvents extends QueueEventsHost {
  @OnQueueEvent('completed')
  onCompleted({
    jobId,
  }: {
    jobId: string;
    returnvalue: string;
    prev?: string;
  }) {
    console.log(`Job ${jobId} completed`);
  }
}
```

## モジュールへの登録

イベントリスナークラスをモジュールの `providers` に登録する:

```typescript
import { Module } from '@nestjs/common';
import { BullModule } from '@taskforcesh/nestjs-bullmq-pro';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queueName',
      connection: {
        host: '0.0.0.0',
        port: 6380,
      },
    }),
  ],
  providers: [TestQueueEvents],
})
export class AppModule {}
```

## 主要なイベント

`@OnQueueEvent` デコレータで監視可能な主なイベント:

- `'completed'` - ジョブ完了時
- `'failed'` - ジョブ失敗時
- `'progress'` - ジョブ進捗更新時
- `'active'` - ジョブがアクティブになった時
- `'waiting'` - ジョブが待機状態になった時

## 注意点

- `@QueueEventsListener` のパラメータは `registerQueue()` で登録したキュー名と一致させる
- イベントハンドラは `jobId`、`returnvalue`、`prev` などのメタデータを含むオブジェクトを受け取る
- NestJS の DI システムとシームレスに統合される
- `@taskforcesh/nestjs-bullmq-pro` パッケージのデコレータを使用すること

## 関連

- [./producers.md](./producers.md) - キュープロデューサー
- [../groups/README.md](../groups/README.md) - Groups 機能
