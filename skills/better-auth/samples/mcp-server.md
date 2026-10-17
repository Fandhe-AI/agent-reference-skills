# MCP Server

Turn a Better Auth server into an OAuth provider for MCP clients and protect an MCP route with `requireMcpAuth`.

```ts
// auth.ts
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

```bash
npx auth migrate
```

## Notes

- Install `@better-auth/mcp @better-auth/cimd @modelcontextprotocol/server zod`; the `jwt()` plugin is required
- `mcp()` is the OAuth provider itself; do not also register a separate `oauthProvider()` plugin
- DCR is never enabled implicitly; opt in with `allowDynamicClientRegistration` and `allowUnauthenticatedClientRegistration` only for older clients
- Pass `requiredScopes` to `requireMcpAuth` to return a `403` `insufficient_scope` challenge for tokens missing scopes
- Source: https://better-auth.com/docs/plugins/mcp (docs: GitHub tag v1.7.10, https://github.com/better-auth/better-auth/blob/v1.7.10/docs/content/docs/plugins/mcp.mdx)
