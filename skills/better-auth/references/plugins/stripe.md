# Stripe

Stripe の決済・サブスクリプション機能を Better Auth に統合するプラグイン。ユーザーサインアップ時の Stripe カスタマー自動作成、サブスクリプションライフサイクル管理、Webhook 処理を担う。

## インストール

```bash
npm install @better-auth/stripe stripe@^22.0.0
```

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe"

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const auth = betterAuth({
    plugins: [
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
            createCustomerOnSignUp: true,
            subscription: {
                enabled: true,
                plans: [
                    {
                        name: "pro",
                        priceId: "price_xxx",
                        limits: { seats: 5 }
                    }
                ]
            }
        })
    ]
})
```

### Webhook エンドポイント設定

Stripe ダッシュボードで `/api/auth/stripe/webhook` を Webhook エンドポイントとして登録する。

マイグレーション:

```bash
npx auth migrate
```

## API メソッド

### サブスクリプション管理

| メソッド | エンドポイント | 説明 |
|---|---|---|
| `upgrade` | POST `/subscription/upgrade` | サブスクリプション作成・アップグレード |
| `list` | GET `/subscription/list` | サブスクリプション一覧取得 |
| `cancel` | POST `/subscription/cancel` | サブスクリプションキャンセル |
| `restore` | POST `/subscription/restore` | キャンセル/変更スケジュールの復元 |
| `billing-portal` | POST `/subscription/billing-portal` | Stripe Billing Portal セッション作成 |

### upgrade パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `plan` | string | プラン名（必須） |
| `successUrl` | string | 決済成功後のリダイレクト URL（必須） |
| `cancelUrl` | string | キャンセル時のリダイレクト URL（必須） |
| `annual?` | boolean | 年払いフラグ |
| `referenceId?` | string | 組織課金時の参照 ID |
| `seats?` | number | シート数（チーム課金） |
| `scheduleAtPeriodEnd?` | boolean | 期間末にプラン変更をスケジュール |

## 設定オプション

| プロパティ | 型 | 説明 |
|---|---|---|
| `stripeClient` | Stripe | Stripe インスタンス（必須） |
| `stripeWebhookSecret` | string | Webhook 署名シークレット（必須） |
| `createCustomerOnSignUp` | boolean | サインアップ時にカスタマーを自動作成 |
| `subscription.enabled` | boolean | サブスクリプション機能の有効化 |
| `subscription.plans` | array \| function | プラン定義 |
| `onSubscriptionComplete?` | function | チェックアウト完了後のフック |
| `onSubscriptionCreated?` | function | サブスクリプション作成時のフック |
| `onSubscriptionUpdate?` | function | サブスクリプション変更時のフック |
| `onSubscriptionCancel?` | function | キャンセル時のフック |
| `onSubscriptionDeleted?` | function | 削除時のフック |
| `getCheckoutSessionParams?` | function | チェックアウトセッションのカスタムパラメータ |

### プラン定義

| プロパティ | 型 | 説明 |
|---|---|---|
| `name` | string | プラン識別子（必須） |
| `priceId` | string | Stripe Price ID（必須） |
| `limits` | object | 利用制限 |
| `annualDiscountPriceId?` | string | 年払い割引 Price ID |
| `freeTrial?` | object | 無料トライアル設定 |
| `seatPriceId?` | string | シートごとの Price ID |

## データベーススキーマ

`user` テーブルに `stripeCustomerId` フィールドを追加。組織プラグイン使用時は `organization` テーブルにも同フィールドを追加。

`subscription` テーブルを新規作成:

| フィールド | 説明 |
|---|---|
| `id`, `plan`, `referenceId`, `status` | 基本情報 |
| `periodStart`, `periodEnd` | 課金期間 |
| `cancelAtPeriodEnd`, `cancelAt`, `canceledAt`, `endedAt` | キャンセル関連 |
| `trialStart`, `trialEnd` | トライアル情報 |
| `seats`, `stripeScheduleId` | チーム管理 |

## 高度な機能

- **組織課金**: `organization: { enabled: true }` でユーザーの代わりに組織を課金単位にする
- **トライアル管理**: 1 アカウントあたり 1 回のトライアルを自動強制
- **スケジュール変更**: `scheduleAtPeriodEnd: true` で期間末まで変更を先送り（Stripe Subscription Schedules API を使用）

## Related

- [organization.md](./organization.md)
- [chargebee.md](./chargebee.md)
