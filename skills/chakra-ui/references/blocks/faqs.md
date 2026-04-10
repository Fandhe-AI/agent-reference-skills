# FAQs

Components for displaying frequently asked questions and answers.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- FAQ（よくある質問）セクションを構築するとき
- アコーディオン形式の Q&A ページが必要なとき
- インライン見出し付きの FAQ レイアウトを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"faqs"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `faq-centered` | Faq Centered | paid |
| `faq-wall-of-text` | Faq Wall Of Text | paid |
| `faq-with-inline-headline` | Faq With Inline Headline | paid |
