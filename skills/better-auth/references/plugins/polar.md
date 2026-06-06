# Polar

Polar の決済インフラと Better Auth をシームレスに統合するプラグイン。チェックアウト・ポータル・使用量追跡・Webhook を提供する。

## インストール

```bash
pnpm add better-auth @polar-sh/better-auth @polar-sh/sdk
```

環境変数:

```
POLAR_ACCESS_TOKEN=...
POLAR_WEBHOOK_SECRET=...
```

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth"
import { Polar } from "@polar-sh/sdk"

const polarClient = new Polar({ accessToken: process.env.POLAR_ACCESS_TOKEN })

export const auth = betterAuth({
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({ successUrl: "/dashboard" }),
                portal(),
                usage(),
                webhooks({ secret: process.env.POLAR_WEBHOOK_SECRET })
            ]
        })
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/react"
import { polarClient } from "@polar-sh/better-auth/client"

export const authClient = createAuthClient({
    plugins: [polarClient()]
})
```

## API メソッド

### checkout

```typescript
await authClient.checkout({ products: ["prod_xxx"] })
// または
await authClient.checkout({ slug: "pro-plan" })
```

### portal

```typescript
await authClient.customer.portal()
const { data: state } = await authClient.customer.state()
const { data: benefits } = await authClient.customer.benefits.list()
const { data: orders } = await authClient.customer.orders.list()
const { data: subs } = await authClient.customer.subscriptions.list()
```

### usage

```typescript
await authClient.usage.ingest({ event: "api_call", value: 1 })
const { data: meters } = await authClient.usage.meters.list()
```

## 設定オプション

| プロパティ | 型 | 説明 |
|---|---|---|
| `client` | Polar | Polar SDK インスタンス（必須） |
| `createCustomerOnSignUp?` | boolean | サインアップ時にカスタマーを自動作成 |
| `getCustomerCreateParams?` | function | カスタマー作成時のカスタムメタデータ |

## Webhook ハンドラー

25 以上のハンドラーを提供: `onOrderPaid`, `onSubscriptionCreated`, `onCustomerStateChanged`, `onPayload`（キャッチオール）など。

## Related

- [stripe.md](./stripe.md)
- [autumn.md](./autumn.md)
