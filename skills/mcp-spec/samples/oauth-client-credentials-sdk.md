---
source: https://modelcontextprotocol.io/extensions/auth/oauth-client-credentials#sdk-examples
---

# OAuth Client Credentials (TypeScript SDK)

Connect to a Streamable HTTP MCP server with the OAuth client credentials extension using a client secret.

```bash
npm install @modelcontextprotocol/client
```

```typescript
import {
  Client,
  ClientCredentialsProvider,
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";

const provider = new ClientCredentialsProvider({
  clientId: "my-service",
  clientSecret: "s3cr3t",
});

const client = new Client(
  { name: "my-service", version: "1.0.0" },
  { capabilities: {} },
);

const transport = new StreamableHTTPClientTransport(
  new URL("https://mcp.example.com/mcp"),
  { authProvider: provider },
);

await client.connect(transport);

// Use the client
const tools = await client.listTools();
console.log(
  "Available tools:",
  tools.tools.map((t) => t.name),
);

await transport.close();
```

## Notes

- Source: tag `2026-07-28` raw `docs/extensions/auth/oauth-client-credentials.mdx`, retrieved 2026-10-16 (the site path is unversioned). Only the TypeScript client-secret variant is reproduced; the source also has a JWT private key variant (`PrivateKeyJwtProvider`) and Python variants.
- `s3cr3t` is the tutorial's placeholder; load real secrets from the environment, never from source.
- Tutorial code is reproduced as published; SDK protocol-version support is not stated in the source.
- Both official SDK examples state that token acquisition and refresh are handled automatically.
