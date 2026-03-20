# Failing Fast when Redis is Down

Redis がダウンしている場合に即座にエラーを返すパターン。`enableOfflineQueue: false` を設定して、再接続待ちを回避する。

## 背景

BullMQ はデフォルトで Redis に自動再接続する。キューインスタンスが切断中にジョブを追加すると、`add` コマンドは失敗せず再接続を待ち続ける。REST API のハンドラ内でこの動作は望ましくない。

## 基本的な使い方

```typescript
const myQueue = new Queue('transcoding', {
  connection: {
    enableOfflineQueue: false,
  },
});

app.post('/jobs', async (req, res) => {
  try {
    const job = await myQueue.add('myjob', req.body);
    res.status(201).json(job.id);
  } catch (err) {
    res.status(503).send(err);
  }
});
```

呼び出し元が例外をキャッチし、要件に応じた対処（リトライや断念など）を行える。

## 注意点

- `enableOfflineQueue: false` を設定すると、ioredis はコマンドをキューイングせず即座に例外をスローする
- Redis インスタンスはキューのインスタンス化時に少なくともオンラインである必要がある（現行の制限事項）
- この設定は Worker にも適用可能だが、Worker の場合は自動再接続の方が望ましいケースが多い

## 関連

- [./stop-retrying-jobs.md](./stop-retrying-jobs.md)
- [./timeout-jobs.md](./timeout-jobs.md)
