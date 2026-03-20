# Timeout Jobs

ジョブにタイムアウトを実装するパターン。BullMQ にはタイムアウト専用のメカニズムはないが、`AbortController` と `setTimeout` を組み合わせてワーカーのプロセス関数内で実現できる。

## 基本的な使い方

```typescript
const worker = new Worker('foo', async job => {
  let controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), job.data.timeout);

  try {
    await doSomethingAbortable(controller.signal);
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new UnrecoverableError('Timeout');
    } else {
      throw err;
    }
  } finally {
    clearTimeout(timer);
  }
});
```

タイムアウト値を `job.data.timeout` に含めることで、ジョブごとに異なるタイムアウトを設定できる。

## fetch でのタイムアウト

fetch API は `AbortController` をネイティブサポートしている:

```typescript
const worker = new Worker('foo', async job => {
  let controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), job.data.timeout);
  try {
    let response = await fetch('/slowserver.com', {
      signal: controller.signal,
    });
    const result = await response.text();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new UnrecoverableError('Timeout');
    } else {
      throw err;
    }
  } finally {
    clearTimeout(timer);
  }
});
```

abort は `response.text()` の非同期呼び出しにも AbortError を発生させる。

## 注意点

- BullMQ にはビルトインのタイムアウトメカニズムがないため、プロセッサ内で自前実装が必要
- タイムアウト実装はジョブが実行する非同期操作の種類に依存する
- `AbortController` + `setTimeout` の組み合わせが多くのケースで有効
- タイムアウト後にリトライしたくない場合は `UnrecoverableError` をスローする。リトライさせたい場合は通常の `Error` をスローする

## 関連

- [./timeout-for-sandboxed-processors.md](./timeout-for-sandboxed-processors.md)
- [./stop-retrying-jobs.md](./stop-retrying-jobs.md)
- [./failing-fast-when-redis-is-down.md](./failing-fast-when-redis-is-down.md)
