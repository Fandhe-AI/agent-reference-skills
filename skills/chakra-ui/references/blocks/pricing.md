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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `pricing-simple` | Pricing Simple | free | シンプルなプランカード並列の料金表 |
| `pricing-upgrade` | Pricing Upgrade | paid | 現在プランからのアップグレード促進UI |
| `pricing-upgrade-02` | Pricing Upgrade 02 | paid | 機能比較付きアップグレード促進レイアウト |
| `pricing-with-compare` | Pricing With Compare | paid | プラン間の機能比較テーブル付き料金表 |
| `pricing-with-feature-info` | Pricing With Feature Info | paid | 各プランに詳細な機能情報を表示する料金表 |
| `pricing-with-icon` | Pricing With Icon | paid | アイコン付き機能リストを含む料金カード |
| `pricing-with-seats` | Pricing With Seats | paid | シート数選択スライダー付きの料金計算UI |
| `pricing-with-shared-features` | Pricing With Shared Features | paid | 共通機能セクション付きのプラン比較レイアウト |
| `pricing-with-slider` | Pricing With Slider | paid | スライダーで価格帯を調整できる料金表 |
| `pricing-with-switch-toggle` | Pricing With Switch Toggle | paid | 月額/年額切替トグル付きの料金表 |
