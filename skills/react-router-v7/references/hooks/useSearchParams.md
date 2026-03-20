# useSearchParams

Returns a tuple of the current URL's `URLSearchParams` and a setter function. Setting params causes a navigation.

## Signature

```typescript
function useSearchParams(
  defaultInit?: URLSearchParamsInit,
): [URLSearchParams, SetURLSearchParams]
```

## Usage

```tsx
import { useSearchParams } from "react-router";

function Tabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "overview";

  return (
    <button onClick={() => setSearchParams({ tab: "settings" })}>
      Settings
    </button>
  );
}
```

## Setter formats

```tsx
setSearchParams("?tab=1");                          // string
setSearchParams({ tab: "1" });                      // object
setSearchParams({ brand: ["nike", "reebok"] });     // array values
setSearchParams([["tab", "1"]]);                    // array of tuples
setSearchParams(new URLSearchParams("?tab=1"));     // URLSearchParams
setSearchParams(prev => { prev.set("tab", "2"); return prev; }); // callback
```

## Notes

- The `searchParams` object is a stable reference — safe to use in `useEffect` dependency arrays
- The callback form of `setSearchParams` does not support React's queuing like `setState` does; multiple calls in the same tick do not accumulate
- `defaultInit` provides a fallback value but does not update the URL on first render
- Available in all modes: Framework, Data, and Declarative

## Related

- [useLocation](./useLocation.md) — full location object including `search`
- [useNavigate](./useNavigate.md) — programmatic navigation
