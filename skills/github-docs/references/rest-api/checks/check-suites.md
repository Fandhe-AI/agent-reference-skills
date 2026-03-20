# Check Suites API

チェックスイート（チェック実行のグループ）を管理するAPI。チェックスイートはプッシュ時にGitHubが自動作成するが、手動で作成することも可能。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/repos/{owner}/{repo}/check-suites` | チェックスイートを作成 |
| GET | `/repos/{owner}/{repo}/check-suites/{check_suite_id}` | チェックスイートを取得 |
| POST | `/repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest` | チェックスイートを再リクエスト |
| PATCH | `/repos/{owner}/{repo}/check-suites/preferences` | チェックスイートの設定を更新 |
| GET | `/repos/{owner}/{repo}/commits/{ref}/check-suites` | リファレンスのチェックスイート一覧を取得 |

## 権限

- **書き込みアクセス（作成・再リクエスト・設定更新）はGitHub Appsのみ**
- 読み取りはOAuthアプリやPATでも可能

## チェックスイートの作成

```
POST /repos/{owner}/{repo}/check-suites
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| head_sha | string | Yes | チェック対象のコミットSHA |

通常はプッシュ時に自動作成されるため、手動作成が必要なケースは限定的。

## チェックスイートの取得

```
GET /repos/{owner}/{repo}/check-suites/{check_suite_id}
```

### レスポンス例

```json
{
  "id": 5,
  "node_id": "MDEwOkNoZWNr...",
  "head_branch": "main",
  "head_sha": "d6fde92930d4715a2b49857d24b940956b26d2d3",
  "status": "completed",
  "conclusion": "success",
  "url": "https://api.github.com/repos/octocat/Hello-World/check-suites/5",
  "app": {
    "id": 1,
    "slug": "octoapp",
    "name": "Octocat App"
  },
  "pull_requests": []
}
```

## チェックスイートの再リクエスト

```
POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest
```

チェックスイート内のすべてのチェック実行を再実行する。レスポンスは `201 Created`。

## チェックスイート設定の更新

```
PATCH /repos/{owner}/{repo}/check-suites/preferences
```

チェックスイートの自動作成設定を変更する。

### リクエストボディ

```json
{
  "auto_trigger_checks": [
    {
      "app_id": 4,
      "setting": false
    }
  ]
}
```

`setting: false` を指定すると、そのアプリのチェックスイートの自動作成を無効化する。

## リファレンスのチェックスイート一覧

```
GET /repos/{owner}/{repo}/commits/{ref}/check-suites
```

### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| app_id | integer | GitHub AppのIDでフィルタ |
| check_name | string | チェック名でフィルタ |
