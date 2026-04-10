# Org Switcher

Components for switching between organizations and projects.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- マルチテナントアプリで組織（Organization）切り替え UI が必要なとき
- プロジェクトセレクターを構築するとき
- ワークスペース切り替えドロップダウンが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"org-switcher"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `with-actions` | With Actions | paid | 組織切り替えドロップダウン＋招待/管理/設定/サインアウトのアクションメニュー。メンバー数＋プランバッジ表示 |
| `with-project` | With Project | paid | 組織セレクター＋プロジェクトセレクターの2段階切り替え（「/」区切り）。プロジェクト作成・管理アクション付き |
