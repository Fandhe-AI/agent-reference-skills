# Feeds

Dynamic components for real-time chat interfaces and activity stream presentations.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- アクティビティフィード・タイムラインを構築するとき
- コメント付きのフィード（SNS 風）が必要なとき
- 投票（upvote）機能付きのフィードを作るとき
- ユーザー投稿の一覧表示が必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"feeds"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `feed-with-comments-01` | Feed With Comments 01 | paid | コメントスレッド形式。アバター＋吹き出しテキスト＋ネスト返信＋Author バッジ。SNS 風の Like/Reply リンク付き |
| `feed-with-upvote-01` | Feed With Upvote 01 | paid | カード形式のフィード一覧。右側にアップボート数表示、ステータスバッジ＋コメント数＋タグ付き |
