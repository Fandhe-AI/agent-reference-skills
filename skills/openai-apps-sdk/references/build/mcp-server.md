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
| `annotations.openWorldHint` | `true` when the tool can affect public or external systems |
| `structuredContent` | Concise data the model can inspect and reuse in later calls |
| `content` | Text or other MCP content that helps the model answer the user |
| `_meta` | Client-specific data hidden from the model; not a substitute for authorization |

## Notes

- Server `instructions` (returned at initialization) should hold cross-tool guidance such as required call sequences or rate limits; keep the most important details in the first 512 characters.
- Prefer focused tools (`list_projects`, `get_project`, `update_project`) over one tool with many modes.
- Never rely on the model to decide access; enforce authorization in the server for every request. See [Authentication](./auth.md).
- Elicitation (MCP elicitation) is for structured info missing from the original call — not for secrets or bypassing auth.
- Company knowledge eligibility requires implementing the standard `search` and `fetch` tool input schemas and `readOnlyHint: true` on other read-only tools; return absolute, user-openable URLs for citation sources.
- Test locally with `npx @modelcontextprotocol/inspector` against `http://localhost:3000/mcp` (Streamable HTTP) before connecting in ChatGPT/Codex developer mode.
- Production endpoint must be a stable public HTTPS URL supporting streamable HTTP, typically ending in `/mcp`. Secure MCP Tunnel is for developer-mode testing only, not public submission. Use OpenAI-managed mTLS to authenticate ChatGPT as the client, and OAuth 2.1 for user auth.
- Keep published tool names/schemas backward compatible; version UI resource identifiers when HTML/JS/CSS changes.

### Import skills from the MCP server

Configure the server to supply skills so their instructions/files version and deploy with the server. **Scan Tools** (during plugin submission) imports a static snapshot into the draft — not a live runtime resource.

Declare the extension under `capabilities.extensions` (not `experimental`):

```json
{ "capabilities": { "extensions": { "io.modelcontextprotocol/skills": {} } } }
```

Support paginated `skills/list` (each entry needs `uri` to `SKILL.md`, `frontmatter` with `name`/`description`, a complete `resources` list, and a SHA-256 digest per resource in `sha256:<64 hex chars>` form) and `skills/get`. Support `resources/read` for every manifest URI.

Import limits:

| Content | Limit |
|---------|-------|
| `SKILL.md` | 256 KiB |
| Each supporting file | 1 MiB |
| All resources for one skill | 5 MiB |
| Generated skill archives for one scan | 8 MiB |

Up to five uniquely named skills across 10 catalog pages; each skill up to 100 files. If any entry fails validation, **Scan Tools** still returns tools but does not update imported skills — fix and rescan.

## Related

- [Add UI to your MCP server](./chatgpt-ui.md)
- [Authentication](./auth.md)
- [Build skills](./build-skills.md)
- [App quickstart](./app-quickstart.md)
