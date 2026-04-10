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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `notification-tray-default-empty-state` | Notification Tray Default Empty State | paid | 通知なし時のデフォルト空状態表示（アイコン＋メッセージ） |
| `notification-tray-default-filled` | Notification Tray Default Filled | paid | 通知リスト付きのデフォルト通知トレイ表示 |
| `notification-tray-with-filter-empty-state` | Notification Tray With Filter Empty State | paid | フィルター機能付き通知トレイの空状態表示 |
| `notification-tray-with-filter-filled` | Notification Tray With Filter Filled | paid | フィルター（種別/未読等）付き通知トレイ＋通知リスト |
| `notification-tray-with-loading` | Notification Tray With Loading | paid | スケルトン/スピナーによる読み込み中の通知トレイ |
| `notification-tray-with-tabs-empty-state` | Notification Tray With Tabs Empty State | paid | タブ切替（All/Unread等）付き通知トレイの空状態 |
| `notification-tray-with-tabs-filled` | Notification Tray With Tabs Filled | paid | タブ切替付き通知トレイ＋通知アイテムリスト |
