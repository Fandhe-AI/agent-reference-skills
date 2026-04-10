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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `store-signup-offer-01` | Store Signup Offer 01 | paid | 2カラム（画像+フォーム）。RadioGroup付きの詳細登録 |
| `store-signup-offer-02` | Store Signup Offer 02 | paid | 2カラム（画像+フォーム）。ロゴ＋$100懸賞風テキスト |
| `store-signup-offer-03` | Store Signup Offer 03 | paid | 1カラム中央揃え。ロゴ＋割引見出し＋メール/SMS入力 |
| `store-signup-offer-04` | Store Signup Offer 04 | paid | 2カラム（画像+フォーム）。シンプルなメール登録構成 |
