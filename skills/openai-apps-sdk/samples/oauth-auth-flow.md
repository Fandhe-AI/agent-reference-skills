# OAuth-Protected Tools with securitySchemes

Declare per-tool auth requirements with `securitySchemes` and let ChatGPT drive the OAuth 2.1 + PKCE flow via protected-resource / authorization-server metadata discovery.

Tool that works both anonymously and with optional auth:

```ts
declare const server: McpServer;

server.registerTool(
  "search",
  {
    title: "Public Search",
    description: "Search public documents.",
    inputSchema: {
      q: z.string(),
    },
    outputSchema: {},
    securitySchemes: [
      { type: "noauth" },
      { type: "oauth2", scopes: ["files:read"] },
    ],
  },
  async ({ q }) => {
    return {
      content: [{ type: "text", text: `Results for ${q}` }],
      structuredContent: {},
    };
  }
);
```

Tool that requires auth unconditionally. `securitySchemes` on the descriptor is discovery metadata only — ChatGPT reads it to decide when to run the OAuth flow, but nothing stops a malformed or malicious client from calling the tool without ever obtaining a token. The handler itself must independently verify the bearer token (signature, issuer, audience, expiry) and the required scope before doing the write, and return the same `mcp/www_authenticate` challenge shape on failure that ChatGPT uses to trigger login:

```ts
declare const server: McpServer;

async function verifyAccessToken(authorizationHeader: string | undefined) {
  // Verify independently — ChatGPT attaches the token as
  // `Authorization: Bearer <token>` but performs no verification for you.
  // At minimum, check:
  //   - signature (against the authorization server's JWKS)
  //   - issuer (`iss` matches https://auth.yourcompany.com)
  //   - audience (`aud`/`resource` matches this server's resource identifier)
  //   - expiry (`exp` has not passed)
  //   - scopes (the token's `scope`/`scp` claim includes the required scope)
  // Return the verified claims, or null/throw if any check fails.
  return await tokenVerifier.verify(authorizationHeader);
}

// Reads the incoming `Authorization` header for the current call. The MCP TS
// SDK's tool-handler second argument carries transport-specific request
// context; the exact accessor depends on your transport, so it's factored
// into this helper rather than destructured inline.
declare function getAuthorizationHeader(handlerContext: unknown): string | undefined;

server.registerTool(
  "create_doc",
  {
    title: "Create Document",
    description: "Make a new doc in your account.",
    inputSchema: {
      title: z.string(),
    },
    outputSchema: {},
    securitySchemes: [{ type: "oauth2", scopes: ["files:write"] }],
  },
  async ({ title }, handlerContext) => {
    const claims = await verifyAccessToken(getAuthorizationHeader(handlerContext));

    if (!claims || !claims.scopes.includes("files:write")) {
      return {
        content: [
          { type: "text", text: "Authentication required: missing or invalid access token." },
        ],
        _meta: {
          "mcp/www_authenticate": [
            'Bearer resource_metadata="https://your-mcp.example.com/.well-known/oauth-protected-resource", error="insufficient_scope", error_description="You need to login to continue"',
          ],
        },
        isError: true,
      };
    }

    return {
      content: [{ type: "text", text: `Created doc: ${title}` }],
      structuredContent: {},
    };
  }
);
```

`.well-known/oauth-protected-resource` served by the MCP server:

```json
{
  "resource": "https://your-mcp.example.com",
  "authorization_servers": ["https://auth.yourcompany.com"],
  "scopes_supported": ["files:read", "files:write"],
  "resource_documentation": "https://yourcompany.com/docs/mcp"
}
```

401 challenge pointing the client at that metadata:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://your-mcp.example.com/.well-known/oauth-protected-resource",
                         scope="files:read"
```

Authorization server metadata (`.well-known/oauth-authorization-server`):

```json
{
  "issuer": "https://auth.yourcompany.com",
  "authorization_endpoint": "https://auth.yourcompany.com/oauth2/v1/authorize",
  "token_endpoint": "https://auth.yourcompany.com/oauth2/v1/token",
  "client_id_metadata_document_supported": true,
  "token_endpoint_auth_methods_supported": ["none", "private_key_jwt"],
  "registration_endpoint": "https://auth.yourcompany.com/oauth2/v1/register",
  "code_challenge_methods_supported": ["S256"],
  "scopes_supported": ["files:read", "files:write"]
}
```

Error result a tool returns when a required token is missing:

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Authentication required: no access token provided."
      }
    ],
    "_meta": {
      "mcp/www_authenticate": [
        "Bearer resource_metadata=\"https://your-mcp.example.com/.well-known/oauth-protected-resource\", error=\"insufficient_scope\", error_description=\"You need to login to continue\""
      ]
    },
    "isError": true
  }
}
```

## Notes

- Keep scope names identical across every layer: tool `securitySchemes`, `scopes_supported` on both `.well-known` metadata documents, and the `WWW-Authenticate` challenge (`files:read` / `files:write` here). A mismatch (e.g. a tool requesting a scope the authorization server never advertises) makes a strict AS reject the request with `invalid_scope`.
- `securitySchemes: [{ type: "noauth" }, { type: "oauth2", scopes: [...] }]` on a tool lets ChatGPT call it unauthenticated first and step up to OAuth only when a scoped tool is invoked.
- `securitySchemes` only tells ChatGPT when to run the OAuth flow — it is not enforced on the server's behalf. Every handler that requires auth (`create_doc` above) must independently verify the bearer token's signature, issuer, audience, expiry, and scopes before acting, and must not perform the write if verification fails.
- ChatGPT supports Client ID Metadata Documents (CIMD): set `client_id_metadata_document_supported: true` on the authorization server so no manual client registration is required.
- On missing/insufficient auth, return `isError: true` with `_meta["mcp/www_authenticate"]` so the host can trigger the OAuth flow.
- This is the ChatGPT-app (server/publisher) side of MCP; consuming MCP servers from the Agents SDK is covered by the `openai-agents` skill.

Source: https://developers.openai.com/plugins/build/auth
