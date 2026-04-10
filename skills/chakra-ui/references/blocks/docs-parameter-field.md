# Docs Parameter Field

Components for displaying and editing parameters in API requests.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

documentation

## When to Use

- API ドキュメントのパラメータ表示 UI を構築するとき
- リクエスト/レスポンスのフィールド一覧を表示するとき
- 型情報・必須/任意ラベル付きのパラメータテーブルが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"docs-parameter-field"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `parameter-field-001` | Parameter Field 001 | paid | アンカーリンク付きフィールド一覧。名前＋型＋必須Badge＋説明 |
| `parameter-field-002` | Parameter Field 002 | paid | モノスペース名＋型＋必須Badge＋enum値表示の一覧 |
| `parameter-field-003` | Parameter Field 003 | paid | テーブル形式。Prop/Default/Type列のTable.Root構成 |
| `parameter-field-004` | Parameter Field 004 | paid | Accordion折りたたみ式。Prop＋Type列ヘッダー付きパネル |
