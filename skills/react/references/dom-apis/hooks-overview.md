---
source: https://react.dev/reference/react-dom/hooks
---

# Built-in React DOM Hooks

The `react-dom` package contains Hooks that are only supported for web applications (which run in the browser DOM environment). These Hooks are not supported in non-browser environments like iOS, Android, or Windows applications. For Hooks supported in web browsers and other environments, see the React Hooks page.

## Signature / Usage

Form Hooks: `useFormStatus` allows you to make updates to the UI based on the status of a form.

```js
function Form({ action }) {
  async function increment(n) {
    return n + 1;
  }
  const [count, incrementFormAction] = useActionState(increment, 0);
  return (
    <form action={action}>
      <button formAction={incrementFormAction}>Count: {count}</button>
      <Button />
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      Submit
    </button>
  );
}
```

## Related

- [useFormStatus](./useFormStatus.md)
- [useActionState](../hooks/useActionState.md)
- [Built-in React Hooks](../hooks/overview.md)
