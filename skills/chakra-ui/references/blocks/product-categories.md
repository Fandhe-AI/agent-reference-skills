# Product Categories

Components for showcasing e-commerce product categories.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

e-commerce

## When to Use

- EC サイトのカテゴリ一覧ページを構築するとき
- 商品カテゴリをグリッド形式で表示するとき
- カテゴリ画像付きのナビゲーションセクションが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"product-categories"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `category-grid-00` | Category Grid 00 | paid | シンプルな画像+テキストの均等グリッドレイアウト |
| `category-grid-01` | Category Grid 01 | paid | カード形式のカテゴリグリッド。丸角画像+カテゴリ名 |
| `category-grid-02` | Category Grid 02 | paid | オーバーレイテキスト付きの画像グリッド |
| `category-grid-03` | Category Grid 03 | paid | 不均等サイズのカテゴリグリッド（メイン+サブ構成） |
| `category-grid-04` | Category Grid 04 | paid | 横長バナー形式のカテゴリ一覧レイアウト |
| `category-grid-05` | Category Grid 05 | paid | フルワイド画像とテキストオーバーレイのグリッド |
