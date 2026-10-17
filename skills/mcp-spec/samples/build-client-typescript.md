---
source: https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client
---

# Build a Client (TypeScript)

Stdio MCP client class that connects with `Client` / `StdioClientTransport`, lists tools and calls them for Claude tool-use blocks.

Setup:

```bash
mkdir mcp-client-typescript
cd mcp-client-typescript
npm init -y
npm install @anthropic-ai/sdk @modelcontextprotocol/client dotenv
npm install -D @types/node typescript
touch index.ts
```

`index.ts` (class body without `chatLoop` / `cleanup`, shown as the tutorial's method fragments):

```typescript
import { Anthropic } from "@anthropic-ai/sdk";
import {
  MessageParam,
  Tool,
  ToolResultBlockParam,
} from "@anthropic-ai/sdk/resources/messages/messages.mjs";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import readline from "readline/promises";
import dotenv from "dotenv";

dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

class MCPClient {
  private mcp: Client;
  private anthropic: Anthropic;
  private transport: StdioClientTransport | null = null;
  private tools: Tool[] = [];

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });
    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
  }
  // methods will go here
}
```

`connectToServer` method:

```typescript
async connectToServer(serverScriptPath: string) {
  try {
    const isJs = serverScriptPath.endsWith(".js");
    const isPy = serverScriptPath.endsWith(".py");
    if (!isJs && !isPy) {
      throw new Error("Server script must be a .js or .py file");
    }
    const command = isPy
      ? process.platform === "win32"
        ? "python"
        : "python3"
      : process.execPath;

    this.transport = new StdioClientTransport({
      command,
      args: [serverScriptPath],
    });
    await this.mcp.connect(this.transport);

    const toolsResult = await this.mcp.listTools();
    this.tools = toolsResult.tools.map((tool) => {
      return {
        name: tool.name,
        description: tool.description,
        input_schema: tool.inputSchema,
      };
    });
    console.log(
      "Connected to server with tools:",
      this.tools.map(({ name }) => name)
    );
  } catch (e) {
    console.log("Failed to connect to MCP server: ", e);
    throw e;
  }
}
```

`processQuery` method (returns the assistant turn and `tool_use_id`-linked `tool_result` blocks, as in the Python example):

```typescript
async processQuery(query: string) {
  const messages: MessageParam[] = [
    {
      role: "user",
      content: query,
    },
  ];

  const response = await this.anthropic.messages.create({
    model: "claude-opus-5",
    max_tokens: 1000,
    messages,
    tools: this.tools,
  });

  const finalText = [];
  const toolResults: ToolResultBlockParam[] = [];

  for (const content of response.content) {
    if (content.type === "text") {
      finalText.push(content.text);
    } else if (content.type === "tool_use") {
      const toolName = content.name;
      const toolArgs = content.input as { [x: string]: unknown } | undefined;

      const result = await this.mcp.callTool({
        name: toolName,
        arguments: toolArgs,
      });
      finalText.push(
        `[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`
      );

      toolResults.push({
        type: "tool_result",
        tool_use_id: content.id,
        content: result.content
          .filter((block) => block.type === "text")
          .map((block) => block.text)
          .join("\n"),
        is_error: result.isError === true,
      });
    }
  }

  if (toolResults.length > 0) {
    messages.push({ role: "assistant", content: response.content });
    messages.push({ role: "user", content: toolResults });

    const nextResponse = await this.anthropic.messages.create({
      model: "claude-opus-5",
      max_tokens: 1000,
      messages,
      tools: this.tools,
    });

    for (const content of nextResponse.content) {
      if (content.type === "text") {
        finalText.push(content.text);
      }
    }
  }

  return finalText.join("\n");
}
```

Run:

```bash
npm run build
node build/index.js path/to/server.py # python server
node build/index.js path/to/build/index.js # node server
```

## Notes

- Abridged from the official tutorial: `chatLoop`, `cleanup` and `main()` are omitted; the tutorial's methods go inside the `MCPClient` class where `// methods will go here` appears. See the source URL for the full file.
- Change from the official TS example: `processQuery` returns the assistant response and `tool_use_id`-linked `tool_result` blocks, matching the Python example (the original pushed plain user text).
- Requires `"type": "module"` and a `build` script (`tsc && chmod 755 build/index.js`) in `package.json` plus the tutorial's `tsconfig.json`.
- Tutorial code is otherwise reproduced as published; SDK protocol-version support is not stated in the source.
- The tutorial uses the Anthropic SDK for the LLM call; Claude API usage itself belongs to the Anthropic API skills.
