---
source: https://tanstack.com/router/latest/docs/api/router/NavigateOptionsType
---

# NavigateOptions

Options accepted by `navigate`, `useNavigate`, and the `Navigate` component. Extends `ToOptions` (`to`, `params`, `search`, `hash`, `from`).

## Signature / Usage

```tsx
navigate({ to: '/posts/$postId', params: { postId: '1' }, replace: true })
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `replace` | `boolean` | — | Uses `history.replace` instead of `history.push` |
| `resetScroll` | `boolean` | `true` | Resets scroll to `(0, 0)` after navigation |
| `hashScrollIntoView` | `boolean \| ScrollIntoViewOptions` | `true` | Scrolls the element matching the hash into view |
| `viewTransition` | `boolean \| ViewTransitionOptions` | — | Enables `document.startViewTransition()` for the navigation |
| `ignoreBlocker` | `boolean` | — | Bypasses navigation blockers when `true` |
| `reloadDocument` | `boolean` | — | Performs a full page load instead of SPA navigation |
| `href` | `string` | — | Fully built href for external navigation targets |

## Related

- [useNavigate](./use-navigate.md)
- [LinkOptions](./link-options.md)
