# useBeforeUnload

Registers a callback on the browser's `beforeunload` event, allowing cleanup or confirmation prompts when the user leaves the page entirely (hard navigation, tab close, etc.).

## Signature

```typescript
function useBeforeUnload(
  callback: (event: BeforeUnloadEvent) => any,
  options?: { capture?: boolean },
): void
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `capture` | `boolean` | `false` | Attach listener in the capture phase instead of the bubbling phase |

## Usage

```tsx
import { useBeforeUnload } from "react-router";

function Editor() {
  const [dirty, setDirty] = useState(false);

  useBeforeUnload((event) => {
    if (dirty) {
      event.preventDefault();
      event.returnValue = ""; // Required by some browsers
    }
  });

  return <textarea onChange={() => setDirty(true)} />;
}
```

## Notes

- Modern browsers do not display custom messages — calling `event.preventDefault()` shows a generic browser dialog
- This hook covers full-page unloads only; use `useBlocker` to intercept in-app SPA navigations
- Available in all modes: Framework, Data, and Declarative

## Related

- [useBlocker](./useBlocker.md) — block in-app SPA navigations with a confirmation UI
