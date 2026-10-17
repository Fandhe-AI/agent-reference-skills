---
source: https://ai-sdk.dev/docs/ai-sdk-harnesses/terminal-ui
---

# Harnesses with Terminal UI

`@ai-sdk/tui` can render harness streams, tool calls, reasoning sections, and approval prompts in a terminal. Because `HarnessAgent` requires a session for `generate` and `stream`, wrap it with a small `AgentTUIAgent` adapter that injects one session for the lifetime of the terminal UI.

## Signature / Usage

```bash
npm i @ai-sdk/tui @ai-sdk/harness @ai-sdk/harness-codex @ai-sdk/sandbox-vercel
```

```ts
import { HarnessAgent, type HarnessAgentSession } from '@ai-sdk/harness/agent';
import { codex } from '@ai-sdk/harness-codex';
import { createVercelNetworkSandboxSession } from '@ai-sdk/sandbox-vercel';
import { runAgentTUI, type AgentTUIAgent } from '@ai-sdk/tui';

const agent = new HarnessAgent({
  harness: codex,
});

function createTUIAgent({
  agent,
  session,
}: {
  agent: HarnessAgent<any, any, any>;
  session: HarnessAgentSession;
}): AgentTUIAgent {
  return {
    version: 'agent-v1',
    id: agent.id,
    tools: agent.tools,
    generate(request) {
      return agent.generate({
        ...request,
        session,
      } as Parameters<typeof agent.generate>[0]);
    },
    stream(request) {
      return agent.stream({
        ...request,
        session,
      } as Parameters<typeof agent.stream>[0]);
    },
  } as AgentTUIAgent;
}

const sandboxSession = await createVercelNetworkSandboxSession({
  runtime: 'node24',
  ports: [4000],
  template: await agent.getSandboxTemplate(),
});
const session = await agent.createSession({ sandboxSession });

try {
  await runAgentTUI({
    title: 'Codex',
    agent: createTUIAgent({ agent, session }),
    tools: 'auto-collapsed',
    reasoning: 'collapsed',
  });
} finally {
  await session.destroy();
  await sandboxSession.destroy();
}
```

## Notes

- Stability: harness packages are experimental.
- The terminal UI runs until the user exits with `Esc` or `Ctrl+C`.
- Use one session per terminal run. For long-lived terminal tools, persist the state from `session.detach()` or `session.stop()` to resume later.

## Related

- [Terminal UI](./terminal-ui.md)
- [runAgentTUI](./run-agent-tui.md)
- [HarnessAgent](./harness-agent.md)
