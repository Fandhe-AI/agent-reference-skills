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
- Test locally with `npx @modelcontextprotocol/inspector` against `http://localhost:3000/mcp` (Streamable HTTP) before connecting the custom MCP server to ChatGPT.
- Production endpoint must be a stable public HTTPS URL supporting streamable HTTP, typically ending in `/mcp`. Secure MCP Tunnel can connect a private MCP server in ChatGPT but does not satisfy public submission requirements. Use OpenAI-managed mTLS to authenticate ChatGPT as the client, and OAuth 2.1 for user auth.
- Keep published tool names/schemas backward compatible; version UI resource identifiers when HTML/JS/CSS changes. If metadata changes, refresh the custom MCP server connection and rerun the evaluation set before submission.
- Multiple accounts: to improve multi-account use, expose an authenticated, read-only profile tool marked `_meta["openai/profile"]: true`. Resolve the profile from the request's validated credentials and keep every tool call scoped to those credentials. Users can connect multiple accounts without a profile tool. See [Authentication](./auth.md) ("Profile tool for multi-account" paragraph) for the schema and example.
- MCP extensions: OpenAI MCP Extensions connect the plugin to ChatGPT's sidebar, composer, and file viewers; see the Plugin Extensions page ([extensions.md](./extensions.md)) for examples and setup.

### Import skills from the MCP server

Configure the server to supply skills so their instructions/files version and deploy with the server. **Scan Tools** (during plugin submission) imports a static snapshot into the draft — not a live runtime resource.

OpenAI currently supports a bounded, static subset of the draft SEP-2640 Skills extension. This proposal is not yet part of the stable MCP specification.

Declare the extension under `capabilities.extensions` (not `experimental`):

```json
{ "capabilities": { "extensions": { "io.modelcontextprotocol/skills": {} } } }
```

The declaration must be under `capabilities.extensions`; the earlier `experimental` declaration is not recognized.

Support paginated `skills/list` (each entry needs `uri` to `SKILL.md`, `frontmatter` containing every entry from the parsed `SKILL.md` front matter including `name` and `description`, a complete `resources` list with `SKILL.md` and every supporting file, and a SHA-256 digest per resource in `sha256:<64 lowercase hex chars>` form) and `skills/get` (returns a `skill` object with the same entry shape). Use the `skill://` URI convention; the directory containing `SKILL.md` must match the skill name:

```json
{
  "skills": [
    {
      "uri": "skill://dice-roller/tabletop-dice/SKILL.md",
      "frontmatter": {
        "name": "tabletop-dice",
        "description": "Roll one or more dice and report each result and the total."
      },
      "resources": [
        {
          "uri": "skill://dice-roller/tabletop-dice/SKILL.md",
          "digest": "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
        },
        {
          "uri": "skill://dice-roller/tabletop-dice/references/notation.md",
          "digest": "sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789"
        }
      ]
    }
  ],
  "nextCursor": "optional-next-page-cursor"
}
```

Digest input: for a text resource hash the UTF-8 bytes of `content.text`; for a blob resource base64-decode `content.blob` and hash the decoded bytes. Request parameters: first `skills/list` accepts `{}`, later requests accept `{ "cursor": "next-page-cursor" }`, `skills/get` accepts `{ "uri": "skill://dice-roller/tabletop-dice/SKILL.md" }`.

Support `resources/read` for every manifest URI, returning exactly one content item whose URI matches the request (UTF-8 text or base64 blob). Import verifies that every listed resource is fetchable with a matching digest, the fetched `SKILL.md` front matter exactly matches the catalog entry, paths are safe, unique, and free of normalization conflicts, and the skill fits the limits. The combined archive limit includes ZIP packaging overhead.

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
