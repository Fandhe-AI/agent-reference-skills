# Anonymous

Anonymous プラグインは、個人情報（PII）を要求せずに認証済みエクスペリエンスを提供する。ユーザーは匿名でアカウントを確立し、後から認証方法をリンクできる。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { anonymous } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        anonymous()
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
import { anonymousClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        anonymousClient()
    ]
})
```

## API メソッド

### 匿名サインイン

```typescript
const user = await authClient.signIn.anonymous()
```

クレデンシャルや PII なしでユーザーを認証する。

### アカウントリンク

匿名ユーザーが別の方法でサインイン/サインアップすると、`onLinkAccount` コールバックが実行される:

```typescript
export const auth = betterAuth({
    plugins: [
        anonymous({
            onLinkAccount: async ({ anonymousUser, newUser }) => {
                // カート、設定等のデータを移行
            }
        })
    ]
})
```

トリガー:

```typescript
const user = await authClient.signIn.email({ email })
```

匿名ユーザーはリンク後にデフォルトで削除される。

### 匿名ユーザー削除

```typescript
// クライアント
await authClient.deleteAnonymousUser()

// サーバー
await auth.api.deleteAnonymousUser()
```

匿名ユーザー認証が必要。`disableDeleteAnonymousUser` 設定に従う。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `emailDomainName` | string | `temp@{id}.com` で生成 | 一時メールアドレスのカスタムドメイン |
| `generateRandomEmail` | () => string \| Promise<string> | - | カスタムメール生成関数。`emailDomainName` を上書き |
| `onLinkAccount` | async ({ anonymousUser, newUser }) => void | - | アカウントリンク時のコールバック |
| `disableDeleteAnonymousUser` | boolean | false | 匿名ユーザー削除エンドポイントを無効化 |
| `generateName` | () => string \| Promise<string> | - | 匿名ユーザーのカスタム名生成 |

### カスタムメール生成

```typescript
generateRandomEmail: () => {
    const id = crypto.randomUUID()
    return `guest-${id}@example.com`
}
```

一意で有効なメールを返す必要がある。

## DB スキーマ

### user テーブル追加フィールド

| フィールド | 型 | 任意 | 説明 |
|---|---|---|---|
| `isAnonymous` | boolean | Yes | 匿名ユーザーアカウントの識別 |

## 注意点

- 匿名ユーザーはアカウントリンク時にデフォルトで削除される
- `disableDeleteAnonymousUser` はエンドポイントアクセスを防ぐが、リンク時の自動削除には影響しない
- カスタムメール生成関数は一意性の確保が開発者の責任
- 匿名サインアップ時に PII は不要で保存されない
