# Docs Step

Documentation page step blocks for guiding users through processes with numbered steps and descriptions.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

documentation

## When to Use

- ステップバイステップのガイドを構築するとき
- 番号付きの手順説明セクションが必要なとき
- セットアップやチュートリアルのプロセス表示を作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"docs-step"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `step-001` | Step 001 | paid |
| `step-002` | Step 002 | paid |
