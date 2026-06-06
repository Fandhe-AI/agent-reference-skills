# Chargebee

Chargebee のサブスクリプション管理・決済を Better Auth に統合するプラグイン。Chargebee チームによりメンテナンスされている。

## インストール

```bash
npm install @chargebee/better-auth chargebee
npx auth migrate
```

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { chargebee } from "@chargebee/better-auth"

export const auth = betterAuth({
    plugins: [
        chargebee({
            chargebeeClient,
            createCustomerOnSignUp: true,
            webhookUsername: process.env.CHARGEBEE_WEBHOOK_USERNAME,
            webhookPassword: process.env.CHARGEBEE_WEBHOOK_PASSWORD,
            subscription: {
                enabled: true,
                plans: [
                    {
                        name: "pro",
                        itemPriceId: "pro-USD-monthly",
                        type: "plan",
                        limits: { seats: 5 }
                    }
                ]
            }
        })
    ]
})
```

### クライアント側

```typescript
import { chargebeeClient } from "@chargebee/better-auth/client"

export const authClient = createAuthClient({
    plugins: [chargebeeClient({ subscription: true })]
})
```

## API メソッド

| メソッド | 説明 |
|---|---|
| `subscription.create()` | 新規サブスクリプション作成（チェックアウトリダイレクト） |
| `subscription.update()` | プランの変更・サブスクリプション更新 |
| `subscription.list()` | アクティブなサブスクリプション一覧取得 |
| `subscription.cancel()` | キャンセル（ポータルリダイレクト） |
| `subscription.portal()` | セルフサービス課金ポータルを開く |

## 設定オプション

| プロパティ | 型 | 説明 |
|---|---|---|
| `chargebeeClient` | Chargebee | SDK インスタンス（必須） |
| `createCustomerOnSignUp` | boolean | サインアップ時にカスタマーを自動作成 |
| `preventDuplicateTrials` | boolean | 複数トライアルを防止 |
| `authorizeReference?` | function | 参照 ID の権限チェック |
| `subscription.enabled` | boolean | サブスクリプション機能の有効化 |
| `subscription.plans` | array \| function | 利用可能なプラン定義 |
| `webhookUsername` | string | Webhook Basic Auth ユーザー名 |
| `webhookPassword` | string | Webhook Basic Auth パスワード |
| `webhookHandler?` | function | カスタム Webhook ハンドラー |

### プラン定義

| プロパティ | 型 | 説明 |
|---|---|---|
| `name` | string | プラン識別子（必須） |
| `itemPriceId` | string | Chargebee Item Price ID（必須） |
| `type` | string | `"plan"` / `"addon"` / `"charge"` |
| `limits` | object | 利用制限 |
| `freeTrial?` | object | 無料トライアル設定 |

## データベーススキーマ

4 つのテーブルを追加:

- `user`: `chargebeeCustomerId` フィールドを追加
- `organization`: `chargebeeCustomerId` フィールドを追加（組織プラグイン使用時）
- `subscription`: ステータス・期間・トライアル日・シート・メタデータを追跡
- `subscriptionItem`: プラン/アドオン/チャージの個別アイテムを保存

## 高度な機能

- **組織課金**: `organization.enabled: true` で組織単位の課金（API コールに `customerType: "organization"` が必要）
- **トライアル管理**: `preventDuplicateTrials: true` で重複トライアルを防止
- **マルチアイテム**: 複数プラン・アドオン・チャージのサブスクリプションをサポート

## Related

- [stripe.md](./stripe.md)
- [organization.md](./organization.md)
