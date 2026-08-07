# Copilot User Management API

Organization の Copilot 課金・シート割り当てを管理するエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/copilot/billing` | Copilot サブスクリプション情報・シート内訳・ポリシーの取得 |
| GET | `/orgs/{org}/copilot/billing/seats` | シート割り当て・利用状況の一覧取得 |
| POST | `/orgs/{org}/copilot/billing/selected_teams` | 指定チームへの Copilot アクセス付与 |
| DELETE | `/orgs/{org}/copilot/billing/selected_teams` | 指定チームの Copilot アクセス取り消し |
| POST | `/orgs/{org}/copilot/billing/selected_users` | 指定メンバーへの Copilot アクセス付与 |
| DELETE | `/orgs/{org}/copilot/billing/selected_users` | 指定メンバーの Copilot アクセス取り消し |
| GET | `/orgs/{org}/members/{username}/copilot` | 特定メンバーのシート割り当て・利用状況取得 |

## Notes

- classic PAT は読み取り系（billing 取得・シート一覧）に `manage_billing:copilot` または `read:org` スコープ、書き込み系（チーム/ユーザーの追加・削除）に `manage_billing:copilot` または `admin:org` スコープが必要

## Related

- [usage-metrics.md](./usage-metrics.md)
