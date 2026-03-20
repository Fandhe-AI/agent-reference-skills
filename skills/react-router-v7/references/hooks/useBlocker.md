# useBlocker

Blocks in-app SPA navigations and returns a `Blocker` object that lets you present a confirmation UI before proceeding.

## Signature

```typescript
function useBlocker(shouldBlock: boolean | BlockerFunction): Blocker
```

`BlockerFunction` receives `{ currentLocation, nextLocation, historyAction }` and returns a boolean.

## Usage

```tsx
import { useCallback, useState } from "react";
import { type BlockerFunction, useBlocker } from "react-router";

function UnsavedForm() {
  const [value, setValue] = useState("");

  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) =>
      value !== "" && currentLocation.pathname !== nextLocation.pathname,
    [value],
  );
  const blocker = useBlocker(shouldBlock);

  return (
    <form>
      <input value={value} onChange={e => setValue(e.target.value)} />
      {blocker.state === "blocked" && (
        <div>
          <p>Leave without saving?</p>
          <button type="button" onClick={() => blocker.proceed()}>Leave</button>
          <button type="button" onClick={() => blocker.reset()}>Stay</button>
        </div>
      )}
    </form>
  );
}
```

## Blocker object

| Property | Type | Description |
|----------|------|-------------|
| `state` | `"unblocked" \| "blocked" \| "proceeding"` | Current blocker state |
| `location` | `Location \| undefined` | The attempted navigation target |
| `proceed()` | `() => void` | Allow the blocked navigation |
| `reset()` | `() => void` | Cancel the block; stay on current page |

## Notes

- Does **not** block hard reloads, browser back/forward, or cross-origin navigations
- Prefer the function form of `shouldBlock` for granular control (e.g. ignore query-only changes)
- Not available in Declarative mode

## Related

- [useBeforeUnload](./useBeforeUnload.md) — hook into browser's `beforeunload` event
- [useNavigate](./useNavigate.md) — programmatic navigation
