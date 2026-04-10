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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `logo-aligned-right` | Logo Aligned Right | paid | 左に見出し・右にロゴグリッドの2カラム構成 |
| `logo-centered` | Logo Centered | paid | テキスト+横並びロゴの中央揃えレイアウト |
| `logo-marquee` | Logo Marquee | paid | 自動スクロール（マーキー）するロゴ表示 |
| `logo-marquee-in-card` | Logo Marquee In Card | paid | カード内ロゴが2段マーキーで流れるレイアウト |
| `logo-with-grid` | Logo With Grid | paid | ボーダー付きグリッドセルにロゴを配置する構成 |
| `logo-within-card` | Logo Within Card | paid | 個別カード内にロゴを配置するグリッド |
