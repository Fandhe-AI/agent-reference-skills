# Docs Header

Documentation page headers with breadcrumbs, titles, and API endpoint displays.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

documentation

## When to Use

- ドキュメントページのヘッダー（タイトル + パンくずリスト）を構築するとき
- API リファレンスのエンドポイント表示ヘッダーが必要なとき
- アクションボタン付きのドキュメントヘッダーを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"docs-header"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `api-header` | Api Header | paid |
| `header-with-actions` | Header With Actions | paid |
| `simple-header` | Simple Header | paid |
