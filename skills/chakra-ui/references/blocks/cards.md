# Cards

Elegant containers that organize and display content in a clean, structured format.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- コンテンツをカード形式で表示するとき（ブログ、料金、プロジェクトなど）
- 認証カード、決済カード、通知カードなど用途別のカードが必要なとき
- EC サイトの商品カードを作るとき
- タブ付きカードやドキュメント共有カードが必要なとき
- 問題報告・Issue 報告フォームをカード形式にしたいとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"cards"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `card-authentification` | Card Authentification | free |
| `card-blog-post` | Card Blog Post | paid |
| `card-career` | Card Career | paid |
| `card-ecommerce` | Card Ecommerce | paid |
| `card-notification` | Card Notification | paid |
| `card-payment` | Card Payment | paid |
| `card-pricing` | Card Pricing | paid |
| `card-project-01` | Card Project 01 | paid |
| `card-report-issue` | Card Report Issue | paid |
| `card-share-documents` | Card Share Documents | paid |
| `card-with-tabs` | Card With Tabs | paid |
