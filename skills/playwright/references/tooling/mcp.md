# Playwright MCP

The Playwright MCP server (`@playwright/mcp`) provides browser automation through the Model Context Protocol, letting LLMs interact with web pages using structured accessibility snapshots. It works with VS Code, Cursor, Windsurf, Claude Desktop, and any other MCP client, with no vision models required.

## Signature / Usage

Prerequisites: Node.js 20 or newer and an MCP client.

Standard configuration:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

Client-specific installation:

```bash
# VS Code
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'

# Claude Code
claude mcp add playwright npx @playwright/mcp@latest
```

Cursor: `Cursor Settings` -> `MCP` -> `Add new MCP Server`, command type with `npx @playwright/mcp@latest`. Claude Desktop: use the standard config above. Other clients: the standard configuration works with most MCP clients, including Windsurf, Cline, Goose, Kiro, Codex, Copilot CLI, and others. Consult your client's MCP documentation for where to place the config.

First interaction:

```txt
Navigate to https://demo.playwright.dev/todomvc and add a few todo items.
```

## Core Features

### Accessibility snapshots

Tools return a structured snapshot of the page's accessibility tree (not pixels). The LLM uses the element refs to act on the page:

```txt
- heading "todos" [level=1]
- textbox "What needs to be done?" [ref=e5]
- listitem:
  - checkbox "Toggle Todo" [ref=e10]
  - text: "Buy groceries"
```

### Capabilities

- Navigation: open URLs, go back/forward, reload.
- Clicking and typing: click, type, fill forms, select dropdowns.
- Screenshots: current page or specific elements.
- Keyboard and mouse: press keys, hover, drag and drop.
- Dialogs: accept or dismiss.
- Tabs: create, close, switch.
- Network: list requests since page load, mock routes by URL pattern, read console messages.
- Storage state: save/restore cookies and localStorage; list, get, set, delete individual cookies.
- Running Playwright code with `browser_run_code_unsafe`:

```txt
Run this Playwright code to verify the todo count:
async (page) => {
  const count = await page.getByTestId('todo-count').textContent();
  return count;
}
```

- WebMCP tools: pages can register tools through the experimental WebMCP API; tools of the current tab are offered as MCP tools named `webmcp_<tool>`.

## Options / Props

Command-line arguments passed in `args`:

| Name | Type | Description |
| --- | --- | --- |
| `--headless` | flag | Run headless. Default is headed. |
| `--browser=<name>` | string | `chrome`, `firefox`, `webkit`, or `msedge`. |
| `--user-data-dir` | path | Override the persistent profile location. |
| `--isolated` | flag | Each session starts fresh; load initial state with `--storage-state`. |
| `--storage-state` | path | Initial storage state for an isolated session. |
| `--extension` | flag | Connect to existing browser tabs via the Playwright Extension. |
| `--idle-timeout=<ms>` | number | Close the browser after this long without tool calls; `0` disables. |
| `--config <path>` | path | JSON config file (browser options, context options, network rules, timeouts, ...). |
| `--port <n>` | number | Start a standalone HTTP-transport server (e.g. `--port 8931`). |
| `--cdp-endpoint` | string | Attach to a browser over CDP. |
| `--shared-browser-context` | flag | Share one browser context across clients. |

Environment variable: `PLAYWRIGHT_MCP_PING_TIMEOUT_MS` sets the HTTP heartbeat timeout in ms (default five seconds, `0` disables).

Standalone server client config:

```json
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931/mcp"
    }
  }
}
```

## Notes

- The `mcpServers` JSON shape is client-specific; what is common across clients is the server command (`npx`) and args (`@playwright/mcp@latest`). For example, Codex registers MCP servers in `config.toml` under `[mcp_servers.<name>]` or via `codex mcp add` (see the openai-codex skill).
- Profile modes: persistent (default; stored in `ms-playwright/mcp-{channel}-{workspace-hash}` in the platform cache directory), isolated (`--isolated`), browser extension (`--extension`).
- Idle timeout: a headless browser launched by the server is closed after an hour without tool calls. Headed browsers and browsers attached over `--cdp-endpoint` or `--extension` are never closed automatically; an explicit timeout on attached browsers only disconnects. With `--isolated`, in-memory cookies and storage are lost on an idle close.
- `browser_run_code_unsafe` runs arbitrary JavaScript in the Playwright server process and is RCE-equivalent; enable it only for trusted MCP clients.
- WebMCP tool names, descriptions, schemas and results come from the page; treat them as untrusted input. WebMCP is enabled by default in Playwright MCP and `--no-webmcp` disables it (v1.64).
- Playwright bundles the MCP server, runnable with `npx playwright mcp` (v1.62).
- Full config schema: `config.d.ts` in the microsoft/playwright-mcp repository.
- This is the MCP (tool-schema, persistent-state) route. For token-efficient, skill-based agent workflows, see the `playwright-cli` page.
- Source: https://playwright.dev/docs/getting-started-mcp (microsoft/playwright v1.64.1 `docs/src/getting-started-mcp.md`)

## Related

- [Playwright CLI (playwright-cli)](./playwright-cli.md)
- [Playwright Test Agents](./test-agents.md)
- [Playwright CLI](./cli.md)
