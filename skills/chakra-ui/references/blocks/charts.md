# Charts

Components for visualizing data through charts and graphs.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- ダッシュボードにチャートやグラフを配置するとき
- KPI やメトリクスのデータ可視化が必要なとき
- レポート画面にグラフウィジェットを追加するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"charts"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `charts-00` | Charts 00 | paid | 折れ線グラフ（AreaChart）のシンプルなデータ可視化 |
| `charts-01` | Charts 01 | paid | 棒グラフ（BarChart）によるカテゴリ別データ表示 |
| `charts-02` | Charts 02 | paid | 複数系列の折れ線グラフ＋凡例付きチャート |
| `charts-03` | Charts 03 | paid | 円グラフ/ドーナツチャートによるデータ構成比表示 |
| `charts-04` | Charts 04 | paid | KPIカード＋チャートを組み合わせたダッシュボードウィジェット |
