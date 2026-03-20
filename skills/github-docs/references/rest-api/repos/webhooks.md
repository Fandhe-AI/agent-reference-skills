# リポジトリ Webhook

リポジトリWebhookの作成・管理・配信に関するエンドポイント。

## エンドポイント一覧

### Webhook 管理

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/hooks` | Webhook一覧を取得 |
| `POST` | `/repos/{owner}/{repo}/hooks` | Webhookを作成 |
| `GET` | `/repos/{owner}/{repo}/hooks/{hook_id}` | Webhookの詳細を取得 |
| `PATCH` | `/repos/{owner}/{repo}/hooks/{hook_id}` | Webhookを更新 |
| `DELETE` | `/repos/{owner}/{repo}/hooks/{hook_id}` | Webhookを削除 |

### Webhook 設定

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/hooks/{hook_id}/config` | Webhook設定を取得 |
| `PATCH` | `/repos/{owner}/{repo}/hooks/{hook_id}/config` | Webhook設定を更新 |

### 配信

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/hooks/{hook_id}/deliveries` | 配信一覧を取得 |
| `GET` | `/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}` | 配信の詳細を取得 |
| `POST` | `/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts` | 配信を再送 |

### テスト

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `POST` | `/repos/{owner}/{repo}/hooks/{hook_id}/pings` | Pingイベントを送信 |
| `POST` | `/repos/{owner}/{repo}/hooks/{hook_id}/tests` | Pushイベントをテスト送信 |

## Webhookの作成

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/hooks \
  -d '{
    "name": "web",
    "active": true,
    "events": ["push", "pull_request"],
    "config": {
      "url": "https://example.com/webhook",
      "content_type": "json",
      "insecure_ssl": "0",
      "secret": "webhook-secret-string"
    }
  }'
```

### 作成パラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| `name` | string | **必須** | - | `web`（固定値） |
| `config` | object | **必須** | - | Webhook設定 |
| `config.url` | string | **必須** | - | ペイロード送信先URL |
| `config.content_type` | string | - | `form` | `json` または `form` |
| `config.secret` | string | - | - | ペイロード署名用のシークレット |
| `config.insecure_ssl` | string | - | `"0"` | `"0"`: SSL検証あり、`"1"`: SSL検証なし |
| `events` | array | - | `["push"]` | トリガーするイベント一覧 |
| `active` | boolean | - | `true` | Webhookが有効か |

### 主なイベント一覧

| イベント | 説明 |
|---------|------|
| `*` | すべてのイベント |
| `push` | プッシュ |
| `pull_request` | PRの作成・更新・クローズ・マージ等 |
| `pull_request_review` | PRレビュー |
| `issues` | Issueの作成・更新・クローズ等 |
| `issue_comment` | Issue/PRへのコメント |
| `create` | ブランチ/タグの作成 |
| `delete` | ブランチ/タグの削除 |
| `release` | リリースの公開 |
| `workflow_run` | ワークフロー実行 |
| `check_run` | チェックランの作成・完了 |
| `check_suite` | チェックスイートの作成・完了 |
| `deployment` | デプロイメント |
| `deployment_status` | デプロイメントステータス更新 |
| `status` | コミットステータス更新 |
| `fork` | フォーク |
| `star` | スター |
| `watch` | ウォッチ |
| `member` | コラボレーター追加 |
| `public` | プライベート→パブリック変更 |

## Webhook一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/hooks?per_page=100"
```

## Webhookの更新

```bash
curl -X PATCH \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/hooks/{hook_id} \
  -d '{
    "active": true,
    "events": ["push", "pull_request", "issues"],
    "config": {
      "url": "https://example.com/new-webhook-url",
      "content_type": "json"
    }
  }'
```

## Webhookの削除

```bash
curl -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/hooks/{hook_id}
```

## Webhook設定の取得・更新

```bash
# 設定の取得
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/hooks/{hook_id}/config

# 設定の更新
curl -X PATCH \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/hooks/{hook_id}/config \
  -d '{
    "url": "https://example.com/updated-url",
    "content_type": "json",
    "secret": "new-secret"
  }'
```

## 配信履歴

### 配信一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/hooks/{hook_id}/deliveries?per_page=100"
```

### レスポンス例

```json
[
  {
    "id": 12345,
    "guid": "abc-123-def",
    "delivered_at": "2024-01-01T00:00:00Z",
    "redelivery": false,
    "duration": 0.31,
    "status": "OK",
    "status_code": 200,
    "event": "push",
    "action": null,
    "installation_id": null,
    "repository_id": 67890
  }
]
```

### 配信の詳細取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/hooks/{hook_id}/deliveries/{delivery_id}
```

リクエストヘッダー、リクエストボディ、レスポンスヘッダー、レスポンスボディが含まれる。

### 配信の再送

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/hooks/{hook_id}/deliveries/{delivery_id}/attempts
```

## テスト送信

### Pingイベントの送信

Webhook URLへの到達性を確認する。

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/hooks/{hook_id}/pings
```

### テストPushイベントの送信

最新のPushイベントを模擬送信する。

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/hooks/{hook_id}/tests
```

## Webhookペイロードの検証

`config.secret` を設定した場合、ペイロードの署名を検証できる。

### 検証ヘッダー

| ヘッダー | 説明 |
|---------|------|
| `X-Hub-Signature-256` | HMAC-SHA256 署名（`sha256=HASH`） |

### 検証例（Node.js）

```javascript
const crypto = require("crypto");

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(signature)
  );
}
```

## 必要な権限

| 操作 | Fine-grained PAT 権限 |
|------|----------------------|
| Webhook一覧の読み取り | `repository_hooks: read` |
| Webhookの作成・更新・削除 | `repository_hooks: write` |
| 配信履歴の読み取り | `repository_hooks: read` |
| 再送・テスト送信 | `repository_hooks: write` |
