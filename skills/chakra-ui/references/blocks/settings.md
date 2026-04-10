# Settings

Components for managing user account settings and preferences.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- ユーザー設定画面を構築するとき（プロフィール、外観、言語、通知、プライバシーなど）
- API キー管理ページが必要なとき
- 請求・課金設定、シート管理、利用量表示を作るとき
- 監査ログ、セッション管理、ロール管理ページが必要なとき
- チーム管理（メンバー招待・権限設定）画面を作るとき
- Webhook 設定画面、データエクスポート画面が必要なとき
- 認証設定（2FA・SSO）画面を構築するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"settings"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `setting-accessibility` | Setting Accessibility | paid |
| `setting-api-key-01` | Setting Api Key 01 | paid |
| `setting-api-key-02` | Setting Api Key 02 | paid |
| `setting-api-key-empty-state` | Setting Api Key Empty State | paid |
| `setting-appearance` | Setting Appearance | paid |
| `setting-audit-log` | Setting Audit Log | paid |
| `setting-authentication` | Setting Authentication | paid |
| `setting-billing` | Setting Billing | paid |
| `setting-billing-seats` | Setting Billing Seats | paid |
| `setting-billing-usage` | Setting Billing Usage | paid |
| `setting-copy-api-key-01` | Setting Copy Api Key 01 | paid |
| `setting-copy-api-key-02` | Setting Copy Api Key 02 | paid |
| `setting-export-data` | Setting Export Data | paid |
| `setting-language` | Setting Language | paid |
| `setting-notification` | Setting Notification | paid |
| `setting-notification-checkbox` | Setting Notification Checkbox | paid |
| `setting-notification-social` | Setting Notification Social | paid |
| `setting-privacy` | Setting Privacy | paid |
| `setting-profile` | Setting Profile | paid |
| `setting-profile-minimal` | Setting Profile Minimal | paid |
| `setting-profile-with-theme` | Setting Profile With Theme | paid |
| `setting-roles` | Setting Roles | paid |
| `setting-sessions` | Setting Sessions | paid |
| `setting-team-01` | Setting Team 01 | paid |
| `setting-team-02` | Setting Team 02 | paid |
| `setting-team-03` | Setting Team 03 | paid |
| `setting-webhooks` | Setting Webhooks | paid |
