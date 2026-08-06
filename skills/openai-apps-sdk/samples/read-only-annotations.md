# Tool Annotations for Approval Framing

Use MCP tool `annotations` (`readOnlyHint`, `destructiveHint`, `openWorldHint`, `idempotentHint`) so ChatGPT can decide whether a tool call needs explicit user confirmation.

Read-only tool, no confirmation needed:

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

Same idea combined with the file-input schema (a read-only analysis tool over an uploaded file):

```json
{
  "name": "analyze_file",
  "title": "Analyze file",
  "description": "Analyzes a user-provided file without modifying it.",
  "annotations": {
    "readOnlyHint": true,
    "openWorldHint": false,
    "destructiveHint": false
  }
}
```

A tool that reads request-scoped context (`_meta`) instead of declaring auth or write access:

```ts
server.registerTool(
  "recommend_cafe",
  {
    title: "Recommend a cafe",
    inputSchema: {},
    outputSchema: {
      cafes: z.array(
        z.object({
          name: z.string(),
          address: z.string(),
        })
      ),
    },
  },
  async (_args, { _meta }) => {
    const locale = _meta?.["openai/locale"] ?? "en";
    const location = _meta?.["openai/userLocation"]?.city;
    const cafes = await findNearbyCafes(location);

    return {
      content: [{ type: "text", text: formatIntro(locale, location) }],
      structuredContent: { cafes },
    };
  }
);
```

## Notes

- `readOnlyHint: true` tells the host the tool never mutates state, so it can skip a confirmation prompt; leave it `false`/unset for writes.
- `destructiveHint` and `openWorldHint` further refine approval framing for irreversible actions and open-ended external effects respectively; `idempotentHint` is optional.
- `_meta["openai/locale"]` / `_meta["openai/userLocation"]` are ChatGPT-populated request context available inside any tool handler, independent of annotations.
- This is the ChatGPT-app (server/publisher) side of MCP; consuming MCP servers from the Agents SDK is covered by the `openai-agents` skill.

Source: https://developers.openai.com/plugins/reference
