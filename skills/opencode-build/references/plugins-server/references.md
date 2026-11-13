---
source: https://opencode.ai/docs/build/plugins/server/#references
---

# References

Read the references available at a location and register local and Git references with a transform.

## Signature / Usage

```ts
const references = await ctx.reference.list()
```

Register a transform to inspect, add, or remove local and Git references. `get(name)` returns the current configured source, or `undefined` when the name is absent.

```ts
await ctx.reference.transform((editor) => {
  const references = editor.list()
  editor.add("handbook", { type: "local", path: "/workspace/docs/handbook" })
  editor.add("standards", { type: "git", repository: "https://github.com/acme/standards", branch: "main" })
  const handbook = editor.get("handbook")
  editor.remove("legacy")
})
```

Reload references after external state used by a transform changes.

```ts
await ctx.reference.reload()
```

### Reference

Schemas: [`Reference.Info`](https://opencode.ai/docs/api/#schema-Reference.Info), [`Reference.LocalSource`](https://opencode.ai/docs/api/#schema-Reference.LocalSource), [`Reference.GitSource`](https://opencode.ai/docs/api/#schema-Reference.GitSource)

```ts
interface ReferenceContext {
  list(input?: ReferenceListInput, requestOptions?: RequestOptions): Promise<ReferenceListOutput>
  transform(callback: (editor: ReferenceEditor) => void): Promise<Registration>
  reload(): Promise<void>
}

interface ReferenceEditor {
  list(): readonly (readonly [string, ReferenceLocalSource | ReferenceGitSource])[]
  get(name: string): ReferenceLocalSource | ReferenceGitSource | undefined
  add(name: string, source: ReferenceLocalSource | ReferenceGitSource): void
  remove(name: string): void
}
```

## Related

- [Transforms](./transforms.md)
- [Skills](./skills.md)
