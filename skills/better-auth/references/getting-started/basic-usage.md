# Basic Usage

コア認証パターン: メール/パスワード認証、ソーシャル OAuth、セッション管理、サインアウト。

## Email & Password

### サーバー設定

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,       // default: true
    minPasswordLength: 8,   // default: 8
  },
});
```

### 設定オプション

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | false | メール/パスワード認証の有効化 |
| `autoSignIn` | boolean | true | サインアップ後の自動サインイン |
| `minPasswordLength` | number | 8 | 最小パスワード文字数 |

### サインアップ (クライアント)

```typescript
const { data, error } = await authClient.signUp.email({
  email: "user@example.com",
  password: "password1234",
  name: "Jane Doe",
  image: "https://example.com/avatar.png",
  callbackURL: "/dashboard",
}, {
  onRequest: (ctx) => { /* ローディング表示 */ },
  onSuccess: (ctx) => { /* リダイレクトまたは UI 更新 */ },
  onError: (ctx) => { alert(ctx.error.message); },
});
```

### サインイン (クライアント)

```typescript
const { data, error } = await authClient.signIn.email({
  email: "user@example.com",
  password: "password1234",
  callbackURL: "/dashboard",
  rememberMe: false,
});
```

### サインイン (サーバー側)

```typescript
const response = await auth.api.signInEmail({
  body: { email: "user@example.com", password: "password1234" },
  asResponse: true,
});
```

## Social Sign-On (OAuth)

### サーバー設定

```typescript
export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

### クライアント実装

```typescript
await authClient.signIn.social({
  provider: "github",
  callbackURL: "/dashboard",
  errorCallbackURL: "/error",
  newUserCallbackURL: "/welcome",
  disableRedirect: true,  // 手動リダイレクト
});
```

サポートプロバイダー: Apple, Google, GitHub, Discord, LinkedIn, Twitter/X, PayPal, Slack, Twitch など 40 以上。

## セッション管理

### クライアント側 (Hook)

```typescript
// React
const { data: session, isPending, error, refetch } = authClient.useSession();

// Vue
const session = authClient.useSession(); // { data, isPending, error, refetch }

// Svelte
const session = authClient.useSession(); // リアクティブストア
```

### クライアント側 (Async)

```typescript
const { data: session, error } = await authClient.getSession();
```

### サーバー側

```typescript
// Next.js
import { headers } from "next/headers";
const session = await auth.api.getSession({
  headers: await headers(),
});

// Nuxt
const session = await auth.api.getSession({
  headers: event.headers,
});
```

## サインアウト

```typescript
await authClient.signOut();

// リダイレクト付き
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => router.push("/login"),
  },
});
```

## プラグイン例: 二要素認証

### サーバーセットアップ

```typescript
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [twoFactor()],
});
```

プラグイン追加後にマイグレーションを実行:

```bash
npx auth migrate
```

### クライアントセットアップ

```typescript
import { createAuthClient } from "better-auth/client";
import { twoFactorClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  plugins: [
    twoFactorClient({ twoFactorPage: "/two-factor" }),
  ],
});
```

### 2FA メソッド

```typescript
await authClient.twoFactor.enable({ password });
await authClient.twoFactor.disable({ password });
await authClient.twoFactor.verifyTOTP({ code: "123456", trustDevice: true });
```

## 利用可能なプラグイン

username, magic link, passkey, email-OTP, JWT, organization, SSO, SAML, API keys など 50 以上のプラグイン。

## 注意点

- クライアントメソッドは常にクライアント側から呼び出すこと（サーバー側からは使用しない）
- `autoSignIn: false` でサインアップ後の自動サインインを無効化可能
- プラグイン追加後は必ず `npx auth migrate` でスキーマ変更を適用
- パスワードはデフォルトで最低 8 文字（設定変更可能）
- 本番環境では常に HTTPS を使用
- セキュアな Cookie がセッション管理に適用される
- メール検証をサインイン前に必須にすることが可能
