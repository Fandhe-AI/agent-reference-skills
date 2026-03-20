# Plugins

プラグインは Better Auth の基本機能を拡張し、認証メソッド、機能、カスタム動作を追加できる。サーバー側プラグイン、クライアント側プラグイン、または両方が連携して動作する。

## プラグインの機能

- 任意のアクション用のカスタムエンドポイント作成
- カスタムスキーマによるデータベーステーブルの拡張
- 特定のルートグループをターゲットとするミドルウェア
- 特定のルートやリクエストへの Hook 実装
- `onRequest`/`onResponse` によるグローバルリクエスト/レスポンスハンドラー
- カスタムレートリミットルールの定義

## セットアップ

**サーバー設定:**

```typescript
export const auth = betterAuth({
  plugins: [
    // プラグインをここに追加
  ],
});
```

**クライアント設定:**

```typescript
const authClient = createAuthClient({
  plugins: [
    // クライアントプラグインをここに追加
  ],
});
```

ベストプラクティス: auth クライアントとサーバー auth インスタンスは別ファイルに保持する。

## サーバープラグインの作成

最小要件は `BetterAuthPlugin` インターフェースを満たすユニーク `id` プロパティを持つオブジェクト。関数でラップするとオプション渡しが可能:

```typescript
export const myPlugin = () => {
  return {
    id: "my-plugin",
  } satisfies BetterAuthPlugin;
};
```

### エンドポイント

`better-auth/api` の `createAuthEndpoint` を使用してエンドポイントを作成:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    endpoints: {
      getHelloWorld: createAuthEndpoint(
        "/my-plugin/hello-world",
        {
          method: "GET",
        },
        async (ctx) => {
          return ctx.json({
            message: "Hello World",
          });
        }
      ),
    },
  } satisfies BetterAuthPlugin;
};
```

**エンドポイントのルール:**
- パスには kebab-case を使用
- POST または GET メソッドのみ使用
- データ変更には POST、データ取得には GET
- `createAuthEndpoint` 関数を使用
- ユニークなパスを確保。プラグイン名でプレフィックスを付けて競合を回避

**利用可能なコンテキストプロパティ:**
- `appName`: アプリケーション名（デフォルト: "Better Auth"）
- `options`: 渡された Better Auth 設定
- `tables`: コアテーブル定義
- `baseURL`: パス付き auth サーバーベース URL
- `session`: セッション設定（`updateAge`, `expiresIn`）
- `secret`: 暗号操作用シークレットキー
- `authCookie`: デフォルト Cookie 設定
- `logger`: Better Auth ロガーインスタンス
- `db`: Kysely データベースインスタンス
- `adapter`: ORM ライクなデータベース関数
- `internalAdapter`: 内部データベース呼び出し（例: `createSession()`）
- `createAuthCookie`: Cookie 管理ヘルパー
- `trustedOrigins`: 設定済み信頼オリジンリスト
- `isTrustedOrigin`: オリジン検証ヘルパー

### スキーマ

テーブル名をキーとした `schema` オブジェクトでデータベーステーブルを定義:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    schema: {
      myTable: {
        fields: {
          name: {
            type: "string",
          },
        },
        modelName: "myTable", // オプション
      },
    },
  } satisfies BetterAuthPlugin;
};
```

**フィールドプロパティ:**
- `type`: `"string"`, `"number"`, `"boolean"`, または `"date"`
- `required`: boolean（デフォルト: `true`）
- `unique`: boolean（デフォルト: `false`）
- `references`: `model`, `field`, `onDelete`（デフォルト: cascade）を持つオブジェクト

**スキーマプロパティ:**
- `disableMigration`: true でテーブルマイグレーションをスキップ

**自動推論:** `user` または `session` テーブルにフィールドを追加すると、`getSession()` と `signUpEmail()` レスポンスで型が自動推論される。

**セキュリティ注意:** `user` や `session` テーブルに機密データを保存しないこと。代わりに別テーブルを作成する。

### Hooks

Hook はクライアントまたはサーバー呼び出しからのアクションの前後に実行:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    hooks: {
      before: [
        {
          matcher: (context) => {
            return context.headers.get("x-my-header") === "my-value";
          },
          handler: createAuthMiddleware(async (ctx) => {
            return {
              context: ctx, // 必要に応じてコンテキストを変更
            };
          }),
        },
      ],
      after: [
        {
          matcher: (context) => {
            return context.path === "/sign-up/email";
          },
          handler: createAuthMiddleware(async (ctx) => {
            return ctx.json({
              message: "Hello World",
            }); // 必要に応じてレスポンスを変更
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin;
};
```

### ミドルウェア

ミドルウェアはクライアントからの API リクエストでのみ実行される（直接エンドポイント呼び出しでは実行されない）:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    middlewares: [
      {
        path: "/my-plugin/hello-world",
        middleware: createAuthMiddleware(async (ctx) => {
          // カスタムロジック
        }),
      },
    ],
  } satisfies BetterAuthPlugin;
};
```

`APIError` のスローまたは `Response` オブジェクトの返却でリクエストを停止できる。

### onRequest / onResponse

**`onRequest`:** リクエスト前に実行。何も返さなければ続行、`{ response }` を返すと中断、変更された `request` を返すとリクエストを変更。

**`onResponse`:** レスポンス生成後に実行。変更されたレスポンスを返すか、何も返さずそのまま送信。

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    onRequest: async (request, context) => {
      // 何かする
    },
    onResponse: async (response, context) => {
      // 何かする
    },
  } satisfies BetterAuthPlugin;
};
```

### レートリミット

パスマッチャーでカスタムレートリミットルールを定義:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    rateLimit: [
      {
        pathMatcher: (path) => {
          return path === "/my-plugin/hello-world";
        },
        limit: 10,
        window: 60,
      },
    ],
  } satisfies BetterAuthPlugin;
};
```

### 信頼オリジン

`isTrustedOrigin()` を使用して設定済み信頼オリジンに対してカスタムエンドポイントを検証:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    trustedOrigins: ["http://trusted.com"],
    endpoints: {
      getTrustedHelloWorld: createAuthEndpoint(
        "/my-plugin/hello-world",
        {
          method: "GET",
          query: z.object({
            url: z.string(),
          }),
        },
        async (ctx) => {
          if (
            !ctx.context.isTrustedOrigin(ctx.query.url, {
              allowRelativePaths: false,
            })
          ) {
            throw new APIError("FORBIDDEN", {
              message: "origin is not trusted.",
            });
          }

          return ctx.json({
            message: "Hello World",
          });
        }
      ),
    },
  } satisfies BetterAuthPlugin;
};
```

### サーバープラグインヘルパー関数

**`getSessionFromCtx`:** auth ミドルウェアコンテキストからクライアントセッションデータを取得:

```typescript
const myPlugin = {
  id: "my-plugin",
  hooks: {
    before: [
      {
        matcher: (context) => {
          return context.headers.get("x-my-header") === "my-value";
        },
        handler: createAuthMiddleware(async (ctx) => {
          const session = await getSessionFromCtx(ctx);
          return {
            context: ctx,
          };
        }),
      },
    ],
  },
} satisfies BetterAuthPlugin;
```

**`sessionMiddleware`:** クライアントセッションを検証し、コンテキストにセッションデータを追加:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    endpoints: {
      getHelloWorld: createAuthEndpoint(
        "/my-plugin/hello-world",
        {
          method: "GET",
          use: [sessionMiddleware],
        },
        async (ctx) => {
          const session = ctx.context.session;
          return ctx.json({
            message: "Hello World",
          });
        }
      ),
    },
  } satisfies BetterAuthPlugin;
};
```

## クライアントプラグインの作成

クライアントプラグインはサーバー機能とインターフェースし、Better Fetch を使用してリクエストを行う:

```typescript
export const myPluginClient = () => {
  return {
    id: "my-plugin",
  } satisfies BetterAuthClientPlugin;
};
```

### エンドポイント推論

`$InferServerPlugin` を使用してサーバーエンドポイントを自動推論。kebab-case パスは camelCase に変換される（例: `/my-plugin/hello-world` → `myPlugin.helloWorld`）:

```typescript
const myPluginClient = () => {
  return {
    id: "my-plugin",
    $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
  } satisfies BetterAuthClientPlugin;
};
```

### カスタムアクション

`getActions` 関数で `$fetch` を使用して追加メソッドを定義:

```typescript
const myPluginClient = {
  id: "my-plugin",
  $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
  getActions: ($fetch) => {
    return {
      myCustomAction: async (
        data: { foo: string },
        fetchOptions?: BetterFetchOption
      ) => {
        const res = $fetch("/custom/action", {
          method: "POST",
          body: {
            foo: data.foo,
          },
          ...fetchOptions,
        });
        return res;
      },
    };
  },
} satisfies BetterAuthClientPlugin;
```

**ガイドライン:** 各関数は 1 つの引数を受け取り、オプションの 2 番目の引数で fetch オプションを受け取る。`data` と `error` キーを持つオブジェクトを返す。

### カスタム Atoms (Hooks)

nanostores を使用して再利用可能な Hooks を作成:

```typescript
const myPluginClient = {
  id: "my-plugin",
  $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
  getAtoms: ($fetch) => {
    const myAtom = atom<null>();
    return {
      myAtom,
    };
  },
} satisfies BetterAuthClientPlugin;
```

### パスメソッドオーバーライド

デフォルト HTTP メソッドをオーバーライド（ボディなしリクエストは GET、それ以外は POST）:

```typescript
const myPluginClient = {
  id: "my-plugin",
  $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
  pathMethods: {
    "/my-plugin/hello-world": "POST",
  },
} satisfies BetterAuthClientPlugin;
```

### Fetch プラグイン

高度なリクエスト/レスポンス処理のために `fetchPlugins` 配列で Better Fetch プラグインを渡せる。

### Atom リスナー

Atom の変更をリッスンし、動的に再評価する（組み込みプラグインの例を参照）。
