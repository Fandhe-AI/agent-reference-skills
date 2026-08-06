# `_meta` fields the client provides

`_meta` fields ChatGPT sends to the MCP server on initialize and/or tool calls.

## Signature / Usage

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

## Options / Props

| Name | When provided | Type | Description |
|------|----------------|------|-------------|
| `_meta["openai/locale"]` | Initialize + tool calls | string (BCP 47) | Requested locale (older clients may send `_meta["webplus/i18n"]`). |
| `_meta["openai/userAgent"]` | Tool calls | string | Optional, best-effort user agent hint for analytics or formatting. |
| `_meta["openai/userLocation"]` | Tool calls | object | Coarse location hint (`city`, `region`, `country`, `timezone`, `longitude`, `latitude`). |
| `_meta["openai/subject"]` | Tool calls | string | Anonymized user id sent to MCP servers for rate limiting and identification. |
| `_meta["openai/session"]` | Tool calls | string | Anonymized conversation id for correlating tool calls within the same ChatGPT session. |
| `_meta["openai/organization"]` | Tool calls | string | Anonymized organization id associated with the current ChatGPT organization, when available. |

## Notes

- `_meta["openai/userAgent"]` and `_meta["openai/userLocation"]` are hints only; servers should never rely on them for authorization decisions and must tolerate their absence. Treat `_meta["openai/userAgent"]` as optional, best-effort metadata rather than a stable way to detect which host surface is calling your server.

## Related

- [tool-results.md](./tool-results.md)
