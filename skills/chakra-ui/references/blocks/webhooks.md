# Webhooks

Components for managing webhooks and real-time event integrations.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- Webhook 管理画面（一覧・作成・編集・詳細・テスト）を構築するとき
- Webhook の空状態やフォーム画面が必要なとき
- イベントログの表示 UI を作るとき
- Webhook テスター（テスト送信）画面が必要なとき
- Webhook エンドポイントの CRUD 操作画面を実装するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"webhooks"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `webhooks-detail-01` | Webhooks Detail 01 | paid | Webhook詳細画面（エンドポイント情報表示） |
| `webhooks-detail-02` | Webhooks Detail 02 | paid | イベント履歴付きWebhook詳細画面 |
| `webhooks-detail-03` | Webhooks Detail 03 | paid | ペイロード情報付きWebhook詳細画面 |
| `webhooks-detail-04` | Webhooks Detail 04 | paid | タブ切替式のWebhook詳細画面 |
| `webhooks-empty-state-01` | Webhooks Empty State 01 | paid | Webhook未登録時のイラスト付き空状態表示 |
| `webhooks-empty-state-02` | Webhooks Empty State 02 | paid | 作成ボタン付きのWebhook空状態表示 |
| `webhooks-empty-state-03` | Webhooks Empty State 03 | paid | 説明文付きのWebhook空状態表示 |
| `webhooks-event-log-01` | Webhooks Event Log 01 | paid | テーブル形式のイベントログ一覧 |
| `webhooks-event-log-02` | Webhooks Event Log 02 | paid | フィルター付きイベントログ一覧 |
| `webhooks-event-log-03` | Webhooks Event Log 03 | paid | 詳細パネル付きイベントログ一覧 |
| `webhooks-form-01` | Webhooks Form 01 | paid | URL入力のシンプルなWebhook作成フォーム |
| `webhooks-form-02` | Webhooks Form 02 | paid | イベント選択付きWebhook作成フォーム |
| `webhooks-form-03` | Webhooks Form 03 | paid | ヘッダー設定付きWebhook作成フォーム |
| `webhooks-form-04` | Webhooks Form 04 | paid | 認証設定付きの詳細Webhook作成フォーム |
| `webhooks-list-01` | Webhooks List 01 | paid | テーブル形式のWebhookエンドポイント一覧 |
| `webhooks-list-02` | Webhooks List 02 | paid | カード形式のWebhookエンドポイント一覧 |
| `webhooks-list-03` | Webhooks List 03 | paid | ステータス表示付きWebhook一覧 |
| `webhooks-tester-01` | Webhooks Tester 01 | paid | テスト送信実行用のWebhookテスター画面 |
