# Guide: In-App Coding Agent with CopilotKit

Add a CopilotKit chat to a Next.js app where each user talks to a coding agent running in their own Upstash Box. A `BoxAgent` adapter converts the box's agent stream into AG-UI events.

## Signature / Usage

```bash
npm install @upstash/box@0.7.7 @copilotkit/react-core@1.75.1 @copilotkit/runtime@1.75.1 @ag-ui/client@0.0.59 rxjs@7.8.1
```

Per-user box, found by name or created on first message (`app/api/copilotkit/[[...slug]]/route.ts`):

```typescript
import { CopilotRuntime, InMemoryAgentRunner, createCopilotRuntimeHandler } from "@copilotkit/runtime/v2";
import { Agent, Box, BoxError } from "@upstash/box";
import { BoxAgent } from "@/lib/box-agent";

async function getBox(userId: string) {
  const name = `copilot-${userId}`;
  try {
    return await Box.getByName(name);
  } catch (error) {
    if (!(error instanceof BoxError && error.statusCode === 404)) throw error;
  }
  return await Box.create({
    name,
    agent: {
      harness: Agent.ClaudeCode,
      model: "anthropic/claude-sonnet-5",
      apiKey: process.env.ANTHROPIC_API_KEY,
    },
  });
}

const runtime = new CopilotRuntime({
  agents: async ({ request }) => {
    const userId = await getUserId(request);
    return { default: new BoxAgent(() => getBox(userId)) };
  },
  runner: new InMemoryAgentRunner(),
});
```

Core of the adapter (`lib/box-agent.ts`): `stream = await box.agent.stream({ prompt })`, then map chunks `text-delta` / `tool-call` / `tool-result` to AG-UI `TEXT_MESSAGE_*` / `TOOL_CALL_*` events.

Chat UI:

```tsx
import { CopilotChat, CopilotKitProvider, useDefaultRenderTool } from "@copilotkit/react-core/v2";
// <CopilotKitProvider runtimeUrl="/api/copilotkit" enableInspector={false}> ... <CopilotChat />
```

## Options / Props

Cap a run or give standing instructions via `box.agent.stream({ ... })`:

| Name | Type | Description |
|------|------|-------------|
| `prompt` | string | The user message sent to the agent |
| `timeout` | number (ms) | Caps the run duration (example: `5 * 60 * 1000`) |
| `options.maxBudgetUsd` | number | Caps the run cost in USD (example: `1`) |
| `options.systemPrompt` | string | Standing instructions (example: `"Keep replies short."`) |

```typescript
stream = await box.agent.stream({
  prompt,
  timeout: 5 * 60 * 1000,
  options: { maxBudgetUsd: 1, systemPrompt: "Keep replies short." },
});
```

## Notes

- Env: `UPSTASH_BOX_API_KEY`, `ANTHROPIC_API_KEY` in `.env.local`. The listed versions were tested together; if upgrading CopilotKit, match `@ag-ui/client` to its dependency (`npm ls @ag-ui/client`)
- The system prompt is set when the conversation starts and stays for the rest of it
- Before production: identify users from your auth session (the box name decides whose files the agent reaches); protect thread routes (`InMemoryAgentRunner` records no owner); persist chat history outside server memory; one conversation per user (thread ID is not sent to the box)
- Troubleshooting: `BoxAgent` not assignable to `AbstractAgent` (`@ag-ui/client` version mismatch); permission denied (agent writes only under `/workspace/home`); `Box cannot start a run in its current state` (one prompt at a time); no tool cards with OpenCode (text only); box limit reached (delete boxes or upgrade plan)
- The install line keeps the guide's tested pin `@upstash/box@0.7.7` verbatim; other Box pages in this skill reference `@upstash/box` 0.7.9 (npm latest as of 2026-10-17).
- Source: https://upstash.com/docs/box/guides/copilotkit (fetched 2026-10-17; no version pin on the site).

## Related

- [Agent](./agent.md)
- [Quickstart](./quickstart.md)
- [Guide: Next.js Setup](./guides-nextjs-setup.md)
