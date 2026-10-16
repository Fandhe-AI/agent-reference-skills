# Deploy MCP servers

Build and deploy remote MCP servers on Supabase Edge Functions.

## Signature / Usage

Build and deploy Model Context Protocol (MCP) servers on Supabase using Edge Functions. MCP clients such as Claude, ChatGPT, Cursor, or VS Code call the tools you define.

This guide has two parts. Deploy a public MCP server gets a server with no authentication running in a few minutes. Add authentication puts Supabase Auth in front of it, so users sign in with their existing accounts and every tool call runs as that user under your Row Level Security (RLS) policies.

### Deploy a public MCP server

A public server needs no user. Every caller sees the same tools, so this fits open data, calculators, and anything you would otherwise expose as an unauthenticated API.

Create a project and a function:

```bash
mkdir my-mcp-server && cd my-mcp-server
supabase init
supabase functions new mcp
```

Replace the contents of `supabase/functions/mcp/index.ts` with:

```ts
// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

import { createMcpHandler, McpServer } from 'npm:@modelcontextprotocol/server@^2.0.0'
import { z } from 'npm:zod@^4.3.6'

const handler = createMcpHandler(() => {
  const server = new McpServer({ name: 'mcp', version: '0.1.0' })

  server.registerTool(
    'add',
    {
      title: 'Addition Tool',
      description: 'Add two numbers together',
      inputSchema: z.object({ a: z.number(), b: z.number() }),
    },
    ({ a, b }) => ({ content: [{ type: 'text', text: String(a + b) }] })
  )

  return server
})

Deno.serve((req) => handler.fetch(req))
```

`createMcpHandler` runs the Streamable HTTP transport and builds a fresh `McpServer` for each request, which suits the stateless Edge Functions runtime.

The gateway verifies a JWT on every request by default. A public server has no JWT, so turn that off for this function:

```toml
[functions.mcp]
verify_jwt = false
```

Test locally, then deploy:

```bash
supabase start
supabase functions serve mcp
```

Your MCP server is at `http://127.0.0.1:54321/functions/v1/mcp`. Call the `add` tool with curl:

```bash
curl -X POST 'http://127.0.0.1:54321/functions/v1/mcp' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"add","arguments":{"a":5,"b":3}}}'
```

The `Accept` header tells the transport the client understands both JSON and Server-Sent Events. Without it the request is rejected.

To explore the server from a UI, run the MCP Inspector, choose the Streamable HTTP transport, and enter the URL above:

```bash
npx -y @modelcontextprotocol/inspector
```

```bash
supabase link --project-ref <your-project-ref>
supabase config push
supabase functions deploy mcp
```

Your MCP server is at `https://<your-project-ref>.supabase.co/functions/v1/mcp`.

### Add authentication

Most servers act on user data, and then the question is who the caller is. With Supabase Auth as the OAuth 2.1 authorization server, users sign in with their existing accounts, approve the MCP client once, and every tool call runs as that user. Your RLS policies decide what each client can see, with no per-tool authorization code.

#### How it works

The authenticated function composes two pieces of middleware from `@supabase/server` into a `pipeline` from `@supabase/middleware`, followed by your MCP handler:

```text
pipeline([...], handler)
  withOAuthProtectedResource()    OAuth discovery for MCP clients (RFC 9728, WWW-Authenticate on 401)
  withSupabase({ auth: 'user' })  verifies the user's token, hands you an RLS-scoped client
  handler                         MCP transport and your tools
```

`withOAuthProtectedResource()` runs before the auth gate. It serves the OAuth Protected Resource Metadata document so clients can find your authorization server, and it adds the `WWW-Authenticate` challenge to unauthenticated responses. `withSupabase({ auth: 'user' })` rejects requests without a valid user token and gives your handler a Supabase client scoped to that user. Anything the tools read or write goes through RLS.

Two things must be in place beyond the prerequisites:

- A Supabase project that signs JWTs with an asymmetric key (ES256 or RS256). `withSupabase` verifies user tokens against the project JWKS and rejects legacy HS256 tokens; switch in JWT Signing Keys if your project still uses the legacy secret.
- A web frontend where users sign in. The OAuth consent screen is hosted there, not by Supabase.

#### Configure Supabase Auth

MCP clients authenticate through OAuth 2.1, with Supabase Auth as the authorization server. Three settings need to be on.

1. Enable the OAuth 2.1 server.
2. Enable dynamic client registration. MCP clients register themselves before starting an OAuth flow. Enable it under Authentication > OAuth Server in the dashboard. It lets any compatible client register, so review registered clients and let users revoke grants.
3. Host a consent screen. Auth redirects users to your frontend to approve the client. The OAuth Consent block in the Supabase Library installs a ready-made `/oauth/consent` route for Next.js, React, React Router, and TanStack Start. Set the Auth Site URL to the origin that serves it.

For local development, the same settings live in `supabase/config.toml`:

```toml
[auth]
site_url = "http://localhost:3000"

[auth.oauth_server]
enabled = true
authorization_url_path = "/oauth/consent"
allow_dynamic_registration = true
```

#### Create the authenticated MCP server

The fastest path is the MCP Server block in the Supabase Library. It installs an Edge Function with the middleware already wired, a `whoami` tool, and a small tool registry to extend:

```bash
npx shadcn@latest add https://supabase.com/library/r/mcp.json
```

To write the function yourself, start with a table for the tools to work on (RLS so each user only sees their own rows; the `user_id` default means inserts don't need to pass it). The `verify_jwt = false` setting from the public part is needed here too: the function verifies tokens itself, and the gateway would otherwise reject the unauthenticated discovery request before `withOAuthProtectedResource` can answer it.

The function imports a `Database` type so the Supabase client inside the tools knows the table's columns:

```bash
supabase start
supabase gen types typescript --local > supabase/functions/mcp/database.types.ts
```

Replace the contents of `supabase/functions/mcp/index.ts`. Compared with the public server, the handler moves inside a `pipeline` so it receives the caller's Supabase client, and the tools query a table instead of adding numbers:

```ts
// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

import { createMcpHandler, McpServer } from 'npm:@modelcontextprotocol/server@^2.0.0'
import { pipeline } from 'npm:@supabase/middleware@1'
import { withOAuthProtectedResource, withSupabase } from 'npm:@supabase/server@1'
import { z } from 'npm:zod@^4.3.6'

import type { Database } from './database.types.ts'

Deno.serve(
  pipeline(
    // 1. OAuth discovery for MCP clients, 2. verify the user's token and scope a client to them
    [withOAuthProtectedResource(), withSupabase<Database>({ auth: 'user' })],
    async (req, { supabase }) => {
      // A fresh server per request: Edge Functions are stateless
      const handler = createMcpHandler(() => {
        const server = new McpServer({ name: 'todos', version: '0.1.0' })

        server.registerTool(
          'list_todos',
          {
            description: 'List the todos of the signed-in user',
            inputSchema: z.object({ limit: z.number().int().min(1).max(100).default(20) }),
            annotations: { readOnlyHint: true },
          },
          async ({ limit }) => {
            // RLS scopes this query to the signed-in user
            const { data, error } = await supabase
              .from('todos')
              .select('id, title, done')
              .order('created_at', { ascending: false })
              .limit(limit)
            if (error) throw new Error(error.message)
            return { content: [{ type: 'text', text: JSON.stringify(data) }] }
          }
        )

        return server
      })

      return handler.fetch(req)
    }
  )
)
```

The official example also registers a `create_todo` tool; it is omitted here.

The nested form, `withOAuthProtectedResource(withSupabase({ auth: 'user' }, handler))`, behaves the same. Both need `@supabase/server` 1.6.0 or later.

With the local stack running, serve the function with `supabase functions serve mcp`. An unauthenticated request returns `401` with a `WWW-Authenticate` header naming the metadata document, and the metadata document (`/functions/v1/mcp/oauth-protected-resource`) points clients at your project's Auth server. The MCP Inspector or Claude Code (`claude mcp add --transport http todos http://127.0.0.1:54321/functions/v1/mcp`, then `/mcp` to authenticate) can run the OAuth flow.

Deploy: link your project, push the Auth settings from `config.toml`, and deploy the function (same three commands as the public server). Deploy your frontend with the consent route to the origin configured as the Auth Site URL.

### Connect from MCP clients

Every client that implements the MCP authorization specification discovers your Auth server from the `WWW-Authenticate` challenge, registers itself, and runs the OAuth flow. The server URL is the only configuration they need.

| Client | Where to add the URL |
| --- | --- |
| Claude Code | `claude mcp add --transport http <name> <url>` |
| Claude | Settings > Connectors > Add custom connector |
| Cursor | `.cursor/mcp.json`: `{ "mcpServers": { "<name>": { "url": "<url>" } } }` |
| VS Code | `.vscode/mcp.json`: `{ "servers": { "<name>": { "type": "http", "url": "<url>" } } }` |
| ChatGPT | Settings > Connectors, with developer mode enabled. Requires a public HTTPS URL. |

### Use a custom domain

With a custom domain active, clients can reach your MCP server at `https://api.example.com/functions/v1/mcp`. Supabase Auth keeps its issuer on the project domain, `https://<your-project-ref>.supabase.co/auth/v1`. `withOAuthProtectedResource()` builds the Auth URL from the domain the request arrived on, so on the custom domain it advertises `https://api.example.com/auth/v1`. That doesn't match the issuer, and MCP clients that validate the Auth metadata stop at discovery.

To serve MCP on the custom domain too, set the Auth server explicitly. Point `authorizationServer` at an environment variable:

```ts
[
  withOAuthProtectedResource({ authorizationServer: Deno.env.get('MCP_AUTH_ISSUER') }),
  withSupabase<Database>({ auth: 'user' }),
],
```

Store the issuer as a secret, and redeploy:

```bash
supabase secrets set MCP_AUTH_ISSUER=https://<your-project-ref>.supabase.co/auth/v1
supabase functions deploy mcp
```

Leave `MCP_AUTH_ISSUER` unset locally. An unset value falls back to the default, which is correct on the local stack.

### Run it outside Edge Functions

The same pipeline mounts in any runtime that speaks `Request` in, `Response` out: a Next.js route handler, a SvelteKit endpoint, Cloudflare Workers, or a plain Node, Bun, or Deno server. Off Edge Functions there are no forwarded headers to derive the public URLs from, so pass them explicitly:

```ts
import { pipeline } from '@supabase/middleware'
import { fromSupabaseUrl, withOAuthProtectedResource, withSupabase } from '@supabase/server'

export default {
  fetch: pipeline(
    [
      withOAuthProtectedResource({
        resourceServer: (req) => new URL(req.url).origin + '/api/mcp',
        authorizationServer: fromSupabaseUrl('https://<your-project-ref>.supabase.co'),
      }),
      withSupabase({ auth: 'user' }),
    ],
    handler
  ),
}
```

`resourceServer` is the public URL of the MCP endpoint. `authorizationServer` is the Auth issuer; `fromSupabaseUrl` derives it from your project URL. Both accept a string or a function of the request, so you can also point at a non-Supabase OAuth 2.1 server.

## Notes

- Prerequisites: Docker or a compatible runtime (local development), Deno, Supabase CLI 2.117.0 or later, Node.js 20 or later.
- Edge Functions are stateless. The server answers one HTTP request at a time with no open channel back to the client, which rules out MCP sampling. Tools that need more input from the user should return a message asking for it instead.
- Dynamic client registration lets any compatible client register, so review registered clients and let users revoke grants.
- This is the MCP server your app exposes to its users. The Supabase MCP server (mcp.md) is different: it connects your own coding agent to your project so you can build the app.
- Examples: `supabase/supabase` repository, `examples/edge-functions/supabase/functions/mcp/` (`simple-mcp-server`, `authenticated-mcp-server`).
- Source: https://supabase.com/docs/guides/ai-tools/byo-mcp (fetched 2026-10-17, no version pin; the page links the MCP specification revision 2026-07-28)

## Related

- [Supabase MCP Server](./mcp.md)
- [AI Tools](./overview.md)
- [Edge Functions examples](../functions/examples.md)
- [OAuth server](../auth/oauth-server.md)
