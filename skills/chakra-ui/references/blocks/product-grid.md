# Product Grid

Components for showcasing products in a grid format.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

e-commerce

## When to Use

- EC サイトの商品一覧ページを構築するとき
- 商品カードをグリッド表示するとき
- 価格・画像・タイトル付きの商品リストが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"product-grid"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `product-grid-00` | Product Grid 00 | paid | 2-4カラムSimpleGrid。シンプルな商品カード構成 |
| `product-grid-01` | Product Grid 01 | paid | 隙間なし(gap=0.5)の密集グリッド。カラーピッカー付き |
| `product-grid-02` | Product Grid 02 | paid | 商品画像＋カラーピッカー＋商品情報の詳細カード |
| `product-grid-03` | Product Grid 03 | paid | 全商品表示の2-4カラムグリッド。gap=2の標準間隔 |
| `product-grid-04` | Product Grid 04 | paid | 1-3カラムの大きめカードレイアウト |
