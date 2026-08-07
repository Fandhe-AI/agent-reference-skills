# unstable_usePrompt

A wrapper around `useBlocker` that shows a `window.confirm` prompt to users instead of building a custom UI with `useBlocker`.

## Signature / Usage

```typescript
function usePrompt(options: {
  when: boolean | BlockerFunction;
  message: string;
}): void
```

```tsx
import { unstable_usePrompt as usePrompt } from "react-router";

function ImportantForm() {
  const [value, setValue] = React.useState("");

  // Block navigating elsewhere when data has been entered into the input
  usePrompt({
    message: "Are you sure?",
    when: ({ currentLocation, nextLocation }) =>
      value !== "" &&
      currentLocation.pathname !== nextLocation.pathname,
  });

  return (
    <Form method="post">
      <label>
        Enter some important data:
        <input
          name="data"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </Form>
  );
}
```

## Options / Props

| Option | Type | Description |
|--------|------|-------------|
| `message` | `string` | The message to show in the confirmation dialog |
| `when` | `boolean \| BlockerFunction` | Whether to block the navigation. If a function, receives `{ currentLocation, nextLocation }` |

## Notes

- Exported as `unstable_usePrompt`; the `unstable_` prefix will **not** be removed because this technique has rough edges and behaves differently (sometimes incorrectly) across browsers when users click additional back/forward navigations while the confirmation is open — use at your own risk
- Not available in Declarative mode

## Related

- [useBlocker](./useBlocker.md) — build a custom confirmation UI instead of `window.confirm`
