# Code Scanning API

コードスキャンのアラート・解析結果・CodeQL データベース・SARIF アップロードを管理するエンドポイント。

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

## Related

- [secret-scanning.md](./secret-scanning.md)
- [dependabot-alerts.md](./dependabot-alerts.md)
