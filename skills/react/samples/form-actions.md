---
source: https://react.dev/reference/react-dom/components/form#handle-form-submission-with-an-action-prop
---

# Form Actions

Pass a function to `<form action>` to handle submission, and use `useActionState` to keep the result of an Action as state.

Form `action` prop (from https://react.dev/reference/react-dom/components/form):

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

`useActionState` (from https://react.dev/reference/react/useActionState#adding-state-to-an-action), `src/App.js`:

```js
import { useActionState, startTransition } from 'react';
import { addToCart } from './api';
import Total from './Total';

export default function Checkout() {
  const [count, dispatchAction, isPending] = useActionState(async (prevCount) => {
    return await addToCart(prevCount)
  }, 0);

  function handleClick() {
    startTransition(() => {
      dispatchAction();
    });
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="row">
        <span>Eras Tour Tickets</span>
        <span>Qty: {count}</span>
      </div>
      <div className="row">
        <button onClick={handleClick}>Add Ticket{isPending ? ' 🌀' : '  '}</button>
      </div>
      <hr />
      <Total quantity={count} />
    </div>
  );
}
```

`src/api.js`:

```js
export async function addToCart(count) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return count + 1;
}

export async function removeFromCart(count) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Math.max(0, count - 1);
}
```

## Notes

- Unlike `onSubmit`, an `action` runs in a Transition and `e.preventDefault()` is not needed; after the `action` function succeeds, all uncontrolled field elements in the form are reset.
- `useActionState` returns exactly three items: current state, an action dispatcher, and a pending state. Calling the dispatcher outside an Action prop needs `startTransition`.
- `src/Total.js` (formats `quantity * 9999` as USD) is omitted here; see the useActionState source page.
- This is React's built-in `<form action>`; it is separate from React Hook Form (`useForm`) and from the `<Form>` components of React Router and Next.js (see the react-hook-form, react-router, and nextjs-app skills).
