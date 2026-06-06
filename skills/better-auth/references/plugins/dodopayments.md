# Dodo Payments

グローバルな Merchant-of-Record プラットフォーム Dodo Payments を Better Auth に統合するプラグイン。150 以上の国での販売・税・不正・コンプライアンスを一元管理する。

## インストール

```bash
npm install @dodopayments/better-auth dodopayments better-auth zod
```

環境変数:

```
DODO_PAYMENTS_API_KEY=your_api_key_here
DODO_PAYMENTS_WEBHOOK_SECRET=your_webhook_secret_here
```

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { dodoPayments } from "@dodopayments/better-auth"
import DodoPayments from "dodopayments"

const dodoClient = new DodoPayments({ bearerToken: process.env.DODO_PAYMENTS_API_KEY })

export const auth = betterAuth({
    plugins: [
        dodoPayments({
            client: dodoClient,
            createCustomerOnSignUp: true,
            use: [checkout({ products: [{ productId: "xxx", slug: "premium-plan" }] }), portal(), webhooks({ secret: process.env.DODO_PAYMENTS_WEBHOOK_SECRET })]
        })
    ]
})
```

### クライアント側

```typescript
import { dodoPaymentsClient } from "@dodopayments/better-auth/client"

export const authClient = createAuthClient({
    plugins: [dodoPaymentsClient()]
})
```

## API メソッド

| メソッド | 説明 |
|---|---|
| `authClient.dodopayments.checkoutSession({ slug })` | チェックアウトセッション作成 |
| `authClient.dodopayments.customer.portal()` | 顧客ポータルへのリダイレクト |
| `authClient.dodopayments.subscriptions.list()` | サブスクリプション一覧取得 |
| `authClient.dodopayments.payments.list()` | 支払い履歴取得 |

## 設定オプション

| プロパティ | 型 | 説明 |
|---|---|---|
| `client` | DodoPayments | SDK インスタンス（必須） |
| `createCustomerOnSignUp` | boolean | サインアップ時にカスタマーを自動作成 |
| `use` | array | サブプラグイン配列（checkout, portal, webhooks） |

### checkout 設定

| プロパティ | 型 | 説明 |
|---|---|---|
| `products` | array | 商品 ID とスラッグのマッピング配列 |
| `successUrl?` | string | 決済成功後のリダイレクト URL |
| `authenticatedUsersOnly?` | boolean | 認証ユーザーのみに制限（デフォルト: false） |

## 主な機能

- サインアップ時の顧客自動生成
- 型安全なチェックアウトフロー
- セルフサービス顧客ポータルアクセス
- Webhook 署名検証
- デフォルト Webhook エンドポイント: `/api/auth/dodopayments/webhooks`

## Related

- [stripe.md](./stripe.md)
- [creem.md](./creem.md)
