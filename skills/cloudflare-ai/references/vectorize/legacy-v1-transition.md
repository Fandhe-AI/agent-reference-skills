---
source: https://developers.cloudflare.com/vectorize/reference/transition-vectorize-legacy/
---

# Transition legacy Vectorize indexes

Legacy (V1) indexes are on a deprecation path as of Aug 15, 2024; V2 indexes are larger, faster, and use asynchronous mutations.

## Signature / Usage

```typescript
export interface Env {
	// This makes your vector index methods available on env.VECTORIZE.*
	// For example, env.VECTORIZE.insert() or query()
	VECTORIZE: Vectorize;
}
```

For legacy V1 indexes use the `VectorizeIndex` interface:

```typescript
export interface Env {
	// This makes your vector index methods available on env.VECTORIZE.*
	// For example, env.VECTORIZE.insert() or query()
	VECTORIZE: VectorizeIndex;
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Legacy index test 1 | criterion | — | Created with Wrangler lower than `v3.71.0`. |
| Legacy index test 2 | criterion | — | Created with the `--deprecated-v1` flag. |
| Legacy index test 3 | criterion | — | Created with the legacy REST API. |
| `--deprecated-v1` | flag | — | Needed for Wrangler to create, get, list, delete legacy indexes and insert vectors. |

## Notes

- Legacy index creation was to stop in December 2024; other operations remain functional.
- There is no automatic migration from V1 to V2 yet; the page says to watch for it.
- Changes in V2: asynchronous mutations (inserts, deletes, metadata index create/delete take a few seconds and return a `mutationId`); metadata filter fields must be declared before inserting vectors; `topK` up to 100; `returnMetadata` is `all` / `indexed` / `none` strings (boolean in V1); more Wrangler capabilities (Wrangler > `v3.71.0`).
- Use the Info command to see the last processed mutation identifier and timestamp.
- Existing Workers and REST clients against legacy indexes continue to function.

## Related

- [Create indexes](./create-indexes.md)
- [Binding API](./binding-api.md)
- [Changelog](./changelog.md)
- [Limits](./limits.md)
