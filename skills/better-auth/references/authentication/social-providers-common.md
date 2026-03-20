# Social Providers 共通設定

## 基本パターン

### サーバー側共通コード

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    providerName: {
      clientId: process.env.PROVIDER_CLIENT_ID as string,
      clientSecret: process.env.PROVIDER_CLIENT_SECRET as string,
    },
  },
});
```

### クライアント側共通コード

```typescript
import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "providerName",
  });
};
```

## 共通オプション

全プロバイダーで使える設定:

| Option | Type | Description |
|--------|------|-------------|
| `clientId` | string | OAuth アプリケーションの Client ID |
| `clientSecret` | string | OAuth アプリケーションの Client Secret |
| `scope` | string[] | 追加のスコープを指定 |
| `redirectURI` | string | コールバック URL をオーバーライド |
| `disableDefaultScope` | boolean | デフォルトスコープを無効にする |
| `mapProfileToUser` | function | プロバイダーのプロフィールをユーザーオブジェクトにマッピング |
| `getUserInfo` | function | カスタムユーザー情報取得 |
| `verifyIdToken` | function | カスタム ID トークン検証 |

## コールバック URL パターン

全プロバイダー共通:

```
/api/auth/callback/{provider}
```

- **ローカル開発**: `http://localhost:3000/api/auth/callback/{provider}`
- **本番環境**: `https://yourdomain.com/api/auth/callback/{provider}`
- auth ルートのベースパスを変更した場合は、リダイレクト URL も合わせて更新する

## アカウントリンク

追加スコープのリクエストやアカウントリンクには `linkSocial` を使用:

```typescript
const requestAdditionalAccess = async () => {
  await authClient.linkSocial({
    provider: "providerName",
    scopes: ["additional-scope"],
  });
};
```

Better Auth version 1.2.7 以降では、追加スコープリクエスト時の "Social account already linked" エラーが防止される。

## アクセストークン取得

認証後、アクセストークンはサーバー側に安全に保存される。サーバー側からプロバイダー API へのリクエストに使用可能。

## ID Token サインイン

一部のプロバイダーでは、リダイレクトなしで ID トークンを使用したサインインが可能:

```typescript
const data = await authClient.signIn.social({
  provider: "providerName",
  idToken: {
    token: "ID_TOKEN",
    accessToken: "ACCESS_TOKEN",
  },
});
```

対応プロバイダー: Google, Apple, Facebook, LINE など。
