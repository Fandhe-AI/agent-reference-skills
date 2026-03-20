# PR Review Comments API

プルリクエストのレビューコメント（差分上のインラインコメント）の一覧取得・作成・更新・削除・返信を行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/pulls/comments` | リポジトリ内の全 PR レビューコメント一覧取得 |
| GET | `/repos/{owner}/{repo}/pulls/{pull_number}/comments` | 特定 PR のレビューコメント一覧取得 |
| GET | `/repos/{owner}/{repo}/pulls/comments/{comment_id}` | 単一レビューコメントの取得 |
| POST | `/repos/{owner}/{repo}/pulls/{pull_number}/comments` | レビューコメントの作成 |
| PATCH | `/repos/{owner}/{repo}/pulls/comments/{comment_id}` | レビューコメントの更新 |
| DELETE | `/repos/{owner}/{repo}/pulls/comments/{comment_id}` | レビューコメントの削除 |
| POST | `/repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies` | レビューコメントへの返信 |

## パラメータ

### 作成パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `body` | string | コメント本文（必須） |
| `commit_id` | string | コメント対象のコミット SHA（必須） |
| `path` | string | コメント対象のファイルパス（必須） |
| `line` | integer | コメント対象の行番号 |
| `side` | string | 差分のどちら側か（`LEFT`, `RIGHT`）。デフォルト: `RIGHT` |
| `start_line` | integer | 複数行コメントの開始行番号 |
| `start_side` | string | 複数行コメントの開始行の差分側（`LEFT`, `RIGHT`） |

### 更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `body` | string | コメント本文（必須） |

### 一覧取得パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `sort` | string | ソート基準（`created`, `updated`）。デフォルト: `created` |
| `direction` | string | ソート方向（`asc`, `desc`）。デフォルト: `desc` |
| `since` | string | ISO 8601 形式の日時。この日時以降に更新されたコメントのみ返す |

## 注意事項

- `position` パラメータは非推奨。代わりに `line` を使用すること
- 複数行コメントの場合は `start_line` と `line` の両方を指定する
