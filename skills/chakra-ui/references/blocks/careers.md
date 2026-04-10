# Careers

Components for showcasing job openings and career opportunities.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- 採用情報・求人一覧ページを構築するとき
- 職種カードの 2 カラムレイアウトが必要なとき
- アコーディオン形式の求人リストを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"careers"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `career-two-columns-card` | Career Two Columns Card | paid | 2カラムCard形式の求人情報一覧 |
| `career-with-accordion` | Career With Accordion | paid | 部門別アコーディオン形式の求人リスト |
