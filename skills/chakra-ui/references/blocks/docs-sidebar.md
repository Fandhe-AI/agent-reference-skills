# Docs Sidebar

Components for organizing and navigating documentation with hierarchical sections, collapsible groups, and active link states.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

documentation

## When to Use

- ドキュメントサイトのサイドバーナビゲーションを構築するとき
- 階層的なセクション構造のサイドメニューが必要なとき
- 折りたたみグループやアクティブリンク状態を持つサイドバーを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"docs-sidebar"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `sidebar-001` | Sidebar 001 | paid | シンプルなリンク一覧のフラットサイドバー |
| `sidebar-002` | Sidebar 002 | paid | 折りたたみ可能なグループ付き階層サイドバー |
| `sidebar-003` | Sidebar 003 | paid | アクティブリンクハイライト付きのセクション分割構成 |
| `sidebar-004` | Sidebar 004 | paid | ネストされたツリー構造のサイドバーナビゲーション |
| `sidebar-005` | Sidebar 005 | paid | バッジ・カウンター付きのサイドバーリンク一覧 |
| `sidebar-006` | Sidebar 006 | paid | アイコン＋ラベルのコンパクトサイドバー |
| `sidebar-007` | Sidebar 007 | paid | 検索フィールド付きのフィルタリング可能サイドバー |
