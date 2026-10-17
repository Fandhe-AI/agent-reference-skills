# MCP

The MCP plugin lets your app act as an OAuth authorization server and protected resource for Model Context Protocol clients. It is built on the OAuth 2.1 Provider (`@better-auth/oauth-provider`), so MCP clients discover your endpoints and obtain resource-bound access tokens through standard OAuth flows.

`mcp()` configures the OAuth provider with MCP resource binding and serves the RFC 9728 protected resource metadata. For the MCP 2026-07-28 profile, compose it with Client ID Metadata Documents (`@better-auth/cimd`) and select the profile that pins CIMD draft-00. MCP deprecates Dynamic Client Registration (DCR), so Better Auth never enables DCR implicitly.

Install `@better-auth/mcp`, the recommended `@better-auth/cimd` companion package, and version 2 of the official MCP TypeScript SDK.

## Signature / Usage

### Installation

```bash
npm install @better-auth/mcp @better-auth/cimd @modelcontextprotocol/server zod
```

### Configure authorization

Add the MCP plugin alongside the JWT plugin. The JWT plugin is required: it provides the stable signing key used for ID tokens and access tokens, and exposes the `/jwks` endpoint that resource servers use to verify them.

```ts
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { cimd } from "@better-auth/cimd";
import { mcp } from "@better-auth/mcp";
import { fetchClientMetadataResource } from "@better-auth/cimd/node";

export const auth = betterAuth({
    plugins: [
        jwt(),
        mcp({
            loginPage: "/sign-in", // path to your login page
            consentPage: "/consent", // path to your consent page
            resource: "https://api.example.com/mcp" // protected resource identifier
        }),
        cimd({
            fetchClientMetadataResource,
            metadataProfile: "mcp-2026-07-28",
        }),
    ]
});
```

Node.js deployments can use the bundled transport shown above. Bun, Deno, Workers, and other runtimes must inject an equivalent transport that resolves each hostname once, rejects RFC 6890 special-use addresses, pins the approved address for the connection, and refuses redirects. The transport retrieves both the Client ID Metadata Document and discovery-owned resources such as `jwks_uri`.

`mcp()` is the OAuth provider. Do not also register a separate `oauthProvider()` plugin in the same app.

### Generate Schema

```bash
npx auth migrate
# or
npx auth generate
```

The MCP plugin uses the same schema as the OAuth Provider plugin (`oauthClient`, `oauthAccessToken`, `oauthRefreshToken`, `oauthConsent`, `oauthClientAssertion`).

### Endpoints

`mcp()` serves the standard OAuth 2.1 endpoints under `/oauth2/*`:

| Endpoint | Path |
| --- | --- |
| Authorization | `/oauth2/authorize` |
| Token | `/oauth2/token` |
| Dynamic registration (when explicitly enabled) | `/oauth2/register` |
| UserInfo | `/oauth2/userinfo` |

Discovery follows OAuth 2.0 Authorization Server Metadata (RFC 8414) and Protected Resource Metadata (RFC 9728). The well-known URLs are derived from the issuer, so a server with a base path serves them at the issuer-inserted location rather than the bare root. Discovery advertises `client_id_metadata_document_supported` only when `cimd()` is installed, and `registration_endpoint` only when DCR is enabled.

Better Auth owns OAuth discovery, client registration and discovery, PKCE authorization, resource binding, token issuance and refresh, and protected-resource challenges. The official MCP TypeScript SDK v2 owns the stateless MCP protocol and transport. Configure servers with `legacy: "reject"`, and pin SDK client version negotiation to `2026-07-28` when adopting this profile.

### Add device authorization for your own CLI

MCP clients normally discover the authorization server from protected resource metadata, then use the authorization code flow with PKCE. Keep that flow for general MCP compatibility. If your product also ships a command-line application, add the OAuth Device Authorization integration:

```ts
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { oauthDeviceAuthorization } from "@better-auth/oauth-provider";
import { mcp } from "@better-auth/mcp";

export const auth = betterAuth({
  plugins: [
    jwt(),
    mcp({
      loginPage: "/sign-in",
      consentPage: "/consent",
      resource: "https://api.example.com/mcp",
      scopes: ["openid", "profile", "offline_access", "mcp:read"],
    }),
    oauthDeviceAuthorization({ verificationUri: "/device" }),
  ],
});
```

`mcp()` is already the OAuth Provider, so this composition does not add a separate `oauthProvider()` plugin. Your registered public CLI can request the same MCP resource through `/device/code` and poll `/oauth2/token` for an audience-bound access token. Only use the device grant in an MCP client that explicitly implements RFC 8628.

### Protected Resource Metadata

The RFC 9728 `/.well-known/oauth-protected-resource` document is served automatically at the well-known root (and the resource-path-inserted alias). It tells MCP clients which authorization server protects the resource, which scopes it supports, which `resource` identifier their access tokens must be bound to, and which DPoP proof algorithms are supported.

Set `resource` to the protected resource identifier MCP clients request and access tokens carry as `aud`:

```ts
mcp({
    loginPage: "/sign-in",
    consentPage: "/consent",
    resource: "https://api.example.com/mcp"
})
```

`resource` must be an HTTPS URL with no query, fragment, or credentials; HTTP is accepted only on loopback hosts for local development. A resource whose URL requires a query component cannot use `mcp()`, `requireMcpAuth`, or `createMcpProtectedRequestHandler`. Verify its tokens with `verifyAccessTokenRequest` from `better-auth/oauth2`, and build challenges with `createResourceServerChallenge` from `@better-auth/oauth-provider`.

With Prisma on PostgreSQL, CockroachDB, or MongoDB, also declare this resource in `resources` with explicit `allowedScopes`.

`mcp()` also registers this identifier as a default client-registration resource. A dynamically registered client is linked to the MCP resource even when its registration request omits the non-standard `resources` field. Any `clientRegistrationDefaultResources` you provide are preserved, and the MCP resource is appended once.

### Optional DCR fallback

CIMD is the recommended client identity mechanism. If you deliberately support older clients that still require DCR, enable both provider controls explicitly:

```ts
mcp({
  loginPage: "/sign-in",
  consentPage: "/consent",
  resource: "https://api.example.com/mcp",
  allowDynamicClientRegistration: true,
  allowUnauthenticatedClientRegistration: true,
  clientRegistrationDefaultApplicationType: "infer",
})
```

Some MCP clients, such as Cursor and older Claude Code releases, omit `application_type` and register custom-scheme callbacks or `http` callbacks on `localhost`, `127.0.0.1`, or `[::1]`, which the `web` default rejects. `clientRegistrationDefaultApplicationType: "infer"` registers those clients as `native`. The registration endpoint is absent from discovery unless DCR is enabled.

### Protecting an MCP Route

MCP 2026-07-28 uses a stateless request and response model: every client JSON-RPC request or notification is an independent HTTP `POST`, and the server does not maintain a protocol-level session between requests. Use the official MCP TypeScript SDK v2 to implement that transport, then wrap its `POST` handler with `requireMcpAuth`. The following Next.js route exports only `POST`, so the framework responds to `GET` and `DELETE` with `405 Method Not Allowed`.

```ts
// app/api/mcp/route.ts
import { auth } from "@/lib/auth";
import { requireMcpAuth } from "@better-auth/mcp";
import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";

const resource = "https://api.example.com/mcp";

const mcpServerHandler = createMcpHandler(
    () => {
        const server = new McpServer({
            name: "example-mcp-server",
            version: "1.0.0",
        });

        server.registerTool(
            "echo",
            {
                description: "Echo a message",
                inputSchema: z.object({
                    message: z.string(),
                }),
            },
            async ({ message }) => ({
                content: [{ type: "text", text: `Tool echo: ${message}` }],
            }),
        );

        return server;
    },
    {
        legacy: "reject", // accept only the MCP 2026-07-28 protocol
    },
);

const POST = requireMcpAuth(
    auth,
    (request) => mcpServerHandler.fetch(request),
    {
        resource, // must match mcp({ resource })
    },
);

export { POST };
```

`createMcpHandler` returns JSON or request-scoped Server-Sent Events (SSE) as required by the operation; it does not require a Redis-backed MCP session store. If you implement `subscriptions/listen` across multiple server instances, provide the SDK with a shared event bus for that extension.

`requireMcpAuth` reads the `Authorization` header, verifies access tokens against the authorization server's JWKS, and checks the signature, issuer, audience, and expiry. It also enforces RFC 9449 DPoP when an access token is DPoP-bound. Unauthenticated requests receive a JSON-RPC `401` with the RFC 9728 `WWW-Authenticate` header. Tokens missing a required scope receive a `403` with an RFC 6750 `insufficient_scope` challenge.

The wrapper passes the verified access-token claims as a second callback argument, not as a database record. If a tool needs token context, convert those claims to the SDK's `AuthInfo` and pass it through `mcpServerHandler.fetch(request, { authInfo })`. `requireMcpAuth` never exposes a refresh token, and it checks the access token locally against the JWKS without a database round trip. DPoP replay protection uses your auth instance's database adapter by default; pass `dpop.replayStore` only when you need a different shared store.

By default, `requireMcpAuth` reads the server's resolved Better Auth URL from the auth context and uses it as the expected issuer, resource, and JWKS base. Override the issuer or JWKS URL when `jwt.issuer` is custom or the authorization server runs separately:

```ts
requireMcpAuth(auth, handler, {
    resource: "https://api.example.com/mcp", // protected resource identifier
    issuer: "https://auth.example.com", // override when jwt.issuer is custom
    jwksUrl: "https://auth.example.com/api/auth/jwks",
    challengeScopes: ["openid", "profile"] // advertised in the 401 challenge
})
```

To require scopes, pass `requiredScopes`. A token missing any of them is rejected with a `403` and an `insufficient_scope` challenge naming every missing scope:

```ts
requireMcpAuth(auth, handler, {
    resource: "https://api.example.com/mcp",
    requiredScopes: ["mcp:tools"], // enforced against the token's scope claim
})
```

When the required scopes depend on the request, throw `createInsufficientScopeError` from the handler:

```ts
import { createInsufficientScopeError } from "better-auth/oauth2";

requireMcpAuth(auth, async (request, accessTokenClaims) => {
    if (isAdminTool(request) && !hasScope(accessTokenClaims, "mcp:admin")) {
        throw createInsufficientScopeError(["mcp:admin"]);
    }
    return executeMcpRequest(request, accessTokenClaims);
})
```

Reach for this only when re-authorizing would actually help. A denial the user cannot fix by granting scopes should stay an ordinary `403`. Errors your handler throws for any other reason propagate to your framework unchanged.

### Remote MCP Server

`requireMcpAuth` verifies tokens against your Better Auth server's JWKS, so the MCP route can run anywhere as long as it can reach that JWKS URL. When the resource server runs separately from the authorization server, or uses a dynamic `baseURL`, use `createMcpProtectedRequestHandler` with explicit verification options.

```ts
import { createMcpProtectedRequestHandler } from "@better-auth/mcp";

const handler = createMcpProtectedRequestHandler(
    {
        issuer: "https://auth.example.com",
        audience: "https://api.example.com/mcp",
        jwksUrl: "https://auth.example.com/api/auth/jwks",
    },
    async (request, accessTokenClaims) => {
        // accessTokenClaims holds the verified access-token claims
        return new Response(JSON.stringify({
            jsonrpc: "2.0",
            result: { sub: accessTokenClaims.sub },
            id: 1
        }))
    }
)
```

`createMcpProtectedRequestHandler` returns the same RFC 9728 `WWW-Authenticate` response for unauthenticated requests. Set `requiredScopes` in its options to require scopes; set `challengeScopes` to advertise a scope hint on unauthenticated challenges.

## Options / Props

`mcp()` extends the OAuth Provider options. All OAuth provider options are passed flat (there is no nested `oidcConfig`).

### MCP plugin options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `loginPage` | string | required | Path to the login page where users are redirected for authentication. |
| `consentPage` | string | required | Path to the consent page where users grant the requested scopes. |
| `resource` | string | required | The protected resource identifier (RFC 8707 / RFC 9728) that access tokens are bound to. Advertised in the protected resource metadata and used as the expected token audience. |

### Commonly tuned OAuth provider options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `scopes` | string[] | `["openid", "profile", "email", "offline_access"]` | Scopes advertised by the authorization server. |
| `resources` | Array<string \| OAuthResourceInput> | — | Protected resources the authorization server can issue access tokens for. |
| `accessTokenExpiresIn` | number | 3600 | Lifetime of access tokens in seconds. |
| `idTokenExpiresIn` | number | 36000 | Lifetime of ID tokens in seconds. |
| `refreshTokenExpiresIn` | number | 2592000 | Lifetime of refresh tokens in seconds. |
| `refreshTokenReuseInterval` | number | 30 | Seconds that a rotated refresh token can be reused to receive the same token response. OAuth Provider defaults to strict handling at 0; MCP defaults to 30 for every client configured through the plugin. |
| `codeExpiresIn` | number | 600 | Lifetime of authorization codes in seconds. |
| `allowDynamicClientRegistration` | boolean | — | Required together with `allowUnauthenticatedClientRegistration` to enable unauthenticated DCR. |
| `allowUnauthenticatedClientRegistration` | boolean | — | See above. |

## Notes

- Changed in 1.7: the plugin moved from `better-auth/plugins` to `@better-auth/mcp` and is built on `@better-auth/oauth-provider`. The previous "expected to be replaced by OAuth Provider" status no longer applies.
- Renamed in 1.7: `withMcpAuth` is now `requireMcpAuth`, `mcpHandler` is now `createMcpProtectedRequestHandler`. Protected-operation `scopes` is now `requiredScopes`; `challengeScopes` is the `WWW-Authenticate` hint.
- Changed in 1.7: options from `oidcConfig` move to the top level of `mcp({ ... })`. Set one canonical HTTPS `resource` and replace `resourceMetadataMappings` with it.
- Changed in 1.7: OAuth endpoints move from `/mcp/*` to `/oauth2/*`; discovery-based clients find them automatically.
- Changed in 1.7: use the version 2 `createMcpHandler` with `legacy: "reject"`, wrap it with `requireMcpAuth`, and expose only `POST`. Remove MCP-route `GET` and `DELETE` exports and session-store options such as `redisUrl`.
- Changed in 1.7: `mcp()` no longer enables unauthenticated Dynamic Client Registration. Set both `allowDynamicClientRegistration` and `allowUnauthenticatedClientRegistration` if you deliberately support it; otherwise use CIMD.
- Changed in 1.7: the MCP `refreshTokenReuseInterval` defaults to 30 seconds for every client; set `refreshTokenReuseInterval: 0` on `mcp()` to require strict replay handling.
- Removed in 1.7: the in-core Remote MCP Client (`createMcpAuthClient` from `better-auth/plugins/mcp/client`) and its adapters (`mcpAuthHono`, `mcpAuthOfficial`, `mcpAuthMcpUse`). Replace them with `@modelcontextprotocol/client` or `@modelcontextprotocol/server`. The 1.7 docs no longer describe the 1.6 well-known route helpers or `auth.api.getMcpSession`; discovery is served by `mcp()`.
- Registered clients move through the OAuth client records migration (`oauthApplication` to `oauthClient`); see oauth-provider.md.
- Do not register both `mcp()` and `oauthProvider()`.

## Related

- [oauth-provider.md](./oauth-provider.md)
- [oidc-provider.md](./oidc-provider.md)
- [jwt.md](./jwt.md)
- [device-authorization.md](./device-authorization.md)
