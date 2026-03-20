# Queue Events Listeners

NestJS で BullMQ のキューイベントをリッスンするには、`@QueueEventsListener` デコレータと `QueueEventsHost` 基底クラスを使用します。ジョブの完了、失敗などのイベントを宣言的に処理できます。

## QueueEventsListener の作成

`@QueueEventsListener` デコレータでイベントリスナークラスを定義し、`@OnQueueEvent` デコレータで個別のイベントハンドラを指定します。

```typescript
import {
  QueueEventsListener,
  QueueEventsHost,
  OnQueueEvent,
} from '@nestjs/bullmq';

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

イベントリスナーをプロバイダーとして登録します。対応するキューも `registerQueue` で登録されている必要があります。

```typescript
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

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

## 利用可能なイベント

| Event | Description | パラメータ |
|-------|-------------|-----------|
| `completed` | ジョブが正常に完了 | `jobId`, `returnvalue`, `prev` |
| `failed` | ジョブが失敗 | `jobId`, `failedReason`, `prev` |
| `progress` | ジョブの進捗が更新 | `jobId`, `data` |
| `active` | ジョブの処理が開始 | `jobId`, `prev` |
| `delayed` | ジョブが遅延状態に | `jobId`, `delay` |
| `waiting` | ジョブが待機状態に | `jobId`, `prev` |
| `stalled` | ジョブがストール | `jobId` |
| `removed` | ジョブが削除 | `jobId`, `prev` |
| `drained` | キューのジョブがすべて処理完了 | -- |

## 複数イベントのリッスン

```typescript
@QueueEventsListener('queueName')
export class MyQueueEvents extends QueueEventsHost {
  @OnQueueEvent('completed')
  onCompleted({ jobId, returnvalue }: { jobId: string; returnvalue: string }) {
    console.log(`Job ${jobId} completed with result: ${returnvalue}`);
  }

  @OnQueueEvent('failed')
  onFailed({ jobId, failedReason }: { jobId: string; failedReason: string }) {
    console.error(`Job ${jobId} failed: ${failedReason}`);
  }

  @OnQueueEvent('progress')
  onProgress({ jobId, data }: { jobId: string; data: number | object }) {
    console.log(`Job ${jobId} progress: ${JSON.stringify(data)}`);
  }
}
```

## 注意点

- `@QueueEventsListener` に渡すキュー名は `registerQueue()` で登録した名前と一致させること
- イベントリスナークラスは `QueueEventsHost` を継承する必要がある
- イベントリスナーは NestJS のプロバイダーとして登録する必要がある
- 各イベントハンドラは `@OnQueueEvent` デコレータで明示的に指定する

## 関連

- [./producers.md](./producers.md)
- [../returning-job-data.md](../returning-job-data.md)
- [../architecture.md](../architecture.md)
