# OAuth

Better Auth は Google, Facebook, GitHub などの人気プロバイダーを通じたユーザー認証のために、組み込みの OAuth 2.0 および OpenID Connect サポートを提供する。未サポートプロバイダーには Generic OAuth Plugin でカスタム統合が可能。

## セットアップ

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
    },
  },
});
```

## API / メソッド

### サインイン操作

**クライアント側:**

```typescript
await authClient.signIn.social({
  provider: "google",
});
```

**サーバー側:**

```typescript
await auth.api.signInSocial({
  body: { provider: "google" },
});
```

### アカウントリンク

**クライアント側:**

```typescript
await authClient.linkSocial({
  provider: "google",
});
```

**サーバー側:**

```typescript
await auth.api.linkSocialAccount({
  body: { provider: "google" },
  headers: await headers(),
});
```

### アクセストークン取得

期限切れトークンを自動的にリフレッシュ:

```typescript
const { accessToken } = await authClient.getAccessToken({
  providerId: "google",
  accountId: "accountId", // オプション
});
```

### プロバイダーアカウント情報

```typescript
const info = await authClient.accountInfo({
  accountId: "accountId",
});
```

## 高度な機能

### 追加スコープ

初回サインアップ後に追加の権限をリクエスト（`linkSocial` を再呼び出し）:

```typescript
await authClient.linkSocial({
  provider: "google",
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});
```

Better Auth 1.2.7 以降が必要。

### OAuth フローでのカスタムデータ渡し

データベースに永続化せずに一時的なデータを送信:

```typescript
// クライアント側
await authClient.signIn.social({
  provider: "google",
  additionalData: {
    referralCode: "ABC123",
    source: "landing-page",
  },
});

// サーバー側
await auth.api.signInSocial({
  body: {
    provider: "google",
    additionalData: {
      referralCode: "ABC123",
    },
  },
});
```

### Hooks での追加データアクセス

OAuth コールバック時に `getOAuthState` を使用:

```typescript
import { getOAuthState } from "better-auth/api";

export const auth = betterAuth({
  hooks: {
    after: [
      {
        matcher: () => true,
        handler: async (ctx) => {
          if (ctx.path === "/callback/:id") {
            const additionalData = await getOAuthState<{
              referralCode?: string;
              source?: string;
            }>();
            // データの検証と処理
          }
        },
      },
    ],
  },
});
```

## 設定オプション

| Option | Type | Description |
|--------|------|-------------|
| `scope` | `string[]` | リクエストする OAuth スコープ（例: `["email", "profile"]`） |
| `redirectURI` | `string` | カスタムコールバック URI。デフォルト: `/api/auth/callback/${provider}` |
| `disableSignUp` | `boolean` | 新規ユーザー登録を防止 |
| `disableIdTokenSignIn` | `boolean` | サインインでの ID トークン使用を無効化 |
| `verifyIdToken` | `function` | カスタム ID トークン検証関数 |
| `overrideUserInfoOnSignIn` | `boolean` | 毎回のサインインでユーザーデータを更新（デフォルト: false） |
| `mapProfileToUser` | `function` | プロバイダープロファイルをデータベースユーザーオブジェクトにマップ |
| `refreshAccessToken` | `function` | カスタムトークンリフレッシュ実装 |
| `clientKey` | `string` | TikTok 固有の `clientId` の代替 |
| `getUserInfo` | `function` | デフォルトのユーザー情報取得をオーバーライド |
| `disableImplicitSignUp` | `boolean` | 明示的な `requestSignUp` フラグを要求 |
| `prompt` | `string` | 認証フロープロンプト（`"select_account"`, `"consent"`, `"login"`, `"none"`） |
| `responseMode` | `string` | レスポンス配信方法（`"query"`, `"form_post"`） |
| `disableDefaultScope` | `boolean` | プロバイダーデフォルトを無視し、指定スコープのみ使用 |

### プロファイルマッピング例

```typescript
socialProviders: {
  google: {
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    mapProfileToUser: (profile) => {
      return {
        firstName: profile.given_name,
        lastName: profile.family_name,
      };
    },
  },
}
```

追加ユーザーフィールドを設定するには `user.additionalFields` を設定する。

## 組み込み OAuth State データ

- `callbackURL` — OAuth フローコールバック先
- `codeVerifier` — PKCE コードベリファイアー
- `errorURL` — エラーリダイレクト先
- `newUserURL` — 新規ユーザーリダイレクト先
- `link` — メールとユーザー ID 情報
- `requestSignUp` — 新規ユーザーサインアップフラグ
- `expiresAt` — State の有効期限タイムスタンプ

## 注意点

- 組み込みソーシャルプロバイダーはカスタムトークンリフレッシュ関数をサポートするが、Generic OAuth Plugin は現在この機能を提供していない
- ユーザー情報マッピングにはカスタムデータベースフィールド用に `user.additionalFields` の設定が必要
- すべての OAuth state データはクライアントからのもので、重要な操作に使用する前に検証すべき
- TikTok は `clientId` の代わりに `clientKey` を使用

## セキュリティ考慮事項

- クライアント提供のすべてのデータを使用前に検証・サニタイズすること
