# Tool results

Fields a [tool result](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#tool-result) can contain, plus host-provided and error-signaling `_meta` keys.

## Signature / Usage

```ts
registerAppTool(
  server,
  "get_zoo_animals",
  {
    title: "get_zoo_animals",
    inputSchema: { count: z.number().int().min(1).max(20).optional() },
    outputSchema: {
      animals: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          species: z.string(),
        })
      ),
    },
    _meta: { ui: { resourceUri: "ui://widget/widget.html" } },
  },
  async ({ count = 10 }) => {
    const animals = generateZooAnimals(count);

    return {
      structuredContent: { animals },
      content: [{ type: "text", text: `Here are ${animals.length} animals.` }],
      _meta: {
        allAnimalsById: Object.fromEntries(
          animals.map((animal) => [animal.id, animal])
        ),
      },
    };
  }
);
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `structuredContent` | object | Optional | Surfaced to the model and the component. Must match the declared `outputSchema`, when provided. |
| `content` | string or `Content[]` | Optional | Surfaced to the model and the component. |
| `_meta` | object | Optional | Delivered only to the component. Hidden from the model. |

Host-provided tool result metadata:

| Name | Placement | Type | Description |
|------|-----------|------|-------------|
| `_meta["openai/widgetSessionId"]` | Tool result `_meta` (from host) | string | Stable ID for the currently mounted widget instance; use it to correlate logs and tool calls until the widget unmounts. |

Error tool result:

| Name | Purpose | Type | Description |
|------|---------|------|-------------|
| `_meta["mcp/www_authenticate"]` | Error result | string or string[] | RFC 7235 `WWW-Authenticate` challenges to trigger OAuth. |

## Notes

- Only `structuredContent` and `content` appear in the conversation transcript. The host forwards `_meta` to the component so you can hydrate UI without exposing the data to the model.

## Related

- [tool-descriptor-meta.md](./tool-descriptor-meta.md)
- [client-provided-meta.md](./client-provided-meta.md)
