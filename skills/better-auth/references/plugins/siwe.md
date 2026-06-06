# Sign In With Ethereum (SIWE)

ERC-4361 標準に基づき、Ethereum ウォレットでユーザー認証を可能にするプラグイン。カスタムメッセージ検証とノンス生成をサポート。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { siwe } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        siwe({
            domain: "example.com",
            emailDomainName: "example.com",
            anonymous: true
        })
    ]
})
```

マイグレーション:

```bash
npx auth migrate
# または
npx auth generate
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { siweClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [siweClient()]
})
```

## 使用方法

**ノンス生成:**

```typescript
const nonce = await authClient.siwe.nonce({
    address: walletAddress,
    chainId: 1  // オプション
})
```

**署名検証:**

```typescript
await authClient.siwe.verify({
    message,
    signature,
    address: walletAddress,
    chainId: 1,  // オプション
    email: "user@example.com"  // オプション
})
```

## 設定オプション

| プロパティ | 型 | 説明 |
|---|---|---|
| `domain` | string | アプリケーションのドメイン名（必須） |
| `emailDomainName?` | string | 非匿名アカウント用のメールドメイン |
| `anonymous?` | boolean | メールなしのサインアップを許可（デフォルト: true） |
| `getNonce?` | function | カスタムノンス生成関数 |
| `verifyMessage?` | function | カスタムメッセージ検証関数 |
| `ensLookup?` | function | ENS 名・アバター検索（オプション） |

## データベーススキーマ

`walletAddress` テーブルを追加:

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | string | 主キー |
| `userId` | string | ユーザー ID |
| `address` | string | Ethereum ウォレットアドレス |
| `chainId` | number | チェーン ID |
| `isPrimary` | boolean | プライマリウォレットフラグ |
| `createdAt` | Date | 作成日時 |

## 対応チェーン

- Ethereum mainnet (chainId: 1、デフォルト)
- Polygon (137)
- Arbitrum (42161)
- Base (8453)

## Related

- [passkey.md](./passkey.md)
- [anonymous.md](./anonymous.md)
