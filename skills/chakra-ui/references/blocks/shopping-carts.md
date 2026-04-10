# Shopping Carts

Components for managing shopping cart functionality and displaying cart items.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

e-commerce

## When to Use

- ショッピングカートページを構築するとき
- ミニカート（ヘッダーからのドロップダウン）が必要なとき
- カート内商品の一覧・数量変更・削除 UI を作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"shopping-carts"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `shopping-cart-01` | Shopping Cart 01 | paid |
| `shopping-cart-02` | Shopping Cart 02 | paid |
| `shopping-cart-mini-01` | Shopping Cart Mini 01 | paid |
| `shopping-cart-mini-02` | Shopping Cart Mini 02 | paid |
