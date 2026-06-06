# delete

Removes vectors from an index by ID, ID prefix, or metadata filter.

## Signature / Usage

```ts
// Delete by ID array
const result = await index.delete(["id-1", "id-2"]);
// { deleted: 2 }

// Delete single ID
const result = await index.delete("id-1");
// { deleted: 1 }

// Delete by ID prefix
const result = await index.delete({ prefix: "article_" });
// { deleted: 3 }

// Delete by metadata filter
const result = await index.delete({ filter: "age > 30" });
// { deleted: 3 }

// With namespace
const result = await index.delete(["id-1"], { namespace: "my-namespace" });
```

## Options / Props

**First argument:**

| Name | Type | Description |
|------|------|-------------|
| `ids` | `string \| number \| (string \| number)[]` | One or more vector IDs to delete |
| `prefix` | `string` | Delete all vectors whose ID starts with this prefix |
| `filter` | `string` | Delete vectors matching this metadata filter expression |

Note: `ids`, `prefix`, and `filter` are mutually exclusive within a `DeletePayload` object.

**Options (second argument):**

| Name | Type | Description |
|------|------|-------------|
| `namespace` | `string` | Target namespace. Omit to use the default namespace |

**Response:**

| Name | Type | Description |
|------|------|-------------|
| `deleted` | `number` | Number of vectors successfully deleted |

## Notes

- Filter-based deletion performs a full index scan (O(N)) — can be slow on large indexes
- Deleting a non-existent ID does not error; `deleted` count reflects only actual removals

## Related

- [upsert.md](./upsert.md)
- [fetch.md](./fetch.md)
- [filtering.md](./filtering.md)
- [namespace.md](./namespace.md)
