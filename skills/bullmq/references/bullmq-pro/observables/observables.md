# BullMQ Pro Observables

Worker から Promise の代わりに Observable を返すことで、複数値の送出、ジョブのキャンセル、状態復元などの高度なユースケースに対応する。

## 概要

Observables は Promise に対して以下の2つの主要な利点を持つ:

- **複数の値を送出可能** - `subscriber.next()` で複数回値を返せる
- **キャンセル可能** - 実行中のジョブをクリーンにキャンセルできる

## 主なユースケース

- **ジョブのキャンセル** - Observable を通じてクリーンな終了処理
- **TTL（Time to Live）** - 処理時間が長すぎるジョブの自動キャンセル
- **状態の永続化とリトライ** - Observable が返す最後の値が永続化されるため、リトライ時に前回の続きから再開可能

## 基本的な使い方

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';
import { Observable } from 'rxjs';

const processor = async () => {
  return new Observable<number>((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    const intervalId = setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 500);

    // キャンセル時のクリーンアップ関数
    return function unsubscribe() {
      clearInterval(intervalId);
    };
  });
};

const worker = new WorkerPro(queueName, processor, { connection });
```

この例では Observable が4つの値を送出する。最初の3つは即座に、4つ目は500ms後に送出される。`subscriber` が返す `unsubscribe` 関数は Observable がキャンセルされた際に呼ばれるクリーンアップ処理。

## 状態復元パターン（ステートマシン）

クラッシュからの復帰シナリオで、最後に永続化された値から処理を再開する:

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';
import { Observable } from 'rxjs';

const processor = async (job) => {
  return new Observable<number>((subscriber) => {
    switch (job.returnvalue) {
      default:
        subscriber.next(1);
      // fall through
      case 1:
        subscriber.next(2);
      // fall through
      case 2:
        subscriber.next(3);
      // fall through
      case 3:
        subscriber.complete();
    }
  });
};

const worker = new WorkerPro(queueName, processor, { connection });
```

`job.returnvalue` には前回の実行で最後に送出された値が格納されている。`switch` 文の fall-through を利用して、前回の続きから処理を再開する。

## 注意点

- `rxjs` パッケージを別途インストールする必要がある
- Observable の最後の値が `job.returnvalue` として永続化される
- `subscriber.complete()` を呼ばないと Observable は完了しない
- `unsubscribe` 関数でリソースのクリーンアップを必ず行うこと

## 関連

- [./cancelation.md](./cancelation.md) - Observable ジョブのキャンセル
- [../batches.md](../batches.md) - バッチ処理
