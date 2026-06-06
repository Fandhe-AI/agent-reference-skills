# ログドレイン

## 概要

ログドレインは Supabase のログを外部サービスにリアルタイムで転送する機能。ログの長期保存、高度な分析、アラート設定が可能になる。Pro プラン以上で利用可能。

設定場所: **Project Settings → Log Drains → Add Drain**

## 対応する外部サービス

| 送信先 | 形式 | 認証 |
|--------|------|------|
| Generic HTTP Endpoint | JSON (POST) | HTTP Headers で任意指定 |
| Datadog | JSON | API Key + Region |
| Loki | HTTP API 形式 (最大 250 件/バッチ) | HTTP Headers |
| Sentry | Sentry Logging Product 形式 | DSN |
| Axiom | JSON | API Token |
| Amazon S3 | JSON (バッチ書き込み) | Access Key / Secret Key |

HTTP 系の送信先はすべて最大 250 件または 1 秒間隔でバッチ送信され、Gzip 圧縮をサポートする。

## Generic HTTP Endpoint

任意の HTTP エンドポイントにログを POST 送信する。

### セットアップ

1. **Project Settings → Log Drains → Add Drain**
2. **Generic HTTP Endpoint** を選択
3. 以下を入力:
   - **URL**: ログの送信先 URL
   - **HTTP Headers**: 認証ヘッダー等（オプション）

### ペイロード形式

```json
{
  "event_message": "POST /rest/v1/posts 201",
  "timestamp": "2024-01-15T10:30:00Z",
  "metadata": {
    "method": "POST",
    "path": "/rest/v1/posts",
    "status": 201,
    "response_time": 45,
    "request_id": "abc123"
  },
  "project_ref": "abcdefghijklmnop",
  "service": "api"
}
```

### Webhook 受信側の実装例

```typescript
// Next.js API Route の例
export async function POST(request: Request) {
  const logs = await request.json()

  for (const log of logs) {
    if (log.metadata?.status >= 500) {
      await sendSlackAlert(log)
    }
    await saveLog(log)
  }

  return new Response('OK', { status: 200 })
}
```

## Datadog 連携

### セットアップ

1. **Datadog** を選択
2. 以下を入力:
   - **API Key**: Datadog の API キー
   - **Region**: US1, US3, US5, EU1, AP1

### Datadog での確認

ログは `source:supabase` タグで Datadog の **Logs** セクションに表示される。

```
source:supabase service:auth status:error
source:supabase service:postgrest @http.status_code:>=500
```

## Loki 連携

Grafana Loki の HTTP API 形式でログを送信する。

### セットアップ

1. **Loki** を選択
2. 以下を入力:
   - **URL**: Loki エンドポイント URL
   - **HTTP Headers**: 認証ヘッダー（BasicAuth または Bearer）

最大 250 件/バッチでログを送信する。

## Sentry 連携

Sentry の Logging Product にログを統合する。

### セットアップ

1. **Sentry** を選択
2. **DSN**: Sentry プロジェクトの DSN（Project Settings → Client Keys）を入力

## Axiom 連携

### セットアップ

1. **Axiom** を選択
2. 以下を入力:
   - **Dataset**: Axiom のデータセット名
   - **API Token**: Ingestion 権限付きの API Token

## Amazon S3 連携

既存の S3 バケットにログを JSON 形式で書き込む。

### セットアップ

1. **Amazon S3** を選択
2. 以下を入力:
   - **Bucket**: S3 バケット名
   - **Region**: バケットのリージョン
   - **Access Key ID / Secret Access Key**: S3 への書き込み権限を持つ IAM 認証情報
   - **Batch Timeout**: バッチ送信の間隔（秒）

## ログドレインの管理

### 確認

```bash
supabase projects log-drains list --project-ref <project-ref>
```

### 複数ドレインの設定

複数のログドレインを同時に設定可能。同じログがすべてのドレインに送信される。

## ベストプラクティス

- 本番環境ではログドレインを設定して長期保存する
- エラーログに対してアラートを設定する
- ログのボリュームとコストを監視する
- Webhook の受信側はべき等に実装する（再送に対応）
- 機密情報がログに含まれていないか定期的に確認する

## 関連

- [ログ](./logs.md) — ログ確認・フィルタリング
- [メトリクス](./metrics.md) — Prometheus / Grafana 連携
