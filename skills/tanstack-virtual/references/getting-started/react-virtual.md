---
source: https://tanstack.com/virtual/latest/docs/framework/react/react-virtual
---

# React Virtual

The `@tanstack/react-virtual` adapter wraps the virtual-core logic for React, exposing `useVirtualizer` and `useWindowVirtualizer` hooks.

## Signature / Usage

```tsx
import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual'

function useVirtualizer<TScrollElement, TItemElement = unknown>(
  options: PartialKeys<
    ReactVirtualizerOptions<TScrollElement, TItemElement>,
    'observeElementRect' | 'observeElementOffset' | 'scrollToFn'
  >,
): Virtualizer<TScrollElement, TItemElement>

function useWindowVirtualizer<TItemElement = unknown>(
  options: PartialKeys<
    ReactVirtualizerOptions<Window, TItemElement>,
    | 'getScrollElement'
    | 'observeElementRect'
    | 'observeElementOffset'
    | 'scrollToFn'
  >,
): Virtualizer<Window, TItemElement>

const virtualizer = useVirtualizer({
  count: 10000,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
  directDomUpdates: true,
  directDomUpdatesMode: 'position',
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | — | Number of items in the list |
| `getScrollElement` | `() => Element` | — | Returns the scroll container element (omitted for `useWindowVirtualizer`, which uses `window`) |
| `estimateSize` | `(index: number) => number` | — | Estimated size for each item before it is measured |
| `useFlushSync` | `boolean` | `true` | Whether React's `flushSync` is used to force synchronous rendering during scroll updates |
| `directDomUpdates` | `boolean` | `false` | Skips React re-renders for scroll-only updates by writing position/size directly to the DOM |
| `directDomUpdatesMode` | `'transform' \| 'position'` | `'transform'` | `'transform'` promotes items to their own compositor layer via `translate3d`; `'position'` sets `top`/`left` directly |

## Notes

- `useVirtualizer` targets an HTML scroll container; `useWindowVirtualizer` uses the browser window itself as the scroll element.
- Disable `useFlushSync` for React 19 compatibility or when rapid scrolling causes performance issues on lower-end devices.
- `directDomUpdates: true` requires items to be positioned with `position: absolute` and the container to use `virtualizer.containerRef`.
- `directDomUpdates` and `directDomUpdatesMode` are intended to be set once at mount — toggling them at runtime can leave stale inline styles on items and the container.

## Related

- [Introduction](./introduction.md)
- [Installation](./installation.md)
