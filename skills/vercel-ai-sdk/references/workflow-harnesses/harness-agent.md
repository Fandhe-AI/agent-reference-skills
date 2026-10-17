---
source: https://ai-sdk.dev/docs/ai-sdk-harnesses/harness-agent
---

# HarnessAgent

`HarnessAgent` is an AI SDK `Agent` implementation backed by a harness adapter. `generate()` and `stream()` return AI SDK-compatible results while a preconfigured harness powers them.

## Signature / Usage

```bash
npm i @ai-sdk/harness @ai-sdk/harness-claude-code @ai-sdk/sandbox-vercel
```

```ts
import { HarnessAgent } from '@ai-sdk/harness/agent';
import { claudeCode } from '@ai-sdk/harness-claude-code';
import { createVercelNetworkSandboxSession } from '@ai-sdk/sandbox-vercel';

export const agent = new HarnessAgent({
  harness: claudeCode,
  model: 'claude-sonnet-4-6',
  instructions:
    'You are a careful coding assistant. Prefer small changes and explain tradeoffs.',
});

const sandboxSession = await createVercelNetworkSandboxSession({
  runtime: 'node24',
  ports: [4000],
  template: await agent.getSandboxTemplate(),
});

const session = await agent.createSession({ sandboxSession });
try {
  const result = await agent.generate({
    session,
    prompt: 'Create a short TODO.md for this repository.',
  });
  console.log(result.text);
} finally {
  await session.destroy();
  await sandboxSession.destroy();
}
```

`stream()` returns incremental output via `result.stream` (parts such as `text-delta`). `continueStream()` / `continueGenerate()` continue an unfinished turn.

## Options / Props

Main settings:

| Name | Type | Description |
| --- | --- | --- |
| harness | adapter instance | The adapter instance. |
| model | string | Optional harness-specific model identifier; default model used when omitted. Applied per turn, so `prepareCall` can replace it. |
| id | string | Optional stable agent identifier. |
| instructions | string | Appended to the runtime's system or developer prompt when supported, otherwise prepended to the user prompt. |
| headers | Record | Extra headers for model requests; fixed at construction. `authorization`, `x-api-key`, `user-agent`, `x-client-app` are not allowed. |
| callOptionsSchema / prepareCall | schema / callback | Validate custom call options and derive model, skills, instructions, tools, runtimeContext for each new turn. |
| output | OutputSpecification | Typed output applied to every turn. |
| stopWhen | StopCondition \| StopCondition[] | Finish a result slice after a completed harness tool step that can continue into another model step. No default. |
| tools | ToolSet | AI SDK tools executed by the host when the harness calls them. |
| runtimeContext | object | Application context forwarded to lifecycle callbacks and results for every turn. |
| activeTools / inactiveTools | string[] | Allowlist / denylist of built-in and host-executed tools. |
| skills | array | Instruction bundles surfaced by the adapter. |
| permissionMode | 'allow-all' \| 'allow-edits' \| 'allow-reads' | Built-in tool permission mode. |
| toolApproval | map | Approval status map for host-executed tools. |
| sandboxConfig | object | `workDir`, `bootstrapHash`, `onBootstrap`, `onSession`. |
| telemetry, debug, onLog | | Observability; `telemetry.includeRuntimeContext` allowlists top-level runtime context properties. |

Lifecycle callbacks: `onStart`, `onStepStart`, `onLanguageModelCallStart`, `onLanguageModelCallEnd`, `onToolExecutionStart`, `onToolExecutionEnd`, `onStepEnd`, `onEnd`.

Session methods: `session.destroy()` (stops runtime, discards resumability), `session.detach()` (parks runtime, returns resume state, leaves supplied sandbox running), `session.stop()` (saves resume state then stops runtime), `session.suspendTurn()` (active-turn continuation across a process boundary), `session.hasUnfinishedTurn()`, `session.readHistory({ since? })` returning `{ messages, cursor }`. `createSession` options include `sessionId`, `sandboxSession`, `resumeFrom`, `continueFrom`, `toolsContext`, `runtimeContext`. `agent.getSandboxTemplate()` and `createHarnessSandboxTemplate({ harnesses, sandboxConfig })` (from `@ai-sdk/harness/agent`) build reusable sandbox templates.

## Notes

- Stability: harness packages are experimental.
- Bridge-backed harnesses (Claude Code, Codex) require a real network sandbox such as `@ai-sdk/sandbox-vercel`; host-runtime harnesses such as Pi can run with `@ai-sdk/sandbox-just-bash` because they do not need a sandbox-exposed port.
- Construct the agent at module scope; it holds configuration, not a live session. Live state belongs to `HarnessAgentSession`.
- Callbacks passed to `generate()` / `stream()` run in addition to settings callbacks (settings first). Callback errors are ignored. For built-in tools executed by the runtime, `onToolExecutionStart` / `onToolExecutionEnd` describe the logical lifecycle after the runtime reports the result, delivered before the result is published to the stream.
- `runtimeContext` is excluded from telemetry by default; lifecycle callbacks and results still receive the full context, so avoid storing secrets.
- Structured output requires a schema; schema-less `Output.json()` and adapters that cannot enforce the schema throw `HarnessCapabilityUnsupportedError`. With `stream()`, read `partialOutputStream` and await `result.output`. `output` stays fixed on the agent.
- Messages and history: the session owns native history. With `messages` or a message-array `prompt`, `HarnessAgent` takes the latest user message as fresh input and does not replay prior conversation. A trailing tool message (approval response or client tool result) continues the unfinished turn.
- `readHistory()` is adapter-specific: throws `HarnessCapabilityUnsupportedError` when unsupported and `HarnessHistoryUnavailableError` when the store is unreachable; an empty conversation yields an empty `messages` array.
- `prepareCall` runs for a new prompt after `options` validation; settings are fixed for the whole turn and continuations do not call it again. Changing `model` does not create a new session. The Codex adapter starts a fresh native Codex thread when skills, instructions, or tool catalog change (prior native context does not carry across that boundary). `abortSignal` is passed directly to `generate()` / `stream()`.
- When `sandboxSession` is passed to `createSession`, the caller owns it; `stop()` / `destroy()` do not stop it, and the agent needs no `sandbox` provider in its constructor.
- Resuming: persist the opaque resume state; `HarnessAgent` validates it came from the same adapter. A `sandboxId` on creation names a new sandbox and never looks one up (creating with an existing ID fails); only the resume function reattaches (works for a running sandbox after `detach()` or a stopped one with a restorable snapshot; not after `destroy()`).
- `toolsContext` and `runtimeContext` are not stored in continuation state; rebind them in `createSession` when continuing after a process boundary, otherwise the constructor-level values are used.
- `stopWhen` runs after real harness tool steps; when matched the result finishes while the underlying turn remains unfinished. A terminal text-only step finishes naturally.
- `sandboxConfig.onBootstrap` requires `bootstrapHash`; `workDir` must be relative to the sandbox's default working directory (`'.'` = the default itself). For multiple harnesses, the last adapter wins for duplicate `harnessId` values; pin mutable Git revisions, image tags, and source URLs when relying on cached templates.
- Basic (restricted) sandbox sessions expose only filesystem and process APIs; for bridge-backed harnesses configure `port` and `portEndpoint` on the adapter factory. A full network sandbox session is strongly recommended.
- Adapter-specific settings belong on the adapter factory, e.g. `createCodex({ reasoningEffort: 'high' })`.
- Distance: for Claude Code / Codex CLIs themselves see anthropic-claude-code* / anthropic-agent-sdk / openai-codex; for the in-memory loop agent see openai-agents or `ToolLoopAgent` in this skill.

## Related

- [Harnesses overview](./harnesses-overview.md)
- [Harness tools](./harness-tools.md)
- [Harness skills](./harness-skills.md)
- [Harness adapters](./harness-adapters.md)
- [Workflow utilities](./workflow-utilities.md)
- [Harness UI](./harness-ui.md)
