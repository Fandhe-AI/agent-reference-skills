# Docs Changelog

Components for displaying a changelog with version history and updates.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

documentation

## When to Use

- 変更履歴・リリースノートページを構築するとき
- バージョン別のアップデート一覧を表示するとき
- タイムライン形式の Changelog セクションが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"docs-changelog"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `changelog-001` | Changelog 001 | paid | シンプルな日付＋バージョン＋変更内容リスト形式 |
| `changelog-002` | Changelog 002 | paid | タイムライン縦線付きの変更履歴レイアウト |
| `changelog-003` | Changelog 003 | paid | カード形式の変更エントリ。Badge付きカテゴリ分類 |
| `changelog-004` | Changelog 004 | paid | 左右2カラム（日付＋内容）のタイムライン構成 |
| `changelog-005` | Changelog 005 | paid | アコーディオン折りたたみ式の変更履歴 |
| `changelog-006` | Changelog 006 | paid | 画像付きリリースノート。スクリーンショット表示対応 |
| `changelog-007` | Changelog 007 | paid | コンパクトなインラインリスト形式の変更履歴 |
| `changelog-008` | Changelog 008 | paid | フィルタ付きの変更履歴。タイプ別絞り込み対応 |
