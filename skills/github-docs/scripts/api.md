# API

GitHub REST API / GraphQL API への curl によるリクエスト例。

## 認証付き GET リクエスト（Fine-grained PAT）

```sh
curl -H "Authorization: Bearer github_pat_xxxx" \
  https://api.github.com/user
```

## リポジトリ情報の取得

```sh
curl -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO
```

## 個人リポジトリの作成

```sh
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/user/repos \
  -d '{
    "name": "my-repo",
    "description": "A new repository",
    "private": false,
    "auto_init": true
  }'
```

## 組織リポジトリの作成

```sh
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/orgs/ORG/repos \
  -d '{
    "name": "my-repo",
    "private": true
  }'
```

## Issue の作成

```sh
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/issues \
  -d '{"title":"Bug","body":"Description"}'
```

## Issue のクローズ（PATCH）

```sh
curl -X PATCH \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/issues/NUMBER \
  -d '{"state":"closed"}'
```

## リリースの作成

```sh
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/releases \
  -d '{
    "tag_name": "v1.0.0",
    "target_commitish": "main",
    "name": "Release v1.0.0",
    "body": "Description of the release",
    "draft": false,
    "prerelease": false,
    "generate_release_notes": true
  }'
```

## GitHub App インストールアクセストークンの取得

```sh
curl -X POST \
  -H "Authorization: Bearer JWT" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/app/installations/{installation_id}/access_tokens
```

JWT は GitHub App の秘密鍵で生成する（有効期間: 最大 10 分）。取得したインストールアクセストークンは 1 時間有効。

## GitHub App トークンで API を呼び出す

```sh
curl -H "Authorization: Bearer ghs_xxxx" \
  https://api.github.com/repos/OWNER/REPO
```

## GraphQL クエリ（gh api 経由）

```sh
gh api graphql -f query='query { viewer { login } }'
```

## ページネーション付きリクエスト（gh api 経由）

```sh
gh api repos/OWNER/REPO/issues --paginate
```
