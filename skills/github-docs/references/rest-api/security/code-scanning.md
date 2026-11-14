# Code Scanning API

コードスキャンのアラート・解析結果・CodeQL データベース・SARIF アップロードを管理するエンドポイント。

公式ドキュメント: https://docs.github.com/en/rest/code-scanning/code-scanning

## エンドポイント

### アラート

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/code-scanning/alerts` | Organization 内の全リポジトリのアラート一覧取得 |
| GET | `/repos/{owner}/{repo}/code-scanning/alerts` | リポジトリのアラート一覧取得 |
| GET | `/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}` | 単一アラートの取得 |
| PATCH | `/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}` | アラートのステータス更新 |
| GET | `/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix` | Autofix のステータス・説明を取得 |
| POST | `/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix` | Autofix の生成をリクエスト |
| POST | `/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix/commits` | Autofix をコミットとして適用 |
| GET | `/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances` | アラートの全インスタンス取得 |

### 解析結果

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/code-scanning/analyses` | 解析結果一覧取得 |
| GET | `/repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}` | 単一解析結果の取得 |
| DELETE | `/repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}` | 解析結果の削除 |

### CodeQL データベース・variant analysis

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/code-scanning/codeql/databases` | 利用可能な CodeQL データベース一覧取得 |
| GET | `/repos/{owner}/{repo}/code-scanning/codeql/databases/{language}` | 言語別 CodeQL データベース取得 |
| DELETE | `/repos/{owner}/{repo}/code-scanning/codeql/databases/{language}` | CodeQL データベースの削除 |
| POST | `/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses` | 複数リポジトリ横断の variant analysis 作成 |
| GET | `/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}` | variant analysis のサマリー取得 |
| GET | `/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}/repos/{repo_owner}/{repo_name}` | variant analysis のリポジトリ別ステータス取得 |

### デフォルトセットアップ・SARIF

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/code-scanning/default-setup` | デフォルトセットアップ設定の取得 |
| PATCH | `/repos/{owner}/{repo}/code-scanning/default-setup` | デフォルトセットアップ設定の更新 |
| POST | `/repos/{owner}/{repo}/code-scanning/sarifs` | SARIF 形式の解析結果アップロード |
| GET | `/repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}` | SARIF アップロードのステータス取得 |

## パラメータ

### アラート更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `state` | string | `open`, `closed`, `dismissed`, `fixed` |
| `dismissed_reason` | string | `state` が `dismissed` の場合必須。`false positive`, `won't fix`, `used in tests`, `null` |

## Notes

- classic PAT は `security_events` スコープ（public リポジトリのみなら `public_repo` スコープでも可）が必要
- SARIF アップロードは非同期処理。`GET /sarifs/{sarif_id}` でステータスをポーリングする
- Source: https://docs.github.com/en/rest/code-scanning/code-scanning (Article Body API, fetched 2026-11-14)

### AI Scan (public preview)

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/{org}/code-scanning/ai-scan` | Get the AI Scan setting for an organization (`pr_scan` / `repository_scan`) |
| PATCH | `/orgs/{org}/code-scanning/ai-scan` | Update the AI Scan setting for an organization |
| GET | `/repos/{owner}/{repo}/code-scanning/ai-scan` | Get AI Scan enablement for a repository |
| PATCH | `/repos/{owner}/{repo}/code-scanning/ai-scan` | Update AI Scan enablement for a repository |

```curl
curl -L \
  -X PATCH \
  https://api.github.com/orgs/ORG/code-scanning/ai-scan \
  -d '{
  "pr_scan": "enabled",
  "repository_scan": "enabled"
}'
```

- `pr_scan` covers AI Scan for pull requests; `repository_scan` (added 2026-11-13) covers AI Scan for repositories. Values are `enabled` / `disabled`. A disabled organization prevents its repositories from enabling it; an enabled organization lets repositories inherit it and opt out individually
- When an enterprise policy does not allow AI Scan, enabling returns `422`. Both settings can be updated in one request; if either change is blocked, neither changes
- Permissions: organization endpoints need an owner or security manager (`admin:org`, `repo` or `write:org`; security managers need `write:org`); repository endpoints need `repo` (or `public_repo` for public-only)
- Source: https://github.blog/changelog/2026-11-13-manage-ai-scan-for-repositories-using-the-rest-api (fetched 2026-11-14)

## Related

- [secret-scanning.md](./secret-scanning.md)
- [dependabot-alerts.md](./dependabot-alerts.md)
