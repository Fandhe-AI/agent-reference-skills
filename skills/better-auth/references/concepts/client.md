# Client

Better Auth はフロントエンド認証用のフレームワーク非依存クライアントライブラリを提供する。コアクライアントは React, Vue, Svelte, Solid, バニラ JavaScript をフレームワーク固有のインポートを通じてサポートする。

## セットアップ

### 基本セットアップ

```typescript
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
```

### フレームワーク別インポート

| Framework | Import Path | Usage |
|-----------|-------------|-------|
| React | `better-auth/react` | Hooks とクライアントメソッド |
| Vue | `better-auth/vue` | Composition API サポート |
| Svelte | `better-auth/svelte` | ストアとリアクティブデータ |
| Solid | `better-auth/solid` | シグナルとプリミティブ |
| Vanilla JS | `better-auth/client` | コア機能 |

## 設定オプション

| Option | Type | Description |
|--------|------|-------------|
| `baseURL` | string | 認証サーバーのベース URL（同一ドメインなら省略可） |
| `fetchOptions` | object | デフォルト fetch 設定 |
| `disableDefaultFetchPlugins` | boolean | ブラウザ固有動作を無効化（React Native/Expo 向け） |
| `plugins` | array | クライアントプラグインで機能拡張 |

## 認証メソッド

### サインイン (Email)

```typescript
const { data, error } = await authClient.signIn.email({
  email: "user@example.com",
  password: "password1234",
});
```

### サインイン (Social)

```typescript
await authClient.signIn.social({
  provider: "github",
});
```

### マジックリンク

```typescript
await authClient.signIn.magicLink({
  email: "test@email.com",
});
```

## Hooks

### useSession Hook

**React:**

```typescript
import { createAuthClient } from "better-auth/react";
const { useSession } = createAuthClient();

export function User() {
  const { data: session, isPending, error, refetch } = useSession();

  return (
    <div>
      {session && <p>Logged in as {session.user.name}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

**Vue:**

```typescript
const session = authClient.useSession();
// Returns: { data, isPending, error, refetch }
```

**Svelte:**

```typescript
const session = authClient.useSession();
// リアクティブ更新付きストアを返す
```

## Fetch オプション

### デフォルト Fetch オプションの設定

```typescript
const authClient = createAuthClient({
  fetchOptions: {
    // better-fetch オプション
  },
});
```

### リクエスト毎の Fetch オプション

```typescript
await authClient.signIn.email(
  { email: "test@email.com", password: "pass" },
  { onSuccess(ctx) { /* 成功処理 */ } }
);

// または fetchOptions プロパティ内で
await authClient.signIn.email({
  email: "test@email.com",
  password: "pass",
  fetchOptions: { onSuccess(ctx) { /* */ } },
});
```

## Hook リレンダー制御

エンドポイント成功時に UI 更新をトリガーすべきでない場合、自動 Hook 更新を無効化:

```typescript
await authClient.updateUser(
  { name: "New Name" },
  { disableSignal: true }
);

// 必要に応じて手動リフェッチ
const { refetch } = authClient.useSession();
await authClient.updateUser(
  { name: "New Name" },
  { disableSignal: true, onSuccess() { refetch(); } }
);
```

## エラーハンドリング

### レスポンスオブジェクト構造

```typescript
const { data, error } = await authClient.signIn.email({
  email: "user@email.com",
  password: "pass",
});

// error オブジェクトのプロパティ:
// - message: string (ユーザー向けエラーメッセージ)
// - status: number (HTTP ステータスコード)
// - statusText: string (HTTP ステータステキスト)
// - code?: string (翻訳用エラーコード)
```

### エラーコードの使用

```typescript
const authClient = createAuthClient();

const errorMessages = {
  USER_ALREADY_EXISTS: {
    en: "user already registered",
    es: "usuario ya registrado",
  },
};

const { error } = await authClient.signUp.email({
  email: "user@email.com",
  password: "password",
  name: "User",
});

if (error?.code && error.code in errorMessages) {
  alert(errorMessages[error.code].en);
}
```

### Hook でのエラーハンドリング

```typescript
const { data, error, isPending } = useSession();

if (error) {
  // セッションフェッチエラーの処理
}
```

## プラグイン

### マジックリンクプラグイン例

```typescript
import { createAuthClient } from "better-auth/client";
import { magicLinkClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  plugins: [magicLinkClient()],
});

// 新しいプラグインメソッドの使用
await authClient.signIn.magicLink({ email: "test@email.com" });
```

## 注意点

- **非ブラウザ環境:** React Native/Expo では `disableDefaultFetchPlugins: true` を設定してデフォルト fetch プラグインを無効化
- **ベース URL 設定:** カスタムパスを含む完全な URL を明示的に提供（例: `http://localhost:3000/custom-path/auth`）
- **Fetch ライブラリ:** Better Auth は「better-fetch」を使用（ネイティブ Fetch API のラッパー）
- **シグナル管理:** 特定のエンドポイントは atom シグナルをトリガーし、認証状態との UI 同期を維持するために Hook のリレンダーを引き起こす
- フレームワーク非依存のコアとフレームワーク固有のラッパー
- 全フレームワークで一貫したメソッドシグネチャ
- フレームワークごとの組み込みリアクティブデータ管理
