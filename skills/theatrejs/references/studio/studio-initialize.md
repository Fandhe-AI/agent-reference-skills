# studio.initialize

Sets up the Theatre.js Studio UI once per application. Subsequent calls are silently ignored.

## Signature / Usage

```ts
import studio from '@theatre/studio'

studio.initialize()
```

Call `studio.initialize()` before anything else in your app's entry point. The studio UI only appears when this is called, giving you control over when the editing interface is available (e.g., development only).

```ts
// Conditionally show Studio in development
if (process.env.NODE_ENV === 'development') {
  studio.initialize()
}
```

## Notes

- Must be called before `studio.extend()` to ensure extensions are registered before the UI mounts
- Calling it multiple times has no effect; the studio is initialized only once
- The studio UI can be toggled with `Alt/Option + \` after initialization

## Related

- [studio.extend](./studio-extend.md)
- [Studio UI](./studio-ui.md)
