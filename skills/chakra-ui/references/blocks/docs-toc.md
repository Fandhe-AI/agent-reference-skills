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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `toc-line` | Toc Line | paid | 左側縦線インジケーター付きの目次。アクティブ項目をハイライト |
| `toc-minimal` | Toc Minimal | paid | テキストリンクのみのミニマル目次 |
| `toc-mobile` | Toc Mobile | paid | モバイル向け折りたたみ式の目次ナビゲーション |
| `toc-numbers` | Toc Numbers | paid | 番号付きの目次リスト。セクション番号を自動表示 |
