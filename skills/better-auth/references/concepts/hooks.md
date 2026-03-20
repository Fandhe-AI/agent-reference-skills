# Hooks

Hooks は認証ライフサイクルの特定のポイント（エンドポイント実行の前後）でインターセプトし、カスタムロジックを実行する。別のエンドポイントを構築する必要がない。

## Hook タイプ

| Type | Timing | Use Cases |
|------|--------|-----------|
| `before` | エンドポイント処理の前 | リクエストの変更、事前検証、カスタムレスポンスでの早期リターン |
| `after` | エンドポイント完了後 | レスポンスの変更、副作用のトリガー（通知、分析） |

## セットアップ

```typescript
export const auth = betterAuth({
  hooks: {
    before: createAuthMiddleware(async (ctx) => { /* ... */ }),
    after: createAuthMiddleware(async (ctx) => { /* ... */ }),
  },
});
```

## Context (`ctx`) オブジェクト

| Property | Description |
|----------|-------------|
| `ctx.path` | 現在のエンドポイントパス（例: `/sign-up/email`） |
| `ctx.body` | パース済み POST リクエストボディ |
| `ctx.headers` | リクエストヘッダー |
| `ctx.request` | Request オブジェクト（サーバーのみモードでは存在しない場合あり） |
| `ctx.query` | クエリパラメーター |
| `ctx.context` | 認証関連コンテキスト（下記テーブル参照） |

### `ctx.context` プロパティ

| Property | Description |
|----------|-------------|
| `newSession` | 新しく作成されたセッション — `after` hooks でのみ利用可能 |
| `returned` | 前の Hook の戻り値 |
| `responseHeaders` | 前の Hook からのヘッダー |
| `authCookies` | BetterAuth Cookie 設定 |
| `secret` | Auth インスタンスのシークレットキー |
| `password` | パスワードユーティリティ: `hash`, `verify` |
| `adapter` | ORM ライクなデータベースアダプターメソッド |
| `internalAdapter` | 内部 DB 操作メソッド（例: `createSession()`） |
| `generateId` | ID 生成ユーティリティ |

## コード例

### Before Hook — メールドメイン制限

```typescript
export const auth = betterAuth({
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      if (!ctx.body?.email.endsWith("@example.com")) {
        throw new APIError("BAD_REQUEST", {
          message: "Email must end with @example.com",
        });
      }
    }),
  },
});
```

### After Hook — 登録時の通知

```typescript
export const auth = betterAuth({
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          sendMessage({
            type: "user-register",
            name: newSession.user.name,
          });
        }
      }
    }),
  },
});
```

## レスポンスユーティリティ

### JSON レスポンス

```typescript
return ctx.json({ message: "Hello World" });
```

### リダイレクト

```typescript
throw ctx.redirect("/sign-up/name");
```

### Cookie

```typescript
// プレーン Cookie
ctx.setCookies("my-cookie", "value");
const cookie = ctx.getCookies("my-cookie");

// 署名付き Cookie
await ctx.setSignedCookie("my-signed-cookie", "value", ctx.context.secret, {
  maxAge: 1000,
});
const signedCookie = await ctx.getSignedCookie("my-signed-cookie");
```

### エラースロー

```typescript
throw new APIError("BAD_REQUEST", { message: "Invalid request" });
```

## バックグラウンドタスク

```typescript
// Fire-and-forget
ctx.context.runInBackground(sendAnalyticsEvent(newSession.user.id));

// レスポンス前に完了が必要
await ctx.context.runInBackgroundOrAwait(sendWelcomeEmail(newSession.user));
```

`advanced.backgroundTasks` でハンドラーを設定する。

## 注意点

- 認証動作のカスタマイズには、別のエンドポイントを構築するよりも Hooks を使用することを推奨
- 複数エンドポイントで再利用されるロジックには、プラグインの作成を検討
- `ctx.request` はサーバーのみ（非 HTTP）呼び出しでは存在しない場合がある
- `ctx.context.newSession` は `after` hooks でのみ設定される
