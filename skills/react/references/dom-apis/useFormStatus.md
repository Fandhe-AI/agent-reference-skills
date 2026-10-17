---
source: https://react.dev/reference/react-dom/hooks/useFormStatus
---

# useFormStatus

`useFormStatus` is a Hook that gives you status information of the last form submission.

## Signature / Usage

```js
import { useFormStatus } from "react-dom";
import action from './actions';

function Submit() {
  const status = useFormStatus();
  return <button disabled={status.pending}>Submit</button>
}

export default function App() {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}
```

`const { pending, data, method, action } = useFormStatus();` takes no parameters. To get status information, the `Submit` component must be rendered within a `<form>`.

Returns a `status` object with the following properties:

| Name | Type | Description |
| --- | --- | --- |
| `pending` | boolean | If `true`, the parent `<form>` is pending submission. Otherwise, `false`. |
| `data` | FormData or null | An object implementing the `FormData` interface that contains the data the parent `<form>` is submitting. If there is no active submission or no parent `<form>`, it will be `null`. |
| `method` | `'get'` or `'post'` | Whether the parent `<form>` is submitting with a `GET` or `POST` HTTP method. By default, a `<form>` will use the `GET` method and can be specified by the `method` property. |
| `action` | function or null | A reference to the function passed to the `action` prop on the parent `<form>`. If there is no parent `<form>`, the property is `null`. If there is a URI value provided to the `action` prop, or no `action` prop specified, `status.action` will be `null`. |

Reading the form data being submitted:

```js
import {useFormStatus} from 'react-dom';

export default function UsernameForm() {
  const {pending, data} = useFormStatus();

  return (
    <div>
      <h3>Request a Username: </h3>
      <input type="text" name="username" disabled={pending}/>
      <button type="submit" disabled={pending}>
        Submit
      </button>
      <br />
      <p>{data ? `Requesting ${data?.get("username")}...`: ''}</p>
    </div>
  );
}
```

## Notes

- The `useFormStatus` Hook must be called from a component that is rendered inside a `<form>`.
- `useFormStatus` will only return status information for a parent `<form>`. It will not return status information for any `<form>` rendered in that same component or children components.
- If the component that calls `useFormStatus` is not nested in a `<form>`, `status.pending` will always return `false`.
- Pitfall: calling it in the component that renders the `<form>` itself (`function Form() { const { pending } = useFormStatus(); return <form action={submit}></form>; }`) means `pending` will never be true. Call it from inside a component located inside `<form>` (e.g. a `Submit` button component).
- This is React DOM's built-in hook for `<form action>`; distinct from react-hook-form's `useForm`/`formState`, and from the `<Form>` components of react-router and nextjs-app.

## Related

- useActionState
- [Built-in React DOM Hooks](./hooks-overview.md)
