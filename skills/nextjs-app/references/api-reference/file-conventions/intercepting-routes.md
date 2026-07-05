# Intercepting Routes

Loads a route from another part of the application within the current layout, masking the browser URL — useful for advanced routing patterns such as modals.

## Signature / Usage

Intercept the `photo` segment from within the `feed` segment by creating a `(..)photo` directory (e.g. `app/feed/(..)photo/[id]/page.tsx`).

## Options / Props

| Convention | Matches |
|------|-------------|
| `(.)` | Segments on the same level |
| `(..)` | Segments one level above |
| `(..)(..)` | Segments two levels above |
| `(...)` | Segments from the root `app` directory |

## Notes

- The `(..)` convention is based on route segments, not the file system — it does not count `@slot` folders from Parallel Routes as levels.
- Commonly combined with [Parallel Routes](./parallel-routes.md) to build modals that are shareable via URL, preserve context on refresh, and close/reopen correctly on back/forward navigation.
- Direct navigation (shareable URL or page refresh) renders the full route instead of the intercepted modal; only soft (client-side) navigation triggers interception.

## Related

- [Parallel Routes](./parallel-routes.md)
