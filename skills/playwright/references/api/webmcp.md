# WebMCP

`WebMCP` (since v1.64) exposes the tools a frame registers through the experimental WebMCP browser API, `navigator.modelContext`. It lists the tools and calls them. Accessed through `frame.webmcp`; `page.webmcp` is the instance of the main frame.

## Signature / Usage

```ts
const browser = await chromium.launch({ args: ['--enable-features=WebMCP'] });
const page = await browser.newPage();
await page.goto('https://example.com');

for (const tool of await page.webmcp.tools())
  console.log(tool.name, tool.description);

const result = await page.webmcp.callTool('add', { a: 2, b: 40 });
console.log(result.content[0].text); // "42"
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `tools(options?)` | `Promise<Array<WebMCPTool>>` | Tools currently registered by the frame. Throws if the browser was launched without WebMCP support |
| `callTool(name, input?, options?)` | `Promise<Serializable>` | Calls a registered tool and returns the result its `execute` function resolved to (typically an object with a `content` array). A result with `isError: true` is returned as is |

## Options / Props

### callTool params

| Name | Type | Description |
|------|------|-------------|
| `name` | string | Tool name, as reported by `tools()` |
| `input` | Serializable (optional) | Input matching the tool's `inputSchema`. Defaults to an empty object |
| `timeout` | number | Timeout option (shared input-timeout definition) |

### WebMCPTool

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Tool name, unique within the frame |
| `description` | string | Tool description |
| `inputSchema` | Serializable (optional) | JSON Schema of the tool input, when the page provides one |
| `annotations` | `WebMCPToolAnnotations` (optional) | Hints the page provides about the tool |

`WebMCPToolAnnotations` fields (all optional booleans): `readOnly` (does not modify state), `untrustedContent` (output may contain third-party content), `consequential` (takes a consequential action, such as placing an order).

## Notes

- Experimental browser feature. Chromium enables it with the `--enable-features=WebMCP` launch argument, Firefox with the `dom.modelcontext.enabled` and `dom.modelcontext.testing.enabled` preferences. WebKit does not implement it.
- Tool names, descriptions, input schemas and results are provided by the page; treat them as untrusted input.
- `callTool` throws when the tool is not registered or its `execute` function throws.
- `page.webmcp` covers the main frame only; child frames list their tools through their own `frame.webmcp`.
- This is Playwright's client for the page-side WebMCP API, distinct from MCP servers in other skills.
- Source: https://playwright.dev/docs/api/class-webmcp (microsoft/playwright v1.64.1 `docs/src/api/class-webmcp.md`)

## Related

- [page.md](./page.md)
