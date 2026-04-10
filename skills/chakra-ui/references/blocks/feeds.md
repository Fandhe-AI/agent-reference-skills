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

| ID | Name | Access |
|----|------|--------|
| `feed-with-comments-01` | Feed With Comments 01 | paid |
| `feed-with-upvote-01` | Feed With Upvote 01 | paid |
