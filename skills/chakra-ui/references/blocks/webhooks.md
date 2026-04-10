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

| ID | Name | Access |
|----|------|--------|
| `webhooks-detail-01` | Webhooks Detail 01 | paid |
| `webhooks-detail-02` | Webhooks Detail 02 | paid |
| `webhooks-detail-03` | Webhooks Detail 03 | paid |
| `webhooks-detail-04` | Webhooks Detail 04 | paid |
| `webhooks-empty-state-01` | Webhooks Empty State 01 | paid |
| `webhooks-empty-state-02` | Webhooks Empty State 02 | paid |
| `webhooks-empty-state-03` | Webhooks Empty State 03 | paid |
| `webhooks-event-log-01` | Webhooks Event Log 01 | paid |
| `webhooks-event-log-02` | Webhooks Event Log 02 | paid |
| `webhooks-event-log-03` | Webhooks Event Log 03 | paid |
| `webhooks-form-01` | Webhooks Form 01 | paid |
| `webhooks-form-02` | Webhooks Form 02 | paid |
| `webhooks-form-03` | Webhooks Form 03 | paid |
| `webhooks-form-04` | Webhooks Form 04 | paid |
| `webhooks-list-01` | Webhooks List 01 | paid |
| `webhooks-list-02` | Webhooks List 02 | paid |
| `webhooks-list-03` | Webhooks List 03 | paid |
| `webhooks-tester-01` | Webhooks Tester 01 | paid |
