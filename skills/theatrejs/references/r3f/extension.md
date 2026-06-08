# extension

The r3f extension object that registers React Three Fiber support with Theatre Studio. Must be passed to `studio.extend()` to enable the snapshot editor and r3f-specific tooling in development.

## Signature / Usage

```tsx
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

if (import.meta.env.DEV) {
  studio.initialize()
  studio.extend(extension)
}
```

## Notes

- Import path is `@theatre/r3f/dist/extension` (separate entry point from the main `@theatre/r3f`)
- Should only be called in development; guard with an env check to avoid bundling Studio in production
- Enables the visual snapshot editor panel in Theatre Studio for r3f scenes

## Related

- [SheetProvider.md](./SheetProvider.md)
- [refreshSnapshot.md](./refreshSnapshot.md)
