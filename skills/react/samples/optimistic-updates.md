---
source: https://react.dev/reference/react/useOptimistic#using-optimistic-state-in-action-props
---

# Optimistic Updates

Show the expected result immediately with `useOptimistic` while a form Action is still in flight.

`src/App.js`:

```js
import { useState, startTransition } from 'react';
import EditName from './EditName';

export default function App() {
  const [name, setName] = useState('Alice');

  return <EditName name={name} action={setName} />;
}
```

`src/EditName.js`:

```js
import { useOptimistic, startTransition } from 'react';
import { updateName } from './actions.js';

export default function EditName({ name, action }) {
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  async function submitAction(formData) {
    const newName = formData.get('name');
    setOptimisticName(newName);

    const updatedName = await updateName(newName);
    startTransition(() => {
      action(updatedName);
    })
  }

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change it: </label>
        <input
          type="text"
          name="name"
          disabled={name !== optimisticName}
        />
      </p>
    </form>
  );
}
```

`src/actions.js`:

```js
export async function updateName(name) {
  await new Promise((res) => setTimeout(res, 1000));
  return name;
}
```

## Notes

- Inside an Action prop (here `<form action={submitAction}>`) the optimistic setter can be called directly without `startTransition`; by convention, props named with "Action" are already called inside `startTransition`.
- When the request completes, `name` and `optimisticName` both render the actual `updatedName` from the response.
- This is React's `useOptimistic`; TanStack Query's optimistic updates via `useMutation` are covered by the tanstack-query skill.
