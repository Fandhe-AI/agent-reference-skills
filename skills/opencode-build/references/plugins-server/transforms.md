---
source: https://opencode.ai/docs/build/plugins/server/#transforms
---

# Transforms

Transforms are synchronous edits to OpenCode's domain state, and each builds on earlier registrations in its domain.

## Signature / Usage

Registry reads such as `ctx.model.list()` reflect every registration so far, including during plugin setup; startup batching only coalesces update notifications and never delays what a read returns. Resource status APIs still report the state of running resources: a registered definition does not mean its connection or other resource work has completed.

Sources contribute providers and immutable model definitions through `ctx.provider.transform`.

```ts title="plugins/models/index.ts"
import { Model, Plugin, Provider } from "@opencode/plugin"

export default Plugin.define({
  id: "company.models",
  async setup(ctx) {
    const providerID = Provider.ID.make("acme")
    const models = [{ ...Model.Info.default(providerID, Model.ID.make("reasoner")), name: "Acme Reasoner" }]
    await ctx.provider.transform((editor) => {
      editor.add({
        info: {
          ...Provider.Info.empty(providerID),
          name: "Acme",
          activation: "enabled",
          package: "@opencode/ai/providers/openai-compatible",
          settings: { baseURL: "http://127.0.0.1:8000/v1" },
        },
        models,
      })
    })

    const available = await ctx.model.list()
  },
})
```

Any registration, removal, or `reload()` marks the registry changed; the next read rebuilds it by replaying every active transform in registration order onto a fresh value. Keep transforms cheap and repeatable. A value you have already read is never modified by later rebuilds.

After provider transforms and availability are resolved, OpenCode materializes the active providers' models and replays every model transform in order. A model policy can inspect the whole candidate collection, including newly refreshed sources.

```ts title="plugins/model-budget/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "company.model-budget",
  async setup(ctx) {
    await ctx.model.transform((editor) => {
      editor
        .list()
        .filter((model) => model.cost.some((tier) => tier.output > 20))
        .forEach((model) => {
          editor.remove(model.providerID, model.id)
        })
    })
  },
})
```

Captured inputs are not watched automatically. Load external data before the synchronous callback, then call `reload()` after those inputs change. Here, `loadFromSource()` returns `{ info: Provider.Info, models: readonly Model.Info[] }` entries.

```ts title="plugins/models/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "company.models",
  async setup(ctx) {
    const source = { providers: await loadFromSource() }

    await ctx.provider.transform((editor) => {
      source.providers.forEach((provider) => editor.add(provider))
    })

    const refresh = async () => {
      source.providers = await loadFromSource()
      await ctx.provider.reload()
    }

    const timer = setInterval(() => void refresh().catch(console.error), 60_000)
    return () => clearInterval(timer)
  },
})
```

Provider changes invalidate the whole active model result, so the output-price policy still filters the refreshed models. Use `ctx.model.reload()` when only an input captured by a model transform changes.

## Notes

- Keep transform callbacks synchronous, cheap, and free of one-time side effects.
- Captured inputs are not watched; call the domain's `reload()` after they change. `reload()` replays transforms; it does not rerun plugin setup.
- The same transform pattern exists on `ctx.agent`, `ctx.provider`, `ctx.model`, `ctx.command`, `ctx.integration`, `ctx.mcp`, `ctx.reference`, `ctx.skill`, `ctx.tool`, `ctx.vcs`, `ctx.websearch`, and `ctx.worktree`.
- OpenCode transforms are distinct from Claude Code hooks and plugins (anthropic-claude-code-extend).

## Related

- [Providers](./providers.md)
- [Models](./models.md)
- [Tool API](./tool-api.md)
- [Lifecycle](./lifecycle.md)
