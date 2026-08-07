# Minimal MCP Server with Tool + UI Resource

A working Node MCP server exposing two tools (`add_todo`, `complete_todo`) that share one `ui://` widget resource, servable over Streamable HTTP for ChatGPT to connect to.

Create `public/todo-widget.html` first — the minimal widget the server reads and serves as the `ui://` resource:

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="todo-list"></ul>
    <button id="add-btn">Add "Buy milk"</button>
    <script>
      function render(tasks) {
        const list = document.getElementById("todo-list");
        list.innerHTML = "";
        for (const t of tasks) {
          const li = document.createElement("li");
          // textContent, not innerHTML: a model- or user-supplied title could
          // contain markup that would otherwise execute inside the iframe.
          li.textContent = `${t.completed ? "✅" : "⬜"} ${t.title}`;
          list.appendChild(li);
        }
      }
      // Read-only render of the tool's structured output on mount.
      render(window.openai.toolOutput?.tasks ?? []);

      // callTool is only invoked from a user action, never automatically.
      document.getElementById("add-btn").addEventListener("click", () => {
        window.openai.callTool("add_todo", { title: "Buy milk" }).then((res) => {
          render(res.structuredContent.tasks);
        });
      });
    </script>
  </body>
</html>
```

```js
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";

const todoHtml = readFileSync("public/todo-widget.html", "utf8");

const addTodoInputSchema = {
  title: z.string().min(1),
};

const completeTodoInputSchema = {
  id: z.string().min(1),
};

const todoOutputSchema = {
  tasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      completed: z.boolean(),
    })
  ),
};

// Per-session todo lists, keyed by the client's mcp-session-id header. Demo-only
// isolation: in a real deployment, scope by a verified user/tenant ID instead
// (see Notes).
const todoStores = new Map();

function getStore(sessionKey) {
  let store = todoStores.get(sessionKey);
  if (!store) {
    store = { todos: [], nextId: 1 };
    todoStores.set(sessionKey, store);
  }
  return store;
}

const replyWithTodos = (store, message) => ({
  content: message ? [{ type: "text", text: message }] : [],
  structuredContent: { tasks: store.todos },
});

function createTodoServer(sessionKey) {
  const store = getStore(sessionKey);
  const server = new McpServer({
    name: "todo-plugin-server",
    version: "0.1.0",
  });

  registerAppResource(
    server,
    "todo-widget",
    "ui://widget/todo.html",
    {},
    async () => ({
      contents: [
        {
          uri: "ui://widget/todo.html",
          mimeType: RESOURCE_MIME_TYPE,
          text: todoHtml,
        },
      ],
    })
  );

  registerAppTool(
    server,
    "add_todo",
    {
      title: "Add todo",
      description: "Creates a todo item with the given title.",
      inputSchema: addTodoInputSchema,
      outputSchema: todoOutputSchema,
      _meta: {
        ui: { resourceUri: "ui://widget/todo.html" },
        // Required for the widget's window.openai.callTool("add_todo", ...) to
        // be allowed through the compatibility bridge — default is false.
        "openai/widgetAccessible": true,
      },
    },
    async (args) => {
      const title = args?.title?.trim?.() ?? "";
      if (!title) return replyWithTodos(store, "Missing title.");
      const todo = { id: `todo-${store.nextId++}`, title, completed: false };
      store.todos = [...store.todos, todo];
      return replyWithTodos(store, `Added "${todo.title}".`);
    }
  );

  registerAppTool(
    server,
    "complete_todo",
    {
      title: "Complete todo",
      description: "Marks a todo as done by id.",
      inputSchema: completeTodoInputSchema,
      outputSchema: todoOutputSchema,
      _meta: {
        ui: { resourceUri: "ui://widget/todo.html" },
      },
    },
    async (args) => {
      const id = args?.id;
      if (!id) return replyWithTodos(store, "Missing todo id.");
      const todo = store.todos.find((task) => task.id === id);
      if (!todo) {
        return replyWithTodos(store, `Todo ${id} was not found.`);
      }

      store.todos = store.todos.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      );

      return replyWithTodos(store, `Completed "${todo.title}".`);
    }
  );

  return server;
}

const port = Number(process.env.PORT ?? 8787);
const MCP_PATH = "/mcp";

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS" && url.pathname === MCP_PATH) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id, mcp-protocol-version",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/plain" }).end("Todo MCP server");
    return;
  }

  const MCP_METHODS = new Set(["POST", "GET", "DELETE"]);
  if (url.pathname === MCP_PATH && req.method && MCP_METHODS.has(req.method)) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");

    // Demo isolation only: falls back to a shared bucket when the header is
    // absent (stateless mode assigns no session id). Use a verified
    // user/tenant id in production instead of trusting a client-supplied header.
    const sessionKey = req.headers["mcp-session-id"] ?? "anonymous";
    const server = createTodoServer(sessionKey);
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless mode
      enableJsonResponse: true,
    });

    res.on("close", () => {
      transport.close();
      server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) {
        res.writeHead(500).end("Internal server error");
      }
    }
    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.listen(port, () => {
  console.log(
    `Todo MCP server listening on http://localhost:${port}${MCP_PATH}`
  );
});
```

Dependencies:

```json
{
  "type": "module",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.20.2",
    "@modelcontextprotocol/ext-apps": "^1.0.1",
    "zod": "^3.25.76"
  }
}
```

Run and test:

```bash
node server.js
npx @modelcontextprotocol/inspector@latest
ngrok http <port>
```

## Notes

- Create `public/todo-widget.html` before starting the server — `readFileSync("public/todo-widget.html")` fails with `ENOENT` if the file is missing. The widget above is intentionally minimal; the full quickstart version renders a form and persists per-item busy state via the shared MCP Apps bridge instead of `window.openai`.
- The widget builds `<li>` nodes with `createElement` and sets the label via `textContent`, never `innerHTML` — a todo title can originate from the model or another user, and interpolating it into an HTML string would let it inject markup/scripts that execute inside the iframe.
- The widget renders `window.openai.toolOutput` read-only on mount; `add_todo` (a mutating tool) is only called from the button's `click` handler, never automatically — auto-invoking a mutating tool on mount would re-run the mutation every time the widget remounts.
- `add_todo`'s tool descriptor sets `_meta["openai/widgetAccessible"]: true` — the default is `false`, and without it the compatibility bridge rejects the widget's `window.openai.callTool("add_todo", ...)` call. `complete_todo` isn't invoked from this widget, so it's left without the flag.
- `registerAppResource` publishes the `ui://` HTML widget; `registerAppTool` links a tool to it via `_meta.ui.resourceUri`.
- `StreamableHTTPServerTransport` with `sessionIdGenerator: undefined` runs in stateless mode — a fresh `McpServer` instance is created per request. Todo state lives in a `Map` keyed by the `mcp-session-id` header (`todoStores`) so that clients presenting distinct session IDs don't read or write each other's todos — but this is best-effort, demo-grade isolation only: stateless mode assigns no session ID, so when the header is absent every such client falls into one shared "anonymous" bucket, and a client-supplied header can also be spoofed. Production servers should scope state by a verified user/tenant ID instead (e.g. derived from the OAuth access token), not by this header.
- The preflight `Access-Control-Allow-Headers` must include `mcp-protocol-version` alongside `content-type` and `mcp-session-id` — a browser-based Streamable HTTP client sends `MCP-Protocol-Version` on requests after initialization, and an incomplete allow-list makes the browser block the request before it reaches the server.
- Use `ngrok` (or another tunnel) to expose the local server to ChatGPT during development via Settings > Connectors > developer mode.
- This is the ChatGPT-app (server/publisher) side of MCP; consuming MCP servers from the Agents SDK is covered by the `openai-agents` skill.

Source: https://developers.openai.com/plugins/build/app-quickstart
