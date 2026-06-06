# Autumn

オープンソースの SaaS 課金インフラ Autumn と Better Auth を統合するプラグイン。サブスクリプションステータス、使用量メータリング、機能権限を管理する。Webhook 設定不要で Autumn に直接クエリできる。

## インストール

```bash
npm install autumn-js
```

環境変数:

```
AUTUMN_SECRET_KEY=am_sk_xxxxxxxxxx
```

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { autumn } from "autumn-js/better-auth"

export const auth = betterAuth({
    plugins: [
        autumn({
            customerScope: "user"  // "user" | "organization" | "user_and_organization"
        })
    ]
})
```

### クライアント側（React）

```jsx
import { AutumnProvider } from "autumn-js/react"

<AutumnProvider useBetterAuth={true}>
    {children}
</AutumnProvider>
```

## API メソッド

| メソッド | 説明 |
|---|---|
| `attach()` | チェックアウトまたは支払い確認ダイアログを開始 |
| `check()` | 顧客が特定機能にアクセスできるか検証 |
| `track()` | 使用量イベントを記録（主にサーバー側） |
| `customer` | サブスクリプション・残高を含む課金データを返す |
| `openBillingPortal()` | 顧客の課金管理インターフェースを開く |
| `cancel()` | プロダクトサブスクリプションをキャンセル |

## 使用例

```typescript
// チェックアウト
const { attach } = useCustomer()
await attach({ productId: "pro", dialog: AttachDialog })

// 機能アクセス検証
if (allowed({ featureId: "messages" })) { /* proceed */ }

// 使用量追跡
await auth.api.track({ featureId: "messages", value: 2 })
```

## 設定オプション

| プロパティ | 型 | 説明 |
|---|---|---|
| `customerScope` | `"user"` \| `{ customerScope: string }` | 課金スコープ |
| `identify?` | function | 高度なシナリオ向けのカスタム識別関数 |

## Related

- [stripe.md](./stripe.md)
- [organization.md](./organization.md)
