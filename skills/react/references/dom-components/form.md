---
source: https://react.dev/reference/react-dom/components/form
---

# `<form>`

The built-in browser `<form>` component lets you create interactive controls for submitting information.

## Signature / Usage

```js
<form action={search}>
    <input name="query" />
    <button type="submit">Search</button>
</form>
```

Handle submission with an `action` function (runs in a Transition, receives `FormData`, no `e.preventDefault()` needed):

```js
export default function Search() {
  function search(formData) {
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
  }
  return (
    <form action={search}>
      <input name="query" />
      <button type="submit">Search</button>
    </form>
  );
}
```

Handle submission with a Server Function:

```jsx
import { updateCart } from './lib.js';

function AddToCart({productId}) {
  async function addToCart(formData) {
    'use server'
    const productId = formData.get('productId')
    await updateCart(productId)
  }
  return (
    <form action={addToCart}>
        <input type="hidden" name="productId" value={productId} />
        <button type="submit">Add to Cart</button>
    </form>

  );
}
```

Pending state with `useFormStatus`:

```js
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
```

Multiple submission types via `formAction`:

```js
<form action={publish}>
  <textarea name="content" rows={4} cols={40} />
  <br />
  <button type="submit" name="button" value="submit">Publish</button>
  <button formAction={save}>Save draft</button>
</form>
```

## Options / Props

`<form>` supports all [common element props](./common.md).

| Name | Type | Description |
| --- | --- | --- |
| action | string or function | When a URL is passed, the form behaves like the HTML form component. When a function is passed, the function handles the form submission in a Transition following the Action prop pattern. The function may be async and is called with a single argument containing the `FormData` of the submitted form. Can be overridden by a `formAction` attribute on a `<button>`, `<input type="submit">`, or `<input type="image">`. |

## Notes

- When a function is passed to `action` or `formAction` the HTTP method will be POST regardless of the value of the `method` prop.
- Unlike `onSubmit`, an `action` runs in a Transition and calling `e.preventDefault()` isn't needed. After the `action` function succeeds, all uncontrolled field elements in the form are reset.
- `onSubmit` works in every version of React and gives direct access to the submit event (call `e.preventDefault()` and read `new FormData(e.target)` yourself). Passing a function to `action` instead lets React track the pending state, send thrown errors to the nearest error boundary, and work with `useActionState` and `useOptimistic`. An `action` can also be a Server Function, which `onSubmit` does not support.
- A Server Function passed to `<form action>` lets users submit forms without JavaScript enabled or before the code has loaded. Provide extra data via hidden form fields or by `bind`ing arguments (the bound arguments come before `formData`). When `<form>` is rendered by a Server Component and a Server Function is passed to `action`, the form is progressively enhanced.
- If the function called by `action` throws, wrap `<form>` in an Error Boundary; its fallback is displayed.
- Displaying a form submission error before the JavaScript bundle loads requires that `<form>` be rendered by a Client Component, the `action` function be a Server Function, and `useActionState` be used to display the error message.
- `useOptimistic` can immediately update the UI with the expected outcome while the background operation (such as a network request) completes.
- Built-in React DOM `<form action>`. Not the same as react-hook-form (`useForm`), nor the `<Form>` components of react-router and nextjs-app.

## Related

- [input](./input.md)
- [textarea](./textarea.md)
- [select](./select.md)
- [useFormStatus](../dom-apis/useFormStatus.md)
- useActionState
- useOptimistic
