---
source: https://react.dev/reference/rsc/use-server
---

# use server

`'use server'` marks server-side functions that can be called from client-side code.

## Signature / Usage

Add `'use server'` at the top of an async function body to mark the function as callable by the client. These functions are Server Functions.

```js
async function addToCart(data) {
  'use server';
  // ...
}
```

Instead of marking functions individually, add the directive to the top of a file to mark all exports in that file as Server Functions that can be used anywhere, including imported in client code.

When calling a Server Function on the client, it makes a network request to the server that includes a serialized copy of any arguments. If it returns a value, that value is serialized and returned to the client.

### Server Functions in forms

```js
// App.js

async function requestUsername(formData) {
  'use server';
  const username = formData.get('username');
  // ...
}

export default function App() {
  return (
    <form action={requestUsername}>
      <input type="text" name="username" />
      <button type="submit">Request</button>
    </form>
  );
}
```

React supplies the form's `FormData` as the first argument. By passing a Server Function to the form `action`, React can progressively enhance the form, so forms can be submitted before the JavaScript bundle is loaded.

To update the UI based on the result while supporting progressive enhancement, use `useActionState`:

```js
// requestUsername.js
'use server';

export default async function requestUsername(previousState, formData) {
  const username = formData.get('username');
  if (canRequest(username)) {
    // ...
    return 'successful';
  }
  return 'failed';
}
```

```js
// UsernameForm.js
'use client';

import { useActionState } from 'react';
import requestUsername from './requestUsername';

function UsernameForm() {
  const [state, action] = useActionState(requestUsername, null);

  return (
    <>
      <form action={action}>
        <input type="text" name="username" />
        <button type="submit">Request</button>
      </form>
      <p>Last submission request returned: {state}</p>
    </>
  );
}
```

### Calling a Server Function outside of `<form>`

Call the Server Function in a Transition, which lets you display a loading indicator, show optimistic state updates, and handle unexpected errors. Forms automatically wrap Server Functions in transitions.

```js
import incrementLike from './actions';
import { useState, useTransition } from 'react';

function LikeButton() {
  const [isPending, startTransition] = useTransition();
  const [likeCount, setLikeCount] = useState(0);

  const onClick = () => {
    startTransition(async () => {
      const currentCount = await incrementLike();
      startTransition(() => {
        setLikeCount(currentCount);
      });
    });
  };

  return (
    <>
      <p>Total Likes: {likeCount}</p>
      <button onClick={onClick} disabled={isPending}>Like</button>;
    </>
  );
}
```

```js
// actions.js
'use server';

let likeCount = 0;
export default async function incrementLike() {
  likeCount++;
  return likeCount;
}
```

To read a Server Function return value, `await` the returned promise.

## Notes

- `'use server'` is for use with React Server Components.
- `'use server'` must be at the very beginning of the function or module, above any other code including imports (comments above directives are OK). It must be written with single or double quotes, not backticks.
- `'use server'` can only be used in server-side files. The resulting Server Functions can be passed to Client Components through props.
- To import a Server Function from client code, the directive must be used at module level.
- Because the underlying network calls are always asynchronous, `'use server'` can only be used on async functions.
- The original passes the dummy permalink `'n/a'` as the third argument of `useActionState`; it is omitted here because a submission before JavaScript loads would navigate to `n/a`. For progressive enhancement, pass a real URL that renders the same form (see [Server Functions](./server-functions.md)).
- Snippet adjusted: the original `requestUsername(formData)` is passed to `useActionState`, which calls the action as `(previousState, formData)`; the `requestUsername.js` snippet takes `(previousState, formData)`.
- Always treat arguments to Server Functions as untrusted input and authorize any mutations. Arguments are fully client-controlled: validate and escape them as appropriate, and validate that the logged-in user is allowed to perform the action.
- Server Functions should be called in a Transition. Server Functions passed to `<form action>` or `formAction` are automatically called in a transition.
- Server Functions are designed for mutations that update server-side state; they are not recommended for data fetching. Frameworks implementing Server Functions typically process one action at a time and have no way to cache the return value.
- Experimental only: taint APIs (`experimental_taintUniqueValue`, `experimental_taintObjectReference`) can prevent unique values and objects from being passed to client code.
- Supported argument types: primitives (string, number, bigint, boolean, undefined, null, symbols registered via `Symbol.for`); iterables of serializable values (String, Array, Map, Set, TypedArray and ArrayBuffer); Date; FormData instances; plain objects with serializable properties; Server Functions; Promises.
- Not supported: React elements or JSX; functions that are not Server Functions (including component functions); classes; instances of any class other than the built-ins, or objects with a null prototype; symbols not registered globally; events from event handlers.
- Serializable return values are the same as the serializable props for a boundary Client Component (see [use client](./use-client.md)).
- For security advisories affecting React Server Components packages, see rsc-critical-security-vulnerability and rsc-dos-and-source-code-exposure.
- Scope: React's own directive. Next.js Server Actions behavior belongs to nextjs-app, TanStack's `createServerFn` to tanstack-start, and React Router's actions to react-router.

## Related

- [Server Functions](./server-functions.md)
- [use client](./use-client.md)
- [Directives](./directives.md)
- [useActionState](../hooks/useActionState.md)
- [useTransition](../hooks/useTransition.md)
- [useOptimistic](../hooks/useOptimistic.md)
- [experimental_taintUniqueValue](../apis/experimental_taintUniqueValue.md)
- [experimental_taintObjectReference](../apis/experimental_taintObjectReference.md)
