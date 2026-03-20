# コミット

コミットの一覧取得・詳細・比較・ステータス管理に関するエンドポイント。

## エンドポイント一覧

### コミット

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/commits` | コミット一覧を取得 |
| `GET` | `/repos/{owner}/{repo}/commits/{ref}` | コミットの詳細を取得 |
| `GET` | `/repos/{owner}/{repo}/compare/{basehead}` | 2つのコミットを比較 |
| `GET` | `/repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head` | コミットがHEADであるブランチ一覧 |
| `GET` | `/repos/{owner}/{repo}/commits/{commit_sha}/pulls` | コミットに関連するPR一覧 |

### コミットステータス

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/commits/{ref}/status` | 統合ステータスを取得 |
| `GET` | `/repos/{owner}/{repo}/commits/{ref}/statuses` | ステータス一覧を取得 |
| `POST` | `/repos/{owner}/{repo}/statuses/{sha}` | ステータスを作成 |

## コミット一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/OWNER/REPO/commits?sha=main&per_page=100"
```

### クエリパラメータ

| パラメータ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `sha` | string | デフォルトブランチ | ブランチ名またはコミットSHA |
| `path` | string | - | 指定パスに影響するコミットのみ取得 |
| `author` | string | - | 著者のGitHubユーザー名またはメールアドレス |
| `committer` | string | - | コミッターのGitHubユーザー名またはメールアドレス |
| `since` | string | - | この日時以降のコミット（ISO 8601） |
| `until` | string | - | この日時以前のコミット（ISO 8601） |
| `per_page` | integer | 30 | 1ページあたりの件数（最大100） |
| `page` | integer | 1 | ページ番号 |

### 使用例

```bash
# 特定ファイルに関するコミット一覧
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/commits?path=src/index.js&per_page=10"

# 特定期間のコミット
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/commits?since=2024-01-01T00:00:00Z&until=2024-12-31T23:59:59Z"

# 特定著者のコミット
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/commits?author=username"
```

## コミットの詳細取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/commits/abc123def456
```

`{ref}` には以下を指定可能:

- コミットSHA（フル or 短縮）
- ブランチ名
- タグ名

### レスポンスに含まれる情報

- コミットメッセージ、著者、コミッター、日時
- 変更されたファイル一覧（`files` 配列）
- 各ファイルの変更統計（`additions`, `deletions`, `changes`）
- パッチ（差分）

## コミットの比較

```bash
# ブランチ間の比較
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/compare/main...feature-branch

# コミットSHA間の比較
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/compare/abc123...def456

# タグ間の比較
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/compare/v1.0.0...v2.0.0
```

### `basehead` の形式

- `{base}...{head}` — 3ドット比較（baseとheadの共通祖先からheadまでの差分）
- `{base}..{head}` — 2ドット比較（baseからheadまでの直接差分）

### レスポンスに含まれる情報

```json
{
  "status": "ahead",
  "ahead_by": 5,
  "behind_by": 0,
  "total_commits": 5,
  "commits": [...],
  "files": [...],
  "diff_url": "https://github.com/OWNER/REPO/compare/main...feature.diff",
  "patch_url": "https://github.com/OWNER/REPO/compare/main...feature.patch"
}
```

| フィールド | 説明 |
|-----------|------|
| `status` | `diverged`, `ahead`, `behind`, `identical` |
| `ahead_by` | head が base より進んでいるコミット数 |
| `behind_by` | head が base より遅れているコミット数 |
| `total_commits` | 比較対象のコミット総数 |
| `commits` | コミットオブジェクトの配列（最大250件） |
| `files` | 変更ファイルの配列（最大300件） |

> **注意**: 比較結果のコミットは最大250件、ファイルは最大300件に制限される。それ以上の場合はGit Trees APIを使用。

## コミットがHEADであるブランチ

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/commits/abc123/branches-where-head
```

## コミットに関連するPR

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/commits/abc123/pulls
```

## コミットステータス

### 統合ステータスの取得

すべてのステータスを統合した結果を返す。

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/commits/abc123/status
```

#### 統合ステータスの `state` 値

| state | 説明 |
|-------|------|
| `success` | すべてのステータスが `success` |
| `pending` | いずれかのステータスが `pending` |
| `failure` | いずれかのステータスが `failure` または `error` |

### ステータス一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/commits/abc123/statuses?per_page=100"
```

### ステータスの作成

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/statuses/abc123def456 \
  -d '{
    "state": "success",
    "target_url": "https://ci.example.com/build/123",
    "description": "ビルド成功",
    "context": "ci/build"
  }'
```

### ステータス作成パラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `state` | string | **必須** | `error`, `failure`, `pending`, `success` |
| `target_url` | string | - | 詳細ページのURL |
| `description` | string | - | ステータスの説明（最大140文字） |
| `context` | string | - | ステータスの識別子（デフォルト: `default`） |

> **注意**: 同じ `context` で新しいステータスを作成すると、以前のステータスを上書きする。

## 必要な権限

| 操作 | Fine-grained PAT 権限 |
|------|----------------------|
| コミットの読み取り | `contents: read` |
| コミットステータスの読み取り | `statuses: read` |
| コミットステータスの作成 | `statuses: write` |
