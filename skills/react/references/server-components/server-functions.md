---
source: https://react.dev/reference/rsc/server-functions
---

# Server Functions

Server Functions allow Client Components to call async functions executed on the server.

## Signature / Usage

Server Components can define Server Functions with the `"use server"` directive and pass them as props to Client Components:

```js
// Server Component
import Button from './Button';

function EmptyNote () {
  async function createNoteAction() {
    // Server Function
    'use server';

    await db.notes.create();
  }

  return <Button onClick={createNoteAction}/>;
}
```

```js
"use client";

export default function Button({onClick}) {
  console.log(onClick);
  // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNoteAction'}
  return <button onClick={() => onClick()}>Create Empty Note</button>
}
```

Client Components can also import Server Functions from files that use the `"use server"` directive:

```js
"use server";

export async function createNote() {
  await db.notes.create();
}
```

```js
"use client";
import {createNote} from './actions';

function EmptyNote() {
  console.log(createNote);
  // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNote'}
  return <button onClick={() => createNote()} />;
}
```

### Server Functions with Actions

Server Functions can be called from Actions on the client. Wrapping the call gives access to the `isPending` state:

```js
"use server";

export async function updateName(name) {
  if (!name) {
    return {error: 'Name is required'};
  }
  await db.users.updateName(name);
  return {error: null};
}

export async function updateNameFromForm(formData) {
  return updateName(formData.get('name'));
}
```

```js
"use client";

import {updateName} from './actions';

function UpdateName() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const [isPending, startTransition] = useTransition();

  const submitAction = async () => {
    startTransition(async () => {
      const {error} = await updateName(name);
      startTransition(() => {
        if (error) {
          setError(error);
        } else {
          setName('');
        }
      });
    })
  }

  return (
    <form action={submitAction}>
      <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} disabled={isPending}/>
      {error && <span>Failed: {error}</span>}
    </form>
  )
}
```

### Server Functions with Form Actions

Pass a Server Function to a Form to automatically submit the form to the server:

```js
"use client";

import {updateNameFromForm} from './actions';

function UpdateName() {
  return (
    <form action={updateNameFromForm}>
      <input type="text" name="name" />
    </form>
  )
}
```

When the Form submission succeeds, React will automatically reset the form. Add `useActionState` to access the pending state, last response, or to support progressive enhancement.

### Server Functions with `useActionState`

```js
"use client";

import {updateName} from './actions';

function UpdateName() {
  const [state, submitAction, isPending] = useActionState(
    (previousState, formData) => updateName(formData.get('name')),
    {error: null}
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" disabled={isPending}/>
      {state.error && <span>Failed: {state.error}</span>}
    </form>
  );
}
```

When using `useActionState` with Server Functions, React will also automatically replay form submissions entered before hydration finishes.

### Progressive enhancement with `useActionState`

Server Functions support progressive enhancement with the third argument of `useActionState` (the permalink):

```js
"use client";

import {updateName} from './actions';

function UpdateName() {
  const [, submitAction] = useActionState(
    (previousState, formData) => updateName(formData.get('name')),
    null,
    `/name/update`
  );

  return (
    <form action={submitAction}>
      ...
    </form>
  );
}
```

When the permalink is provided to `useActionState`, React will redirect to the provided URL if the form is submitted before the JavaScript bundle loads.

## Notes

- Server Functions are for use in React Server Components.
- Snippets corrected from the original: `EmptyNote` returns the button; `updateName` returns `{error: null}` on success; the input is bound to `name` state; the form action and `useActionState` examples adapt `updateName(name)` to the FormData / `(previousState, formData)` argument contract (`updateNameFromForm` is added to `actions.js`).
- Until September 2024, all Server Functions were referred to as "Server Actions". If a Server Function is passed to an action prop or called from inside an action then it is a Server Action, but not all Server Functions are Server Actions.
- When a Server Function is defined with the `"use server"` directive, your framework automatically creates a reference to it and passes that reference to the Client Component. When called on the client, React sends a request to the server to execute the function and return the result.
- While Server Functions in React 19 are stable and will not break between minor versions, the underlying APIs used to implement them in a bundler or framework do not follow semver and may break between minors in React 19.x. Pin to a specific React version, or use the Canary release.
- Arguments are client-controlled; see the security considerations in [use server](./use-server.md). For security advisories affecting React Server Components packages, see rsc-critical-security-vulnerability and rsc-dos-and-source-code-exposure.
- Scope: this page is React's own Server Functions specification. Next.js Server Actions behavior belongs to nextjs-app, TanStack's `createServerFn` to tanstack-start, and React Router's actions to react-router.

## Related

- [use server](./use-server.md)
- [Server Components](./server-components.md)
- [useActionState](../hooks/useActionState.md)
- [useTransition](../hooks/useTransition.md)
- [form](../dom-components/form.md)
