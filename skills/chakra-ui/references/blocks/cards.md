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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `card-authentification` | Card Authentification | free | ログインフォーム（メール＋パスワード）をカード内に配置 |
| `card-blog-post` | Card Blog Post | paid | サムネイル画像＋タイトル＋抜粋＋著者情報のブログカード |
| `card-career` | Card Career | paid | 職種名＋勤務地＋雇用形態＋応募ボタン付き求人カード |
| `card-ecommerce` | Card Ecommerce | paid | 商品画像＋価格＋評価＋カートボタン付きECカード |
| `card-notification` | Card Notification | paid | アイコン＋メッセージ＋タイムスタンプの通知カード |
| `card-payment` | Card Payment | paid | クレジットカード情報入力フォームのカード形式UI |
| `card-pricing` | Card Pricing | paid | プラン名＋価格＋機能リスト＋CTAボタンの料金カード |
| `card-project-01` | Card Project 01 | paid | プロジェクト名＋進捗＋メンバーAvatar＋ステータスBadge |
| `card-report-issue` | Card Report Issue | paid | タイトル＋説明＋カテゴリ選択の問題報告フォームカード |
| `card-share-documents` | Card Share Documents | paid | ファイル一覧＋共有リンク＋権限設定のドキュメント共有カード |
| `card-with-tabs` | Card With Tabs | paid | タブ切替で複数コンテンツを表示するカード |
