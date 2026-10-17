---
source: https://ai-sdk.dev/docs/ai-sdk-harnesses/overview
---

# AI SDK Harnesses Overview

The AI SDK harness abstraction runs established agent harnesses (Claude Code, Codex, Pi, ...) through a single AI SDK surface. A harness is a complete agent runtime owning workspace access, built-in coding tools, native session state, compaction, permission flows, and runtime-specific configuration.

## Signature / Usage

```ts
const session = await agent.createSession();

try {
  const result = await agent.generate({
    session,
    prompt: 'Inspect the repository and summarize the test setup.',
  });

  console.log(result.text);
} finally {
  await session.destroy();
}
```

Core pieces:

| Name | Description |
| --- | --- |
| HarnessAgent | The AI SDK agent implementation used in application code. |
| Harness adapter | Package connecting to a runtime, e.g. `@ai-sdk/harness-claude-code`. |
| Sandbox provider | The isolated filesystem and process environment where the harness runs. |
| Session | The live conversation and workspace state for a harness run. |

## Notes

- Stability: harness packages are **experimental**; expect breaking changes between releases.
- The harness abstraction is separate from the provider/model abstraction: providers expose models to `generateText` / `streamText`; harnesses expose agent runtimes to `HarnessAgent`.
- `HarnessAgent.generate()` returns an AI SDK `GenerateTextResult` and `HarnessAgent.stream()` returns a `StreamTextResult` (`result.text`, `result.stream`, `result.steps`, `result.usage`, `result.responseMessages`). Events without a first-class AI SDK part (workspace file changes, compaction) surface as dynamic provider-executed tool parts. A `HarnessAgent` stream can be passed to `toUIMessageStream` and rendered with `useChat`.
- Use a harness when an existing runtime should drive the task (sandboxed coding agents, built-in tools and permission model, runtime-owned conversation history). Use providers and models for direct control over the model call, tool loop, settings, structured output, or custom agent architecture.
- A harness session owns state (runtime, sandbox, working directory, native history, pending approvals). For server routes, use a stable `sessionId` and persist the resume state returned by `session.detach()` or `session.stop()`.
- Adapters can run the runtime in a sandbox, but execution environments differ by adapter; review the adapter's runtime location and security guidance before use.
- Distance: this page covers the AI SDK abstraction that drives Claude Code / Codex-like runtimes, not their own CLIs or configuration. For Claude Code itself see the anthropic-claude-code* skills and anthropic-agent-sdk; for Codex itself see openai-codex.

## Related

- [HarnessAgent](./harness-agent.md)
- [Harness skills](./harness-skills.md)
- [Harness adapters](./harness-adapters.md)
- [Workflow utilities](./workflow-utilities.md)
- [Harness UI](./harness-ui.md)
- [Harness terminal UI](./harness-terminal-ui.md)
