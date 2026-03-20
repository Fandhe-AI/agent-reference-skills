# リポジトリの作成・取得・更新・削除

リポジトリのCRUD操作に関するエンドポイント。

## エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/user/repos` | 認証ユーザーのリポジトリ一覧を取得 |
| `POST` | `/user/repos` | 認証ユーザーのリポジトリを作成 |
| `GET` | `/orgs/{org}/repos` | Organization のリポジトリ一覧を取得 |
| `POST` | `/orgs/{org}/repos` | Organization にリポジトリを作成 |
| `GET` | `/repos/{owner}/{repo}` | リポジトリの詳細を取得 |
| `PATCH` | `/repos/{owner}/{repo}` | リポジトリを更新 |
| `DELETE` | `/repos/{owner}/{repo}` | リポジトリを削除 |
| `GET` | `/users/{username}/repos` | 指定ユーザーのリポジトリ一覧を取得 |
| `GET` | `/repositories` | 全パブリックリポジトリを取得（グローバル） |
| `POST` | `/repos/{template_owner}/{template_repo}/generate` | テンプレートからリポジトリを作成 |
| `POST` | `/repos/{owner}/{repo}/transfer` | リポジトリを別のオーナーに移管 |
| `POST` | `/repos/{owner}/{repo}/forks` | リポジトリをフォーク |
| `GET` | `/repos/{owner}/{repo}/forks` | フォーク一覧を取得 |

## リポジトリ作成

### 個人リポジトリの作成

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/user/repos \
  -d '{
    "name": "my-new-repo",
    "description": "リポジトリの説明",
    "private": true,
    "auto_init": true
  }'
```

### Organization リポジトリの作成

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/orgs/ORG/repos \
  -d '{
    "name": "org-repo",
    "description": "Organizationリポジトリの説明",
    "visibility": "internal",
    "auto_init": true
  }'
```

### 作成パラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| `name` | string | **必須** | - | リポジトリ名 |
| `description` | string | - | `""` | リポジトリの説明 |
| `private` | boolean | - | `false` | プライベートリポジトリにするか |
| `visibility` | string | - | `public` | `public`, `private`, `internal`（Organization のみ） |
| `auto_init` | boolean | - | `false` | READMEで初期化するか |
| `gitignore_template` | string | - | - | .gitignore テンプレート名（例: `Node`, `Python`） |
| `license_template` | string | - | - | ライセンステンプレート（例: `mit`, `apache-2.0`） |
| `homepage` | string | - | - | プロジェクトのURL |
| `has_issues` | boolean | - | `true` | Issue 機能を有効にするか |
| `has_projects` | boolean | - | `true` | Projects 機能を有効にするか |
| `has_wiki` | boolean | - | `true` | Wiki 機能を有効にするか |
| `has_discussions` | boolean | - | `false` | Discussions 機能を有効にするか |
| `team_id` | integer | - | - | Organization リポジトリで管理チームのID |
| `is_template` | boolean | - | `false` | テンプレートリポジトリにするか |
| `allow_squash_merge` | boolean | - | `true` | Squash マージを許可するか |
| `allow_merge_commit` | boolean | - | `true` | マージコミットを許可するか |
| `allow_rebase_merge` | boolean | - | `true` | リベースマージを許可するか |
| `delete_branch_on_merge` | boolean | - | `false` | マージ後にブランチを自動削除するか |

## リポジトリ一覧の取得

### 認証ユーザーのリポジトリ一覧

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/user/repos?type=owner&sort=updated&direction=desc&per_page=100"
```

### フィルタリングパラメータ

| パラメータ | 型 | デフォルト | 値 |
|-----------|-----|-----------|-----|
| `type` | string | `all` | `all`, `owner`, `public`, `private`, `member` |
| `sort` | string | `full_name` | `created`, `updated`, `pushed`, `full_name` |
| `direction` | string | ソートによる | `asc`, `desc` |
| `per_page` | integer | `30` | 1〜100 |
| `page` | integer | `1` | ページ番号 |
| `visibility` | string | `all` | `all`, `public`, `private` |
| `affiliation` | string | `owner,collaborator,organization_member` | カンマ区切りで複数指定可 |
| `since` | string | - | ISO 8601形式の日時 |
| `before` | string | - | ISO 8601形式の日時 |

### Organization のリポジトリ一覧

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/orgs/ORG/repos?type=all&sort=updated&per_page=100"
```

Organization 用フィルタ:

| パラメータ `type` の値 | 説明 |
|----------------------|------|
| `all` | すべて |
| `public` | パブリックのみ |
| `private` | プライベートのみ |
| `forks` | フォークのみ |
| `sources` | フォークでないもの |
| `member` | メンバーのリポジトリ |
| `internal` | 内部リポジトリ（Enterprise のみ） |

## リポジトリの更新

```bash
curl -X PATCH \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO \
  -d '{
    "description": "新しい説明",
    "private": false,
    "default_branch": "main",
    "has_issues": true,
    "has_wiki": false,
    "allow_squash_merge": true,
    "allow_merge_commit": false,
    "delete_branch_on_merge": true
  }'
```

## リポジトリの削除

```bash
curl -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO
```

> **注意**: 削除は取り消し不可。`administration: write` 権限が必要。

## テンプレートからリポジトリを作成

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/TEMPLATE_OWNER/TEMPLATE_REPO/generate \
  -d '{
    "owner": "NEW_OWNER",
    "name": "new-repo-from-template",
    "description": "テンプレートから作成",
    "private": false,
    "include_all_branches": false
  }'
```

## フォーク

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/forks \
  -d '{
    "organization": "MY_ORG",
    "name": "forked-repo",
    "default_branch_only": true
  }'
```

## 必要な権限

| 操作 | Fine-grained PAT 権限 |
|------|----------------------|
| リポジトリの読み取り | `metadata: read` |
| リポジトリの作成 | 権限不要（ユーザー自身の場合）/ `administration: write`（Organization） |
| リポジトリの更新 | `administration: write` |
| リポジトリの削除 | `administration: write` |
| フォーク | `contents: read` + `metadata: read` |
