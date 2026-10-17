---
source: https://ai-sdk.dev/providers/ai-sdk-harnesses
---

# AI SDK Harnesses (providers index)

AI SDK harness adapters connect `HarnessAgent` to established agent runtimes. They are separate from model providers, but expose AI SDK-compatible stream and response primitives.

## Signature / Usage

```ts
import { HarnessAgent } from '@ai-sdk/harness/agent';
import { codex } from '@ai-sdk/harness-codex';
import { createVercelNetworkSandboxSession } from '@ai-sdk/sandbox-vercel';

const agent = new HarnessAgent({
  harness: codex,
  model: 'gpt-5.6-luna',
});

const sandboxSession = await createVercelNetworkSandboxSession({
  runtime: 'node24',
  ports: [4000],
  template: await agent.getSandboxTemplate(),
});
const session = await agent.createSession({ sandboxSession });
try {
  console.log(
    (await agent.generate({ session, prompt: 'Inspect this project.' })).text,
  );
} finally {
  await session.destroy();
  await sandboxSession.destroy();
}
```

Adapter pages listed on the official index: Claude Code, Cline, Codex, Cursor, fx, GitHub Copilot, Grok Build, OpenCode, Pi, and Agent Client Protocol (use any ACP compatible harness).

## Notes

- All harness adapters are used with `HarnessAgent`.
- Stability: harness packages are experimental.
- Only the Claude Code and Codex adapter pages are captured in this skill; see `harness-adapters.md` for the capability table across adapters.
- Distance: see anthropic-claude-code*, anthropic-agent-sdk and openai-codex for the products themselves.

## Related

- [Harness adapters](./harness-adapters.md)
- [Claude Code harness](./claude-code-harness.md)
- [Codex harness](./codex-harness.md)
- [HarnessAgent](./harness-agent.md)
