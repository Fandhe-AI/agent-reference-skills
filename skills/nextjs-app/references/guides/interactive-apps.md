# Interactive Apps

Build responsive interactions in Next.js with `<Suspense>` streaming, `useOptimistic`/`useTransition` for instant feedback, `useActionState` for form lifecycle, and cached reads with `updateTag` for repeat-navigation performance.

## Signature / Usage

```tsx filename="features/task/components/task-card.tsx"
'use client'
import { useOptimistic, useTransition } from 'react'

export function TaskCard({ id, priority }) {
  const [optimisticPriority, setOptimisticPriority] = useOptimistic(priority)
  const [, startTransition] = useTransition()

  function handlePriority() {
    startTransition(async () => {
      setOptimisticPriority(next(optimisticPriority))
      await cyclePriority(id)
    })
  }

  return <button onClick={handlePriority}>{optimisticPriority}</button>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `<Suspense fallback={...}>` | React API | Streams slow reads in without blocking the rest of the page |
| `useOptimistic(initial, reducer?)` | React hook | Renders a value in place of a stale prop while a transition is pending; reverts to fresh server data once resolved |
| `useTransition()` | React hook | Runs a Server Function as a transition, providing `isPending` and forwarding thrown errors to the nearest error boundary |
| `useActionState(action, initialState)` | React hook | Manages a form's pending state, key-based reset, and result together |
| `data-pending` attribute | convention | Exposes a component's pending state via CSS so ancestors can style (e.g. Tailwind `has-data-pending:`) without lifting state |
| `refresh()` (`next/cache`) | function | Reruns dynamic work after a mutation without touching cached entries |
| `updateTag(tag)` (`next/cache`) | function | Invalidates cached reads tagged with `cacheTag()`, replacing `refresh()` for cacheable data |

## Notes

- `useState` setters are deferred inside a transition; use `useOptimistic` setters or direct DOM calls (e.g. `formRef.current?.reset()`) for updates that must apply on the current frame.
- Post-`await` state updates inside a Server Function call are not automatically part of the transition — wrap them in `startTransition` (documented React limitation, e.g. closing a dialog in sync with a board update).
- `group-has-data-pending:`/`has-data-pending:` compile to CSS `:has()`, which is cheap for low-frequency toggles but should be avoided as a broad anchor on high-frequency interactions like dragging.
- Step 8 (caching reusable reads + `prefetch={true}` runtime prefetching) requires Cache Components (`cacheComponents: true`), introduced in Next.js 16; without it, see Caching without Cache Components.
- These patterns improve Core Web Vitals: streaming lowers FCP/LCP, optimistic UI/transitions lower INP, and prefetching makes destination-page metrics near-instant — but don't replace shipping less client JS.

## Related

- [Streaming](./streaming.md)
- [Runtime Prefetching](./runtime-prefetching.md)
- [View Transitions](./view-transitions.md)
