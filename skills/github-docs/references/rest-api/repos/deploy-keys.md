# デプロイキー

リポジトリのデプロイキー管理に関するエンドポイント。

## エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/keys` | デプロイキー一覧を取得 |
| `POST` | `/repos/{owner}/{repo}/keys` | デプロイキーを作成 |
| `GET` | `/repos/{owner}/{repo}/keys/{key_id}` | デプロイキーの詳細を取得 |
| `DELETE` | `/repos/{owner}/{repo}/keys/{key_id}` | デプロイキーを削除 |

## デプロイキーとは

デプロイキーはリポジトリに登録されるSSH公開鍵。サーバーやCI/CD環境からリポジトリにアクセスするために使用される。

### 特徴

- リポジトリ単位で設定される（ユーザーのSSH鍵とは異なる）
- 読み取り専用または読み書き可能を選択できる
- 1つの鍵は1つのリポジトリにのみ登録可能（同じ鍵を複数リポジトリに使い回し不可）
- **デプロイキーは不変（immutable）** — 設定を変更するには削除して再作成が必要

## デプロイキー一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/OWNER/REPO/keys?per_page=100"
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
    "id": 12345,
    "key": "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA...",
    "url": "https://api.github.com/repos/OWNER/REPO/keys/12345",
    "title": "production-server",
    "verified": true,
    "created_at": "2024-01-01T00:00:00Z",
    "read_only": true,
    "added_by": "admin-user",
    "last_used": "2024-06-15T10:30:00Z"
  }
]
```

## デプロイキーの作成

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/keys \
  -d '{
    "title": "production-server",
    "key": "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... deploy@production",
    "read_only": true
  }'
```

### 作成パラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| `title` | string | - | - | デプロイキーのタイトル（識別用） |
| `key` | string | **必須** | - | SSH公開鍵の文字列 |
| `read_only` | boolean | - | `true` | `true`: 読み取り専用、`false`: 読み書き可能 |

### `read_only` オプション

| 値 | 説明 | 用途 |
|-----|------|------|
| `true`（推奨） | リポジトリの読み取りのみ可能（clone, fetch） | デプロイ用、CI/CDのコード取得 |
| `false` | リポジトリへの書き込みも可能（push） | 自動コミット、自動リリース |

### SSH鍵の生成

```bash
# Ed25519（推奨）
ssh-keygen -t ed25519 -C "deploy@production" -f deploy_key -N ""

# RSA（互換性が必要な場合）
ssh-keygen -t rsa -b 4096 -C "deploy@production" -f deploy_key -N ""

# 公開鍵の内容を表示（APIに渡す値）
cat deploy_key.pub
```

### レスポンス例（201 Created）

```json
{
  "id": 12345,
  "key": "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA...",
  "url": "https://api.github.com/repos/OWNER/REPO/keys/12345",
  "title": "production-server",
  "verified": true,
  "created_at": "2024-01-01T00:00:00Z",
  "read_only": true
}
```

### エラーケース

| ステータス | 原因 |
|-----------|------|
| `422 Unprocessable Entity` | 鍵の形式が不正、または同じ鍵が既に別のリポジトリに登録されている |

## デプロイキーの詳細取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/keys/{key_id}
```

## デプロイキーの削除

```bash
curl -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/keys/{key_id}
```

レスポンス: `204 No Content`

## デプロイキーの更新について

**デプロイキーは不変（immutable）であるため、直接更新する API は存在しない。** 設定を変更するには以下の手順を踏む:

1. 既存のデプロイキーを `DELETE` で削除
2. 新しい設定で `POST` で再作成

```bash
# 1. 削除
curl -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/keys/{key_id}

# 2. 新しい設定で再作成
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/keys \
  -d '{
    "title": "production-server",
    "key": "ssh-ed25519 NEW_KEY...",
    "read_only": false
  }'
```

## 注意事項

- 同じSSH公開鍵を複数のリポジトリに登録することはできない。複数リポジトリにアクセスが必要な場合は、GitHub App やユーザーのSSH鍵を使用する
- デプロイキーの秘密鍵は安全に管理すること。CI/CDサービスのシークレット機能を利用する
- 不要になったデプロイキーは速やかに削除する
- 読み書き可能なデプロイキーは必要最小限に留める（デフォルトの `read_only: true` を推奨）

## 必要な権限

| 操作 | Fine-grained PAT 権限 |
|------|----------------------|
| デプロイキー一覧の読み取り | `administration: read` |
| デプロイキーの作成・削除 | `administration: write` |
