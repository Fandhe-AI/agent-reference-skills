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
- Since 3.14.13, the synchronous notify raised from `measureElement` (a ref callback, i.e. during commit) skips `flushSync`; notifies from every other path (ResizeObserver re-measures, scroll adjustments) still flush synchronously.
- Instance property `virtualizer.containerRef: (node: HTMLElement | null) => void` is the ref for the inner size container; required for `directDomUpdates: true` to write item positions and the container size.
- `directDomUpdates: true` requires items to be positioned with `position: absolute` and the container to use `virtualizer.containerRef`.
- `directDomUpdates` requirements: item elements must not set the main-axis position in their style (`top` / `left` in `'position'` mode, `transform` in `'transform'` mode); in `'transform'` mode items must also be anchored with `top: 0` / `left: 0`; the inner size container must not set `height` / `width`.
- For multi-lane layouts (grids / masonry) with `directDomUpdates`, the cross-axis position (e.g. `left: ${(item.lane * 100) / lanes}%`) is stable per item and must still be set in JSX; only the main axis is automated.
- If `containerRef` is omitted, the virtualizer makes no direct DOM writes (neither item positions nor the container size). The caller positions items and sizes the container (e.g. in `onChange`) while still skipping re-renders.
- Since 3.14.14, `directDomUpdates` rows that mount without the owner re-rendering are positioned as they register through `measureElement`.
- `directDomUpdates` and `directDomUpdatesMode` are intended to be set once at mount — toggling them at runtime can leave stale inline styles on items and the container.

## Related

- [Introduction](./introduction.md)
- [Installation](./installation.md)
