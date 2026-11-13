---
source: https://opencode.ai/docs/build/plugins/migrate-v1/
---

# Model Request Hooks

Adjust the system prompt, generation options, and request headers of every agent model request with session hooks.

```ts
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "review-request",
  async setup(ctx) {
    await ctx.session.hook("context", (event) => {
      event.system.push({ type: "text", text: "Focus on correctness." })
      event.options.temperature = 0.2
      event.options.maxTokens = 8_000
    })

    await ctx.session.hook("model.request", (event) => {
      event.headers["x-plugin"] = "review"
    })
  },
})
```

Scope a hook to one provider with the third argument (from the Server page):

```ts
await ctx.session.hook(
  "context",
  (event) => {
    event.options.reasoningEffort = "high"
  },
  { providerID: "openai" },
)
```

## Notes

- `context` runs for the agent loop only. Register `compaction`, `generate`, and `title` separately if the change must apply to every request kind.
- Hook changes affect only the outgoing model call, not persisted history or configuration.
- Hooks run in plugin registration order; later hooks see earlier changes.
- OpenCode hooks are distinct from Claude Code hooks (anthropic-claude-code-extend).
