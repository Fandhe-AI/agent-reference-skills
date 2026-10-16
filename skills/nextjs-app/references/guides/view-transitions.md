# View Transitions

React's `<ViewTransition>` component integrates with the browser View Transitions API to animate shared elements, loading states, and navigation direction declaratively across App Router routes, with no configuration required.

## Signature / Usage

```tsx
import { ViewTransition } from 'react'

<ViewTransition name={`photo-${photo.id}`}>
  <Image src={photo.src} alt={photo.title} />
</ViewTransition>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Identity used to match elements across the old and new page for shared-element morphing |
| `share` | `string \| 'auto'` | Assigns a class to the transition (e.g. `"morph"`) for CSS targeting, or `'auto'` for React's default crossfade |
| `enter` / `exit` | `string \| 'auto' \| object` | Animation class applied on enter/exit; can be keyed by `transitionTypes` value with a `default` fallback |
| `default` | `'none'` | Prevents the boundary from animating on unrelated transitions |
| `key` | `string` | Forces React to treat old/new content as an exit/enter pair (e.g. same-route content swap) when it changes |
| `Link` `transitionTypes` | `string[]` | Tags a navigation (e.g. `['nav-forward']`, `['nav-back']`) so `enter`/`exit` objects can map direction |

## Notes

- Works in the App Router with no configuration (`experimental.viewTransition` was removed in `v16.3.0`). React 19.3 includes the `<ViewTransition>` component and the `addTransitionType` API used in this guide.
- Activated by Transitions, `<Suspense>`, and `useDeferredValue` — plain `setState` does not trigger animations.
- Requires Chromium 125+ / recent Safari / Firefox for transition types and `view-transition-class`; without support, transitions simply don't animate.
- The morph only plays when destination content renders in the same commit as navigation (prefetched/cached pages); suspended content falls back to its enter animation.
- `::view-transition { pointer-events: none; }` restores click interactivity on unnamed content during a transition.
- Respect `prefers-reduced-motion` by zeroing animation durations on view-transition pseudo-elements.
- The [`vercel-react-view-transitions`](https://skills.sh/vercel-labs/agent-skills/vercel-react-view-transitions) skill teaches a coding agent the patterns in this guide, plus CSS recipes and troubleshooting for applying them to an existing app. Install: `npx skills add vercel-labs/agent-skills --skill vercel-react-view-transitions`.

## Related

- [Interactive Apps](./interactive-apps.md)
- [Streaming](./streaming.md)
