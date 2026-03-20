# Magic Link

Magic Link プラグインは、検証リンクを含むメールをユーザーに送信することでパスワードレス認証を実現する。リンクをクリックするとパスワードなしで自動的に認証される。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { magicLink } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, token, url, metadata }, ctx) => {
                // メール送信ロジックを実装
            }
        })
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { magicLinkClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        magicLinkClient()
    ]
})
```

## API メソッド

### Magic Link でサインイン

`POST /sign-in/magic-link`

```typescript
// クライアント
const { data, error } = await authClient.signIn.magicLink({
    email: "user@email.com",
    name: "my-name",
    callbackURL: "/dashboard",
    newUserCallbackURL: "/welcome",
    errorCallbackURL: "/error",
    metadata: { inviteId: "123" },
})

// サーバー
const data = await auth.api.signInMagicLink({
    body: {
        email: "user@email.com",
        name: "my-name",
        callbackURL: "/dashboard",
        newUserCallbackURL: "/welcome",
        errorCallbackURL: "/error",
        metadata: { inviteId: "123" },
    },
    headers: await headers(),
})
```

パラメータ:
- `email` (string, 必須): マジックリンクを受信するメールアドレス
- `name` (string): 新規登録時の表示名
- `callbackURL` (string): 検証後のリダイレクト先
- `newUserCallbackURL` (string): 新規ユーザーのリダイレクト先
- `errorCallbackURL` (string): エラー時のリダイレクト先
- `metadata` (Record<string, any>): sendMagicLink コールバックに渡すカスタムデータ

### Magic Link 検証

`GET /magic-link/verify`

```typescript
// クライアント
const { data, error } = await authClient.magicLink.verify({
    query: {
        token: "123456",
        callbackURL: "/dashboard",
    },
})

// サーバー
const data = await auth.api.magicLinkVerify({
    query: {
        token: "123456",
        callbackURL: "/dashboard",
    },
    headers: await headers(),
})
```

`disableSignUp` が有効でない限り、アカウントのないユーザーは自動登録される。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `sendMagicLink` | function | 必須 | マジックリンク要求時に呼ばれるコールバック |
| `expiresIn` | number | 300（5分） | トークンの有効期限（秒） |
| `allowedAttempts` | number \| Infinity | 1 | トークン削除前の最大検証試行数 |
| `disableSignUp` | boolean | false | マジックリンクでの新規ユーザー登録を防止 |
| `generateToken` | (email: string) => string | - | カスタムトークン生成関数 |
| `storeToken` | "plain" \| "hashed" \| { type: "custom-hasher", hash: ... } | "plain" | トークン保存方法 |

### カスタムトークン生成

`generateToken` は暗号的に安全で推測困難な文字列を返す必要がある。

### トークン保存

```typescript
// ハッシュ化（推奨）
magicLink({ storeToken: "hashed" })

// カスタムハッシャー
magicLink({
    storeToken: {
        type: "custom-hasher",
        hash: async (token) => myCustomHasher(token)
    }
})
```

ストレージバックエンドはグローバルの `verification` 設定で決定される。Redis には `secondaryStorage` を使用可能。

## 注意点

- デフォルトのトークン有効期限は5分
- デフォルトでは1回のみ検証試行可能（ブルートフォース防止）
- 本番環境では `storeToken: "hashed"` を推奨
- `disableSignUp: true` でない限り、未登録ユーザーはマジックリンク要求で自動的に作成される
- エラー時は `errorCallbackURL` または `callbackURL` にエラークエリパラメータ付きでリダイレクト
