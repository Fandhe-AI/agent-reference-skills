---
source: https://tanstack.com/router/latest/docs/framework/react/guide/scroll-restoration
---

# Scroll Restoration

Built-in hash/top-of-page scrolling plus an opt-in scroll restoration system that caches and restores scroll positions (including nested scrollable areas) across navigations.

## Signature / Usage

```tsx
const router = createRouter({
  scrollRestoration: true,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scrollRestoration` | `boolean` | Enables monitoring/caching/restoring scroll positions on navigation |
| `scrollToTopSelectors` | `(string \| (() => Element \| null \| undefined))[]` | Additional elements (besides `window`) to scroll-to-top on navigation |
| `getScrollRestorationKey` | `(location) => string` | Custom cache key per scrollable-area state; default is `location.state.__TSR_key` |
| `scrollRestorationBehavior` | `'smooth' \| 'instant' \| 'auto'` | Scroll transition behavior between pages |
| `resetScroll` (Link/navigate/redirect option) | `boolean` | Set `false` to prevent scroll restoration/reset for that navigation |
| `useElementScrollRestoration({ id \| getElement })` | hook | Manual scroll restoration entry lookup, e.g. for virtualized lists |
| `data-scroll-restoration-id` | DOM attribute | Marks an element for the scroll restoration watcher, paired with `useElementScrollRestoration({ id })` |

## Notes

- `<ScrollRestoration />` component still works but is deprecated in favor of the `scrollRestoration: true` router option.
- Default key changed from `location.state.key` to `location.state.__TSR_key` as of `v1.121.34`; the old field remains for compatibility but will be removed in the next major version.
- `scrollToTopSelectors` targets are handled in addition to `window`, which cannot be disabled.
- Manual scroll restoration (via `useElementScrollRestoration`) is the documented approach for virtualized lists (e.g. with TanStack Virtual), using `scrollEntry?.scrollY` as `initialOffset`.

## Related

- [navigation.md](./navigation.md)
- [history-types.md](./history-types.md)
