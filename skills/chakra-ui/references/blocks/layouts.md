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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `layout-app-multi-level-navbar` | Layout App Multi Level Navbar | paid | 多段ナビバー（メイン+サブ）＋コンテンツ領域のアプリレイアウト |
| `layout-app-sidebar-column-content` | Layout App Sidebar Column Content | paid | サイドバー＋中間カラム＋メインコンテンツの3カラム構成 |
| `layout-app-two-columns` | Layout App Two Columns | paid | サイドバー＋メインコンテンツの基本2カラムレイアウト |
| `layout-app-width-sidebar` | Layout App Width Sidebar | paid | 幅広サイドバー＋コンテンツ領域のアプリシェル |
| `layout-with-sticky-navbar` | Layout With Sticky Navbar | paid | スクロール時に固定されるナビバー＋コンテンツ領域 |
| `layout-with-sticky-sidebar` | Layout With Sticky Sidebar | paid | スクロール時に固定されるサイドバー＋コンテンツ領域 |
