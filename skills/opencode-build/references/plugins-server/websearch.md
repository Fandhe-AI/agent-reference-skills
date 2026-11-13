---
source: https://opencode.ai/docs/build/plugins/server/#websearch
---

# Websearch

List websearch providers, run a query through the selected provider, and register providers with a transform.

## Signature / Usage

```ts
const providers = await ctx.websearch.providers()
const results = await ctx.websearch.query({ query: "OpenCode plugins", providerID: "internal" })
```

Register a provider and select the default provider with a transform.

```ts
await ctx.websearch.transform((editor) => {
  editor.add({
    id: "internal",
    name: "Internal search",
    execute: async ({ query }, { signal }) => {
      const response = await fetch(`https://search.example.com?q=${encodeURIComponent(query)}`, { signal })
      const result = (await response.json()) as { url: string; title: string; content: string }
      return [{ url: result.url, title: result.title, content: result.content, time: {} }]
    },
  })
  editor.default.set("internal")
})
```

Disable websearch by selecting `false`, or reload providers after external state changes.

```ts
await ctx.websearch.transform((editor) => editor.default.set(false))
await ctx.websearch.reload()
```

### Reference

Schemas: [`WebSearch.Provider`](https://opencode.ai/docs/api/#schema-WebSearch.Provider), [`WebSearch.Result`](https://opencode.ai/docs/api/#schema-WebSearch.Result)

```ts
interface WebSearchContext {
  providers(input?: WebsearchProvidersInput, requestOptions?: RequestOptions): Promise<WebsearchProvidersOutput>
  query(input: WebsearchQueryInput, requestOptions?: RequestOptions): Promise<WebsearchQueryOutput>
  transform(callback: (editor: WebSearchEditor) => void): Promise<Registration>
  reload(): Promise<void>
}

interface WebSearchEditor {
  add(provider: WebSearchDefinition): void
  default: {
    get(): string | false | undefined
    set(providerID: string | false): void
  }
}
```

## Related

- [Transforms](./transforms.md)
