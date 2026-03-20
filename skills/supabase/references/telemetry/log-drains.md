# ログドレイン

## 概要

ログドレインは Supabase のログを外部サービスにリアルタイムで転送する機能。ログの長期保存、高度な分析、アラート設定が可能になる。Team プラン以上で利用可能。

## 対応する外部サービス

- Datadog
- Logflare（Supabase ネイティブ）
- カスタム Webhook（任意のサービスへ転送）

## Datadog 連携

### セットアップ

1. **ダッシュボード**: **Project Settings → Log Drains → Add Drain**
2. **Datadog** を選択
3. 以下を入力:
   - **API Key**: Datadog の API キー
   - **Region**: Datadog のリージョン（US1, US3, US5, EU1, AP1）

### Datadog での確認

ログは Datadog の **Logs** セクションに `source:supabase` として表示される。

### フィルタリング

```
# Datadog のログ検索
source:supabase service:auth status:error
source:supabase service:postgrest @http.status_code:>=500
source:supabase service:edge-functions
```

### ダッシュボードの作成

Datadog でカスタムダッシュボードを作成し、以下を可視化:
- エラー率のトレンド
- レスポンスタイムの分布
- サービスごとのログボリューム
- 認証イベントの統計

## Logflare 連携

### 概要

Logflare は Supabase が開発した BigQuery ベースのログ管理サービス。Supabase のデフォルトログバックエンド。

### セットアップ

1. Logflare アカウントを作成
2. ソースを作成
3. **Project Settings → Log Drains → Add Drain → Logflare**
4. Logflare のソース ID と API キーを入力

## Webhook 形式

任意の HTTP エンドポイントにログを送信できる。

### セットアップ

1. **Project Settings → Log Drains → Add Drain → Webhook**
2. 以下を入力:
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

  // ログの処理（保存、フィルタリング、アラート等）
  for (const log of logs) {
    if (log.metadata?.status >= 500) {
      // エラーアラートを送信
      await sendSlackAlert(log)
    }
    // ログを独自のストレージに保存
    await saveLog(log)
  }

  return new Response('OK', { status: 200 })
}
```

### カスタム連携の例

#### Slack への通知

```typescript
async function sendSlackAlert(log: any) {
  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `[${log.service}] Error: ${log.event_message}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Service:* ${log.service}\n*Message:* ${log.event_message}\n*Time:* ${log.timestamp}`,
          },
        },
      ],
    }),
  })
}
```

#### Elasticsearch への転送

```bash
# Logstash の設定例
input {
  http {
    port => 8080
    codec => json
  }
}

output {
  elasticsearch {
    hosts => ["http://elasticsearch:9200"]
    index => "supabase-logs-%{+YYYY.MM.dd}"
  }
}
```

## ログドレインの管理

### 確認

```bash
# CLI で確認
supabase projects log-drains list --project-ref <project-ref>
```

### 削除

ダッシュボードの **Project Settings → Log Drains** から削除可能。

### 複数ドレインの設定

複数のログドレインを同時に設定可能。同じログが全てのドレインに送信される。

## ベストプラクティス

- 本番環境ではログドレインを設定して長期保存する
- エラーログに対してアラートを設定する
- ログのボリュームとコストを監視する
- Webhook の受信側はべき等に実装する（再送に対応）
- 機密情報がログに含まれていないか定期的に確認する

## 関連

- [ログ](./logs.md) — ログ確認・フィルタリング
- [メトリクス](./metrics.md) — Prometheus / Grafana 連携
