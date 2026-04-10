# Store Signup Offers

Components for offering discounts to users on signup.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

e-commerce

## When to Use

- 新規会員登録時の割引オファーを表示するとき
- メールアドレス登録で割引クーポンを提供する UI が必要なとき
- EC サイトの初回購入促進ポップアップやセクションを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"store-signup-offers"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `store-signup-offer-01` | Store Signup Offer 01 | paid |
| `store-signup-offer-02` | Store Signup Offer 02 | paid |
| `store-signup-offer-03` | Store Signup Offer 03 | paid |
| `store-signup-offer-04` | Store Signup Offer 04 | paid |
