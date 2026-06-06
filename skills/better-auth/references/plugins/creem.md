# Creem

Creem の金融 OS を Better Auth に統合するプラグイン。決済処理・サブスクリプション管理を認証レイヤーに直接組み込む。

## インストール

```bash
npm install @creem_io/better-auth
```

環境変数:

```
CREEM_API_KEY=your_api_key_here
CREEM_WEBHOOK_SECRET=your_webhook_secret_here
```

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { creem } from "@creem_io/better-auth"

export const auth = betterAuth({
    plugins: [
        creem({
            apiKey: process.env.CREEM_API_KEY!,
            webhookSecret: process.env.CREEM_WEBHOOK_SECRET,
            testMode: true,
            persistSubscriptions: true,
            defaultSuccessUrl: "/success"
        })
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/react"
import { creemClient } from "@creem_io/better-auth/client"

export const authClient = createAuthClient({
    plugins: [creemClient()]
})
```

## API メソッド

| メソッド | 説明 |
|---|---|
| `authClient.creem.createCheckout({ productId, successUrl, discountCode?, metadata? })` | 支払いセッション作成 |
| `authClient.creem.createPortal()` | セルフサービス管理ポータルを開く |
| `cancelSubscription()` | サブスクリプションをキャンセル |
| `retrieveSubscription()` | サブスクリプション詳細を取得 |
| `hasAccessGranted()` | サブスクリプションステータスに基づいたアクセス確認 |
| `searchTransactions({ productId, pageNumber, pageSize })` | トランザクション検索 |

## 設定オプション

| プロパティ | 型 | 説明 |
|---|---|---|
| `apiKey` | string | Creem API キー（必須） |
| `webhookSecret?` | string | Webhook 署名シークレット |
| `testMode?` | boolean | テストモード |
| `persistSubscriptions?` | boolean | DB へのサブスクリプション永続化 |
| `defaultSuccessUrl?` | string | デフォルトの成功 URL |
| `onGrantAccess?` | function | アクセス付与時のハンドラー |
| `onRevokeAccess?` | function | アクセス取り消し時のハンドラー |

## 主な機能

- 顧客・サブスクリプションデータの自動同期
- サブスクリプションステータスに基づいたアクセス管理
- Webhook 署名検証
- トライアル悪用防止（1 アカウントあたり 1 回）
- DB 永続化モードと API モードの両対応

## Related

- [stripe.md](./stripe.md)
- [chargebee.md](./chargebee.md)
