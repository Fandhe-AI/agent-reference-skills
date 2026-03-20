# Multi-Session

Multi-Session プラグインは、同じブラウザ内で複数のアクティブセッションを維持し、ログアウトせずにアカウントを切り替えることを可能にする。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { multiSession } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        multiSession()
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { multiSessionClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        multiSessionClient()
    ]
})
```

## API メソッド

### デバイスセッション一覧

`GET /multi-session/list-device-sessions`

```typescript
// クライアント
const { data, error } = await authClient.multiSession.listDeviceSessions()

// サーバー
const data = await auth.api.listDeviceSessions({
    headers: await headers(),
})
```

セッション Cookie が必要。

### アクティブセッション設定

`POST /multi-session/set-active`

```typescript
// クライアント
const { data, error } = await authClient.multiSession.setActive({
    sessionToken: "some-session-token",
})

// サーバー
const data = await auth.api.setActiveSession({
    body: { sessionToken: "some-session-token" },
    headers: await headers(),
})
```

### セッション取り消し

`POST /multi-session/revoke`

```typescript
// クライアント
const { data, error } = await authClient.multiSession.revoke({
    sessionToken: "some-session-token",
})

// サーバー
const data = await auth.api.revokeDeviceSession({
    body: { sessionToken: "some-session-token" },
    headers: await headers(),
})
```

### サインアウトと全セッション取り消し

```typescript
await authClient.signOut()
```

既存の `signOut` メソッドが全アクティブセッションの取り消しを自動処理する。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `maximumSessions` | number | 5 | デバイスあたりの最大同時セッション数 |

```typescript
multiSession({
    maximumSessions: 3
})
```

## 注意点

- ユーザー認証時に、ブラウザに追加の Cookie が付加され、異なるアカウント間の複数セッションが追跡される
- Cookie ベースの追跡により、同一ブラウザ内でのシームレスなアカウント切り替えが可能
