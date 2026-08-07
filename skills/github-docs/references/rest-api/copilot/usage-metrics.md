# Copilot Usage Metrics API

Enterprise・Organization 単位で Copilot の利用状況メトリクスレポートを取得するエンドポイント。

## エンドポイント

### Enterprise

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/enterprises/{enterprise}/copilot/metrics/reports/enterprise-1-day` | 日次の Enterprise 全体レポート取得 |
| GET | `/enterprises/{enterprise}/copilot/metrics/reports/enterprise-28-day/latest` | 直近28日間の集計レポート取得 |
| GET | `/enterprises/{enterprise}/copilot/metrics/reports/repos-1-day` | 日次のリポジトリ単位 PR メトリクス取得 |
| GET | `/enterprises/{enterprise}/copilot/metrics/reports/user-teams-1-day` | 日次のユーザー・チーム所属データ取得 |
| GET | `/enterprises/{enterprise}/copilot/metrics/reports/users-1-day` | 日次のユーザー単位利用状況取得 |
| GET | `/enterprises/{enterprise}/copilot/metrics/reports/users-28-day/latest` | 直近28日間のユーザー単位利用状況取得 |

### Organization

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/copilot/metrics/reports/organization-1-day` | 日次の Organization 全体レポート取得 |
| GET | `/orgs/{org}/copilot/metrics/reports/organization-28-day/latest` | 直近28日間の集計レポート取得 |
| GET | `/orgs/{org}/copilot/metrics/reports/repos-1-day` | 日次のリポジトリ単位 PR メトリクス取得 |
| GET | `/orgs/{org}/copilot/metrics/reports/user-teams-1-day` | 日次のユーザー・チーム所属データ取得 |
| GET | `/orgs/{org}/copilot/metrics/reports/users-1-day` | 日次のユーザー単位利用状況取得 |
| GET | `/orgs/{org}/copilot/metrics/reports/users-28-day/latest` | 直近28日間のユーザー単位利用状況取得 |

## Notes

- レポートは日次生成され、有効期限付きの署名付き URL 経由でダウンロードする
- `copilot/billing` に含まれるシート割り当て情報とは別カテゴリ（user-management.md 参照）。`metrics`/`reports` という語は他スキル（`openai-*` / `anthropic-*` の admin 系）の使用状況レポートとは無関係の GitHub 固有 API

## Related

- [user-management.md](./user-management.md)
