# Notifications

Components for displaying notifications and alerts.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- 通知トレイ（ベルアイコンからのドロップダウン）を構築するとき
- 通知一覧の空状態・読み込み状態の UI が必要なとき
- フィルター付きやタブ付きの通知パネルを作るとき
- アプリ内通知センターを構築するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"notifications"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `notification-tray-default-empty-state` | Notification Tray Default Empty State | paid |
| `notification-tray-default-filled` | Notification Tray Default Filled | paid |
| `notification-tray-with-filter-empty-state` | Notification Tray With Filter Empty State | paid |
| `notification-tray-with-filter-filled` | Notification Tray With Filter Filled | paid |
| `notification-tray-with-loading` | Notification Tray With Loading | paid |
| `notification-tray-with-tabs-empty-state` | Notification Tray With Tabs Empty State | paid |
| `notification-tray-with-tabs-filled` | Notification Tray With Tabs Filled | paid |
