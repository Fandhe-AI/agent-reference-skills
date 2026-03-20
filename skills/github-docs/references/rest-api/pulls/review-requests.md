# PR Review Requests API

プルリクエストのレビューリクエスト（レビュー依頼）の取得・作成・削除を行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers` | リクエスト済みレビュアーの取得 |
| POST | `/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers` | レビューリクエストの作成 |
| DELETE | `/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers` | レビューリクエストの削除 |

## パラメータ

### 作成・削除パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `reviewers` | array of string | レビューを依頼するユーザー名の配列 |
| `team_reviewers` | array of string | レビューを依頼するチームスラッグの配列 |
