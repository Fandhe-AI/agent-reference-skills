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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `page-header-with-actions-01` | Page Header With Actions 01 | paid | タイトル＋Badge＋ステータス（リポジトリ・ブランチ情報）と右側にアクションボタン（Rollback/Deploy）を横並び配置 |
| `page-header-with-actions-02` | Page Header With Actions 02 | paid | タブナビゲーション＋ソートセレクト＋リスト/グリッド切り替え＋追加ボタンを含むリッチなヘッダー |
| `page-header-with-breadcrumb-actions` | Page Header With Breadcrumb Actions | paid | パンくずリスト＋設定アイコン＋アクションボタン（API Preview/New record）のコンパクトな1行ヘッダー |
