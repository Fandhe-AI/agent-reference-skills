# Product Reviews

Components for displaying reviews of products.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

e-commerce

## When to Use

- 商品レビュー・評価セクションを構築するとき
- 星評価付きのカスタマーレビュー一覧が必要なとき
- レビュー投稿フォーム付きのレビューページを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"product-reviews"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `product-reviews-01` | Product Reviews 01 | paid | 星評価＋テキストレビューのリスト形式。アバター付き |
| `product-reviews-02` | Product Reviews 02 | paid | 評価分布バー＋レビュー一覧の2カラム構成 |
| `product-reviews-03` | Product Reviews 03 | paid | カード形式のレビュー。いいねボタン＋日付表示付き |
| `product-reviews-04` | Product Reviews 04 | paid | レビュー投稿フォーム付き。星評価入力＋テキストエリア |
