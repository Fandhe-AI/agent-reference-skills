# Tool descriptor `_meta` fields

`_meta` fields set on the MCP tool descriptor, plus `outputSchema` guidance. By default, a tool description should include the fields listed in the [MCP tool spec](https://modelcontextprotocol.org/specification/2025-06-18/server/tools#tool).

## Signature / Usage

```ts
registerAppTool(
  server,
  "search",
  {
    title: "Public Search",
    description: "Search public documents.",
    inputSchema: { q: z.string() },
    outputSchema: {
      results: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          url: z.string(),
        })
      ),
    },
    securitySchemes: [
      { type: "noauth" },
      { type: "oauth2", scopes: ["search.read"] },
    ],
    _meta: {
      securitySchemes: [
        { type: "noauth" },
        { type: "oauth2", scopes: ["search.read"] },
      ],
      ui: { resourceUri: "ui://widget/story.html" },
      // Optional compatibility alias (ChatGPT only):
      // "openai/outputTemplate": "ui://widget/story.html",
      "openai/toolInvocation/invoking": "Searching…",
      "openai/toolInvocation/invoked": "Results ready",
    },
  },
  async ({ q }) => {
    const results = await performSearch(q);

    return {
      structuredContent: { results },
      content: [{ type: "text", text: `Found ${results.length} results.` }],
    };
  }
);
```

## Options / Props

| Name | Placement | Type | Limits | Description |
|------|-----------|------|--------|-------------|
| `_meta["securitySchemes"]` | Tool descriptor | array | None | Back-compat mirror for clients that only read `_meta`. |
| `_meta.ui.resourceUri` | Tool descriptor | string (URI) | None | Standard resource URI for the UI template. |
| `_meta.ui.visibility` | Tool descriptor | string[] | default `["model", "app"]` | Controls whether a tool is available to the model, the UI, or both. The `app` value is the MCP Apps protocol identifier for UI. |
| `_meta["openai/outputTemplate"]` | Tool descriptor | string (URI) | None | OpenAI-specific optional/compatibility alias for `_meta.ui.resourceUri` in ChatGPT. |
| `_meta["openai/widgetAccessible"]` | Tool descriptor | boolean | default `false` | OpenAI-specific compatibility field used by existing UI integrations; prefer `_meta.ui.visibility` + `tools/call`. |
| `_meta["openai/visibility"]` | Tool descriptor | string | `public` (default) or `private` | OpenAI-specific compatibility field used by existing UI integrations; prefer `_meta.ui.visibility`. |
| `_meta["openai/toolInvocation/invoking"]` | Tool descriptor | string | ≤ 64 chars | Short status text while the tool runs. |
| `_meta["openai/toolInvocation/invoked"]` | Tool descriptor | string | ≤ 64 chars | Short status text after the tool completes. |
| `_meta["openai/fileParams"]` | Tool descriptor | string[] | None | List of top-level input fields that represent files. Each field receives `{ download_url, file_id, mime_type?, file_name? }`. |

## Notes

- Declare `outputSchema` for any tool that returns `structuredContent`. The schema should describe the exact object your tool returns so clients can validate results and the model can reason about follow-up tool calls.
- Prefer the MCP Apps standard key `_meta.ui.resourceUri` for linking a tool to a UI template; `_meta["openai/outputTemplate"]` is an OpenAI-specific compatibility alias.
- This page describes the tool definition surface for a server that **publishes** an MCP server as a ChatGPT app (plugin). It is distinct from the tools surface consumed by an MCP client, which the `openai-agents` skill covers (Agents SDK tool calling / MCP client integration).

## Related

- [tool-annotations.md](./tool-annotations.md)
- [component-resource-meta.md](./component-resource-meta.md)
- [tool-results.md](./tool-results.md)
- [file-apis.md](./file-apis.md)
