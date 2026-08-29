---
source: https://tanstack.com/router/latest/docs/api/router/LinkOptionsType
---

# LinkOptions

Options accepted by the `Link` component. Extends `NavigateOptions` with anchor-specific behavior.

## Signature / Usage

```tsx
<Link to="/posts/$postId" params={{ postId: '1' }} preload="intent" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `target` | `HTMLAnchorElement['target']` | Standard anchor `target` attribute |
| `activeOptions` | `ActiveOptions` | Determines whether the link is considered active |
| `preload` | `false \| 'intent' \| 'viewport' \| 'render'` | Preloading strategy for the linked route |
| `preloadDelay` | `number` | Delay in ms before hover/focus/viewport preloading triggers |
| `disabled` | `boolean` | Renders the link without an `href` when `true` |

## Related

- [Link](./link.md)
- [NavigateOptions](./navigate-options.md)
