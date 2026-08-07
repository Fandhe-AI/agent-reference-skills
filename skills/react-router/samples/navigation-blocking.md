# Navigation Blocking

Prevent accidental navigation when a form has unsaved changes using `useBlocker`.

```tsx
// app/routes/contact.tsx
import { useState, useCallback, useEffect } from "react";
import { useFetcher, useBlocker } from "react-router";

export default function Contact() {
  const [isDirty, setIsDirty] = useState(false);
  const fetcher = useFetcher();
  const blocker = useBlocker(useCallback(() => isDirty, [isDirty]));

  // Proceed blocked navigation after successful save
  useEffect(() => {
    if (fetcher.data?.ok && blocker.state === "blocked") {
      blocker.proceed();
    }
  }, [fetcher.data]);

  return (
    <>
      <fetcher.Form
        method="post"
        onChange={(e) => setIsDirty(Boolean(e.currentTarget.message.value))}
      >
        <textarea name="message" />
        <button type="submit">Send</button>
      </fetcher.Form>

      {blocker.state === "blocked" && (
        <div>
          <p>You have unsaved changes. Leave anyway?</p>
          <button onClick={() => blocker.proceed()}>Leave</button>
          <button onClick={() => blocker.reset()}>Stay</button>
        </div>
      )}
    </>
  );
}
```

## Notes

- The callback passed to `useBlocker` must be stable — wrap with `useCallback` to avoid re-registration on every render
- `blocker.state` is `'unblocked' | 'blocked' | 'proceeding'`
- `useBlocker` only intercepts client-side navigations; browser back/forward may bypass it in some browsers
- `blocker.proceed()` allows the navigation; `blocker.reset()` cancels it and keeps the user on the page
