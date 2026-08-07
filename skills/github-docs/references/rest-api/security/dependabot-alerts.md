# Dependabot Alerts API

Enterprise・Organization・リポジトリ単位で Dependabot の脆弱性アラートを取得・更新するエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/enterprises/{enterprise}/dependabot/alerts` | Enterprise 配下の全リポジトリのアラート取得 |
| GET | `/orgs/{org}/dependabot/alerts` | Organization 内の全リポジトリのアラート取得 |
| GET | `/repos/{owner}/{repo}/dependabot/alerts` | リポジトリのアラート一覧取得 |
| GET | `/repos/{owner}/{repo}/dependabot/alerts/{alert_number}` | 単一アラートの取得 |
| PATCH | `/repos/{owner}/{repo}/dependabot/alerts/{alert_number}` | ステータス・却下理由・コメント・担当チームの更新 |

## パラメータ

### アラート更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `state` | string | `dismissed`, `open` |
| `dismissed_reason` | string | `state` が `dismissed` の場合必須。`fix_started`, `inaccurate`, `no_bandwidth`, `not_used`, `tolerable_risk` |

## Notes

- classic PAT は Organization/リポジトリ単位のアラートに `security_events` スコープが必要（public リポジトリのみなら `public_repo` スコープでも可）。Enterprise 単位のアラートは `repo` または `security_events` スコープ

## Related

- [dependabot-secrets.md](./dependabot-secrets.md)
- [code-scanning.md](./code-scanning.md)
