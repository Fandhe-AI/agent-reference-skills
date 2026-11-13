---
source: https://opencode.ai/docs/build/plugins/server/#models
---

# Models

Read available models and the default selection, and edit the active-provider candidate collection with a transform.

## Signature / Usage

```ts
const models = await ctx.model.list()
const selected = await ctx.model.default()
```

Model transforms edit the entire active-provider candidate collection. Disabled candidates remain editable until all transforms finish; `update` can add a model only under an available provider.

```ts
await ctx.model.transform((editor) => {
  editor.list("anthropic").forEach((model) => {
    editor.update(model.providerID, model.id, (draft) => {
      draft.enabled = draft.capabilities.tools
    })
  })
  editor.default.set("anthropic", "claude-sonnet-5-5")
  editor.remove("anthropic", "legacy-model")
})
```

Callbacks edit raw model overrides. Provider defaults are merged once when OpenCode commits the result; unchanged reads reuse that result. `editor.provider` exposes immutable source definitions, including inactive templates, rather than model-transform output.

```ts
await ctx.model.transform((editor) => {
  const source = editor.provider.get("anthropic")?.models.get("claude-sonnet-5-5")
  if (!source) return
  editor.update("anthropic", source.id, (model) => {
    model.limit.context = Math.min(model.limit.context, source.limit.context)
  })
})

await ctx.model.reload()
```

### Reference

Schema: [`Model.Info`](https://opencode.ai/docs/api/#schema-Model.Info)

```ts
interface ModelDomain extends ModelApi {
  transform(callback: (editor: ModelEditor) => void): Promise<Registration>
  reload(): Promise<void>
}

interface ModelEditor {
  list(providerID?: string): readonly DeepMutable<Model.Info>[]
  get(providerID: string, modelID: string): DeepMutable<Model.Info> | undefined
  update(providerID: string, modelID: string, update: (model: DeepMutable<Model.Info>) => void): void
  remove(providerID: string, modelID: string): void
  readonly default: {
    get(): { providerID: string; modelID: string } | undefined
    set(providerID: string, modelID: string): void
  }
  readonly provider: {
    list(): readonly ProviderRecord[]
    get(providerID: string): ProviderRecord | undefined
  }
}
```

## Notes

- Model IDs in examples are transcribed as written in the official docs.
- Use `ctx.model.reload()` when only an input captured by a model transform changes.

## Related

- [Providers](./providers.md)
- [Transforms](./transforms.md)
