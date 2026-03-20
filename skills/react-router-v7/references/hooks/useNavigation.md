# useNavigation

Returns the current `Navigation` object representing any in-progress navigation, defaulting to an idle state when none is active.

## Signature

```typescript
function useNavigation(): Navigation
```

## Usage

```tsx
import { useNavigation } from "react-router";

function GlobalSpinner() {
  const navigation = useNavigation();
  return (
    <div>
      {navigation.state !== "idle" && <Spinner />}
    </div>
  );
}
```

## Navigation object properties

| Property | Type | Description |
|----------|------|-------------|
| `state` | `"idle" \| "loading" \| "submitting"` | Current navigation state |
| `formData` | `FormData \| undefined` | Form data from a submission navigation |
| `location` | `Location \| undefined` | The location being navigated to |
| `formMethod` | `string \| undefined` | HTTP method of the form submission |
| `formAction` | `string \| undefined` | Action URL of the form submission |

## Notes

- Use `navigation.state === "submitting"` or `"loading"` to render pending UI
- `navigation.formData` is set during form submission navigations — useful for optimistic UI
- Not available in Declarative mode

## Related

- [useNavigate](./useNavigate.md) — programmatic navigation
- [useFetcher](./useFetcher.md) — for non-navigation submissions
- [useRevalidator](./useRevalidator.md) — manual revalidation state
