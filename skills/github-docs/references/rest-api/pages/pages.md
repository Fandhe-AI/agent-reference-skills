# GitHub Pages API

GitHub Pagesの静的サイトホスティングを設定・管理するAPI。

## エンドポイント

### サイト管理

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/repos/{owner}/{repo}/pages` | Pagesサイト情報を取得 |
| POST | `/repos/{owner}/{repo}/pages` | Pagesサイトを作成 |
| PUT | `/repos/{owner}/{repo}/pages` | Pagesサイト情報を更新 |
| DELETE | `/repos/{owner}/{repo}/pages` | Pagesサイトを削除 |

### ビルド

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/repos/{owner}/{repo}/pages/builds` | ビルド一覧を取得 |
| POST | `/repos/{owner}/{repo}/pages/builds` | ビルドをリクエスト |
| GET | `/repos/{owner}/{repo}/pages/builds/latest` | 最新ビルドを取得 |
| GET | `/repos/{owner}/{repo}/pages/builds/{build_id}` | 特定のビルドを取得 |

### デプロイメント

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/repos/{owner}/{repo}/pages/deployments` | デプロイメントを作成 |
| GET | `/repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}` | デプロイメントを取得 |
| POST | `/repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel` | デプロイメントをキャンセル |

### DNSヘルスチェック

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/repos/{owner}/{repo}/pages/health` | カスタムドメインのDNSヘルスチェック |

## サイトの作成

```
POST /repos/{owner}/{repo}/pages
```

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| build_type | string | ビルドタイプ: `legacy`（クラシック）または `workflow`（GitHub Actions） |
| source | object | ソース設定（build_typeが`legacy`の場合） |
| source.branch | string | ソースブランチ |
| source.path | string | ソースパス（`/` または `/docs`） |

### リクエスト例

```json
{
  "build_type": "legacy",
  "source": {
    "branch": "main",
    "path": "/docs"
  }
}
```

## サイト情報の更新

```
PUT /repos/{owner}/{repo}/pages
```

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| cname | string | カスタムドメイン（`null` で削除） |
| https_enforced | boolean | HTTPS強制を有効化 |
| build_type | string | ビルドタイプ |
| source | object | ソース設定 |

## サイトの削除

```
DELETE /repos/{owner}/{repo}/pages
```

204 No Contentを返す。

## ビルドのリクエスト

```
POST /repos/{owner}/{repo}/pages/builds
```

手動でPagesのビルドをトリガーする。レスポンスは `201 Created` でビルドのステータスURLを含む。

### レスポンス例

```json
{
  "url": "https://api.github.com/repos/octocat/Hello-World/pages/builds/latest",
  "status": "queued"
}
```

## ビルドの取得

```
GET /repos/{owner}/{repo}/pages/builds/{build_id}
```

### レスポンス例

```json
{
  "url": "https://api.github.com/repos/octocat/Hello-World/pages/builds/1",
  "status": "built",
  "error": {
    "message": null
  },
  "pusher": {
    "login": "octocat",
    "id": 1
  },
  "commit": "351391cdcb88ffae71ec3028c91f375a8036a26b",
  "duration": 2104,
  "created_at": "2014-02-10T19:00:49Z",
  "updated_at": "2014-02-10T19:00:51Z"
}
```

## デプロイメントの作成

```
POST /repos/{owner}/{repo}/pages/deployments
```

GitHub Actions ワークフローからPagesデプロイメントを作成する際に使用。

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| artifact_id | integer | No | GitHub Actionsのアーティファクト ID |
| artifact_url | string | No | アーティファクトのダウンロードURL |
| environment | string | No | 環境名（デフォルト: `github-pages`） |
| pages_build_version | string | Yes | ビルドバージョン（一意の文字列） |
| oidc_token | string | Yes | OIDC トークン |

## デプロイメントのキャンセル

```
POST /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel
```

進行中のPagesデプロイメントをキャンセルする。

## DNSヘルスチェック

```
GET /repos/{owner}/{repo}/pages/health
```

カスタムドメインのDNS設定が正しいかを検証する。CNAME、Aレコード、AAAAレコードの設定状況を確認できる。
