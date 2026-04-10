# Footers

Essential bottom sections featuring navigation, contact details, and vital site-wide information.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- サイトフッターを構築するとき
- 複数カラムのリンク付きフッターが必要なとき
- SNS リンク付きフッターを作るとき
- 住所・連絡先付きのフッターが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"footers"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `footer-with-address` | Footer With Address | paid | 住所・連絡先情報付きのフッター |
| `footer-with-four-columns` | Footer With Four Columns | paid | 4カラムリンクグループ付きのフッター |
| `footer-with-links-centered` | Footer With Links Centered | paid | 中央揃えリンク一覧のフッター |
| `footer-with-logo-below` | Footer With Logo Below | paid | 下部にロゴを配置したフッター |
| `footer-with-social` | Footer With Social | free | SNSアイコンリンク付きのフッター |
