# Commet

Commet（Merchant of Record）を Better Auth に統合するプラグイン。サブスクリプション・使用量課金・機能ゲーティング・税・グローバル決済を管理する。Commet チームによりメンテナンスされている。

## インストール

```bash
npm install better-auth @commet/better-auth @commet/node
```

環境変数:

```
COMMET_API_KEY=ck_...
```

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { commet, portal, subscriptions, features, usage, seats } from "@commet/better-auth"
import { Commet } from "@commet/node"

const commetClient = new Commet({ apiKey: process.env.COMMET_API_KEY })

export const auth = betterAuth({
    plugins: [
        commet({
            client: commetClient,
            createCustomerOnSignUp: true,
            use: [portal(), subscriptions(), features(), usage(), seats()]
        })
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/react"
import { commetClient } from "@commet/better-auth/client"

export const authClient = createAuthClient({
    plugins: [commetClient()]
})
```

## サブプラグインと API メソッド

### portal

```typescript
await authClient.customer.portal()
```

### subscriptions

```typescript
const { data: subscription } = await authClient.subscription.get()
await authClient.subscription.cancel({ reason: "...", immediate: false })
```

### features

```typescript
const { data: features } = await authClient.features.list()
const { data: feature } = await authClient.features.get("api_calls")
const { data: check } = await authClient.features.check("sso")
const { data: canUse } = await authClient.features.canUse("api_calls")
```

### usage

```typescript
await authClient.usage.track({
    feature: "api_calls",
    value: 1,
    idempotencyKey: "evt_123",
    properties: { endpoint: "/api/generate" }
})
```

### seats

```typescript
const { data: seatBalances } = await authClient.seats.list()
await authClient.seats.add({ featureCode: "member", count: 5 })
await authClient.seats.remove({ featureCode: "member", count: 2 })
await authClient.seats.set({ featureCode: "admin", count: 3 })
await authClient.seats.setAll({ admin: 2, member: 10 })
```

### webhooks

Webhook エンドポイント: `/api/auth/commet/webhooks`

対応ハンドラー: `onSubscriptionActivated`, `onSubscriptionCanceled`, `onPaymentReceived`, `onPaymentFailed`, `onInvoiceCreated` など

## 設定オプション

| プロパティ | 必須 | 説明 |
|---|---|---|
| `client` | 必須 | Commet SDK インスタンス |
| `use` | 必須 | サブプラグイン配列 |
| `createCustomerOnSignUp?` | 任意 | サインアップ時にカスタマーを自動作成 |
| `getCustomerCreateParams?` | 任意 | カスタマー作成時の追加パラメータ |

## Related

- [stripe.md](./stripe.md)
- [autumn.md](./autumn.md)
