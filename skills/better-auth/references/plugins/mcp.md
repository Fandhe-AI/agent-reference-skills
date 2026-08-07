# MCP

The MCP (Model Context Protocol) plugin turns a Better Auth instance into an OAuth provider for MCP clients. It manages authentication and access token issuance for MCP applications.

**Note**: This plugin is expected to be replaced by the OAuth Provider plugin in the near future.

## Signature / Usage

### Setup (server side)

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

Migration:

```bash
npx auth migrate
# or
npx auth generate
```

Uses the same schema as the OIDC Provider plugin.

### Well-Known endpoints

OAuth discovery metadata (`.well-known/oauth-authorization-server/route.ts`):

```typescript
import { oAuthDiscoveryMetadata } from "better-auth/plugins"
import { auth } from "../../../lib/auth"
export const GET = oAuthDiscoveryMetadata(auth)
```

OAuth protected resource metadata (`/.well-known/oauth-protected-resource/route.ts`):

```typescript
import { oAuthProtectedResourceMetadata } from "better-auth/plugins"
import { auth } from "@/lib/auth"
export const GET = oAuthProtectedResourceMetadata(auth)
```

### MCP session handling (withMcpAuth)

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

### MCP session handling (auth.api.getMcpSession)

```typescript
const handler = async (req: Request) => {
    const session = await auth.api.getMcpSession({ headers: req.headers })
    if (!session) {
        return new Response(null, { status: 401 })  // must return 401
    }
    return createMcpHandler(/* ... */)(req)
}
```

### Remote MCP client (creating a client)

For an MCP server that runs as a separate service.

```typescript
import { createMcpAuthClient } from "better-auth/plugins/mcp/client"

const mcpAuth = createMcpAuthClient({
    authURL: "http://localhost:3000/api/auth"
})
```

### Remote MCP client (protecting routes)

```typescript
const handler = mcpAuth.handler(async (req, session) => {
    return new Response(JSON.stringify({
        jsonrpc: "2.0",
        result: { userId: session.userId },
        id: 1
    }))
})
```

### Remote MCP client (mounting discovery endpoints)

```typescript
const discovery = mcpAuth.discoveryHandler()
const protectedResource = mcpAuth.protectedResourceHandler("http://localhost:4000")
```

### Framework adapter (Hono)

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

### Framework adapter (Express)

```typescript
import express from "express"
import { createMcpAuthClient } from "better-auth/plugins/mcp/client"

const app = express()
const mcpAuth = createMcpAuthClient({ authURL: "http://localhost:3000/api/auth" })

app.use("/mcp", mcpAuth.middleware())
app.post("/mcp", (req, res) => { const session = req.mcpSession })
```

### Framework adapter (Official MCP SDK)

```typescript
import { mcpAuthOfficial } from "better-auth/plugins/mcp/client/adapters"

const auth = mcpAuthOfficial({ authURL: "http://localhost:3000/api/auth" })

app.post("/mcp", auth.handler(async (req, session) => {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => crypto.randomUUID() })
    await mcpServer.connect(transport)
    return transport.handleRequest(req)
}))
```

### Framework adapter (mcp-use)

```typescript
import { mcpAuthMcpUse } from "better-auth/plugins/mcp/client/adapters"

const server = new MCPServer({
    name: "my-server",
    version: "1.0.0",
    oauth: mcpAuthMcpUse({ authURL: "http://localhost:3000/api/auth" })
})
```

## Options / Props

### Plugin configuration

| Property | Type | Description |
|---|---|---|
| `loginPage` | string | Path to the login page |
| `resource?` | string | Resource identifier (optional) |
| `oidcConfig?` | object | Additional OIDC configuration |

### OIDC configuration

| Property | Type | Description |
|---|---|---|
| `codeExpiresIn?` | number | Authorization code expiration (seconds) |
| `accessTokenExpiresIn?` | number | Access token expiration (seconds) |
| `refreshTokenExpiresIn?` | number | Refresh token expiration (seconds) |
| `defaultScope?` | string | Default token scope |
| `scopes?` | string[] | Available scopes |

### Remote client options

| Property | Type | Description |
|---|---|---|
| `authURL` | string | Better Auth server URL (baseURL + basePath) |
| `resource?` | string | Resource identifier (optional) |
| `allowedOrigin?` | string | Allowed CORS origin |
| `fetch?` | typeof fetch | Custom fetch implementation |

### Session object

| Property | Type | Description |
|---|---|---|
| `accessToken?` | string | Access token |
| `refreshToken?` | string | Refresh token |
| `accessTokenExpiresAt?` | string | Access token expiration |
| `refreshTokenExpiresAt?` | string | Refresh token expiration |
| `clientId?` | string | OAuth client identifier |
| `userId?` | string | Authenticated user ID |
| `scopes?` | string | Granted scopes |

## Notes

- Expected to be migrated to the OAuth Provider plugin
- When using `getMcpSession`, unauthenticated MCP requests must return a 401 status
- The `.well-known` endpoints must be mounted for client discovery
- Use `withMcpAuth` for same-process servers, and `createMcpAuthClient` for separate services

## Related

- [oauth-provider.md](./oauth-provider.md)
- [oidc-provider.md](./oidc-provider.md)
