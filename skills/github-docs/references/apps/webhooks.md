# GitHub App Webhook

## 概要

GitHub App は 1 つの Webhook エンドポイントを持ち、App がサブスクライブしたイベントの通知を受信する。App のインストール先の全リポジトリ/Organization からのイベントが、この単一の Webhook で一元管理される。

## App Webhook と リポジトリ/Organization Webhook の違い

| 側面 | App Webhook | リポジトリ/Org Webhook |
|------|-------------|----------------------|
| **エンドポイント数** | App 全体で 1 つ | リポジトリ/Org ごとに複数 |
| **設定場所** | App の登録・設定画面 | リポジトリ/Org の Settings |
| **スコープ** | App がインストールされた全リソース | 個別のリポジトリ/Org |
| **アンインストール時** | 自動的に無効化 | 手動で削除が必要 |
| **利用可能イベント** | App に設定された権限に依存 | リポジトリ/Org レベルのイベント |

## Webhook の設定

### App 登録時

1. **Active** チェックボックスを有効にする
2. **Webhook URL** を入力
3. **Webhook secret** を設定（推奨）
4. **SSL verification** を有効にする（推奨）

### App 登録後の変更

Developer settings > GitHub Apps > 対象 App の編集画面から変更可能。

## App 固有のイベント

以下のイベントは GitHub App の Webhook でのみ利用可能。

### installation

App のインストール状態が変更された。

| action | 説明 |
|--------|------|
| `created` | App が新規インストールされた |
| `deleted` | App がアンインストールされた |
| `suspend` | App が一時停止された |
| `unsuspend` | App の一時停止が解除された |
| `new_permissions_accepted` | 新しい権限が承認された |

### installation_repositories

App のリポジトリアクセスが変更された。

| action | 説明 |
|--------|------|
| `added` | リポジトリが追加された |
| `removed` | リポジトリが削除された |

### installation_target

App がインストールされたアカウントの名前が変更された。

### github_app_authorization

ユーザーが App の認証を取り消した。

## ペイロード形式

### 共通フィールド

すべての App Webhook ペイロードに含まれるフィールド:

```json
{
  "action": "イベントのアクション",
  "sender": {
    "login": "ユーザー名",
    "id": 12345,
    "type": "User"
  },
  "installation": {
    "id": 67890,
    "account": {
      "login": "インストール先アカウント",
      "type": "Organization"
    },
    "app_id": 11111,
    "target_type": "Organization",
    "permissions": {
      "issues": "write",
      "contents": "read"
    },
    "events": ["issues", "push"]
  }
}
```

### installation イベントのペイロード例

```json
{
  "action": "created",
  "installation": {
    "id": 67890,
    "account": {
      "login": "octocat-org",
      "type": "Organization"
    },
    "app_id": 11111,
    "app_slug": "my-app",
    "target_type": "Organization",
    "permissions": {
      "issues": "write",
      "pull_requests": "read",
      "contents": "read"
    },
    "events": ["issues", "pull_request", "push"],
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "repositories": [
    {
      "id": 12345,
      "name": "repo-name",
      "full_name": "octocat-org/repo-name",
      "private": false
    }
  ],
  "sender": {
    "login": "octocat",
    "id": 1,
    "type": "User"
  }
}
```

## セキュリティ

- Webhook secret を設定し、`X-Hub-Signature-256` ヘッダーで配信を検証する
- 検証方法の詳細は [webhooks/securing.md](../webhooks/securing.md) を参照

## 公式ドキュメント

- [Using webhooks with GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/using-webhooks-with-github-apps)
