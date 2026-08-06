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
      { type: "oauth2", scopes: ["search.read"] },
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

Tool that requires auth unconditionally:

```ts
declare const server: McpServer;

server.registerTool(
  "create_doc",
  {
    title: "Create Document",
    description: "Make a new doc in your account.",
    inputSchema: {
      title: z.string(),
    },
    outputSchema: {},
    securitySchemes: [{ type: "oauth2", scopes: ["docs.write"] }],
  },
  async ({ title }) => {
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

- `securitySchemes: [{ type: "noauth" }, { type: "oauth2", scopes: [...] }]` on a tool lets ChatGPT call it unauthenticated first and step up to OAuth only when a scoped tool is invoked.
- ChatGPT supports Client ID Metadata Documents (CIMD): set `client_id_metadata_document_supported: true` on the authorization server so no manual client registration is required.
- On missing/insufficient auth, return `isError: true` with `_meta["mcp/www_authenticate"]` so the host can trigger the OAuth flow.
- This is the ChatGPT-app (server/publisher) side of MCP; consuming MCP servers from the Agents SDK is covered by the `openai-agents` skill.

Source: https://developers.openai.com/plugins/build/auth
