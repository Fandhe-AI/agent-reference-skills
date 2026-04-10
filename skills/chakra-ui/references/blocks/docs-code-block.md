# Docs Code Block

Components for displaying code snippets with syntax highlighting.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

documentation

## When to Use

- ドキュメント内にシンタックスハイライト付きのコードブロックを表示するとき
- コピーボタンや行番号付きのコード表示が必要なとき
- 複数言語タブ切り替えのコードスニペットを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"docs-code-block"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `code-block-001` | Code Block 001 | paid | ファイル名ヘッダー付きの基本コードブロック（md サイズ） |
| `code-block-002` | Code Block 002 | paid | ダーク/ライト切替対応。コピー＋AIボタン＋Tooltip付き |
| `code-block-003` | Code Block 003 | paid | Select言語切替＋実行ボタン＋Badgeステータス表示 |
| `code-block-004` | Code Block 004 | paid | 行番号付き。HTTPステータスBadge＋コピーボタン |
| `code-block-005` | Code Block 005 | paid | Tabs(line variant)で言語切替。コピーボタン付き |
| `code-block-006` | Code Block 006 | paid | Tabs(subtle variant)で言語切替。Request タイトル付き |
| `code-block-007` | Code Block 007 | paid | Tabs(subtle)+ドロップダウン補助タブの言語切替 |
| `code-block-008` | Code Block 008 | paid | レスポンス空状態。中央にSend Requestボタン表示 |
| `code-block-009` | Code Block 009 | paid | エラー表示用。赤Badge(503)＋メタ情報Badge群 |
| `code-block-010` | Code Block 010 | paid | 行番号＋行ハイライト＋maxLines制限＋メタ情報Badge群 |
