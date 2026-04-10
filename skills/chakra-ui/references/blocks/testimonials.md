# Testimonials

Components for showcasing customer testimonials and feedback.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- 顧客の声・レビューセクションを構築するとき
- ロゴ付きの顧客事例グリッドが必要なとき
- 評価（星）付きのテスティモニアルを表示するとき
- 統計データ付きの推薦文を作るとき
- カード形式やグリッド形式の口コミ表示が必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"testimonials"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `testimonial-centered` | Testimonial Centered | paid | 中央揃えの引用文とアバター付き推薦文 |
| `testimonial-grid-with-logo` | Testimonial Grid With Logo | paid | 企業ロゴ付きのグリッド形式テスティモニアル |
| `testimonial-prominent` | Testimonial Prominent | paid | 大きなアバターと引用文の目立つレイアウト |
| `testimonial-prominent-v2` | Testimonial Prominent V2 | paid | 画像付きの大型テスティモニアルレイアウト |
| `testimonial-simple` | Testimonial Simple | paid | アバターと引用文のシンプルな1件表示 |
| `testimonial-simple-text` | Testimonial Simple Text | free | テキストのみのミニマルな推薦文表示 |
| `testimonial-with-card` | Testimonial With Card | paid | カード形式で複数の推薦文を並べるレイアウト |
| `testimonial-with-mixed-grid` | Testimonial With Mixed Grid | paid | サイズの異なるカードを混合配置したグリッド |
| `testimonial-with-rating` | Testimonial With Rating | paid | 星評価（レーティング）付きテスティモニアル |
| `testimonial-with-stat` | Testimonial With Stat | paid | 統計データ付きのテスティモニアルセクション |
