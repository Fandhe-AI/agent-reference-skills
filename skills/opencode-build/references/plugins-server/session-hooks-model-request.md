---
source: https://opencode.ai/docs/build/plugins/server/#hooks
---

# Session Hooks: Model Requests and Provider Options

Modify assembled system instructions, messages, tools, or request options immediately before model dispatch (`context`, `compaction`, `generate`, `title`), and scope provider-specific options.

## Signature / Usage

### Model requests

Each kind of request a session issues has its own hook, so a plugin can treat the agent loop and auxiliary requests differently:

- `context` runs for the agent loop, including tool-driven continuations.
- `compaction` runs for checkpoint summaries. `messages` is the transcript being summarized; OpenCode appends its summary prompt after hooks run. Set `result` to record the compaction yourself and skip the model call; it takes the same fields as a completed compaction message.
- `generate` runs for transient `ctx.session.generate` calls.
- `title` runs for title generation. It has no `agent` or `tools`. Set `result` to supply the title yourself.

```ts
await ctx.session.hook("context", (event) => {
  event.system.push({ type: "text", text: "Keep the review focused on correctness." })
  delete event.tools.write
  event.options.temperature = 0.2
  event.options.maxTokens = 8_000
})

await ctx.session.hook("compaction", async (event) => {
  event.result = { summary: await summarize(event.messages) }
})
```

Changes affect only the outgoing model call, not persisted history or configuration. A hook that should apply to every request must register for each kind.

Messages in the `context`, `compaction`, and `generate` hooks carry their stored message's `metadata`, read-only (for example, what a `prompt` hook set). It is not sent to the model.

The `system` part that holds OpenCode's instructions also lists each source in `metadata.experimental.instructions` as `{ key, text }`, such as `core/date` or `core/environment`, so a hook can tell the sources apart. The list is a copy: editing the part's `text` does not update it. This is experimental and may change.

Request overrides follow these rules:

- `options` starts empty for each model call; it does not contain resolved model settings.
- Typed keys are generation settings; any other key is passed to the selected protocol as a provider option.
- Hooks run in registration order and see overrides made by earlier hooks.
- Request overrides take precedence over model defaults, which take precedence over route defaults.
- Provider option objects merge recursively; arrays and scalar values replace earlier values.
- Deleting an override or setting it to `undefined` falls back to configured defaults rather than removing them.
- Raw HTTP body overlays apply after protocol lowering and can override the resulting fields.

### Provider options

Provider options use the selected protocol's semantic option names, not raw HTTP body fields. Scope provider-specific settings to the matching provider. For example, OpenAI Responses uses `reasoningEffort`:

```ts
await ctx.session.hook(
  "context",
  (event) => {
    event.options.reasoningEffort = "high"
  },
  { providerID: "openai" },
)
```

Generation options depend on the selected protocol and model:

- `maxTokens` is the semantic output-token limit.
- Gemini supports `topK`; OpenAI Responses does not expose it.

### Reference

```ts
interface SessionRequestHook {
  readonly sessionID: string
  readonly model: { providerID: string; id: string; variant?: string }
  system: SystemPart[]
  messages: Message[]
  options: {
    maxTokens?: number
    temperature?: number
    topP?: number
    topK?: number
    frequencyPenalty?: number
    presencePenalty?: number
    seed?: number
    stop?: string[]
  } & Record<string, unknown>
}

interface SessionContextHook extends SessionRequestHook {
  readonly agent: string
  tools: Record<string, { description: string; input: JsonSchema }>
}

interface SessionCompactionResult {
  summary: string
  native?: Record<string, unknown>
  metadata?: Record<string, unknown>
  tokens?: TokenUsage
}
```

## Options / Props

`SessionRequestHook.options` typed keys:

| Name | Type | Description |
| --- | --- | --- |
| `maxTokens` | `number` | Semantic output-token limit. |
| `temperature` | `number` | — |
| `topP` | `number` | — |
| `topK` | `number` | Gemini supports `topK`; OpenAI Responses does not expose it. |
| `frequencyPenalty` | `number` | — |
| `presencePenalty` | `number` | — |
| `seed` | `number` | — |
| `stop` | `string[]` | — |

## Notes

- V1 `chat.params`, `experimental.chat.system.transform`, `experimental.chat.messages.transform`, and `experimental.session.compacting` migrate to `context` / `compaction`.
- OpenCode plugin hooks are distinct from Claude Code hooks (anthropic-claude-code-extend).

## Related

- [Hooks overview](./hooks-overview.md)
- [Session hooks: model resolve and native HTTP](./session-hooks-model.md)
- [Migrate plugins from V1](./migrate-v1.md)
