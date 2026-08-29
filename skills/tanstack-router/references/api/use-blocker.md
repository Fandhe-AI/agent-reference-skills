---
source: https://tanstack.com/router/latest/docs/api/router/useBlockerHook
---

# useBlocker

Blocks navigation when a condition is met. Currently experimental.

## Signature / Usage

```tsx
import { useBlocker } from '@tanstack/react-router'

function MyComponent() {
  const [formIsDirty, setFormIsDirty] = useState(false)

  useBlocker({
    shouldBlockFn: () => formIsDirty,
  })
}
```

```ts
useBlocker(options: UseBlockerOptions): UseBlockerReturn | void
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shouldBlockFn` | `() => boolean \| Promise<boolean>` | — | Returns whether to block navigation (required) |
| `disabled` | `boolean` | `false` | Disables the blocker entirely |
| `enableBeforeUnload` | `boolean \| function` | `true` | Controls blocking of the browser `beforeUnload` event |
| `withResolver` | `boolean` | `false` | Enables manual navigation control via the returned object |

## Notes

- When `withResolver: true`, returns `{ status: 'blocked' | 'idle', proceed(), reset(), next, current, action }`.
- When `withResolver: false`, returns `void`.
- Marked experimental.

## Related

- [useNavigate](./use-navigate.md)
