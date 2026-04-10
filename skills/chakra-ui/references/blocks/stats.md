# Stats

Components for showcasing statistical data and metrics.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- 数値実績（ユーザー数、売上、導入企業数など）を表示するとき
- KPI やメトリクスをカード・ボーダー付きで並べるとき
- ロゴ付きの統計情報セクションを作るとき
- アイコン付きの目立つ統計表示が必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"stats"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `stat-centered` | Stat Centered | free | 中央揃えの数値とラベルを並べたシンプル統計 |
| `stat-centered-with-separator` | Stat Centered With Separator | paid | 区切り線付きの中央揃え統計セクション |
| `stat-with-bottom-border` | Stat With Bottom Border | paid | 下部ボーダー付きの統計カード |
| `stat-with-card` | Stat With Card | paid | Card形式で統計値を表示するレイアウト |
| `stat-with-left-border` | Stat With Left Border | paid | 左ボーダーでアクセントを付けた統計表示 |
| `stat-with-logo` | Stat With Logo | paid | 企業ロゴ付きの統計セクション |
| `stat-with-prominent-icon` | Stat With Prominent Icon | paid | 大きなアイコン付きの統計カード |
| `stat-with-top-border` | Stat With Top Border | paid | 上部ボーダー付きの統計カード |
