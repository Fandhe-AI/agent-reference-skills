---
source: https://tanstack.com/router/latest/docs/framework/react/guide/navigation-blocking
---

# Navigation Blocking with `useBlocker`

Prevent navigation away from a dirty form until the user confirms, using `useBlocker`.

```tsx
import { useState } from 'react'
import { useBlocker } from '@tanstack/react-router'

function EditForm() {
  const [formIsDirty, setFormIsDirty] = useState(false)

  useBlocker({
    shouldBlockFn: () => {
      if (!formIsDirty) return false
      return !confirm('Are you sure you want to leave? Unsaved changes will be lost.')
    },
  })

  return (
    <form onChange={() => setFormIsDirty(true)}>
      <input name="title" />
    </form>
  )
}
```

```tsx
// Custom UI via withResolver instead of window.confirm
const { status, proceed, reset } = useBlocker({
  shouldBlockFn: () => formIsDirty,
  withResolver: true,
})
```

## Notes

- `shouldBlockFn` returning (or resolving to) `true` blocks the navigation; blockers run asynchronously and sequentially, and if any one blocks, navigation is canceled and remaining blockers are skipped.
- Even when `shouldBlockFn` allows the in-app navigation, the browser's native `beforeunload` dialog can still fire on tab close/refresh unless controlled with `enableBeforeUnload`.
- `withResolver: true` requires calling `proceed()`/`reset()` from custom UI — the `shouldBlockFn` return value no longer resolves the block directly.
- Pass `ignoreBlocker: true` in `navigate()`/`<Link>` options to bypass blockers for a specific navigation.
