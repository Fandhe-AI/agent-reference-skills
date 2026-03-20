# BullMQ Pro NestJS Producers

NestJS で BullMQ Pro のキュープロデューサーとフロープロデューサーを使用する方法。`@InjectQueue` と `@InjectFlowProducer` デコレータで DI を通じてキューにアクセスする。

## キュープロデューサー

`@InjectQueue()` デコレータでキューを注入し、ジョブを追加する:

```typescript
import { Injectable } from '@nestjs/common';
import { QueuePro } from '@taskforcesh/bullmq-pro';
import { InjectQueue } from '@taskforcesh/nestjs-bullmq-pro';

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: QueuePro) {}

  async addJob() {
    const job = await this.audioQueue.add('transcode', {
      foo: 'bar',
    });
    return job;
  }
}
```

- `@InjectQueue()` デコレータのパラメータは `registerQueue()` で指定したキュー名と一致させる
- 注入される型は `QueuePro`（通常の `Queue` ではなく）

## フロープロデューサー

親子関係を持つ複雑なジョブワークフローを作成する:

```typescript
import { Injectable } from '@nestjs/common';
import { FlowProducerPro } from '@taskforcesh/bullmq-pro';
import { InjectFlowProducer } from '@taskforcesh/nestjs-bullmq-pro';

@Injectable()
export class FlowService {
  constructor(
    @InjectFlowProducer('flow') private fooFlowProducer: FlowProducerPro,
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

- `@InjectFlowProducer()` デコレータで登録済みのフロー名を指定する
- フロー構造はルートジョブと子ジョブの階層で定義する
- 複数キューにまたがるジョブ定義が可能

## 注意点

- `@taskforcesh/nestjs-bullmq-pro` パッケージを別途インストールする必要がある
- Pro 版のデコレータとクラスを使用すること（`@InjectQueue` は `@taskforcesh/nestjs-bullmq-pro` から、型は `QueuePro` / `FlowProducerPro`）
- キュー名はモジュールの `registerQueue()` で登録した名前と一致させる

## 関連

- [./queue-events-listeners.md](./queue-events-listeners.md) - イベントリスナー
- [../groups/README.md](../groups/README.md) - Groups 機能
- [../batches.md](../batches.md) - バッチ処理
