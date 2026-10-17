# Copilot Cloud Agent Management API

Copilot cloud agent の設定（enterprise ポリシー・organization の対象リポジトリ）を管理するエンドポイント。出典: https://docs.github.com/en/rest/copilot/copilot-coding-agent-management

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| PUT | `/enterprises/{enterprise}/copilot/policies/coding_agent` | enterprise 全体の cloud agent ポリシー設定 |
| POST | `/enterprises/{enterprise}/copilot/policies/coding_agent/organizations` | 対象 organization を cloud agent ポリシーに追加 |
| DELETE | `/enterprises/{enterprise}/copilot/policies/coding_agent/organizations` | 対象 organization をポリシーから削除 |
| GET | `/orgs/{org}/copilot/coding-agent/permissions` | organization の cloud agent 権限取得（public preview） |
| PUT | `/orgs/{org}/copilot/coding-agent/permissions` | organization の cloud agent 権限設定（public preview） |
| GET | `/orgs/{org}/copilot/coding-agent/permissions/repositories` | 有効化された選択リポジトリ一覧（public preview） |
| PUT | `/orgs/{org}/copilot/coding-agent/permissions/repositories` | 選択リポジトリ一覧の置換（public preview） |
| PUT | `/orgs/{org}/copilot/coding-agent/permissions/repositories/{repository_id}` | リポジトリを有効化（public preview） |
| DELETE | `/orgs/{org}/copilot/coding-agent/permissions/repositories/{repository_id}` | リポジトリを無効化（public preview） |

## 例

```curl
curl -L \
  -X PUT \
  https://api.github.com/enterprises/ENTERPRISE/copilot/policies/coding_agent \
  -d '{
  "policy_state": "enabled_for_all_orgs"
}'
```

## パラメータ

| Endpoint | Name | Type | Description |
|---|---|---|---|
| PUT enterprise policy | `policy_state` (required) | string | `enabled_for_all_orgs` / `disabled_for_all_orgs` / `enabled_for_selected_orgs` / `configured_by_org_admins` |
| POST/DELETE enterprise organizations | `organizations` | array of strings | enterprise 内の organization login |
| POST/DELETE enterprise organizations | `custom_properties` | array of objects | `property_name` (required, string) と `values` (required, array of strings) による絞り込み。いずれかの name/value に一致した organization が対象。1 回限りの操作で、後から property を設定しても policy は自動更新されない |
| PUT org permissions | `enabled_repositories` (required) | string | `all` / `selected` / `none` |
| PUT org permissions/repositories | `selected_repository_ids` (required) | array of integers | cloud agent を有効化するリポジトリ ID |
| GET org permissions/repositories | `per_page` / `page` | integer | 既定 30（最大 100）/ 1 |

GET `/orgs/{org}/copilot/coding-agent/permissions` のレスポンス: `enabled_repositories` (required, `all` / `selected` / `none`)、`selected_repositories_url` (string)。

## 注意事項

- 全エンドポイントは `X-GitHub-Api-Version: 2026-03-10` 前提（原文ヘッダー注記。curl 例では標準ヘッダーを省略）
- enterprise ポリシー設定・organization 追加/削除は enterprise owner のみ。classic PAT / OAuth app トークンは `manage_billing:copilot` または `admin:enterprise` スコープが必要
- organizations の追加/削除は enterprise ポリシーが `enabled_for_selected_orgs` であることが前提。Copilot が有効で enterprise に属する organization のみ影響を受ける
- `/orgs/{org}/copilot/coding-agent/permissions*` は public preview（変更の可能性あり）、`admin:org` スコープが必要
- リポジトリ単位の PUT/DELETE/一括置換は cloud agent のリポジトリポリシーが `selected` のときのみ呼べる（409 の可能性あり）
- 204 成功、400（enterprise 系）、401 / 403 / 404 / 422 / 500 が原文の status code

## Related

- [cloud-agent-management.md](./cloud-agent-management.md)
- [user-management.md](./user-management.md)
