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

| ID | Name | Access |
|----|------|--------|
| `ai-code-and-preview` | Ai Code And Preview | paid |
| `ai-prompt-with-action-01` | Ai Prompt With Action 01 | paid |
| `ai-prompt-with-action-02` | Ai Prompt With Action 02 | paid |
| `ai-prompt-with-action-centered` | Ai Prompt With Action Centered | paid |
| `ai-studio-playground` | Ai Studio Playground | paid |
