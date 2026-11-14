# Copilot Code Review API

Copilot code review のポリシー・runner 構成・設定を enterprise / organization / repository 単位で取得・更新するエンドポイント。

公式ドキュメント: https://docs.github.com/en/rest/copilot/copilot-code-review

## Signature / Usage

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/enterprises/{enterprise}/copilot/policies/code-review` | enterprise の code review ポリシー取得 |
| PUT | `/enterprises/{enterprise}/copilot/policies/code-review` | enterprise の code review ポリシー設定 |
| GET | `/orgs/{org}/copilot/policies/code-review` | organization のポリシー（configured / effective）取得 |
| PUT | `/orgs/{org}/copilot/policies/code-review` | organization のポリシー設定 |
| GET | `/orgs/{org}/copilot/code-review/runner` | organization の runner 構成取得 |
| PUT | `/orgs/{org}/copilot/code-review/runner` | organization の runner 構成設定 |
| GET | `/orgs/{org}/copilot/code-review/settings` | organization の設定（default review effort）取得 |
| PATCH | `/orgs/{org}/copilot/code-review/settings` | organization の設定更新 |
| GET | `/repos/{owner}/{repo}/copilot/code-review/settings` | repository の設定取得 |
| PATCH | `/repos/{owner}/{repo}/copilot/code-review/settings` | repository の設定更新 |

`X-GitHub-Api-Version: 2026-03-10` を指定する（公式の curl 例はこのヘッダーを省略）。

```curl
curl -L \
  -X PUT \
  https://api.github.com/orgs/ORG/copilot/code-review/runner \
  -d '{
  "runner_type": "labeled",
  "runner_labels": [
    "copilot-review"
  ],
  "runner_group_name": "copilot-runners",
  "allow_repository_customization": false
}'
```

## Options / Props

| エンドポイント | 主なボディ / レスポンス項目 |
|---|---|
| enterprise policy | `policy_state`: `enabled_for_all_organizations` / `disabled_for_all_organizations` / `configured_by_organization_admins` |
| organization policy | PUT は `enabled` / `disabled`。GET は `configured_state`・`effective_state`・`managed_by`（`enterprise` / `organization`） |
| organization runner | `runner_type`（`standard` / `labeled`）・`runner_labels`・`runner_group_name`・`allow_repository_customization`。GET は `configured_by`（`code_review` / `coding_agent`）も返す |
| organization settings | `default_review_effort`（`inherit` で組織値をクリア）。GET は `available_review_efforts` も返す |
| repository settings | `review_effort`（`inherit` で解除）・`severity_filter`（`no_filter` / `low` / `low_and_medium`）・`custom_instructions_enabled`・`mcp_enabled` |

## Notes

- 認可: enterprise 系は enterprise owner または `read_enterprise_ai_controls` / `write_enterprise_ai_controls` 権限。OAuth app トークン・PAT (classic) は読み取り `read:enterprise`、書き込み `admin:enterprise`。GitHub App トークンと fine-grained PAT は非対応。organization 系は organization owner（`manage_billing:copilot` または `read:org` / `admin:org`）、repository 系は repository admin（`repo` スコープ）
- organization runner を保存するまで、GET は Copilot coding agent の runner 構成から継承した値を `configured_by: coding_agent` で返す。PUT 成功後は `code_review` になる
- `labeled` runner には `runner_labels` か `runner_group_name` が最低 1 つ必要。`standard` runner はラベル・runner group を受け付けない
- repository settings は Copilot code review の有効化そのものは行わない。enterprise / organization のポリシーが無効でも保存できる
- organization settings の PATCH は、組織側で変更不可の設定を送ると `409`（コード `SETTING_NOT_EDITABLE`）になる。リクエスト全体が検証されてから適用されるため、無効な入力では何も変わらない
- Copilot cloud agent の設定は `coding-agent-management.md`、利用状況は `usage-metrics.md`
- Source: https://docs.github.com/en/rest/copilot/copilot-code-review （Article Body API、取得日 2026-11-14）

## Related

- [coding-agent-management.md](./coding-agent-management.md)
- [usage-metrics.md](./usage-metrics.md)
