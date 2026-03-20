# Issue Comments API

Issue コメントの一覧取得・作成・更新・削除・ピン留めを行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/issues/comments` | リポジトリ内の全 Issue コメント一覧取得 |
| GET | `/repos/{owner}/{repo}/issues/{issue_number}/comments` | 特定 Issue のコメント一覧取得 |
| GET | `/repos/{owner}/{repo}/issues/comments/{comment_id}` | 単一コメントの取得 |
| POST | `/repos/{owner}/{repo}/issues/{issue_number}/comments` | コメントの作成 |
| PATCH | `/repos/{owner}/{repo}/issues/comments/{comment_id}` | コメントの更新 |
| DELETE | `/repos/{owner}/{repo}/issues/comments/{comment_id}` | コメントの削除 |
| PUT | `/repos/{owner}/{repo}/issues/{issue_number}/pin` | Issue のピン留め |
| DELETE | `/repos/{owner}/{repo}/issues/{issue_number}/pin` | Issue のピン留め解除 |

## パラメータ

### 一覧取得パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `sort` | string | ソート基準（`created`, `updated`）。デフォルト: `created` |
| `direction` | string | ソート方向（`asc`, `desc`）。デフォルト: `desc` |
| `since` | string | ISO 8601 形式の日時。この日時以降に更新されたコメントのみ返す |

### 作成・更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `body` | string | コメント本文（必須） |
