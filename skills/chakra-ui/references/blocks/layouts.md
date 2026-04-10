# Layouts

Components for building complex page layouts and structures.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- アプリケーション全体のページレイアウト構造を決めるとき
- サイドバー + コンテンツの 2 カラムレイアウトが必要なとき
- マルチレベルナビバー付きレイアウトを構築するとき
- スティッキーナビバーやスティッキーサイドバーを含むレイアウトが必要なとき
- アプリの骨格（シェル）を素早く構築したいとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"layouts"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `layout-app-multi-level-navbar` | Layout App Multi Level Navbar | paid |
| `layout-app-sidebar-column-content` | Layout App Sidebar Column Content | paid |
| `layout-app-two-columns` | Layout App Two Columns | paid |
| `layout-app-width-sidebar` | Layout App Width Sidebar | paid |
| `layout-with-sticky-navbar` | Layout With Sticky Navbar | paid |
| `layout-with-sticky-sidebar` | Layout With Sticky Sidebar | paid |
