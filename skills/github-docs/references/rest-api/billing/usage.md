# Billing Usage API

Organization / user 単位の課金使用量レポート（AI credit・premium request・総使用量・サマリー）を取得するエンドポイント。

## エンドポイント

### Organization

認証ユーザーは organization admin（enterprise 配下の organization または organization アカウント）が必要。

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/organizations/{org}/settings/billing/ai_credit/usage` | AI credit 使用量レポート（過去 24 か月分） |
| GET | `/organizations/{org}/settings/billing/premium_request/usage` | premium request 使用量レポート（過去 24 か月分） |
| GET | `/organizations/{org}/settings/billing/usage` | 総使用量レポート（enhanced billing platform 対象のみ） |
| GET | `/organizations/{org}/settings/billing/usage/summary` | 使用量サマリー（public preview、過去 24 か月分） |

### User

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/users/{username}/settings/billing/ai_credit/usage` | AI credit 使用量レポート（過去 24 か月分） |
| GET | `/users/{username}/settings/billing/premium_request/usage` | premium request 使用量レポート（過去 24 か月分） |
| GET | `/users/{username}/settings/billing/usage` | 総使用量レポート（enhanced billing platform 対象のみ） |
| GET | `/users/{username}/settings/billing/usage/summary` | 使用量サマリー（public preview、過去 24 か月分） |

## 例

```bash
curl -L \
  -X GET \
  https://api.github.com/organizations/ORG/settings/billing/ai_credit/usage
```

## パラメータ

| Name | Type | 対象 | 説明 |
|---|---|---|---|
| `org` / `username` | string（必須） | パス | Organization 名 / GitHub ユーザーのハンドル |
| `year` | integer | 全て | 4 桁の年。既定は現在の年 |
| `month` | integer | 全て | 1〜12。既定は現在の月（`usage` 総使用量レポートは年のみ既定、月の既定の記載なし） |
| `day` | integer | 全て | 1〜31。年月未指定なら既定の年月を使う |
| `user` | string | org の ai_credit / premium_request | 使用量を照会するユーザー名 |
| `model` | string | ai_credit / premium_request | モデル名 |
| `product` | string | ai_credit / premium_request / summary | プロダクト名 |
| `repository` | string | summary | `owner/repository` 形式 |
| `sku` | string | summary | SKU |

名前の大文字小文字は区別されない（`repository` / `sku` を除き原文に明記）。

## レスポンス

- ai_credit / premium_request: `timePeriod`（`year` / `month` / `day`）、`organization` または `user`、`product`、`model`、`usageItems[]`（`product` / `sku` / `model` / `unitType` / `pricePerUnit` / `grossQuantity` / `grossAmount` / `discountQuantity` / `discountAmount` / `netQuantity` / `netAmount`）。premium_request は ai_credit と同一スキーマ
- usage（総使用量）: `usageItems[]`（`date` / `product` / `sku` / `quantity` / `unitType` / `pricePerUnit` / `grossAmount` / `discountAmount` / `netAmount` / `organizationName`（org のみ）/ `repositoryName`）
- usage/summary: `timePeriod`、`organization` または `user`、`repository`、`product`、`sku`、`usageItems[]`（`model` を除く上記 gross / discount / net 系フィールド）

## 注意事項

- エンドポイントは、そのアカウントに請求される使用量を返す。user エンドポイントは個人アカウントに直接請求される Copilot 使用量のみで、組織・enterprise 経由で管理・請求されるライセンスの使用量は含まれない（その場合は organization / enterprise エンドポイントを使う）
- enterprise 向けエンドポイントは公式ページ上部のドロップダウンを GitHub Enterprise Cloud に切り替えて参照する（本ページ対象外）
- `usage/summary` は public preview で変更される可能性がある
- 標準ヘッダー: `Authorization: Bearer <YOUR-TOKEN>` / `Accept: application/vnd.github+json` / `X-GitHub-Api-Version: 2026-03-10`（curl 例では省略）
- 出典: https://docs.github.com/en/rest/billing/usage（取得 2026-10）

## Related

- [budgets.md](./budgets.md)
