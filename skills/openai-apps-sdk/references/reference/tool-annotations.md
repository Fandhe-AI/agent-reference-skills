# Annotations

`ToolAnnotations` fields on the tool descriptor that label tool behavior (e.g. read-only), per the [MCP `ToolAnnotations` schema](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations).

## Signature / Usage

```ts
server.registerTool(
  "list_saved_recipes",
  {
    title: "List saved recipes",
    description: "Returns the user's saved recipes without modifying them.",
    inputSchema: {},
    outputSchema: {
      recipes: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
        })
      ),
    },
    annotations: { readOnlyHint: true },
  },
  async () => ({
    structuredContent: { recipes: await fetchSavedRecipes() },
  })
);
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `readOnlyHint` | boolean | Required | Signal that the tool only retrieves or computes information and doesn't create, update, delete, or send data outside the conversation. |
| `destructiveHint` | boolean | Required | Declare that the tool may delete or overwrite user data so the host knows to elicit explicit approval first. |
| `openWorldHint` | boolean | Required | Declare that the tool publishes content or reaches outside the current user's account, prompting the client to summarize the impact before asking for approval. |
| `idempotentHint` | boolean | Optional | Declare that calling the tool with the same arguments has no extra effect on its environment. |

## Notes

- These hints only influence how ChatGPT or Codex frames the tool call to the user; servers must still enforce their own authorization logic.
- This page describes annotations on a server that **publishes** an MCP server as a ChatGPT app (plugin). It is distinct from tools consumed by an MCP client, which the `openai-agents` skill covers.

## Related

- [tool-descriptor-meta.md](./tool-descriptor-meta.md)
