# Python

BullMQ の Python バインディング。Node.js 版と同じ Redis データ構造を共有するため、言語間で相互運用が可能。

## インストール

```bash
pip install bullmq
```

## 基本的な使い方

### キューへのジョブ追加

```python
from bullmq import Queue

queue = Queue("myQueue")

# Add a job with data to the queue
await queue.add("myJob", {"foo": "bar"})

await queue.close()
```

### ワーカーでの処理

```python
from bullmq import Worker
import asyncio
import signal

async def process(job, job_token):
    # job.data will include the data added to the queue
    return await doSomethingAsync(job)

async def main():
    shutdown_event = asyncio.Event()

    def signal_handler(sig, frame):
        print("Signal received, shutting down.")
        shutdown_event.set()

    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)

    worker = Worker("myQueue", process, {
        "connection": "rediss://<user>:<password>@<host>:<port>"
    })

    await shutdown_event.wait()
    await worker.close()

if __name__ == "__main__":
    asyncio.run(main())
```

## サポートされる機能

- Queue, Worker, FlowProducer, QueueEvents
- 遅延ジョブ、繰り返しジョブ、優先度ジョブ
- フロー（親子ジョブ）
- レート制限、並行処理
- サンドボックスプロセッサ

## 注意点

- `asyncio` ベースの非同期 API であり、`async/await` が必須
- Node.js 版と同じ Redis キーを使用するため、既存キューとの互換性あり
- Redis がバイナリ形式のレスポンスを返す場合、`decode_responses` オプションを `True` に設定する必要がある

## 関連

- [Quick Start](../start/quick-start.md)
- [Guide](../guide/README.md)
