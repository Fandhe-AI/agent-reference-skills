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

let todos = [];
let nextId = 1;

const replyWithTodos = (message) => ({
  content: message ? [{ type: "text", text: message }] : [],
  structuredContent: { tasks: todos },
});

function createTodoServer() {
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
      },
    },
    async (args) => {
      const title = args?.title?.trim?.() ?? "";
      if (!title) return replyWithTodos("Missing title.");
      const todo = { id: `todo-${nextId++}`, title, completed: false };
      todos = [...todos, todo];
      return replyWithTodos(`Added "${todo.title}".`);
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
      if (!id) return replyWithTodos("Missing todo id.");
      const todo = todos.find((task) => task.id === id);
      if (!todo) {
        return replyWithTodos(`Todo ${id} was not found.`);
      }

      todos = todos.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      );

      return replyWithTodos(`Completed "${todo.title}".`);
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

    const server = createTodoServer();
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
- `registerAppResource` publishes the `ui://` HTML widget; `registerAppTool` links a tool to it via `_meta.ui.resourceUri`.
- `StreamableHTTPServerTransport` with `sessionIdGenerator: undefined` runs the server in stateless mode — a fresh `McpServer` instance is created per request.
- The preflight `Access-Control-Allow-Headers` must include `mcp-protocol-version` alongside `content-type` and `mcp-session-id` — a browser-based Streamable HTTP client sends `MCP-Protocol-Version` on requests after initialization, and an incomplete allow-list makes the browser block the request before it reaches the server.
- Use `ngrok` (or another tunnel) to expose the local server to ChatGPT during development via Settings > Connectors > developer mode.
- This is the ChatGPT-app (server/publisher) side of MCP; consuming MCP servers from the Agents SDK is covered by the `openai-agents` skill.

Source: https://developers.openai.com/plugins/build/app-quickstart
