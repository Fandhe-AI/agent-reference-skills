# MCP server

The MCP server defines the tools available to ChatGPT and Codex. Add one when a plugin use case needs live data, authentication, controlled actions, or code running on infrastructure you operate. Build the tools first; UI is optional and added afterward.

## Signature / Usage

```ts
// TypeScript SDK
const server = new McpServer(
  { name: "acme-projects", version: "1.0.0" },
  { instructions: "Before updating a project, call get_project to confirm its ID and current status." }
);

server.registerTool(
  "list_projects",
  {
    title: "List projects",
    description: "Use this when the user wants to find or review projects in their Acme workspace.",
    inputSchema: { status: z.enum(["active", "archived"]).optional() },
    outputSchema: { projects: z.array(z.object({ id: z.string(), name: z.string(), status: z.string() })) },
    annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
  },
  async ({ status }) => {
    const projects = await listProjects({ status });
    return {
      structuredContent: { projects },
      content: [{ type: "text", text: `Found ${projects.length} projects.` }],
    };
  }
);
```

```bash
# TypeScript
npm install @modelcontextprotocol/sdk zod
# Python
pip install mcp
```

## Options / Props

| Field | Description |
|-------|-------------|
| `name` / `title` | Action-oriented tool name and human-readable title |
| `description` | Explains when to use the tool; model-facing |
| `inputSchema` | Explicit schema for tool arguments |
| `outputSchema` | Schema for `structuredContent` when the tool returns structured data |
| `annotations.readOnlyHint` | `true` only when the tool cannot change state |
| `annotations.destructiveHint` | `true` when the tool can cause irreversible/hard-to-reverse outcomes |
| `annotations.openWorldHint` | `true` when the tool accesses the public internet or open-ended external entities, including through read-only actions such as web search; a tool limited to a bounded private account or workspace can set `false`, even when that service is externally hosted |
| `structuredContent` | Concise data the model can inspect and reuse in later calls |
| `content` | Text or other MCP content that helps the model answer the user |
| `_meta` | Client-specific data hidden from the model; not a substitute for authorization |

## Notes

- Server `instructions` (returned at initialization) should hold cross-tool guidance such as required call sequences or rate limits; keep the most important details in the first 512 characters.
- Prefer focused tools (`list_projects`, `get_project`, `update_project`) over one tool with many modes.
- Never rely on the model to decide access; enforce authorization in the server for every request. See [Authentication](./auth.md).
- Elicitation (MCP elicitation) is for structured info missing from the original call — not for secrets or bypassing auth.
- Company knowledge eligibility requires implementing the standard `search` and `fetch` tool input schemas and `readOnlyHint: true` on other read-only tools; return absolute, user-openable URLs for citation sources.
- Test locally with `npx @modelcontextprotocol/inspector` against `http://localhost:3000/mcp` (Streamable HTTP) before connecting the custom MCP server to ChatGPT.
- Production endpoint must be a stable public HTTPS URL supporting streamable HTTP, typically ending in `/mcp`. Secure MCP Tunnel can connect a private MCP server in ChatGPT but does not satisfy public submission requirements. Use OpenAI-managed mTLS to authenticate ChatGPT as the client, and OAuth 2.1 for user auth.
- Keep published tool names/schemas backward compatible; version UI resource identifiers when HTML/JS/CSS changes. If metadata changes, refresh the custom MCP server connection and rerun the evaluation set before submission.
- Multiple accounts: to improve multi-account use, expose an authenticated, read-only profile tool marked `_meta["openai/profile"]: true`. Resolve the profile from the request's validated credentials and keep every tool call scoped to those credentials. Users can connect multiple accounts without a profile tool. See [Authentication](./auth.md) ("Profile tool for multi-account" paragraph) for the schema and example.
- Source: https://developers.openai.com/plugins/build/mcp-server (local .md twin copy, fetched 2026-11-14).
- MCP extensions: OpenAI MCP Extensions connect the plugin to ChatGPT's sidebar, composer, and file viewers; see the Plugin Extensions page ([extensions.md](./extensions.md)) for examples and setup.

### Deploy and security checklist

- Public submission needs a stable, publicly reachable HTTPS MCP endpoint; the endpoint must stay reachable for plugin review and domain verification. Do not use Secure MCP Tunnel alone, a temporary tunnel, or a local endpoint for public submission.
- The production endpoint must support the MCP streamable HTTP transport, respond at a stable URL (typically ending in `/mcp`), meet latency/availability needs, reach required services and data stores, preserve authentication and authorization boundaries, and produce logs and metrics for failed initialization and tool calls.
- A server that must remain private can sit behind a public HTTPS proxy that forwards MCP requests; use OpenAI-managed mTLS to authenticate ChatGPT as the MCP client and OAuth 2.1 for user authentication. If an IP allowlist is required, use the published ChatGPT connectors IP ranges and update the allowlist automatically; an IP allowlist does not replace authentication or authorization.
- Choose infrastructure (serverless, container, edge, or traditional) by runtime/dependency support, streaming behavior, cold-start and request latency, network access, data residency and compliance, secret management, logging/tracing/alerting, and rollback/versioning. Optional UI assets must be deployed at stable origins allowed by the component's content security policy.
- Before deployment: set production credentials via the host's secret management, configure the authorization server and allowed redirect behavior, apply timeouts and rate limits to expensive or externally visible tools, remove debug responses and unnecessary personal data, and confirm logs contain no access tokens or sensitive tool results. After deployment, verify initialization, server instructions, tools, schemas, annotations, authentication, results, and errors with MCP Inspector.
- Local Inspector checklist: confirm initialization succeeds; review server instructions and the advertised tool list; call every tool with representative and invalid inputs; verify schemas, results, errors, and annotations; confirm authorization is enforced for private data and write actions. Then connect the custom MCP server to ChatGPT and run the direct, indirect, edge-case, and out-of-scope requests from the use-case inventory.
- Security reminders: treat every tool input as untrusted; validate parameters and enforce authorization on the server; require confirmation for consequential write actions; keep secrets and sensitive data out of tool metadata and results; log enough context to investigate failures without logging credentials or unnecessary personal data; rate-limit expensive or externally visible actions. Do not put secrets, access tokens, or unnecessary personal data in tool results; `_meta` is hidden from the model but is not a substitute for authorization or secure storage.
- Annotations help ChatGPT and Codex choose confirmation and safety behavior but do not replace authorization, validation, or confirmation in your server.

### Removed section

- The "Import skills from the MCP server" section (the draft SEP-2640 Skills extension, `skills/list` / `skills/get`, **Scan Tools** skill import limits) is no longer present in the official page (checked 2026-11-14).

## Related

- [Add UI to your MCP server](./chatgpt-ui.md)
- [Authentication](./auth.md)
- [Build skills](./build-skills.md)
- [App quickstart](./app-quickstart.md)
