# Docs Table of Contents

Components for displaying a table of contents.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

documentation

## When to Use

- ドキュメントページの目次（Table of Contents）を構築するとき
- サイドバーやモバイル向けの目次ナビゲーションが必要なとき
- 番号付き・ライン付きの目次スタイルが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"docs-toc"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `toc-line` | Toc Line | paid |
| `toc-minimal` | Toc Minimal | paid |
| `toc-mobile` | Toc Mobile | paid |
| `toc-numbers` | Toc Numbers | paid |
