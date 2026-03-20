# useFormAction

Resolves the URL of the closest route in the component hierarchy and optionally appends a sub-action path. Used internally by `<Form>` but available for custom use.

## Signature

```typescript
function useFormAction(
  action?: string,
  options?: { relative?: RelativeRoutingType },
): string
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `action` | `string` | `undefined` | Sub-path to append to the closest route URL |
| `relative` | `"route" \| "path"` | `"route"` | Routing resolution mode |

## Usage

```tsx
import { useFormAction } from "react-router";

function DeleteButton() {
  const destroyAction = useFormAction("destroy");
  // e.g. "/invoices/123/destroy"
  return <button formAction={destroyAction}>Delete</button>;
}
```

## Notes

- Returns the closest route's URL, not the current browser URL
- Not available in Declarative mode

## Related

- [useHref](./useHref.md) — resolve any path to an href string
- [useLocation](./useLocation.md) — current location object
