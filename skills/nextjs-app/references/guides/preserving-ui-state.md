# Preserving UI State

With Cache Components enabled, Next.js hides pages on navigation using React's `<Activity>` component instead of unmounting them, preserving both React state and DOM state (form drafts, scroll position, video playback) across up to 3 routes.

## Signature / Usage

```tsx
'use client'
import { useState, useLayoutEffect } from 'react'

function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  // Reset transient state when Activity hides this component
  useLayoutEffect(() => {
    return () => setIsOpen(false)
  }, [])

  return <button onClick={() => setIsOpen((o) => !o)}>Options</button>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `<Activity mode="visible" \| "hidden">` | React component | Hides content with `display: none` while keeping it mounted; used directly for tabs, expandable panels, etc. |
| `useRouter().bfcacheId` | `string` | Migration-only React `key` value that resets an entire subtree on push/replace while still restoring state on browser back/forward |

## Notes

- Requires `cacheComponents: true` in `next.config`.
- Beyond 3 preserved routes, the oldest is evicted and re-renders fresh.
- Use `useLayoutEffect` cleanup (runs synchronously before hiding) to reset transient state like open dropdowns or stale status messages; derive dialog-open state from a search param instead of local state if it must re-trigger init effects.
- Media elements (`<video>`, `<audio>`) keep playing under `display: none` — pause them explicitly in a `useLayoutEffect` cleanup.
- Local component state (`useState`) persists across auth changes since props changing does not reset existing state; use `window.location.href` for logout to force a full reload, or key components by user ID.
- Hidden Activity content remains in the DOM for e2e tests — use visibility-aware selectors (Playwright `getByRole`, `.filter({ visible: true })`; Cypress `.should('be.visible')`).
- Prefer `data-*` attributes over broad `:has()` selectors to avoid leaking global styles from hidden pages into visible ones.
- Effects re-run on every hide-to-visible transition, not just first mount — use a ref to distinguish first mount from re-show.

## Related

- [Rendering Philosophy](./rendering-philosophy.md)
