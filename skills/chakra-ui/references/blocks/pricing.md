# Pricing

Components for showcasing and comparing your pricing plans effectively.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- 料金プラン比較ページを構築するとき
- シンプルな料金表やアップグレード画面が必要なとき
- 月額/年額切り替えトグル付き料金表を作るとき
- シート数選択スライダー付きの料金計算 UI が必要なとき
- プラン間の機能比較テーブルを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"pricing"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `pricing-simple` | Pricing Simple | free |
| `pricing-upgrade` | Pricing Upgrade | paid |
| `pricing-upgrade-02` | Pricing Upgrade 02 | paid |
| `pricing-with-compare` | Pricing With Compare | paid |
| `pricing-with-feature-info` | Pricing With Feature Info | paid |
| `pricing-with-icon` | Pricing With Icon | paid |
| `pricing-with-seats` | Pricing With Seats | paid |
| `pricing-with-shared-features` | Pricing With Shared Features | paid |
| `pricing-with-slider` | Pricing With Slider | paid |
| `pricing-with-switch-toggle` | Pricing With Switch Toggle | paid |
