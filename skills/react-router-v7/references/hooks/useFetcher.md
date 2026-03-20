# useFetcher

Creates a fetcher for loading data or submitting forms without causing a navigation. Each fetcher tracks its own independent state.

## Signature

```typescript
function useFetcher<T = any>(options?: {
  key?: string;
}): FetcherWithComponents<SerializeFrom<T>>
```

## Usage

```tsx
import { useFetcher } from "react-router";

function AddToCart({ productId }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action="/cart">
      <input type="hidden" name="productId" value={productId} />
      <button type="submit">
        {fetcher.state !== "idle" ? "Adding..." : "Add to Cart"}
      </button>
    </fetcher.Form>
  );
}
```

## Fetcher object

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `state` | `"idle" \| "loading" \| "submitting"` | Current fetcher state |
| `data` | `SerializeFrom<T> \| undefined` | Data returned from action or loader |
| `Form` | `Component` | Form component bound to this fetcher |
| `load(href)` | `function` | Load data from a route without navigating |
| `submit(target, options?)` | `function` | Submit data to a route without navigating |
| `reset()` | `function` | Reset the fetcher to its idle state |

## Options

| Option | Type | Description |
|--------|------|-------------|
| `key` | `string` | Shared key to access the same fetcher from multiple components |

## Notes

- Fetchers do not cause navigation — ideal for likes, inline edits, background refreshes
- Use `key` to share fetcher state across components: `useFetcher({ key: "my-key" })`
- Not available in Declarative mode

## Related

- [useFetchers](./useFetchers.md) — inspect all in-flight fetchers
- [useNavigation](./useNavigation.md) — track navigation-level submission state
- [useSubmit](./useSubmit.md) — programmatic navigation-based submission
