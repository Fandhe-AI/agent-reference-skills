# Copilot Cloud Agent Repository Management API

リポジトリ単位の Copilot cloud agent 設定を取得するエンドポイント。出典: https://docs.github.com/en/rest/copilot/copilot-cloud-agent-management

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/copilot/cloud-agent/configuration` | MCP server 設定・有効なレビューツール・Actions workflow 承認設定・firewall 設定の取得（public preview） |

## 例

```curl
curl -L \
  -X GET \
  https://api.github.com/repos/OWNER/REPO/copilot/cloud-agent/configuration
```

## レスポンス（200）

| Field | Type | Description |
|---|---|---|
| `mcp_configuration` | object or null | MCP server 設定（additional properties allowed） |
| `enabled_tools` | object | `codeql` / `copilot_code_review` / `secret_scanning` / `dependency_vulnerability_checks`（すべて boolean） |
| `require_actions_workflow_approval` | boolean | Actions workflow 承認要否 |
| `is_firewall_enabled` | boolean | firewall 有効 |
| `is_firewall_recommended_allowlist_enabled` | boolean | 推奨 allowlist 有効 |
| `custom_allowlist` | array of string | カスタム allowlist |
| `is_automations_enabled` | boolean | automations 有効 |
| `require_write_access_for_automation_triggers` | boolean | automation trigger に write 権限を要求 |

## 注意事項

- public preview で変更の可能性あり。classic PAT / OAuth app トークンは `repo` スコープが必要
- `X-GitHub-Api-Version: 2026-03-10` 前提（原文ヘッダー注記）
- status code: 200 / 401 / 403 / 404 / 500

## Related

- [coding-agent-management.md](./coding-agent-management.md)
