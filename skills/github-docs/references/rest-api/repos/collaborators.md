# コラボレーター

リポジトリコラボレーターの管理と権限レベルに関するエンドポイント。

## エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/collaborators` | コラボレーター一覧を取得 |
| `GET` | `/repos/{owner}/{repo}/collaborators/{username}` | ユーザーがコラボレーターか確認 |
| `PUT` | `/repos/{owner}/{repo}/collaborators/{username}` | コラボレーターを追加 |
| `DELETE` | `/repos/{owner}/{repo}/collaborators/{username}` | コラボレーターを削除 |
| `GET` | `/repos/{owner}/{repo}/collaborators/{username}/permission` | コラボレーターの権限を取得 |
| `GET` | `/repos/{owner}/{repo}/invitations` | 保留中の招待一覧を取得 |
| `PATCH` | `/repos/{owner}/{repo}/invitations/{invitation_id}` | 招待を更新 |
| `DELETE` | `/repos/{owner}/{repo}/invitations/{invitation_id}` | 招待を削除 |

## 権限レベル

| 権限 | 説明 | 主な操作 |
|------|------|---------|
| `pull` | 読み取り専用 | コードの閲覧、クローン、フォーク |
| `triage` | トリアージ | Issue/PRの管理（ラベル、マイルストーン、アサイン）。コード変更不可 |
| `push` | 書き込み | コードのプッシュ、ブランチの作成・削除 |
| `maintain` | メンテナー | リポジトリ設定の一部変更（破壊的操作を除く） |
| `admin` | 管理者 | リポジトリの全設定変更、コラボレーター管理、削除 |

> **注意**: `triage` と `maintain` は Organization リポジトリでのみ利用可能。個人リポジトリでは `pull`, `push`, `admin` のみ。

## コラボレーター一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/OWNER/REPO/collaborators?per_page=100&affiliation=all"
```

### クエリパラメータ

| パラメータ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `affiliation` | string | `all` | `outside` — 外部コラボレーターのみ、`direct` — 直接招待されたユーザーのみ、`all` — すべて |
| `permission` | string | - | 特定の権限を持つコラボレーターのみ: `pull`, `triage`, `push`, `maintain`, `admin` |
| `per_page` | integer | 30 | 1ページあたりの件数（最大100） |
| `page` | integer | 1 | ページ番号 |

### レスポンス例

```json
[
  {
    "login": "username",
    "id": 12345,
    "avatar_url": "https://avatars.githubusercontent.com/u/12345",
    "type": "User",
    "site_admin": false,
    "permissions": {
      "admin": false,
      "maintain": false,
      "push": true,
      "triage": true,
      "pull": true
    },
    "role_name": "write"
  }
]
```

## コラボレーターの確認

ユーザーがコラボレーターかどうかを確認する。

```bash
curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/collaborators/USERNAME
```

| ステータスコード | 意味 |
|----------------|------|
| `204` | コラボレーターである |
| `404` | コラボレーターではない |

## コラボレーターの追加

```bash
curl -X PUT \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/collaborators/USERNAME \
  -d '{"permission": "push"}'
```

### パラメータ

| パラメータ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `permission` | string | `push` | 付与する権限: `pull`, `triage`, `push`, `maintain`, `admin` |

### レスポンス

| ステータスコード | 説明 |
|----------------|------|
| `201 Created` | 招待が送信された（新規招待） |
| `204 No Content` | 既にコラボレーターである（権限更新の場合も） |

### 招待レスポンス例（201）

```json
{
  "id": 12345,
  "repository": {
    "id": 67890,
    "name": "repo-name",
    "full_name": "OWNER/repo-name"
  },
  "invitee": {
    "login": "USERNAME",
    "id": 11111
  },
  "inviter": {
    "login": "OWNER",
    "id": 22222
  },
  "permissions": "write",
  "created_at": "2024-01-01T00:00:00Z",
  "html_url": "https://github.com/OWNER/repo-name/invitations"
}
```

## コラボレーターの削除

```bash
curl -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/collaborators/USERNAME
```

レスポンス: `204 No Content`

## コラボレーターの権限取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/collaborators/USERNAME/permission
```

### レスポンス例

```json
{
  "permission": "admin",
  "role_name": "admin",
  "user": {
    "login": "USERNAME",
    "id": 12345,
    "type": "User"
  }
}
```

## 保留中の招待

### 招待一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/invitations?per_page=100"
```

### 招待の権限を更新

```bash
curl -X PATCH \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/invitations/{invitation_id} \
  -d '{"permissions": "maintain"}'
```

### 招待の取り消し

```bash
curl -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/invitations/{invitation_id}
```

## 必要な権限

| 操作 | Fine-grained PAT 権限 |
|------|----------------------|
| コラボレーター一覧の読み取り | `metadata: read` |
| コラボレーターの追加・削除 | `administration: write` |
| 権限の取得 | `metadata: read` |
| 招待の管理 | `administration: write` |
