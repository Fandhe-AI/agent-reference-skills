# Docs Navbar

Components for navigating through documentation pages.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

documentation

## When to Use

- ドキュメントサイトのトップナビゲーションを構築するとき
- 検索・バージョン切り替え付きのドキュメントナビバーが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"docs-navbar"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `navbar-001` | Navbar 001 | paid | ロゴ＋ナビリンク＋検索＋バージョン切替の標準構成 |
| `navbar-002` | Navbar 002 | paid | ロゴ＋中央検索バー＋テーマ切替ボタンの構成 |
| `navbar-003` | Navbar 003 | paid | ドロップダウンメニュー付きの多階層ナビバー |
| `navbar-004` | Navbar 004 | paid | コンパクトなロゴ＋ナビリンク＋検索アイコン構成 |
| `navbar-005` | Navbar 005 | paid | 左右分割のナビバー。アクションボタン群を右側に配置 |
| `navbar-006` | Navbar 006 | paid | モバイル対応ハンバーガーメニュー付きナビバー |
