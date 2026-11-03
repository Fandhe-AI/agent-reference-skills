---
source: https://developers.cloudflare.com/agents/tools/codemode/browser/
---

# Code Mode in the browser (iframe executor)

`@cloudflare/codemode/browser` lets model-written code orchestrate browser-owned tools (page state, browser APIs, app data) from an Agent chat UI, running inside a sandboxed iframe on the page. It does not control a remote browser; for CDP automation use the [Browser tool](./browser.md).

## Signature / Usage

Install `npm i @cloudflare/codemode` in the client app (no AI SDK or Zod peer dependency). Define tools with JSON Schema:

```ts
import type { JsonSchemaExecutableToolDescriptors } from "@cloudflare/codemode/browser";

export const browserTools: JsonSchemaExecutableToolDescriptors = {
  getPageInfo: {
    description: "Get information about the current browser page",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    },
    execute: async () => ({
      title: document.title,
      url: window.location.href
    })
  },
  getSelectionText: {
    description: "Get the user's current text selection",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    },
    execute: async () => ({
      text: window.getSelection()?.toString() ?? ""
    })
  }
};
```

Create the descriptor:

```ts
import {
  IframeSandboxExecutor,
  createBrowserCodeTool
} from "@cloudflare/codemode/browser";
import { browserTools } from "./browser-tools";

export const codemodeTool = createBrowserCodeTool({
  tools: browserTools,
  executor: new IframeSandboxExecutor()
});
```

Register it on the client and run tool calls:

```ts
import { useAgentChat, type AITool } from "@cloudflare/ai-chat/react";
import { useAgent } from "agents/react";
import { useMemo } from "react";
import { codemodeTool } from "./codemode-tool";

function BrowserCodeModeChat() {
  const agent = useAgent({ agent: "browser-codemode" });

  const tools = useMemo<Record<string, AITool>>(
    () => ({
      codemode: {
        description: codemodeTool.description,
        parameters: codemodeTool.inputSchema,
        execute: (input) =>
          codemodeTool.execute(input as { code: string })
      }
    }),
    []
  );

  const { messages, sendMessage } = useAgentChat({
    agent,
    tools,
    onToolCall: async ({ toolCall, addToolOutput }) => {
      const tool = tools[toolCall.toolName];
      if (!tool?.execute) return;

      try {
        const output = await tool.execute(toolCall.input);
        addToolOutput({
          toolCallId: toolCall.toolCallId,
          output
        });
      } catch (error) {
        addToolOutput({
          toolCallId: toolCall.toolCallId,
          state: "output-error",
          errorText: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });

  // Render messages and call sendMessage() from your chat UI.
}
```

On the Agent, convert client schemas into model tools:

```ts
import { AIChatAgent, createToolsFromClientSchemas } from "@cloudflare/ai-chat";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { createAI } from "agents/models/ai-sdk";

export class BrowserCodemode extends AIChatAgent<Env> {
  async onChatMessage(
    _onFinish?: unknown,
    options?: {
      clientTools?: Parameters<typeof createToolsFromClientSchemas>[0];
    }
  ) {
    const ai = createAI({ binding: this.env.AI });

    const result = streamText({
      model: ai("@cf/moonshotai/kimi-k2.7-code"),
      system:
        "Use the codemode tool to write JavaScript that calls browser-provided tools.",
      messages: await convertToModelMessages(this.messages),
      tools: createToolsFromClientSchemas(options?.clientTools),
      stopWhen: stepCountIs(10)
    });

    return result.toUIMessageStreamResponse();
  }
}
```

## Options / Props

`IframeSandboxExecutor` options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `timeout` | number | `30000` | Ends an execution after this many milliseconds. |
| `csp` | string | `default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval';` | Content Security Policy for the iframe document. |

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `createBrowserCodeTool({ tools, executor? })` | function | `executor` defaults to a default `IframeSandboxExecutor` | Returns a plain descriptor named `codemode` with generated TypeScript definitions in its description and `code` as input. |

## Notes

- Isolation: a hidden iframe per execution with `sandbox="allow-scripts"`, code delivered via `postMessage`, messages scoped to the iframe and an execution nonce; the iframe and listener are removed after completion, failure, or timeout. Tool calls return to the parent page, which runs the browser-owned `execute`.
- JSON Schema only supplies types; `createBrowserCodeTool()` does not validate arguments at runtime, so validate untrusted input inside each `execute`.
- Relaxing CSP directives such as `connect-src`, `img-src`, or `form-action` can let generated iframe code send values returned by browser tools to external systems. Keep outbound destinations narrow and do not put secrets in tool results. Browser-owned tools run in the parent page with whatever capabilities you give them.
- The timeout cannot interrupt a synchronous loop such as `while (true) {}`; it blocks the event loop.
- Human-in-the-loop: tools whose `needsApproval` is `true` or a function are excluded and execution is not paused. Keep approval-gated actions out of the descriptor and register them as standard tools using the `useAgentChat()` tool-approval flow (see [chat-agents.md](../agent-class/chat-agents.md)).
- The Agent only advertises the schema; it never runs the generated code or the tool implementations. If browser tools change at runtime, create and register a new descriptor.
- For a single browser action use a standard client-side tool instead of Code Mode.

## Related

- [Browser](./browser.md)
- [Code Mode overview](./codemode-overview.md)
