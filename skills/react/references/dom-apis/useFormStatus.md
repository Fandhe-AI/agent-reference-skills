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
| `pending` | boolean | `true` while the parent `<form>` is submitting an Action or running a Transition from `onSubmit`. Otherwise, `false`. |
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

Displaying a pending state with an `onSubmit` handler: if you need to handle form submission in an `onSubmit` event handler instead of passing a function to the `<form action>` prop, call `event.preventDefault()` and start a Transition in the same event handler. A component inside the form can then use `useFormStatus` to read the pending state while the Action is running.

```js
import { startTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { submitForm } from './submitForm.js';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

function Form({ submitAction }) {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await submitAction(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='query' />
      <SubmitButton />
    </form>
  );
}

export default function App() {
  async function submitAction(formData) {
    await submitForm(formData);
  }

  return <Form submitAction={submitAction} />;
}
```

The `submitForm` function in `submitForm.js`:

```js
export async function submitForm(formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
```

## Notes

- Source: https://react.dev/reference/react-dom/hooks/useFormStatus (react.dev commit `46a54e0592729712b7640308b53268e84fdc7c9f`, fetched 2026-11-14). The `onSubmit` example and the updated `pending` description were added upstream after commit `046f17d`.
- Unlike a function passed to the `<form action>` prop, handling submission through `onSubmit` does not automatically reset the form (see the `<form>` page, "Other ways to control form resets", and `requestFormReset`).

- The `useFormStatus` Hook must be called from a component that is rendered inside a `<form>`.
- `useFormStatus` will only return status information for a parent `<form>`. It will not return status information for any `<form>` rendered in that same component or children components.
- If the component that calls `useFormStatus` is not nested in a `<form>`, `status.pending` will always return `false`.
- Pitfall: calling it in the component that renders the `<form>` itself (`function Form() { const { pending } = useFormStatus(); return <form action={submit}></form>; }`) means `pending` will never be true. Call it from inside a component located inside `<form>` (e.g. a `Submit` button component).
- This is React DOM's built-in hook for `<form action>`; distinct from react-hook-form's `useForm`/`formState`, and from the `<Form>` components of react-router and nextjs-app.

## Related

- [useActionState](../hooks/useActionState.md)
- [Built-in React DOM Hooks](./hooks-overview.md)
