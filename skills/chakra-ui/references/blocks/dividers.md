# Dividers

Components for separating sections and content on your website.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- セクション間の区切り線にアクションを追加したいとき
- 「もっと見る」ボタン付きのディバイダーが必要なとき
- テキストラベル付きの区切り線（例: 「または」）を配置するとき
- アイコンボタンやボタングループ付きの区切り線が必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"dividers"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `divider-with-button` | Divider With Button | paid | 区切り線の中央にoutlineボタン（+Create）を配置 |
| `divider-with-button-group` | Divider With Button Group | paid | 区切り線の中央にattached IconButtonグループ（左右矢印+追加）を配置 |
| `divider-with-icon-button` | Divider With Icon Button | paid | 区切り線の中央にghost IconButton（+アイコン）を配置 |
| `divider-with-text` | Divider With Text | paid | 区切り線の中央にテキストラベルを配置 |
