# Manually Fetching Jobs

ジョブを手動で取得・処理するパターン。Worker にプロセッサ関数を渡さず、`getNextJob` でジョブを1つずつ取得して処理する。

## 基本的な使い方

```typescript
const worker = new Worker('my-queue');

// ユニークなトークンを指定
const token = 'my-token';

const job = (await worker.getNextJob(token)) as Job;

// job.data を使って処理を実行
if (succeeded) {
  await job.moveToCompleted('some return value', token, false);
} else {
  await job.moveToFailed(new Error('my error message'), token, false);
}

await worker.close();
```

## ロックの仕組み

ジョブのロックは他のワーカーによる同時処理を防止する。ロックの所有権はトークンで決定される。

> ロック期間の設定は他のキューシステムでは「visibility window」と呼ばれる。

デフォルトのロック期間は 30 秒だが変更可能:

```typescript
const worker = new Worker('my-queue', null, { lockDuration: 60000 });
```

手動処理ではロックの自動更新が行われないため、`lockDuration` 内に処理を完了するか、手動でロックを延長する必要がある:

```typescript
const job = (await worker.getNextJob(token)) as Job;

// ロックを30秒延長
await job.extendLock(token, 30000);
```

### トークンの選択

トークンはワーカーのジョブ所有権を表す。ワーカーが予期せず停止した場合、ロック期限後に他のワーカーがジョブを取得できる。ジョブごとに UUID を生成するのが一般的なアプローチ。

## Stalled ジョブの検出

手動処理時は stalled ジョブチェッカーも起動すべき。ロックが期限切れになった stalled ジョブを wait 状態（または最大 stalled 回数を超えた場合は failed 状態）に戻す。

```typescript
await worker.startStalledCheckTimer();
```

チェッカーは `stalledInterval` オプションに基づいて定期的に実行され、ワーカーが close されるまで継続する。

## ループ処理

多くのケースでジョブを1つずつ処理する無限ループを使用する。`moveToCompleted`/`moveToFailed` の第3引数を使用しないことで、次のジョブが自動的に返される。

```typescript
const worker = new Worker('my-queue');

const token = 'my-token';
let job;

while (1) {
  let jobData = null,
    jobId,
    success;

  if (job) {
    // job.data を使ってジョブを処理
    // success 変数を設定

    if (success) {
      [jobData, jobId] = await job.moveToCompleted('some return value', token);
    } else {
      await job.moveToFailed(new Error('some error message'), token);
    }

    if (jobData) {
      job = Job.fromJSON(worker, jobData, jobId);
    } else {
      job = null;
    }
  } else {
    if (!job) {
      job = await worker.getNextJob(token);
    }
  }
}
```

## レート制限

キューがレート制限されている場合、ジョブを wait に戻す:

```typescript
const worker = new Worker('my-queue', null, { connection, prefix });
const token = 'my-token';
await Job.create(queue, 'test', { foo: 'bar' });
const job = (await worker.getNextJob(token)) as Job;

await queue.rateLimit(60000);
await job.moveToWait(token);
```

## 注意点

- 手動処理ではロックの自動更新が行われない。`lockDuration` 内に処理を完了するか `extendLock` を使用すること
- stalled ジョブチェッカーの起動を忘れないこと
- トークンはジョブごとにユニークにすることを推奨

## 関連

- [Get Next Job API Reference](https://api.docs.bullmq.io/classes/v5.Worker.html#getnextjob)
- [Move To Completed API Reference](https://api.docs.bullmq.io/classes/v5.Job.html#movetocompleted)
- [Move To Failed API Reference](https://api.docs.bullmq.io/classes/v5.Job.html#movetofailed)
- [Move To Wait API Reference](https://api.docs.bullmq.io/classes/v5.Job.html#movetowait)
