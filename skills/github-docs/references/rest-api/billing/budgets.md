# Billing Budgets API

Organization の課金予算（budget）を取得・作成・更新・削除するエンドポイント。認証ユーザーは organization admin または billing manager が必要。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/organizations/{org}/settings/billing/budgets` | Organization の全予算を取得（1 ページ最大 100 件） |
| POST | `/organizations/{org}/settings/billing/budgets` | 予算の作成 |
| GET | `/organizations/{org}/settings/billing/budgets/{budget_id}` | ID 指定で予算を取得 |
| PATCH | `/organizations/{org}/settings/billing/budgets/{budget_id}` | 予算の更新 |
| DELETE | `/organizations/{org}/settings/billing/budgets/{budget_id}` | 予算の削除 |

## 例

```bash
curl -L \
  -X POST \
  https://api.github.com/organizations/ORG/settings/billing/budgets \
  -d '{
  "budget_amount": 500,
  "prevent_further_usage": true,
  "budget_scope": "organization",
  "budget_entity_name": "",
  "budget_type": "ProductPricing",
  "budget_product_sku": "actions",
  "budget_alerting": {
    "will_alert": false,
    "alert_recipients": []
  }
}'
```

標準ヘッダー（`Authorization: Bearer <YOUR-TOKEN>` / `Accept: application/vnd.github+json` / `X-GitHub-Api-Version: 2026-03-10`）は原文の curl 例では省略されている。

## パラメータ

### GET 一覧（クエリ）

| Name | Type | 説明 |
|---|---|---|
| `org` | string（必須） | Organization 名（大文字小文字不問） |
| `page` | integer | ページ番号。既定 `1` |
| `per_page` | integer | 1 ページの件数（最大 100）。既定 `10` |
| `scope` | string | 予算スコープで絞り込み。`enterprise` / `organization` / `repository` / `cost_center` / `multi_user_customer` / `user` |
| `user` | string | 指定ユーザー login の消費額詳細で絞り込み |

### POST ボディ

| Name | Type | 説明 |
|---|---|---|
| `budget_amount` | integer | 予算額（整数ドル）。ライセンス型プロダクトではライセンス数 |
| `prevent_further_usage` | boolean | 予算超過後の追加支出を止めるか。`user` / `multi_user_customer` スコープでは `true` 必須 |
| `budget_alerting` | object | `will_alert`（boolean）と `alert_recipients`（login の配列）。`user` スコープでは指定すると拒否される（アラートは常に無効） |
| `budget_scope` | string | `organization` / `repository` / `multi_user_customer` / `user`。`user` と `multi_user_customer` は `budget_product_sku` が `ai_credits` または `premium_requests` の場合のみ |
| `budget_entity_name` | string | 予算対象のエンティティ名。既定は空文字 |
| `budget_type` | string | `BundlePricing`（全 AI credit SKU、`budget_product_sku` は `ai_credits`）/ `ProductPricing`（プロダクト配下の全 SKU、例 `actions` / `packages`）/ `SkuPricing`（単一 SKU、例 `actions_linux`） |
| `budget_product_sku` | string | 予算の対象となる単一のプロダクトまたは SKU |
| `user` | string | `budget_scope` が `user` のとき必須。対象ユーザー名 |
| `expires_at` | string | 失効日（`YYYY-MM-DD`、未来日のみ）。未指定なら失効しない。`user` スコープの予算のみ対応 |

### PATCH ボディ

| Name | Type | 説明 |
|---|---|---|
| `budget_amount` | integer | 予算額（整数ドル） |
| `prevent_further_usage` | boolean | `user` / `multi_user_customer` スコープでは `true` のままにする必要がある |
| `budget_alerting` | object | `will_alert` / `alert_recipients`。`user` スコープでは無視される |
| `expires_at` | string / null / integer | `YYYY-MM-DD`。`null` または `0` で失効日を削除。既存の `user` スコープ予算のみ |

## レスポンス

- GET 一覧 200: `budgets[]`（`id` / `budget_type` / `budget_amount` / `prevent_further_usage` / `budget_scope` / `budget_entity_name` / `user` / `consumed_amount` / `budget_product_sku` / `budget_alerting` / `expires_at`）、`user`、`effective_budget`（`id` / `budget_amount` / `consumed_amount`）、`has_next_page`、`total_count`
- POST / PATCH 200: `message` と `budget` オブジェクト
- DELETE 200: `message` と `id`

## 注意事項

- 原文の IMPORTANT 注記: リクエストボディのスキーマには必須フィールドの記載漏れがある。`budget_scope` が `user` のとき `user` フィールド（対象 GitHub ユーザー名）も必須で、省略すると `HTTP 400: Missing required fields: budget_entity_name` が返る。`user` スコープでは `budget_entity_name` は空文字でよい
- `user` スコープ予算の例（原文）: `budget_amount: 30` / `prevent_further_usage: true` / `budget_scope: "user"` / `budget_entity_name: ""` / `budget_type: "BundlePricing"` / `budget_product_sku: "ai_credits"` / `budget_alerting: {will_alert: false, alert_recipients: []}` / `user: "USERNAME"`（月間 Copilot AI credits を 1 ユーザー 30 USD に制限）
- ステータスコード: POST は 200 / 400 / 401 / 403 / 404 / 422 / 500、PATCH は 200 / 400 / 401 / 403 / 404 / 422 / 500、GET 一覧は 200 / 403 / 404 / 500、GET 単体・DELETE は 200 / 400 / 403 / 404 / 500 / 503
- 出典: https://docs.github.com/en/rest/billing/budgets（取得 2026-10、API バージョン `2026-03-10`）

## Related

- [usage.md](./usage.md)
