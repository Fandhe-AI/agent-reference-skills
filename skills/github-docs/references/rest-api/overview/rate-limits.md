# レート制限

GitHub REST API のレート制限の仕組みと対処法。

## プライマリレート制限

リクエスト数に基づく制限。認証状態によって上限が異なる。

| 認証状態 | 制限 | 単位 |
|---------|------|------|
| 未認証 | **60** リクエスト | /時間 |
| 認証済み（PAT、OAuth） | **5,000** リクエスト | /時間 |
| GitHub Enterprise Cloud | **15,000** リクエスト | /時間 |
| `GITHUB_TOKEN`（Actions） | **1,000** リクエスト | /時間 |
| GitHub App インストール | **5,000** リクエスト | /時間 |
| GitHub App（Enterprise Cloud） | **15,000** リクエスト | /時間 |

### GitHub App の特別ルール

- Organization 内のリポジトリ数が20超の場合: `5,000 + (リポジトリ数 × 50)`（最大 12,500）
- Enterprise Cloud: `15,000 + (リポジトリ数 × 50)`（最大 15,000）

## セカンダリレート制限

プライマリ制限とは別に適用される追加制限。

| 制限種別 | 制限値 | 説明 |
|---------|--------|------|
| 同時接続数 | **100** 並列リクエスト | 同時に実行できるリクエスト数 |
| リクエストポイント | **900** ポイント/分 | エンドポイントごとにポイントが異なる |
| コンテンツ生成 | **80** リクエスト/分 | 新規コンテンツを作成するエンドポイント |

### ポイント計算

- 通常のリクエスト: 1ポイント
- ミューテーション（POST, PATCH, PUT, DELETE）: より高いポイント
- GitHub App のインストール一覧の取得等: 高コストなエンドポイントは追加ポイント

## レスポンスヘッダー

すべてのAPIレスポンスにレート制限情報が含まれる。

| ヘッダー | 説明 | 例 |
|---------|------|-----|
| `x-ratelimit-limit` | 制限の上限値 | `5000` |
| `x-ratelimit-remaining` | 残りリクエスト数 | `4987` |
| `x-ratelimit-used` | 使用済みリクエスト数 | `13` |
| `x-ratelimit-reset` | 制限リセット時刻（Unixタイムスタンプ） | `1698765432` |
| `x-ratelimit-resource` | 制限が適用されるリソースカテゴリ | `core` |

### リソースカテゴリ

| リソース | 説明 |
|---------|------|
| `core` | REST API の主要エンドポイント |
| `search` | 検索API（別枠: 認証10回/分、未認証30回/分） |
| `graphql` | GraphQL API |
| `code_search` | コード検索API |
| `actions_runner_registration` | Actions ランナー登録 |
| `source_import` | ソースインポート |

### ヘッダー確認例

```bash
curl -s -I \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/rate_limit

# レート制限状態を確認する専用エンドポイント
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/rate_limit
```

### レスポンス例（`/rate_limit`）

```json
{
  "resources": {
    "core": {
      "limit": 5000,
      "remaining": 4999,
      "reset": 1698765432,
      "used": 1,
      "resource": "core"
    },
    "search": {
      "limit": 30,
      "remaining": 18,
      "reset": 1698765432,
      "used": 12,
      "resource": "search"
    }
  },
  "rate": {
    "limit": 5000,
    "remaining": 4999,
    "reset": 1698765432,
    "used": 1,
    "resource": "core"
  }
}
```

## レート制限超過時の対応

### エラーレスポンス

プライマリ制限超過時:

```
HTTP/1.1 403 Forbidden
x-ratelimit-remaining: 0

{
  "message": "API rate limit exceeded for xxx.xxx.xxx.xxx.",
  "documentation_url": "https://docs.github.com/rest/overview/rate-limits-for-the-rest-api"
}
```

セカンダリ制限超過時:

```
HTTP/1.1 429 Too Many Requests
retry-after: 60

{
  "message": "You have exceeded a secondary rate limit. Please wait a few minutes before you try again.",
  "documentation_url": "https://docs.github.com/rest/overview/rate-limits-for-the-rest-api"
}
```

### 対処方法

1. **`x-ratelimit-reset` まで待機**: ヘッダーの値をUNIXタイムスタンプとして解析し、その時刻まで待つ
2. **`retry-after` ヘッダーに従う**: セカンダリ制限の場合に返される秒数だけ待機
3. **指数バックオフ**: リトライ間隔を指数的に増やす（1秒、2秒、4秒、8秒...）

### 永久BANの可能性

- レート制限を繰り返し超過し続けると、**永久的にアクセスがブロック**される可能性がある
- 特にセカンダリ制限の超過を無視し続けた場合にリスクが高い
- 常にレート制限ヘッダーを確認し、制限に達する前にリクエストを抑制すること
