# Logos

Displays a grid of your customers' or sponsors' logos.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- 導入企業・パートナーのロゴ一覧を表示するとき
- マーキー（自動スクロール）型のロゴ表示が必要なとき
- グリッドやカード形式のロゴ配置が必要なとき
- 「信頼されている企業」セクションを構築するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"logos"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `logo-aligned-right` | Logo Aligned Right | paid |
| `logo-centered` | Logo Centered | paid |
| `logo-marquee` | Logo Marquee | paid |
| `logo-marquee-in-card` | Logo Marquee In Card | paid |
| `logo-with-grid` | Logo With Grid | paid |
| `logo-within-card` | Logo Within Card | paid |
