---
source: https://modelcontextprotocol.io/extensions/apps/build
---

# Build an MCP App

Server-side and UI-side API surface used in the official MCP Apps quickstart (`@modelcontextprotocol/ext-apps`). Step-by-step project setup is in the samples.

## Signature / Usage

Server: register a tool with `_meta.ui.resourceUri` and a resource that serves the bundled HTML.

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";

const server = new McpServer({
  name: "My MCP App Server",
  version: "1.0.0",
});

// The ui:// scheme tells hosts this is an MCP App resource.
const resourceUri = "ui://get-time/mcp-app.html";

registerAppResource(
  server,
  resourceUri,
  resourceUri,
  { mimeType: RESOURCE_MIME_TYPE },
  async () => {
    const html = await fs.readFile(
      path.join(import.meta.dirname, "dist", "mcp-app.html"),
      "utf-8",
    );
    return {
      contents: [
        { uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: html },
      ],
    };
  },
);
```

UI: use the `App` class to talk to the host.

```typescript
import { App } from "@modelcontextprotocol/ext-apps";

const app = new App({ name: "Get Time App", version: "1.0.0" });

// Establish communication with the host
app.connect();

// Handle the initial tool result pushed by the host
app.ontoolresult = (result) => {
  const time = result.content?.find((c) => c.type === "text")?.text;
};

// Proactively call tools when users interact with the UI
const result = await app.callServerTool({
  name: "get-time",
  arguments: {},
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `registerAppTool` | function | Registers a tool with the `_meta.ui.resourceUri` field; the UI is fetched and rendered when the host calls the tool, and the result is passed to it on arrival. |
| `registerAppResource` | function | Serves the bundled HTML when the host requests the UI resource. |
| `RESOURCE_MIME_TYPE` | constant | MIME type for the UI resource. |
| `resourceUri` | string | `ui://` URI; the path structure is arbitrary. |
| `app.connect()` | method | Establishes communication with the host; call once at initialization. |
| `app.ontoolresult` | callback | Fires when the host pushes a tool result to the app. |
| `app.callServerTool()` | method | Lets the app proactively call tools on the server; each call is a round-trip. |

## Notes

- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path `/extensions/`). Signatures are as shown in the quickstart; the full SDK reference is on the ext-apps docs site and is not reproduced here.
- Prerequisite: Node.js 18 or higher. The UI is rendered in a secure iframe with a deny-by-default CSP; bundle assets into the HTML (the tutorial uses `vite-plugin-singlefile`) or configure CSP.
- The `App` class additionally provides methods for logging, opening URLs, and updating the model's context with structured data.
- Testing requires a host that supports MCP Apps (e.g., Claude via a custom connector, or the ext-apps `basic-host` example).
- Distance from OpenAI Apps SDK: this is the MCP Apps extension (`ui://` resources, `registerAppTool` from `@modelcontextprotocol/ext-apps`), not the OpenAI Apps SDK (`window.openai`, ChatGPT-specific `_meta`); see the openai-apps-sdk skill.
- The quickstart also describes a `create-mcp-app` agent skill for coding agents; that is coding-assistant guidance, not a protocol feature (see anthropic-claude-code-extend for the SKILL.md format).

## Related

- [MCP Apps](./mcp-apps.md)
- [Extensions Overview](./extensions-overview.md)
