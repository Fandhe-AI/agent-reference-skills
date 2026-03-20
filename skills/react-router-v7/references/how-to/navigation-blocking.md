# Navigation Blocking

Prevent accidental navigation away from a page when users have unsaved changes, and show a custom confirmation dialog using the `useBlocker` hook.

**Available in:** Framework mode and Data mode.

## 実装方法

1. Track dirty state with `useState`
2. Update dirty state on form `onChange`
3. Call `useBlocker(callback)` — return `true` to block, `false` to allow
4. Render a confirmation UI when `blocker.state === "blocked"`
5. Call `blocker.proceed()` to allow or `blocker.reset()` to cancel navigation
6. Reset or proceed in a `useEffect` after successful form submission

## コード例

```tsx
import { useState, useCallback, useEffect } from "react";
import { useFetcher, useBlocker } from "react-router";

export default function Contact() {
  const [isDirty, setIsDirty] = useState(false);
  const fetcher = useFetcher();
  const blocker = useBlocker(useCallback(() => isDirty, [isDirty]));

  useEffect(() => {
    if (fetcher.data?.ok) {
      if (blocker.state === "blocked") blocker.proceed();
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

## 注意点

- `useBlocker` only blocks client-side navigations; it cannot block browser back/forward or direct URL changes in all browsers
- The callback passed to `useBlocker` should be stable (use `useCallback`) to avoid re-registering on every render

## 関連

- [./fetchers.md](./fetchers.md)
- [./form-validation.md](./form-validation.md)
