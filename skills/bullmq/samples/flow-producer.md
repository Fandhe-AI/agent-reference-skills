# Flow Producer

FlowProducer で親子関係を持つジョブを定義し、子が全て完了したら親を実行するワークフロー。

```typescript
import { FlowProducer, Worker } from 'bullmq';

const flowProducer = new FlowProducer();

// 子ジョブ (steps キュー) が全て完了後に親ジョブ (renovate キュー) が実行される
const flow = await flowProducer.add({
  name: 'renovate-interior',
  queueName: 'renovate',
  children: [
    { name: 'paint', data: { place: 'ceiling' }, queueName: 'steps' },
    { name: 'paint', data: { place: 'walls' }, queueName: 'steps' },
    { name: 'fix', data: { place: 'floor' }, queueName: 'steps' },
  ],
});

// 子ジョブの Worker: 結果を return する
const stepsWorker = new Worker('steps', async job => {
  await performStep(job.data);
  return job.name === 'paint' ? 2500 : 1750;
});

// 親ジョブの Worker: getChildrenValues() で子の結果を集約する
const renovateWorker = new Worker('renovate', async job => {
  const childrenValues = await job.getChildrenValues();
  const totalCosts = Object.values(childrenValues).reduce(
    (prev, cur) => prev + (cur as number),
    0,
  );
  await sendInvoice(totalCosts);
});
```

## Notes

- 親ジョブは全ての子ジョブが正常完了するまで `waiting-children` 状態に留まる
- `getChildrenValues()` は子ジョブの return 値を `{ jobKey: returnValue }` の形で返す
- 直列実行はネスト構造（children の children）で表現する
- `jobId` オプションにコロン `:` を含めてはいけない（セパレータとして解釈される）
