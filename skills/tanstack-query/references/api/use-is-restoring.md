---
source: https://tanstack.com/query/latest/docs/framework/react/reference/functions/useIsRestoring
---

# useIsRestoring (+ IsRestoringProvider)

Hook that reports whether a persisted client is currently being restored. Used alongside `PersistQueryClientProvider`. `useQuery` and friends also check this internally to avoid race conditions between the restore and mounting queries.

## Signature / Usage

```ts
function useIsRestoring(): boolean;

const IsRestoringProvider: Provider<boolean> = IsRestoringContext.Provider;
```

## Notes

- Returns `true` while a persisted client is being restored, `false` otherwise.
- `IsRestoringProvider` is the Provider that `PersistQueryClientProvider` uses to signal the restoring state, read by `useIsRestoring`.
- Defined in `packages/react-query/src/IsRestoringProvider.ts`.

## Related

- [useQuery](./use-query.md)
- [useQueryClient](./use-query-client.md)
