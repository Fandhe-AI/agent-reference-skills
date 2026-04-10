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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `api-header` | Api Header | paid | HTTPメソッド＋エンドポイントURL表示のAPIリファレンス用ヘッダー |
| `header-with-actions` | Header With Actions | paid | パンくずリスト＋タイトル＋アクションボタン群のヘッダー |
| `simple-header` | Simple Header | paid | パンくずリスト＋タイトル＋説明文のシンプルヘッダー |
