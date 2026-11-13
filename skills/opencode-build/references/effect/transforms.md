---
source: https://opencode.ai/docs/build/plugins/effect/#transforms
---

# Transforms

Transforms synchronously edit state through an editor. OpenCode applies transforms in registration order within each
domain. Sources contribute providers and immutable model definitions first; model transforms then edit the active
providers' candidates. Yielding the registration keeps it in the plugin scope.

## Signature / Usage

```ts title="plugins/models-effect/index.ts"
import { Model, Plugin, Provider } from "@opencode/plugin/effect"
import { Effect } from "effect"

export default Plugin.define({
  id: "company.models",
  effect: (ctx) =>
    Effect.gen(function* () {
      const providerID = Provider.ID.make("acme")
      const models = [{ ...Model.Info.default(providerID, Model.ID.make("reasoner")), name: "Acme Reasoner" }]
      yield* ctx.provider.transform((editor) => {
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
    }),
})
```

A model transform can enforce policy across the complete active-provider candidate collection.

```ts title="plugins/model-budget-effect/index.ts"
effect: (ctx) =>
  Effect.gen(function* () {
    yield* ctx.model.transform((editor) => {
      editor
        .list()
        .filter((model) => model.cost.some((tier) => tier.output > 20))
        .forEach((model) => {
          editor.remove(model.providerID, model.id)
        })
    })
  }),
```

Call `reload` when external state used by a transform changes. Here, `loadFromSource()` returns
`{ info: Provider.Info, models: readonly Model.Info[] }` entries; provider reloads also invalidate the entire model result.

```ts title="plugins/models-effect/index.ts"
effect: (ctx) =>
  Effect.gen(function* () {
    const provider = ctx.provider
    const source = { providers: yield* loadFromSource() }

    yield* provider.transform((editor) => {
      source.providers.forEach((provider) => editor.add(provider))
    })

    yield* Effect.repeat(
      Effect.gen(function* () {
        source.providers = yield* loadFromSource()
        yield* provider.reload()
      }),
      { schedule: Schedule.spaced("1 minute") },
    ).pipe(Effect.forkScoped)
  }),
```

## Notes

- The reload loop: `Effect.repeat` ends on the first failure, and a failed `forkScoped` fiber reports to no one, so add `Effect.retry` or `Effect.catch` inside the loop if it must keep running. The snippet omits `import { Schedule } from "effect"`.
- Effect here is the `effect` npm package (v4), unrelated to React's `useEffect` or similar hooks.
- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [overview.md](./overview.md)
- [lifecycle.md](./lifecycle.md)
- [api.md](./api.md)
