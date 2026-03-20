# Last Login Method

Last Login Method プラグインは、ユーザーが使用した最新の認証方法を追跡・表示する。「Google でログイン済み」などのログインインジケーターの表示や、ユーザーの好みに基づく認証方法の優先順位付けが可能。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { lastLoginMethod } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        lastLoginMethod()
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { lastLoginMethodClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        lastLoginMethodClient()
    ]
})
```

## API メソッド

### 最後に使用したログイン方法の取得

```typescript
const lastMethod = authClient.getLastUsedLoginMethod()
// "google", "email", "github" 等
```

### 特定の方法が最後に使用されたか確認

```typescript
const wasGoogle = authClient.isLastUsedLoginMethod("google")
```

### 保存された認証方法の記録をクリア

```typescript
authClient.clearLastUsedLoginMethod()
```

## 設定オプション

### サーバー設定

```typescript
lastLoginMethod({
    cookieName: "better-auth.last_used_login_method",
    maxAge: 60 * 60 * 24 * 30,  // 30日（秒）
    storeInDatabase: false,
    customResolveMethod: (ctx) => {
        if (ctx.path === "/oauth/callback/custom-provider") return "custom-provider"
        return null
    },
    schema: {
        user: { lastLoginMethod: "custom_field_name" }
    }
})
```

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `cookieName` | string | `"better-auth.last_used_login_method"` | Cookie 識別子。`httpOnly: false` |
| `maxAge` | number | `2592000`（30日） | Cookie の有効期限（秒） |
| `storeInDatabase` | boolean | `false` | DB に方法を永続化 |
| `customResolveMethod` | function | - | リクエストコンテキストからログイン方法を判定するカスタムロジック |
| `schema` | object | - | `storeInDatabase` 有効時の DB フィールド名マッピング |

### クライアント設定

```typescript
lastLoginMethodClient({
    cookieName: "better-auth.last_used_login_method"  // サーバーと一致させる
})
```

## DB 設定

### DB ストレージ有効化

```typescript
lastLoginMethod({ storeInDatabase: true })
```

マイグレーション:

```bash
npx auth@latest migrate
```

### DB スキーマ

user テーブル追加フィールド:

| フィールド | 型 | 任意 | 説明 |
|---|---|---|---|
| `lastLoginMethod` | string | Yes | 最後に使用した認証方法 |

### DB フィールドへのアクセス

```typescript
// サーバー
const session = await auth.api.getSession({ headers })
console.log(session?.user.lastLoginMethod)

// クライアント
const { data: session } = authClient.useSession()
console.log(session?.user.lastLoginMethod)
```

## デフォルトのメソッド解決

- **Email**: `"email"`（`/sign-in/email` と `/sign-up/email`）
- **OAuth プロバイダー**: プロバイダー ID（例: `"google"`, `"github"`）
- **OAuth コールバック**: `/callback/:id` や `/oauth2/callback/:id` からプロバイダー ID を抽出

## 高度な実装例

```typescript
lastLoginMethod({
    customResolveMethod: (ctx) => {
        if (ctx.path === "/saml/callback") return "saml"
        if (ctx.path === "/magic-link/verify") return "magic-link"
        if (ctx.path === "/sign-in/phone") return "phone"
        return null
    }
})
```

## UI 統合例

```typescript
export function SignInPage() {
    const lastMethod = authClient.getLastUsedLoginMethod()

    return (
        <div>
            <Button variant={lastMethod === "email" ? "default" : "outline"}>
                Sign in with Email
                {lastMethod === "email" && <Badge>Last used</Badge>}
            </Button>
            <Button variant={lastMethod === "google" ? "default" : "outline"}>
                Continue with Google
                {lastMethod === "google" && <Badge>Last used</Badge>}
            </Button>
        </div>
    )
}
```

## Expo 実装

```typescript
import { lastLoginMethodClient } from "@better-auth/expo/plugins"

export const authClient = createAuthClient({
    plugins: [
        expoClient({ scheme: "myapp", storagePrefix: "myapp", storage: SecureStore }),
        lastLoginMethodClient({ storagePrefix: "myapp", storage: SecureStorage }),
    ]
})
```

Expo 専用アプリケーションではサーバープラグインを省略し、クライアントプラグインのみに依存可能。

## 注意点

- Cookie は `httpOnly: false` を使用してクライアント側 JavaScript からアクセス可能
- Better Auth の `crossSubDomainCookies` や `crossOriginCookies` 設定を自動的に継承
