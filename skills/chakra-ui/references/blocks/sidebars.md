# Sidebars

Versatile lateral components that enhance navigation and provide contextual information.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- アプリケーションのサイドナビゲーションを構築するとき
- 折りたたみ可能なメニューグループが必要なとき
- サイドナビバー + サイドバーの 2 カラム構成にしたいとき
- ダッシュボードやアドミン画面の左ペインとして使うとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"sidebars"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `sidebar-with-collapsible` | Sidebar With Collapsible | paid | 検索フィールド＋Collapsible で折りたたみ可能なサブメニュー＋ヘルプ/設定リンク＋ユーザープロフィール |
| `sidebar-with-groups` | Sidebar With Groups | paid | タイトル付きグループ（Dashboard/Content 等）でリンクを分類。検索フィールド＋ユーザープロフィール付き |
| `sidebar-with-side-navbar` | Sidebar With Side Navbar | paid | アイコンのみのナビバー（左）＋詳細リンクのサイドバー（右）の2カラム構成。Tooltip でラベル表示 |
