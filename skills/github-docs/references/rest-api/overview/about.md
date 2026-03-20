# REST API 概要

GitHub REST API の基本的な構造と使い方。

## ベースURL

```
https://api.github.com
```

GitHub Enterprise Server の場合:

```
https://{hostname}/api/v3
```

## HTTPメソッド

| メソッド | 説明 | 用途 |
|---------|------|------|
| `GET` | リソースの取得 | データの読み取り、一覧取得 |
| `POST` | リソースの作成 | 新規リソース作成、アクション実行 |
| `PATCH` | リソースの部分更新 | 既存リソースの一部フィールドを更新 |
| `PUT` | リソースの置換・設定 | リソース全体の置換、関係の設定 |
| `DELETE` | リソースの削除 | リソースの削除 |

## 必須ヘッダー

| ヘッダー | 値 | 必須 | 説明 |
|---------|-----|------|------|
| `Accept` | `application/vnd.github+json` | 推奨 | レスポンス形式を指定。省略時もJSONだが明示推奨 |
| `X-GitHub-Api-Version` | `2022-11-28` | 推奨 | 使用するAPIバージョンを指定 |
| `Authorization` | `Bearer TOKEN` | 認証時 | 認証トークンを指定 |
| `User-Agent` | 任意の文字列 | 必須 | リクエスト元を識別。省略すると拒否される場合あり |

### リクエスト例

```bash
curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/OWNER/REPO
```

## パラメータの種類

### パスパラメータ

URLパスに埋め込むパラメータ。エンドポイント定義で `{param}` として表記される。

```
GET /repos/{owner}/{repo}/issues/{issue_number}
```

### クエリパラメータ

URLの `?` 以降に付与するパラメータ。主にフィルタリング・ソート・ページネーションに使用。

```
GET /repos/{owner}/{repo}/issues?state=open&sort=created&direction=desc&per_page=50
```

### ボディパラメータ

リクエストボディにJSON形式で含めるパラメータ。`POST`、`PATCH`、`PUT` で使用。

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"Bug report","body":"Description here"}' \
  https://api.github.com/repos/OWNER/REPO/issues
```

## レスポンス形式

- **形式**: JSON（`application/json`）
- **タイムスタンプ**: ISO 8601 形式（`YYYY-MM-DDTHH:MM:SSZ`）
- **ステータスコード**: 標準HTTPステータスコード

### 主なステータスコード

| コード | 説明 |
|--------|------|
| `200 OK` | リクエスト成功 |
| `201 Created` | リソース作成成功 |
| `204 No Content` | 成功（レスポンスボディなし、DELETE等） |
| `304 Not Modified` | 条件付きリクエストでリソース未変更 |
| `400 Bad Request` | リクエスト不正 |
| `401 Unauthorized` | 認証が必要 |
| `403 Forbidden` | アクセス権限なし、またはレート制限超過 |
| `404 Not Found` | リソースが存在しない、またはアクセス権限なし |
| `409 Conflict` | 競合（例：マージコンフリクト） |
| `422 Unprocessable Entity` | バリデーションエラー |
| `429 Too Many Requests` | セカンダリレート制限超過 |
| `500 Internal Server Error` | サーバーエラー |

## REST API vs GraphQL API の比較

| 観点 | REST API | GraphQL API |
|------|----------|-------------|
| エンドポイント | リソースごとに個別URL | 単一エンドポイント `/graphql` |
| データ取得 | 固定スキーマ（過剰取得の可能性） | 必要なフィールドのみ指定可能 |
| 複数リソース | 複数リクエストが必要 | 1リクエストで取得可能 |
| ページネーション | linkヘッダー + per_page/page | カーソルベース（first/after） |
| リアルタイム | Webhook連携 | Subscription（一部） |
| 学習コスト | 低い（標準的なHTTP） | やや高い（GraphQLクエリ言語） |
| ミューテーション | POST/PATCH/PUT/DELETE | mutation クエリ |
| レート制限 | リクエスト数ベース | ポイント計算ベース |

### 使い分けの目安

- **REST API**: シンプルなCRUD操作、Webhook管理、CI/CDからの利用
- **GraphQL API**: 複雑なデータ取得、複数リソースの一括取得、必要なフィールドだけ取得したい場合
