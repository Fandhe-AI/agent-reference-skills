# Docs Pagination

Components for navigating through paginated documentation content with previous/next controls and page indicators.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

documentation

## When to Use

- ドキュメントページの前後ナビゲーション（前のページ/次のページ）を構築するとき
- ページインジケーター付きのページネーションが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"docs-pagination"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `pagination-001` | Pagination 001 | paid | 前へ/次へボタンのシンプルなページ送りナビゲーション |
| `pagination-002` | Pagination 002 | paid | カード形式の前後ナビ。ページタイトル＋矢印アイコン付き |
| `pagination-003` | Pagination 003 | paid | フルワイド左右分割の前後ナビ。説明テキスト付き |
