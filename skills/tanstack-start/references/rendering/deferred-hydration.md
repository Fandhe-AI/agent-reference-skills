---
source: https://tanstack.com/start/latest/docs/framework/react/guide/deferred-hydration
---

# Deferred Hydration

> Experimental. Lets you mark parts of a page as "not interactive yet" so TanStack Start delays hydrating that boundary (and, by default, code-splits it into a separate chunk) until a strategy condition fires.

## Signature / Usage

```tsx
import { Hydrate } from '@tanstack/react-start'
import { visible } from '@tanstack/react-start/hydration'

export function ProductPage() {
  return (
    <Hydrate when={visible({ rootMargin: '400px' })}>
      <Reviews />
    </Hydrate>
  )
}
```

## Options / Props

`Hydrate` props:

| Name | Type | Description |
|------|------|-------------|
| `when` | `HydrationStrategy \| () => HydrationStrategy` | Required. Controls when the boundary hydrates. Function form is client-only and synchronous. |
| `prefetch` | `HydrationPrefetchStrategy \| HydrationPrefetchFunction` | Preloads the split child chunk (strategy form) or preloads chunks/data/resources (function form, works with `split={false}`). |
| `split` | `boolean` | Defaults to `true`. `split={false}` disables compiler extraction and only defers hydration work. |
| `fallback` | `ReactNode` | Client-only loading UI for boundaries that mount after the app has already hydrated. |
| `onHydrated` | `() => void` | Fires once after the boundary has hydrated on the client. |

Strategies (from `@tanstack/react-start/hydration`):

| Strategy | Behavior | Options |
|------|------|-------------|
| `load()` | Hydrates as soon as the app hydrates. | — |
| `idle()` | Hydrates in `requestIdleCallback`, or after `timeout`. | `{ timeout?: number }`, default `2000` |
| `visible()` | Hydrates when the boundary marker enters the viewport. | `{ rootMargin?: string; threshold?: number \| Array<number> }`, default margin `600px` |
| `media()` | Hydrates when the media query matches. | Query string, e.g. `media('(min-width: 800px)')` |
| `interaction()` | Hydrates on configured interaction intent events. | `{ events?: event \| readonly event[] }`, default `pointerenter, focusin, pointerdown, click` |
| `condition()` | Hydrates once the condition is truthy. | Boolean or boolean-returning function |
| `never()` | Never hydrates the initial server-rendered boundary. | Cannot be used as a prefetch strategy |

## Notes

- Only preserves server HTML present in the initial document; boundaries that first mount after client navigation render normally (no server HTML to preserve).
- React may hydrate a deferred boundary earlier than its strategy allows if surrounding state/props/context updates require reconciling inside it (correctness over the performance hint).
- Nested boundaries hydrate parent-first; non-interaction child strategies cannot run while an ancestor is still dehydrated. Interaction intent can resolve an unresolved ancestor chain.
- Compiler-backed splitting requires rendering a statically imported `Hydrate` tag directly (import renames are fine); indirection through a reassigned variable or opaque `children` prop is not analyzed for splitting — use `split={false}` in that case.
- CSS used by split/deferred/`never()` boundaries is still linked in the SSR HTML for the route (not deferred with the JS chunk).
- Different from React's built-in selective hydration: selective hydration only orders when already-queued `<Suspense>` boundaries hydrate; `Hydrate` decides whether and when a boundary is in the queue at all.
- Comparable to Astro islands conceptually but different substrate: Astro composes independent runtimes, Start schedules hydration within one React tree.

## Related

- [Selective SSR](./selective-ssr.md)
- [Hydration Errors](./hydration-errors.md)
