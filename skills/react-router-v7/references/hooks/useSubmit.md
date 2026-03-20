# useSubmit

Returns a `SubmitFunction` for submitting forms programmatically — the imperative counterpart to the `<Form>` component.

## Signature

```typescript
function useSubmit(): SubmitFunction
```

## Usage

```tsx
import { useSubmit } from "react-router";

function AutoSaveForm() {
  const submit = useSubmit();
  return (
    <Form onChange={(event) => submit(event.currentTarget)}>
      <input name="title" />
    </Form>
  );
}
```

## Notes

- Use when you need to trigger a submission based on conditions, timers, or events rather than a submit button click
- The submitted form data causes a navigation (unlike `useFetcher().submit`)
- Not available in Declarative mode

## Related

- [useFetcher](./useFetcher.md) — submit without causing a navigation
- [useNavigation](./useNavigation.md) — track the resulting navigation state
- [useActionData](./useActionData.md) — access the action's return value
