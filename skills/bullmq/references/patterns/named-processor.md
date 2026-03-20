# Named Processor

ジョブ名に基づいて異なる処理ロジックを実行するパターン。switch 文を使って1つのワーカー内で複数のジョブタイプを処理する。

## 基本的な使い方

```typescript
const worker = new Worker(
  'queueName',
  async job => {
    switch (job.name) {
      case 'taskType1': {
        await doSomeLogic1();
        break;
      }
      case 'taskType2': {
        await doSomeLogic2();
        break;
      }
    }
  },
  { connection },
);
```

ジョブ名（`job.name`）を使って処理を分岐するシンプルなパターン。

## 注意点

- Bull パッケージにはネイティブの named processor 機能があったが、混乱を招くため BullMQ では switch 文パターンが推奨される
- ジョブ名はキューへの追加時に指定する（`queue.add('taskType1', data)`）
- 複雑な分岐が多い場合は、キューを分割することも検討すべき

## 関連

- [./flows.md](./flows.md)
- [./process-step-jobs.md](./process-step-jobs.md)
