# App Headers

Page headers for application interfaces with actions, breadcrumbs, search, and forms.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- Dashboard やアプリケーション画面のページタイトル部分を構築するとき
- ページヘッダーにアクションボタン（作成・編集・削除など）を配置したいとき
- パンくずリスト付きのヘッダーが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"app-headers"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `page-header-with-actions-01` | Page Header With Actions 01 | paid |
| `page-header-with-actions-02` | Page Header With Actions 02 | paid |
| `page-header-with-breadcrumb-actions` | Page Header With Breadcrumb Actions | paid |
