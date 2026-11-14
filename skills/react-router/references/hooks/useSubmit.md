# useSubmit

Returns a `SubmitFunction` for submitting forms programmatically — the imperative counterpart to the `<Form>` component.

## Signature / Usage

```typescript
function useSubmit(): SubmitFunction
```

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
- `defaultShouldRevalidate: false` is accepted as an option to skip loader revalidation for one submission. See [Revalidation Optimization](../how-to/optimize-revalidation.md)
- The `viewTransition` submission option is deprecated in favor of React's `<ViewTransition>` component; see [View Transitions](../how-to/view-transitions.md)
- Source: https://reactrouter.com/api/hooks/useSubmit (docs/api/hooks/useSubmit.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/api/hooks/useSubmit.md)

## Related

- [useFetcher](./useFetcher.md) — submit without causing a navigation
- [useNavigation](./useNavigation.md) — track the resulting navigation state
- [useActionData](./useActionData.md) — access the action's return value
