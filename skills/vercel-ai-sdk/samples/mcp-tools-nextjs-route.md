---
source: https://ai-sdk.dev/cookbook/next/mcp-tools
---

# MCP Tools in a Next.js Route

Connect to stdio, HTTP and SSE MCP servers with `createMCPClient`, pass their tools to `streamText`, and close the clients when done.

```ts
// app/api/completion/route.ts
import { createMCPClient, type MCPClient } from '@ai-sdk/mcp';
import {
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
} from 'ai';
import { Experimental_StdioMCPTransport } from '@ai-sdk/mcp/mcp-stdio';
import { openai } from '@ai-sdk/openai';
// Optional: Official transports if you prefer them
// import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio';
// import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse';
// import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();
  const clients: MCPClient[] = [];

  try {
    // Initialize an MCP client to connect to a `stdio` MCP server (local only):
    const transport = new Experimental_StdioMCPTransport({
      command: 'node',
      args: ['src/stdio/dist/server.js'],
    });

    const stdioClient = await createMCPClient({
      transport,
    });
    clients.push(stdioClient);

    // Connect to an HTTP MCP server directly via the client transport config
    const httpClient = await createMCPClient({
      transport: {
        type: 'http',
        url: 'http://localhost:3000/mcp',

        // optional: configure headers
        // headers: { Authorization: 'Bearer my-api-key' },

        // optional: provide an OAuth client provider for automatic authorization
        // authProvider: myOAuthClientProvider,
      },
    });
    clients.push(httpClient);

    // Connect to a Server-Sent Events (SSE) MCP server directly via the client transport config
    const sseClient = await createMCPClient({
      transport: {
        type: 'sse',
        url: 'http://localhost:3000/sse',

        // optional: configure headers
        // headers: { Authorization: 'Bearer my-api-key' },

        // optional: provide an OAuth client provider for automatic authorization
        // authProvider: myOAuthClientProvider,
      },
    });
    clients.push(sseClient);

    // Alternatively, you can create transports with the official SDKs instead of direct config:
    // const httpTransport = new StreamableHTTPClientTransport(new URL('http://localhost:3000/mcp'));
    // const httpClient = await createMCPClient({ transport: httpTransport });
    // const sseTransport = new SSEClientTransport(new URL('http://localhost:3000/sse'));
    // const sseClient = await createMCPClient({ transport: sseTransport });

    const toolSetOne = await stdioClient.tools();
    const toolSetTwo = await httpClient.tools();
    const toolSetThree = await sseClient.tools();
    const tools = {
      ...toolSetOne,
      ...toolSetTwo,
      ...toolSetThree, // note: this approach causes subsequent tool sets to override tools with the same name
    };

    const response = await streamText({
      model: 'openai/gpt-6-astra',
      tools,
      // Default is a single step; allow more steps so tool results are fed back to the model
      stopWhen: isStepCount(5),
      prompt,
      // When streaming, the client should be closed after the response is finished:
      onEnd: async () => {
        await stdioClient.close();
        await httpClient.close();
        await sseClient.close();
      },
      // Closing clients onError is optional
      // - Closing: Immediately frees resources, prevents hanging connections
      // - Not closing: Keeps connection open for retries
      onError: async error => {
        await stdioClient.close();
        await httpClient.close();
        await sseClient.close();
      },
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: response.stream }),
    });
  } catch (error) {
    // Close any clients that were created before the error:
    await Promise.all(clients.map(client => client.close()));
    return new Response('Internal Server Error', { status: 500 });
  }
}
```

```tsx
// app/page.tsx
'use client';

import { useCompletion } from '@ai-sdk/react';

export default function Page() {
  const { completion, complete } = useCompletion({
    api: '/api/completion',
  });

  return (
    <div>
      <div
        onClick={async () => {
          await complete(
            'Please schedule a call with Sonny and Robby for tomorrow at 10am ET for me!',
          );
        }}
      >
        Schedule a call
      </div>

      {completion}
    </div>
  );
}
```

## Notes

- The AI SDK is an MCP client here (tools come from `client.tools()`). Related skills: anthropic-api-tools-mcp (MCP connector), anthropic-claude-code-extend (Claude Code MCP), openai-agents (MCP consumption from the Agents SDK), openai-apps-sdk (publishing MCP servers to ChatGPT).
- `Experimental_StdioMCPTransport` is experimental and local only; the optional official transports come from `@modelcontextprotocol/sdk` (`pnpm install @modelcontextprotocol/sdk`).
- Always close clients after use (`onEnd`, optionally `onError`); later tool sets override earlier tools with the same name when spread together.
- The default is a single step, so `stopWhen: isStepCount(5)` is needed for tool results to be returned to the model for a final answer (omitted in the official page's example).
- API details: `references/tools-mcp/create-mcp-client.md`, `references/tools-mcp/mcp-tools.md`.
