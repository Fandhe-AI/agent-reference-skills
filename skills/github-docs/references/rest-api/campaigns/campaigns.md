# Security Campaigns API

Organization のセキュリティキャンペーン（code scanning アラートの修正期限付き取り組み）を作成・管理する REST エンドポイント。

公式ドキュメント: https://docs.github.com/en/rest/campaigns/campaigns

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/campaigns` | Organization のキャンペーン一覧取得 |
| POST | `/orgs/{org}/campaigns` | キャンペーン作成 |
| GET | `/orgs/{org}/campaigns/{campaign_number}` | 単一キャンペーンの取得 |
| PATCH | `/orgs/{org}/campaigns/{campaign_number}` | キャンペーン更新 |
| DELETE | `/orgs/{org}/campaigns/{campaign_number}` | キャンペーン削除（204） |

## 例

```curl
curl -L \
  -X POST \
  https://api.github.com/orgs/ORG/campaigns \
  -d '{
  "name": "Critical CodeQL alerts",
  "description": "Address critical alerts before they are exploited to prevent breaches, protect sensitive data, and mitigate financial and reputational damage.",
  "managers": [
    "octocat"
  ],
  "ends_at": "2024-03-14T00:00:00Z",
  "code_scanning_alerts": [
    {
      "repository_id": 1296269,
      "alert_numbers": [
        1,
        2
      ]
    }
  ]
}'
```

標準ヘッダー（`Authorization: Bearer <YOUR-TOKEN>` / `Accept: application/vnd.github+json` / `X-GitHub-Api-Version: 2026-03-10`）は例では省略されている。

## パラメータ

### List（クエリ）

| 名前 | 型 | 説明 |
|---|---|---|
| `org` | string（必須） | Organization 名（大文字小文字を区別しない） |
| `page` | integer | ページ番号。既定 `1` |
| `per_page` | integer | 1 ページの件数（最大 100）。既定 `30` |
| `direction` | string | `asc` / `desc`。既定 `desc` |
| `state` | string | `open` / `closed` で絞り込み |
| `sort` | string | `created` / `updated` / `ends_at` / `published`。既定 `created` |

### Update（body）

| 名前 | 型 | 説明 |
|---|---|---|
| `name` | string | キャンペーン名 |
| `description` | string | 説明 |
| `managers` | array of strings | マネージャーの login。現時点では 1 名のみ指定可 |
| `team_managers` | array of strings | マネージャーにする team の slug |
| `ends_at` | string | 終了日時（ISO 8601 `YYYY-MM-DDTHH:MM:SSZ`） |
| `contact_link` | string or null | 連絡先リンク（URI） |
| `state` | string | `open` / `closed` |

### Create（body）

原文の Create の Body parameters 表は空。上記 Usage の例が使用するフィールドは `name` / `description` / `managers` / `ends_at` / `code_scanning_alerts`（`repository_id` と `alert_numbers`）。

## レスポンス

Campaign オブジェクトの主なフィールド: `number`, `created_at`, `updated_at`, `name`, `description`, `managers`（Simple User の配列）, `team_managers`（Team の配列）, `published_at`, `ends_at`, `closed_at`, `state`（`open` / `closed`）, `contact_link`, `alert_stats`（`open_count` / `closed_count` / `in_progress_count`）。一覧は Campaign summary の配列で同形。

## HTTP ステータス

| エンドポイント | ステータス |
|---|---|
| List | 200, 404, 503 |
| Create | 200, 400, 404, 422, 429, 503 |
| Get | 200, 404, 422, 503 |
| Update | 200, 400, 404, 422, 503 |
| Delete | 204, 404, 503 |

## 注意事項

- 公開済みキャンペーンのみが対象。下書き（draft）キャンペーンは API で表示・管理できない
- 認証ユーザーは Organization の owner または security manager が必要
- OAuth app トークンと classic PAT は `security_events` スコープが必要
- Create は fine-grained トークンの場合、キャンペーン対象の全リポジトリで "Code scanning alerts" リポジトリ権限（read）が必要

## Related

- [README.md](./README.md)
