# タグ

タグの一覧取得とタグ保護に関するエンドポイント。

## エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/tags` | タグ一覧を取得 |
| `GET` | `/repos/{owner}/{repo}/tags/protection` | タグ保護ルール一覧を取得（非推奨） |
| `POST` | `/repos/{owner}/{repo}/tags/protection` | タグ保護ルールを作成（非推奨） |
| `DELETE` | `/repos/{owner}/{repo}/tags/protection/{tag_protection_id}` | タグ保護ルールを削除（非推奨） |

## タグ一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/OWNER/REPO/tags?per_page=100"
```

### クエリパラメータ

| パラメータ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `per_page` | integer | 30 | 1ページあたりの件数（最大100） |
| `page` | integer | 1 | ページ番号 |

### レスポンス例

```json
[
  {
    "name": "v1.0.0",
    "zipball_url": "https://api.github.com/repos/OWNER/REPO/zipball/refs/tags/v1.0.0",
    "tarball_url": "https://api.github.com/repos/OWNER/REPO/tarball/refs/tags/v1.0.0",
    "commit": {
      "sha": "abc123def456...",
      "url": "https://api.github.com/repos/OWNER/REPO/commits/abc123def456..."
    },
    "node_id": "MDM6UmVmMTox..."
  }
]
```

> **注意**: このエンドポイントは軽量タグと注釈付きタグの両方を返す。注釈付きタグの詳細情報（タガー、メッセージ等）を取得するには、Git Tags API（`GET /repos/{owner}/{repo}/git/tags/{tag_sha}`）を使用する。

## タグの作成

REST API にはタグ作成の専用エンドポイントはない。タグを作成するには Git References API を使用する。

### 軽量タグの作成

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/git/refs \
  -d '{
    "ref": "refs/tags/v1.0.0",
    "sha": "コミットSHA"
  }'
```

### 注釈付きタグの作成

```bash
# 1. タグオブジェクトを作成
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/git/tags \
  -d '{
    "tag": "v1.0.0",
    "message": "Release v1.0.0",
    "object": "コミットSHA",
    "type": "commit",
    "tagger": {
      "name": "Tagger Name",
      "email": "tagger@example.com",
      "date": "2024-01-01T00:00:00Z"
    }
  }'

# 2. 作成したタグオブジェクトを参照するrefを作成
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/git/refs \
  -d '{
    "ref": "refs/tags/v1.0.0",
    "sha": "タグオブジェクトのSHA"
  }'
```

## タグ保護（非推奨）

> **重要**: タグ保護APIは非推奨。リポジトリルールセット（Repository Rulesets）への移行が推奨される。ルールセットではタグパターンに基づくより柔軟な保護が可能。

### タグ保護ルール一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/tags/protection
```

### タグ保護ルールの作成

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/tags/protection \
  -d '{"pattern": "v*"}'
```

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `pattern` | string | **必須** | 保護するタグのパターン（`*` ワイルドカード可） |

### タグ保護ルールの削除

```bash
curl -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/tags/protection/{tag_protection_id}
```

## ルールセットへの移行

タグ保護の代わりにリポジトリルールセットを使用する:

```bash
# ルールセットでタグ保護を設定
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/rulesets \
  -d '{
    "name": "Tag protection",
    "target": "tag",
    "enforcement": "active",
    "conditions": {
      "ref_name": {
        "include": ["refs/tags/v*"],
        "exclude": []
      }
    },
    "rules": [
      {"type": "creation"},
      {"type": "deletion"}
    ]
  }'
```

## 必要な権限

| 操作 | Fine-grained PAT 権限 |
|------|----------------------|
| タグ一覧の取得 | `contents: read` |
| タグの作成 | `contents: write` |
| タグ保護の読み取り | `administration: read` |
| タグ保護の作成・削除 | `administration: write` |
