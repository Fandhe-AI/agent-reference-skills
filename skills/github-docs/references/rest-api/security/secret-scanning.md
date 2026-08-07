# Secret Scanning API

リポジトリ・Organization のシークレットスキャンアラートを取得・更新するエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/secret-scanning/alerts` | Organization のアラート一覧取得 |
| GET | `/repos/{owner}/{repo}/secret-scanning/alerts` | リポジトリのアラート一覧取得 |
| GET | `/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}` | 単一アラートの取得 |
| PATCH | `/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}` | アラートのステータス・割り当て・有効性の更新 |
| GET | `/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations` | シークレットが検出された全箇所の取得 |
| POST | `/repos/{owner}/{repo}/secret-scanning/push-protection-bypasses` | Push protection バイパスの作成 |
| GET | `/repos/{owner}/{repo}/secret-scanning/scan-history` | 最新のスキャン履歴の取得 |

## パラメータ

### アラート更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `state` | string | `open`, `resolved` |
| `resolution` | string | `state` が `resolved` の場合必須。`false_positive`, `wont_fix`, `revoked`, `used_in_tests`, `null` |
| `validity` | string | `active`, `inactive`, `unknown`（`null` でオーバーライド解除） |

### push protection バイパス作成パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `reason` | string | `false_positive`, `used_in_tests`, `will_fix_later` |

## Notes

- classic PAT は `repo` スコープまたは `security_events` スコープ（public リポジトリのみなら `public_repo` スコープでも可）が必要。push protection バイパス作成のみ `repo` スコープが必須
- push protection のパターン設定自体は別エンドポイント（`/orgs/{org}/secret-scanning/pattern-configurations`）で管理する

## Related

- [code-scanning.md](./code-scanning.md)
- [secret-scanning-push-protection.md](./secret-scanning-push-protection.md)
