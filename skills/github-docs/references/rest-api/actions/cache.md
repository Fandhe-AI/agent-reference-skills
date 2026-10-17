# Actions Cache API

GitHub Actions のキャッシュの参照・削除、および保持期間（retention）とストレージ上限（storage limit）の取得・設定を行うエンドポイント。

公式ドキュメント: https://docs.github.com/en/rest/actions/cache

## エンドポイント

### キャッシュ使用量・一覧・削除

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/actions/cache/usage` | Organization 全体のキャッシュ使用量 |
| GET | `/orgs/{org}/actions/cache/usage-by-repository` | リポジトリ別のキャッシュ使用量一覧 |
| GET | `/repos/{owner}/{repo}/actions/cache/usage` | リポジトリのキャッシュ使用量 |
| GET | `/repos/{owner}/{repo}/actions/caches` | リポジトリのキャッシュ一覧 |
| DELETE | `/repos/{owner}/{repo}/actions/caches` | キャッシュキー指定で削除（`key` 必須、`ref` 任意） |
| DELETE | `/repos/{owner}/{repo}/actions/caches/{cache_id}` | キャッシュ ID 指定で削除（204） |

### 保持期間・ストレージ上限

各スコープで GET / PUT がある。下位スコープは上位スコープより大きい値を設定できない。

| スコープ | retention-limit パス | storage-limit パス |
|---|---|---|
| Enterprise | `/enterprises/{enterprise}/actions/cache/retention-limit` | `/enterprises/{enterprise}/actions/cache/storage-limit` |
| Organization | `/organizations/{org}/actions/cache/retention-limit` | `/organizations/{org}/actions/cache/storage-limit` |
| Repository | `/repos/{owner}/{repo}/actions/cache/retention-limit` | `/repos/{owner}/{repo}/actions/cache/storage-limit` |

## パラメータ

### List GitHub Actions caches for a repository（クエリ）

| パラメータ | 型 | 説明 |
|---|---|---|
| `per_page` | integer | 1 ページの件数（最大 100、既定 30） |
| `page` | integer | ページ番号（既定 1） |
| `ref` | string | 絞り込む完全な Git ref。ブランチは `refs/heads/<branch name>`、PR は `refs/pull/<number>/merge` |
| `key` | string | キャッシュを識別するキーまたはプレフィックス |
| `sort` | string | `created_at` / `last_accessed_at`（既定） / `size_in_bytes` |
| `direction` | string | `asc` / `desc`（既定） |

### 上限設定（PUT ボディ）

| パラメータ | 型 | 説明 |
|---|---|---|
| `max_cache_retention_days` | integer | キャッシュを保持する最大日数 |
| `max_cache_size_gb` | integer | リポジトリ内の全キャッシュ合計サイズの上限（GB） |

## レスポンス

- キャッシュ一覧: `total_count`, `actions_caches[]`（`id`, `ref`, `key`, `version`, `last_accessed_at`, `created_at`, `size_in_bytes`）
- Organization 使用量: `total_active_caches_count`, `total_active_caches_size_in_bytes`
- リポジトリ別使用量: `total_count`, `repository_cache_usages[]`（`full_name`, `active_caches_size_in_bytes`, `active_caches_count`）
- リポジトリ使用量: `full_name`, `active_caches_size_in_bytes`, `active_caches_count`
- retention-limit GET: `max_cache_retention_days` / storage-limit GET: `max_cache_size_gb`

## 例

```curl
curl -L \
  -X GET \
  https://api.github.com/repos/OWNER/REPO/actions/caches
```

```curl
curl -L \
  -X PUT \
  https://api.github.com/repos/OWNER/REPO/actions/cache/retention-limit \
  -d '{
  "max_cache_retention_days": 80
}'
```

## 注意事項

- 使用量系エンドポイントのデータは約 5 分ごとに更新されるため、反映に 5 分以上かかることがある
- 必要なスコープ: キャッシュ一覧・削除・リポジトリ使用量は `repo`、リポジトリの上限設定は `admin:repository`、Organization の上限設定は `admin:organization`、Organization 使用量は `read:org`
- Enterprise の上限エンドポイントは `admin:enterprise` スコープの OAuth app トークンまたは PAT (classic) が必要。"Enterprise administration" の fine-grained permission は利用不可
- リポジトリ使用量は、リポジトリへの read アクセスがあれば誰でも取得可能（private の場合は `repo` スコープ）
- `DELETE /repos/{owner}/{repo}/actions/caches` は既定でキー一致の全キャッシュを削除し、`ref` を渡すとキーと ref の両方が一致するものに限定する
- Organization の storage-limit PUT の説明文は原文で "All organizations and repositories under this organization" と記載されている
- 全エンドポイントは `X-GitHub-Api-Version: 2026-03-10` を使用（原文記載）

## Related

- [README.md](./README.md)
