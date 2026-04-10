# App Navbars

Application navigation bars with user menus, notifications, search, and dashboard navigation.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- SaaS アプリケーションのトップナビゲーションバーを構築するとき
- 検索バー付きのナビゲーションが必要なとき
- マルチレベル（階層型）のナビゲーション構造が必要なとき
- ユーザーメニューや通知アイコンを含むヘッダーナビを配置するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"app-navbars"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `navbar-multi-level` | Navbar Multi Level | paid | ハンバーガーメニュー＋ロゴ＋セカンダリナビ（タブ切り替え）の2段階ナビ。検索・通知・ユーザーメニュー付き |
| `navbar-with-centered-search` | Navbar With Centered Search | paid | ロゴ（左）＋中央配置の検索フィールド＋通知・ユーザーメニュー（右）のシンプルな構成 |
| `navbar-with-search` | Navbar With Search | paid | ロゴ＋ナビリンク（左）＋検索フィールド＋通知・ユーザーメニュー（右）。モバイルではポップオーバーメニュー |
