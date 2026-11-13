---
source: https://opencode.ai/docs/build/plugins/server/#providers
---

# Providers

Read available providers, inspect one provider's metadata, and edit provider settings and source definitions with a transform.

## Signature / Usage

```ts
const providers = await ctx.provider.list()
const provider = await ctx.provider.get({ providerID: "anthropic" })
```

Provider transforms edit provider settings and source definitions. Editor reads include inactive providers and expose immutable definitions; `models.update` edits an owned copy of a source model.

```ts
await ctx.provider.transform((editor) => {
  editor.update("anthropic", (provider) => {
    provider.headers = { ...provider.headers, "x-company": "engineering" }
  })
  editor.models.update("anthropic", "claude-sonnet-5-5", (model) => {
    model.name = "Team Sonnet"
  })
  editor.models.remove("anthropic", "legacy-model")
  editor.remove("legacy-provider")
})
```

Replace a provider's source inventory with `models.set`, then reload after the captured definitions change.

```ts
const source = { models: await loadModels() }
await ctx.provider.transform((editor) => {
  editor.models.set("acme", source.models)
})

source.models = await loadModels()
await ctx.provider.reload()
```

For account-specific discovery, pass the connection used to load the inventory as `sourceConnection`. OpenCode excludes that provider while another connection is selected, until your plugin publishes its refreshed inventory.

```ts
const connection = await ctx.integration.connection.active("acme")
if (!connection) return
const inventory = await loadInventory(connection)
await ctx.provider.transform((editor) => {
  editor.add({ info: inventory.provider, models: inventory.models, sourceConnection: connection })
})
```

### Reference

Schemas: [`Provider.Info`](https://opencode.ai/docs/api/#schema-Provider.Info), [`Model.Info`](https://opencode.ai/docs/api/#schema-Model.Info)

```ts
interface ProviderDomain extends ProviderApi {
  transform(callback: (editor: ProviderEditor) => void): Promise<Registration>
  reload(): Promise<void>
}

interface ProviderRecord {
  readonly provider: Provider.Info
  readonly models: ReadonlyMap<string, Model.Info>
  readonly sourceConnection?: ConnectionInfo
}

interface ProviderEditor {
  list(): readonly ProviderRecord[]
  get(providerID: string): ProviderRecord | undefined
  add(input: { info: Provider.Info; models: readonly Model.Info[]; sourceConnection?: ConnectionInfo }): void
  update(providerID: string, update: (provider: DeepMutable<Provider.Info>) => void): void
  remove(providerID: string): void
  readonly models: {
    set(providerID: string, models: readonly Model.Info[]): void
    update(providerID: string, modelID: string, update: (model: DeepMutable<Model.Info>) => void): void
    remove(providerID: string, modelID: string): void
  }
}
```

## Notes

- Model IDs in examples are transcribed as written in the official docs.
- Provider transforms contribute source definitions and provider settings; model restrictions and overrides belong in model transforms.

## Related

- [Models](./models.md)
- [Transforms](./transforms.md)
- [Integrations](./integrations.md)
