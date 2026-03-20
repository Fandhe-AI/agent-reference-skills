# ブランチ

ブランチの管理とブランチ保護ルールに関するエンドポイント。

## エンドポイント一覧

### ブランチ管理

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/branches` | ブランチ一覧を取得 |
| `GET` | `/repos/{owner}/{repo}/branches/{branch}` | ブランチの詳細を取得 |
| `POST` | `/repos/{owner}/{repo}/branches/{branch}/rename` | ブランチ名を変更 |
| `POST` | `/repos/{owner}/{repo}/merge-upstream` | フォーク元の変更をマージ |
| `POST` | `/repos/{owner}/{repo}/merges` | ブランチ間のマージ |

### ブランチ保護

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/branches/{branch}/protection` | ブランチ保護の設定を取得 |
| `PUT` | `/repos/{owner}/{repo}/branches/{branch}/protection` | ブランチ保護を設定 |
| `DELETE` | `/repos/{owner}/{repo}/branches/{branch}/protection` | ブランチ保護を削除 |
| `GET` | `.../protection/required_status_checks` | 必須ステータスチェックを取得 |
| `PATCH` | `.../protection/required_status_checks` | 必須ステータスチェックを更新 |
| `DELETE` | `.../protection/required_status_checks` | 必須ステータスチェックを削除 |
| `GET` | `.../protection/required_pull_request_reviews` | 必須PRレビュー設定を取得 |
| `PATCH` | `.../protection/required_pull_request_reviews` | 必須PRレビュー設定を更新 |
| `DELETE` | `.../protection/required_pull_request_reviews` | 必須PRレビュー設定を削除 |
| `GET` | `.../protection/enforce_admins` | 管理者への適用設定を取得 |
| `POST` | `.../protection/enforce_admins` | 管理者にも保護を適用 |
| `DELETE` | `.../protection/enforce_admins` | 管理者への適用を解除 |
| `GET` | `.../protection/restrictions` | プッシュ制限を取得 |
| `DELETE` | `.../protection/restrictions` | プッシュ制限を削除 |

## ブランチ一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/OWNER/REPO/branches?per_page=100&protected=false"
```

### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `protected` | boolean | `true` の場合、保護されたブランチのみ返す |
| `per_page` | integer | 1ページあたりの件数（最大100） |
| `page` | integer | ページ番号 |

## ブランチの詳細取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/branches/main
```

### レスポンス例

```json
{
  "name": "main",
  "commit": {
    "sha": "abc123...",
    "url": "https://api.github.com/repos/OWNER/REPO/commits/abc123..."
  },
  "protected": true,
  "protection": {
    "enabled": true,
    "required_status_checks": {
      "enforcement_level": "non_admins",
      "contexts": ["ci/build", "ci/test"]
    }
  },
  "protection_url": "https://api.github.com/repos/OWNER/REPO/branches/main/protection"
}
```

## ブランチ名の変更

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/branches/old-name/rename \
  -d '{"new_name": "new-name"}'
```

> **注意**: ブランチ保護ルール、オープンPR、ドラフトリリースのターゲットブランチも自動的に更新される。

## フォーク元の変更をマージ（merge-upstream）

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/merge-upstream \
  -d '{"branch": "main"}'
```

## ブランチ間のマージ

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/merges \
  -d '{
    "base": "main",
    "head": "feature-branch",
    "commit_message": "Merge feature-branch into main"
  }'
```

### マージパラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `base` | string | **必須** | マージ先ブランチ |
| `head` | string | **必須** | マージ元ブランチ |
| `commit_message` | string | - | マージコミットのメッセージ |

### レスポンスステータス

| ステータス | 説明 |
|-----------|------|
| `201 Created` | マージ成功 |
| `204 No Content` | 既にマージ済み（何も起きない） |
| `404 Not Found` | ブランチが存在しない |
| `409 Conflict` | マージコンフリクトが発生 |

## ブランチ保護の設定

```bash
curl -X PUT \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/branches/main/protection \
  -d '{
    "required_status_checks": {
      "strict": true,
      "contexts": ["ci/build", "ci/test"]
    },
    "enforce_admins": true,
    "required_pull_request_reviews": {
      "dismissal_restrictions": {
        "users": ["admin-user"],
        "teams": ["admin-team"]
      },
      "dismiss_stale_reviews": true,
      "require_code_owner_reviews": true,
      "required_approving_review_count": 2,
      "require_last_push_approval": true
    },
    "restrictions": {
      "users": ["deploy-user"],
      "teams": ["release-team"],
      "apps": ["ci-app"]
    },
    "required_linear_history": true,
    "allow_force_pushes": false,
    "allow_deletions": false,
    "block_creations": false,
    "required_conversation_resolution": true,
    "lock_branch": false,
    "allow_fork_syncing": false
  }'
```

### ブランチ保護パラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `required_status_checks` | object/null | **必須** | 必須ステータスチェック（`null` で無効） |
| `required_status_checks.strict` | boolean | **必須** | マージ前にブランチが最新であることを要求 |
| `required_status_checks.contexts` | array | **必須** | 必須チェック名の配列 |
| `enforce_admins` | boolean/null | **必須** | 管理者にもルールを適用するか |
| `required_pull_request_reviews` | object/null | **必須** | 必須PRレビュー設定（`null` で無効） |
| `required_pull_request_reviews.required_approving_review_count` | integer | - | 必要な承認レビュー数（1〜6） |
| `required_pull_request_reviews.dismiss_stale_reviews` | boolean | - | 新しいプッシュで古いレビューを却下 |
| `required_pull_request_reviews.require_code_owner_reviews` | boolean | - | コードオーナーのレビューを必須にする |
| `required_pull_request_reviews.require_last_push_approval` | boolean | - | 最後のプッシュ者以外の承認を必須にする |
| `restrictions` | object/null | **必須** | プッシュできるユーザー/チーム/アプリの制限（`null` で無制限） |
| `required_linear_history` | boolean | - | リニアな履歴を要求（マージコミット禁止） |
| `allow_force_pushes` | boolean | - | フォースプッシュを許可 |
| `allow_deletions` | boolean | - | ブランチ削除を許可 |
| `required_conversation_resolution` | boolean | - | マージ前に会話の解決を必須にする |
| `lock_branch` | boolean | - | ブランチをロック（読み取り専用） |

## 必要な権限

| 操作 | Fine-grained PAT 権限 |
|------|----------------------|
| ブランチの読み取り | `contents: read` |
| ブランチ名の変更・マージ | `contents: write` |
| ブランチ保護の読み取り | `administration: read` |
| ブランチ保護の設定・削除 | `administration: write` |
