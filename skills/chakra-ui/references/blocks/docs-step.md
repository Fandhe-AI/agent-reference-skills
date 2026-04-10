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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `step-001` | Step 001 | paid | 左側縦線＋番号バッジのステップ一覧。タイトル＋説明文付き |
| `step-002` | Step 002 | paid | ドット＋グラデーション縦線のステップ。最終ステップでフェードアウト |
