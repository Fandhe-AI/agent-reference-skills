# MCP

MCP（Model Context Protocol）プラグインは、Better Auth インスタンスを MCP クライアント用の OAuth プロバイダーとして機能させる。MCP アプリケーションの認証とアクセストークン発行を管理する。

**注意**: このプラグインは近い将来、OAuth Provider プラグインに置き換えられる予定。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { mcp } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        mcp({
            loginPage: "/sign-in"
        })
    ]
})
```

マイグレーション:

```bash
npx auth migrate
# または
npx auth generate
```

OIDC Provider プラグインと同じスキーマを使用。

### Well-Known エンドポイント

OAuth ディスカバリーメタデータ (`.well-known/oauth-authorization-server/route.ts`):

```typescript
import { oAuthDiscoveryMetadata } from "better-auth/plugins"
import { auth } from "../../../lib/auth"
export const GET = oAuthDiscoveryMetadata(auth)
```

OAuth 保護リソースメタデータ (`/.well-known/oauth-protected-resource/route.ts`):

```typescript
import { oAuthProtectedResourceMetadata } from "better-auth/plugins"
import { auth } from "@/lib/auth"
export const GET = oAuthProtectedResourceMetadata(auth)
```

## MCP セッション処理

### withMcpAuth 使用

```typescript
import { auth } from "@/lib/auth"
import { createMcpHandler } from "@vercel/mcp-adapter"
import { withMcpAuth } from "better-auth/plugins"
import { z } from "zod"

const handler = withMcpAuth(auth, (req, session) => {
    return createMcpHandler(
        (server) => {
            server.tool("echo", "Echo a message", { message: z.string() },
                async ({ message }) => ({
                    content: [{ type: "text", text: `Tool echo: ${message}` }],
                })
            )
        },
        { capabilities: { tools: { echo: { description: "Echo a message" } } } },
        { redisUrl: process.env.REDIS_URL, basePath: "/api", verboseLogs: true, maxDuration: 60 }
    )(req)
})

export { handler as GET, handler as POST, handler as DELETE }
```

### auth.api.getMcpSession 使用

```typescript
const handler = async (req: Request) => {
    const session = await auth.api.getMcpSession({ headers: req.headers })
    if (!session) {
        return new Response(null, { status: 401 })  // 401 を返すことが必須
    }
    return createMcpHandler(/* ... */)(req)
}
```

## リモート MCP クライアント

別サービスとして動作する MCP サーバー用。

### クライアント作成

```typescript
import { createMcpAuthClient } from "better-auth/plugins/mcp/client"

const mcpAuth = createMcpAuthClient({
    authURL: "http://localhost:3000/api/auth"
})
```

### ルート保護

```typescript
const handler = mcpAuth.handler(async (req, session) => {
    return new Response(JSON.stringify({
        jsonrpc: "2.0",
        result: { userId: session.userId },
        id: 1
    }))
})
```

### ディスカバリーエンドポイントのマウント

```typescript
const discovery = mcpAuth.discoveryHandler()
const protectedResource = mcpAuth.protectedResourceHandler("http://localhost:4000")
```

## フレームワークアダプター

### Hono

```typescript
import { Hono } from "hono"
import { mcpAuthHono } from "better-auth/plugins/mcp/client/adapters"

const app = new Hono()
const { middleware, discoveryRoutes } = mcpAuthHono({
    authURL: "http://localhost:3000/api/auth"
})

discoveryRoutes(app, "http://localhost:4000")
app.use("/mcp/*", middleware)
app.post("/mcp", (c) => { const session = c.get("mcpSession") })
```

### Express

```typescript
import express from "express"
import { createMcpAuthClient } from "better-auth/plugins/mcp/client"

const app = express()
const mcpAuth = createMcpAuthClient({ authURL: "http://localhost:3000/api/auth" })

app.use("/mcp", mcpAuth.middleware())
app.post("/mcp", (req, res) => { const session = req.mcpSession })
```

### Official MCP SDK

```typescript
import { mcpAuthOfficial } from "better-auth/plugins/mcp/client/adapters"

const auth = mcpAuthOfficial({ authURL: "http://localhost:3000/api/auth" })

app.post("/mcp", auth.handler(async (req, session) => {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => crypto.randomUUID() })
    await mcpServer.connect(transport)
    return transport.handleRequest(req)
}))
```

### mcp-use

```typescript
import { mcpAuthMcpUse } from "better-auth/plugins/mcp/client/adapters"

const server = new MCPServer({
    name: "my-server",
    version: "1.0.0",
    oauth: mcpAuthMcpUse({ authURL: "http://localhost:3000/api/auth" })
})
```

## 設定オプション

### プラグイン設定

| プロパティ | 型 | 説明 |
|---|---|---|
| `loginPage` | string | ログインページのパス |
| `resource?` | string | リソース識別子（任意） |
| `oidcConfig?` | object | 追加 OIDC 設定 |

### OIDC 設定

| プロパティ | 型 | 説明 |
|---|---|---|
| `codeExpiresIn?` | number | 認可コードの有効期限（秒） |
| `accessTokenExpiresIn?` | number | アクセストークンの有効期限（秒） |
| `refreshTokenExpiresIn?` | number | リフレッシュトークンの有効期限（秒） |
| `defaultScope?` | string | トークンのデフォルトスコープ |
| `scopes?` | string[] | 利用可能なスコープ |

### リモートクライアントオプション

| プロパティ | 型 | 説明 |
|---|---|---|
| `authURL` | string | Better Auth サーバー URL（baseURL + basePath） |
| `resource?` | string | リソース識別子（任意） |
| `allowedOrigin?` | string | CORS 許可オリジン |
| `fetch?` | typeof fetch | カスタム fetch 実装 |

## セッションオブジェクト

| プロパティ | 型 | 説明 |
|---|---|---|
| `accessToken?` | string | アクセストークン |
| `refreshToken?` | string | リフレッシュトークン |
| `accessTokenExpiresAt?` | string | アクセストークン有効期限 |
| `refreshTokenExpiresAt?` | string | リフレッシュトークン有効期限 |
| `clientId?` | string | OAuth クライアント識別子 |
| `userId?` | string | 認証済みユーザー ID |
| `scopes?` | string | 付与されたスコープ |

## 注意点

- OAuth Provider プラグインへの移行予定
- `getMcpSession` 使用時、未認証 MCP リクエストには 401 ステータスを返すことが必須
- クライアントディスカバリーのため `.well-known` エンドポイントのマウントが必要
- 同一プロセスサーバーには `withMcpAuth`、別サービスには `createMcpAuthClient` を使用
