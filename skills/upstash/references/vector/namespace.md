# Namespace

Isolated partitions of a vector index. Each namespace acts as an independent subset; all read/write operations target a single namespace. Every index has a default namespace (`""`).

## Signature / Usage

```ts
import { Index } from "@upstash/vector";
const index = new Index();

// Access a named namespace
const ns = index.namespace("my-namespace");
await ns.upsert({ id: "1", vector: [0.1, 0.2, 0.3] });
await ns.query({ vector: [0.1, 0.2, 0.3], topK: 5 });
await ns.fetch(["1"], { includeMetadata: true });
await ns.delete(["1"]);
await ns.range({ cursor: 0, limit: 100 });

// List all namespaces
const namespaces = await index.listNamespaces();
// ["", "my-namespace", "other-namespace"]

// Delete a namespace
await index.deleteNamespace("my-namespace");

// Reset a specific namespace (clear all vectors)
await index.reset({ namespace: "my-namespace" });

// Reset all namespaces
await index.reset({ all: true });
```

## Options / Props

**`index.namespace(name)`:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Namespace name. Use `""` for the default namespace |

Returns a namespace-scoped client exposing the same methods as `Index`: `upsert`, `query`, `fetch`, `delete`, `range`, `reset`, `resumableQuery`.

**`index.deleteNamespace(name)`:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Name of the namespace to delete |

**`index.listNamespaces()`:** Returns `string[]` of all active namespace names.

**`index.reset(options)`:**

| Name | Type | Description |
|------|------|-------------|
| `namespace` | `string` | Clear a single namespace (pass `""` for default) |
| `all` | `true` | Clear all namespaces simultaneously |

## Notes

- Namespaces are created implicitly on first upsert — no explicit create step
- Deleting a namespace permanently removes all its vectors
- Pre-namespace indexes (created before the feature existed) continue to work against the default namespace automatically
- In Python SDK: pass `namespace="ns"` as a keyword argument directly to each method (e.g., `index.query(..., namespace="ns")`)

## Related

- [upsert.md](./upsert.md)
- [query.md](./query.md)
- [ts-sdk-overview.md](./ts-sdk-overview.md)
- [python-sdk.md](./python-sdk.md)
