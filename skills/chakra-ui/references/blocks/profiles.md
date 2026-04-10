# Profiles

Components for showcasing user profiles and profiles.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- ユーザープロフィールページを構築するとき
- アカウント情報の表示（アバター、名前、経歴、ステータスなど）が必要なとき
- 他ユーザーのプロフィール閲覧画面を作るとき
- チームメンバー詳細ページを構築するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"profiles"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `profile-01` | Profile 01 | paid | Avatar＋名前＋経歴のシンプルなプロフィールカード |
| `profile-02` | Profile 02 | paid | カバー画像＋Avatar＋ステータス情報付きプロフィール |
| `profile-03` | Profile 03 | paid | サイドバー形式のプロフィール＋統計情報（フォロワー等） |
| `profile-04` | Profile 04 | paid | 横並びレイアウトのプロフィール＋アクションボタン |
| `profile-05` | Profile 05 | paid | カード内にAvatar＋詳細情報＋SNSリンク付きプロフィール |
| `profile-06` | Profile 06 | paid | フルワイドカバー＋中央揃えAvatar＋タブナビ付きプロフィール |
| `profile-07` | Profile 07 | paid | コンパクトな情報表示＋Badge付きプロフィールカード |
| `profile-08` | Profile 08 | paid | リスト形式の詳細プロフィール＋連絡先情報 |
