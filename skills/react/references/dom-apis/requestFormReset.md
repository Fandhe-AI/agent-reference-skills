---
source: https://react.dev/reference/react-dom/requestFormReset
---

# requestFormReset

`requestFormReset` lets you reset a React-managed form after an Action or Transition finishes.

## Signature / Usage

```js
requestFormReset(form)
```

Call `requestFormReset` to request that a form resets after the current Action or Transition completes.

```js
import { startTransition } from 'react';
import { requestFormReset } from 'react-dom';

function handleSubmit(form) {
  startTransition(async () => {
    const formData = new FormData(form);
    requestFormReset(form);
    await save(formData);
  });
}
```

Requesting a reset in a custom form Action: React automatically resets uncontrolled fields after a successful `<form action={...}>` submission. When you implement submission manually, you can opt into the same behavior by calling `requestFormReset`.

```js
import { startTransition } from 'react';
import { requestFormReset } from 'react-dom';

function SearchForm() {
  async function onSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      requestFormReset(form);
      await submitSearch(formData);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="query" defaultValue="react" />
      <button type="submit">Search</button>
    </form>
  );
}
```

If your submission uses the built-in `<form action={...}>` behavior, you don't need to call `requestFormReset` manually.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `form` | HTMLFormElement | An HTML form element rendered by React. |

`requestFormReset` returns nothing.

## Notes

- Source: https://react.dev/reference/react-dom/requestFormReset (react.dev commit `46a54e0592729712b7640308b53268e84fdc7c9f`, fetched 2026-11-14). The page is new since commit `046f17d`; earlier this skill only had the mention in the React 19 release notes page.
- Pass a form element that is rendered by React. Passing a non-form element, or a form not managed by React, throws an error.
- `requestFormReset` is intended for Actions and Transitions. If called outside an Action or Transition, React warns in development and performs a synchronous reset.
- `requestFormReset` is useful when you implement form submission logic yourself (for example with `onSubmit` + `startTransition`) and still want React's form reset behavior.
- This API requests a reset for uncontrolled form fields. For controlled fields, handle resets by updating state, such as in `onReset`.
- The snippets call `save` and `submitSearch`, which are placeholders for your own async submission code.

## Related

- [form](../dom-components/form.md)
- [useFormStatus](./useFormStatus.md)
- [useActionState](../hooks/useActionState.md)
- [React DOM APIs](./overview.md)
