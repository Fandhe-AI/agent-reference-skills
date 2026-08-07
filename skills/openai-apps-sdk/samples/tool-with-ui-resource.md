# Decoupled Data Tool and Render Tool Sharing a UI Resource

Split a tool into a data tool (returns chainable `structuredContent`, no template) and a render tool (owns the `ui://` widget template) so re-rolls call the data tool directly without remounting the widget.

```ts
const TEMPLATE_URI = "ui://widget/dice.html";

const server = new McpServer(
  { name: "Decoupled dice", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// The widget only renders the latest tool result.
// Re-roll calls the data tool directly to avoid remounting the widget.
const widgetHtml = `
  <div style="font-family: system-ui; padding: 8px;">
    <div style="font-size: 20px; margin-bottom: 6px;">
      Result: <span id="out">—</span>
    </div>
    <button id="reroll" disabled>Re-roll</button>
  </div>

  <script>
    const outputEl = document.getElementById("out");
    const rerollButton = document.getElementById("reroll");
    const pendingRequests = new Map();
    let nextRequestId = 1;
    let latestToolInput;
    let latestToolOutput;

    function render(result) {
      outputEl.textContent = String(result?.value ?? "—");
    }

    function request(method, params) {
      const id = nextRequestId++;
      window.parent.postMessage({ jsonrpc: "2.0", id, method, params }, "*");
      return new Promise((resolve, reject) => {
        pendingRequests.set(id, { resolve, reject });
      });
    }

    function notify(method, params) {
      window.parent.postMessage({ jsonrpc: "2.0", method, params }, "*");
    }

    window.addEventListener(
      "message",
      (event) => {
        if (event.source !== window.parent) return;
        const message = event.data;
        if (!message || message.jsonrpc !== "2.0") return;

        if (message.id !== undefined && pendingRequests.has(message.id)) {
          const pending = pendingRequests.get(message.id);
          pendingRequests.delete(message.id);
          if (message.error) pending.reject(message.error);
          else pending.resolve(message.result);
          return;
        }

        if (message.method === "ui/notifications/tool-input") {
          latestToolInput = message.params;
        }

        if (message.method === "ui/notifications/tool-result") {
          latestToolOutput = message.params?.structuredContent;
          render(latestToolOutput);
        }
      },
      { passive: true }
    );

    // Bridge-lifecycle hosts reject tools/call sent before the widget
    // completes the ui/initialize handshake, so the Re-roll button stays
    // disabled until initialization is confirmed.
    async function initializeBridge() {
      const appInfo = { name: "dice-widget", version: "1.0.0" };
      const appCapabilities = {};
      const protocolVersion = "2026-01-26";
      await request("ui/initialize", { appInfo, appCapabilities, protocolVersion });
      notify("ui/notifications/initialized", {});
      rerollButton.disabled = false;
    }

    rerollButton.onclick = async () => {
      const sides = latestToolOutput?.sides ?? latestToolInput?.sides ?? 6;
      const next = await request("tools/call", {
        name: "roll_dice",
        arguments: { sides },
      });
      if (next?.structuredContent) {
        render(next.structuredContent);
      }
    };

    initializeBridge();
  </script>
`.trim();

server.registerResource("dice-widget", TEMPLATE_URI, {}, async () => ({
  contents: [
    {
      uri: TEMPLATE_URI,
      mimeType: "text/html;profile=mcp-app",
      text: widgetHtml,
      _meta: { ui: { prefersBorder: true } },
    },
  ],
}));

// 1) Data tool: no output template, returns chainable structuredContent.
server.registerTool(
  "roll_dice",
  {
    title: "Roll dice",
    description: "Roll an N-sided die and return { sides, value }.",
    inputSchema: { sides: z.number().int().min(2) },
    outputSchema: {
      sides: z.number().int().min(2),
      value: z.number().int().min(1),
    },
    _meta: {
      "openai/toolInvocation/invoking": "Rolling…",
      "openai/toolInvocation/invoked": "Rolled.",
    },
  },
  async ({ sides }) => {
    const value = 1 + Math.floor(Math.random() * sides);
    return {
      structuredContent: { sides, value },
      content: [{ type: "text", text: `Rolled ${value} on ${sides} sides.` }],
    };
  }
);

// 2) Render tool: owns the template and requires data from roll_dice.
server.registerTool(
  "render_dice_widget",
  {
    title: "Render dice widget",
    description:
      "Render the dice widget from roll data. First call roll_dice, then pass its sides and value to this tool.",
    inputSchema: {
      sides: z.number().int().min(2),
      value: z.number().int().min(1),
    },
    outputSchema: {
      sides: z.number().int().min(2),
      value: z.number().int().min(1),
    },
    _meta: {
      ui: { resourceUri: TEMPLATE_URI },
      "openai/toolInvocation/invoking": "Rendering…",
      "openai/toolInvocation/invoked": "Rendered.",
    },
  },
  async ({ sides, value }) => ({
    structuredContent: { sides, value },
    content: [
      {
        type: "text",
        text: `Showing a ${sides}-sided roll: ${value}.`,
      },
    ],
  })
);

export default server;
```

## Notes

- Only `render_dice_widget` sets `_meta.ui.resourceUri`; `roll_dice` stays template-free so re-rolls don't remount the iframe.
- The Re-roll button starts `disabled` and only becomes clickable after `initializeBridge()` completes the `ui/initialize` request / `ui/notifications/initialized` notification handshake described in `references/build/app-quickstart.md` — hosts that enforce bridge lifecycle reject `tools/call` sent before that handshake finishes.
- The widget listens for `ui/notifications/tool-result` / `ui/notifications/tool-input` over `postMessage` and calls `tools/call` directly for re-rolls.
- `_meta["openai/toolInvocation/invoking"]` / `invoked` control the status text ChatGPT shows while the tool runs.
- This is the ChatGPT-app (server/publisher) side of MCP; consuming MCP servers from the Agents SDK is covered by the `openai-agents` skill.

Source: https://developers.openai.com/plugins/build/chatgpt-ui
