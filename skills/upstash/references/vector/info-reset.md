# info / reset

`info` retrieves index statistics. `reset` clears all vectors from a namespace or the entire index.

## Signature / Usage

```ts
// Index statistics
const stats = await index.info();
// {
//   vectorCount: 17,
//   pendingVectorCount: 0,
//   indexSize: 4096,
//   dimension: 1536,
//   similarityFunction: "COSINE",
//   namespaces: {
//     "": { vectorCount: 10, pendingVectorCount: 0 },
//     "my-namespace": { vectorCount: 7, pendingVectorCount: 0 },
//   }
// }

// Reset default namespace
await index.reset();

// Reset a specific namespace
await index.reset({ namespace: "my-namespace" });

// Reset all namespaces
await index.reset({ all: true });
```

## Options / Props

**`info()` response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `vectorCount` | `number` | Total vectors ready for querying |
| `pendingVectorCount` | `number` | Vectors still being indexed |
| `indexSize` | `number` | Index size in bytes |
| `dimension` | `number` | Vector dimensionality |
| `similarityFunction` | `string` | Distance metric (`COSINE`, `EUCLIDEAN`, `DOT_PRODUCT`) |
| `namespaces` | `Record<string, { vectorCount, pendingVectorCount }>` | Per-namespace statistics |

**`reset(options)` parameters:**

| Name | Type | Description |
|------|------|-------------|
| `namespace` | `string` | Clear a specific namespace. Pass `""` for default namespace |
| `all` | `true` | Clear all namespaces simultaneously |

**`reset()` response:** Returns `'Successful'` string.

## Notes

- REST `GET /info` also returns `indexType` (`DENSE`, `SPARSE` or `HYBRID`) and, per index kind, `denseIndex` / `sparseIndex` configuration objects; `dimension` and `similarityFunction` describe the dense component. Info is updated eventually, so changes may take some time to show
- `pendingVectorCount` reflects vectors that have been upserted but are not yet available for querying (eventual consistency)
- `reset` is irreversible — all vectors and metadata in the targeted scope are permanently deleted
- Pass no arguments to `reset()` to clear the default namespace only
- Source: https://upstash.com/docs/vector/api/endpoints/info (fetched 2026-11-14; no version pin on the site)

## Related

- [namespace.md](./namespace.md)
- [ts-sdk-overview.md](./ts-sdk-overview.md)
