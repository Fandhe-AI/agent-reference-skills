# Docs Example Preview

Interactive components that showcase code examples with live preview and code view toggle.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

documentation

## When to Use

- ドキュメント内にライブプレビュー + コード表示の切り替え UI を作るとき
- コンポーネントのデモ表示が必要なとき
- インタラクティブなコード例の表示が必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"docs-example-preview"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `example-preview-001` | Example Preview 001 | paid | プレビュー/コード切替タブ。ライブデモ＋コード表示 |
| `example-preview-002` | Example Preview 002 | paid | プレビュー上部＋コード下部の分割パネル構成 |
| `example-preview-003` | Example Preview 003 | paid | 左右2カラム（プレビュー＋コード）の横並び構成 |
