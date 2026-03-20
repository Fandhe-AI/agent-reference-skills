# useNavigate

Returns a function for programmatic navigation in response to user interactions or effects.

## Signature

```typescript
function useNavigate(): NavigateFunction

// The returned function:
navigate(to: To, options?: NavigateOptions): void | Promise<void>
navigate(delta: number): void | Promise<void>
```

## Usage

```tsx
import { useNavigate } from "react-router";

function SomeComponent() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
  );
}
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| `replace` | `boolean` | Replace current history entry instead of pushing |
| `state` | `any` | Attach state to the location object |
| `relative` | `"route" \| "path"` | Control relative routing logic |
| `preventScrollReset` | `boolean` | Do not scroll to top after navigation (Framework/Data only) |
| `flushSync` | `boolean` | Wrap DOM updates in `ReactDOM.flushSync` (Framework/Data only) |
| `viewTransition` | `boolean` | Enable `document.startViewTransition` (Framework/Data only) |

## Notes

- Prefer `redirect()` inside loaders/actions over `useNavigate` where possible
- `navigate(-1)` navigates back — only use when you are certain a history entry exists
- In Declarative mode the function returns `void`; in Framework/Data modes it returns `Promise<void>`
- Available in all modes: Framework, Data, and Declarative

## Related

- [useLocation](./useLocation.md) — read current location
- [useBlocker](./useBlocker.md) — block navigations conditionally
