# AI

Modern interfaces for AI-powered features and interactive experiences.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- AI チャット・プロンプト入力 UI を構築するとき
- コード生成 + プレビューの並列表示が必要なとき
- AI Studio / Playground のようなインタラクティブ画面を作るとき
- アクションボタン付きのプロンプト入力フォームが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"ai"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `ai-code-and-preview` | Ai Code And Preview | paid | コードエディタとプレビューの2ペイン並列表示レイアウト |
| `ai-prompt-with-action-01` | Ai Prompt With Action 01 | paid | プロンプト入力＋アクションボタン付きのAIインターフェース |
| `ai-prompt-with-action-02` | Ai Prompt With Action 02 | paid | プロンプト入力＋アクションボタンの別レイアウトバリエーション |
| `ai-prompt-with-action-centered` | Ai Prompt With Action Centered | paid | 中央揃えのプロンプト入力＋アクションボタン構成 |
| `ai-studio-playground` | Ai Studio Playground | paid | モデル/プリセット選択＋Textarea＋パラメータPopover付きPlayground |
