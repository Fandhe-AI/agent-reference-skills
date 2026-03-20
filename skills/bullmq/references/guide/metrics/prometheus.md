# Prometheus

BullMQ は `exportPrometheusMetrics()` メソッドを提供しており、キューの統計情報を Prometheus 互換フォーマットでエクスポートできます。Web サーバーのエンドポイントを作成して Prometheus からスクレイプする形で連携します。

## Node.js（vanilla）での実装

```typescript
import http from 'node:http';
import { Queue } from 'bullmq';

const queue = new Queue('my-queue', { connection });

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/metrics') {
    const metrics = await queue.exportPrometheusMetrics();
    res.setHeader('Content-Type', 'text/plain');
    res.end(metrics);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000);
```

## Express.js での実装

```typescript
import express from 'express';
import { Queue } from 'bullmq';

const app = express();
const queue = new Queue('my-queue', { connection });

app.get('/metrics', async (req, res) => {
  const metrics = await queue.exportPrometheusMetrics();
  res.setHeader('Content-Type', 'text/plain');
  res.send(metrics);
});

app.listen(3000);
```

## メトリクス出力例

出力にはキューの各状態（waiting, active, completed, failed）のジョブ数がゲージメトリクスとして含まれ、キュー名でラベル付けされます。

## グローバル変数（追加ラベル）

`exportPrometheusMetrics()` はオプションで `globalVariables` パラメータを受け取り、環境やサーバー識別子などの追加ラベルを付与できます:

```typescript
const metrics = await queue.exportPrometheusMetrics({
  env: 'Production',
  server: '1',
});
```

| Name | Type | Description |
|------|------|-------------|
| globalVariables | Record<string, string> | メトリクスに追加するラベルのキー・バリューペア |

これにより、Grafana などのツールで複数環境（production, staging など）のメトリクスを集約・フィルタリングできます。

## 動作確認

```bash
curl http://localhost:3000/metrics
```

## 注意点

- Prometheus のスクレイプ設定で `/metrics` エンドポイントを指定してください
- グローバル変数を使用して環境やサーバーを識別すると、マルチ環境での運用が容易になります
- メトリクスはジョブの状態別カウント（waiting, active, completed, failed）を含みます

## 関連

- [./metrics.md](./metrics.md) — BullMQ メトリクスの基本
