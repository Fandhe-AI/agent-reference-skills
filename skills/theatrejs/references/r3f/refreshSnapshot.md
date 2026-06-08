# refreshSnapshot / RefreshSnapshot

Utilities that refresh the snapshot editor state from code. Use when dynamically loaded scene content (e.g., models loaded via `Suspense`) needs to be reflected in Theatre Studio's snapshot.

## Signature / Usage

```tsx
import { refreshSnapshot, RefreshSnapshot } from '@theatre/r3f'

// Function — call imperatively after dynamic content loads
refreshSnapshot()

// Component — triggers refresh on mount; pair with Suspense
<Suspense fallback={<Fallback />}>
  <RefreshSnapshot />
  <MyModel />
</Suspense>
```

## Notes

- `refreshSnapshot()` is a plain function; call it after any async scene update
- `RefreshSnapshot` is a React component with no props that calls `refreshSnapshot()` on mount
- Both are no-ops in production (when Theatre Studio is not initialized)
- Primarily relevant during development with `@theatre/studio` active

## Related

- [SheetProvider.md](./SheetProvider.md)
- [extension.md](./extension.md)
