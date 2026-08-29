---
source: https://tanstack.com/query/latest/docs/framework/react/reference/hydration
---

# hydration

Enables transferring prefetched query states between server and client, or persisting data to storage. Three primary tools: `dehydrate` creates a frozen cache snapshot, `hydrate` restores state into a client, and `HydrationBoundary` merges state into the component tree.

## Signature / Usage

```tsx
// Server: freeze cache
const dehydratedState = dehydrate(queryClient, {
  shouldDehydrateQuery: () => true, // include errors
})
const serialized = JSON.stringify(dehydratedState)

// Client
<HydrationBoundary state={dehydratedState}>
  <App />
</HydrationBoundary>
```

## dehydrate(client, options)

Creates a frozen representation of a `QueryClient` cache for later restoration.

| Name | Type | Description |
|------|------|-------------|
| `client` | `QueryClient` | Required. The QueryClient to freeze |
| `shouldDehydrateQuery` | `(query: Query) => boolean` | Filters which queries to include; defaults to successful queries only |
| `shouldDehydrateMutation` | `(mutation: Mutation) => boolean` | Filters which mutations to include; defaults to paused mutations only |
| `serializeData` | `(data: any) => any` | Transforms data during dehydration |
| `shouldRedactErrors` | `(error: unknown) => boolean` | Redacts errors from the cache; defaults to redacting all |

Returns `DehydratedState` (internal format, not guaranteed stable).

## hydrate(client, dehydratedState, options)

Restores previously dehydrated state into a `QueryClient`.

| Name | Type | Description |
|------|------|-------------|
| `client` | `QueryClient` | Required. Target QueryClient |
| `dehydratedState` | `DehydratedState` | Required. State to restore |
| `defaultOptions` | `{ queries?: QueryOptions; mutations?: MutationOptions }` | Default behavior for hydrated items |
| `deserializeData` | `(data: any) => any` | Transforms data before caching |
| `queryClient` | `QueryClient` | Custom client (otherwise uses context) |

## HydrationBoundary (component)

Wraps an application subtree to merge dehydrated state with the current `QueryClient`.

| Name | Type | Description |
|------|------|-------------|
| `state` | `DehydratedState` | Required. State to merge |
| `options.defaultOptions` | `QueryOptions` | Default query behavior (mutations not supported here) |
| `options.queryClient` | `QueryClient` | Custom client |

## Notes

- Some storage systems (such as the browser Web Storage API) require values to be JSON serializable; non-JSON types like `Error` objects need custom serialization via `serializeData`/`deserializeData`
- Existing queries only get overwritten if incoming data has a newer timestamp; otherwise the cached version persists
- Only queries can be dehydrated with a `HydrationBoundary`; mutations are excluded. New queries are intelligently merged based on update timestamp

## Related

- [QueryClient](./query-client.md)
