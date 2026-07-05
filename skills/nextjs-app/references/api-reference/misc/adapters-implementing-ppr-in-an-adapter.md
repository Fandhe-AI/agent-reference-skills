# Implementing PPR in an Adapter

Implement Partial Prerendering (PPR) support in an adapter by seeding a static shell and postponed state at build time, then resuming rendering at request time.

## Signature / Usage

```ts filename="my-adapter.ts"
import { readFile } from 'node:fs/promises'

async function seedPprEntries(outputs: AdapterOutputs) {
  for (const prerender of outputs.prerenders) {
    const fallback = prerender.fallback
    if (!fallback?.filePath || !fallback.postponedState) continue

    const shell = await readFile(fallback.filePath, 'utf8')
    await platformCache.set(prerender.pathname, {
      shell,
      postponedState: fallback.postponedState,
    })
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| outputs.prerenders\[].fallback.filePath | string | Path to the generated fallback shell (HTML, JSON, or RSC). |
| outputs.prerenders\[].fallback.postponedState | string | Serialized postponed state used to resume rendering. |
| requestMeta.onCacheEntryV2 | `(cacheEntry, meta) => Promise<boolean> \| boolean` | Called when a response cache entry is looked up or generated; return `true` only if the adapter already wrote the response itself. |

## Notes

- At request time, stream one response that concatenates the cached shell followed by the resumed render stream (produced by invoking `handler` with the postponed state).
- `requestMeta.onCacheEntry` still works but is deprecated; prefer `requestMeta.onCacheEntryV2`.
- If executed on the Edge, dynamic-code-evaluation statements not reachable at build time will throw a runtime error.

## Related

- [Runtime Integration](./adapters-runtime-integration.md)
- [Output Types](./adapters-output-types.md)
