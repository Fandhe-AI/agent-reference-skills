# Producers

NestJS で BullMQ を使用する際、Producers はキューにジョブを追加する役割を担います。`@InjectQueue()` デコレータを使用してサービスにキューを注入し、`add()` メソッドでジョブを追加します。

## Queue のインジェクション

`@InjectQueue()` デコレータでキューをサービスに注入します。デコレータに渡す名前は `registerQueue()` で指定した名前と一致させます。

```typescript
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}
}
```

## ジョブの追加

注入したキューの `add()` メソッドでジョブを追加します。

```typescript
@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async addJob() {
    const job = await this.audioQueue.add('sample', {
      foo: 'bar',
    });
    return job;
  }
}
```

## Flow Producers

FlowProducer を使用すると、親子関係を持つジョブフローを追加できます。`@InjectFlowProducer()` デコレータで注入します。

### FlowProducer のインジェクション

```typescript
import { Injectable } from '@nestjs/common';
import { InjectFlowProducer } from '@nestjs/bullmq';
import { FlowProducer } from 'bullmq';

@Injectable()
export class FlowService {
  constructor(
    @InjectFlowProducer('flow') private fooFlowProducer: FlowProducer,
  ) {}
}
```

### フローの追加

```typescript
@Injectable()
export class FlowService {
  constructor(
    @InjectFlowProducer('flow') private fooFlowProducer: FlowProducer,
  ) {}

  async addFlow() {
    const job = await this.fooFlowProducer.add({
      name: 'root-job',
      queueName: 'topQueueName',
      data: {},
      children: [
        {
          name: 'child-job',
          data: { idx: 0, foo: 'bar' },
          queueName: 'childrenQueueName',
        },
      ],
    });
    return job;
  }
}
```

## モジュール設定

```typescript
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerFlowProducer({
      name: 'flow',
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [AudioService, FlowService],
})
export class AppModule {}
```

| デコレータ | Description |
|-----------|-------------|
| `@InjectQueue('name')` | `registerQueue()` で登録したキューを注入 |
| `@InjectFlowProducer('name')` | `registerFlowProducer()` で登録した FlowProducer を注入 |

## 注意点

- `@InjectQueue()` のキュー名は `registerQueue()` で指定した名前と一致させること
- `@InjectFlowProducer()` の名前は `registerFlowProducer()` で指定した名前と一致させること
- FlowProducer の子ジョブの `queueName` は、対応するキューが事前に登録されている必要がある

## 関連

- [./queue-events-listeners.md](./queue-events-listeners.md)
- [../architecture.md](../architecture.md)
