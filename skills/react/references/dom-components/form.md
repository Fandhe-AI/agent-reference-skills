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

### Handling form submission with an event handler

Pass a function to the `onSubmit` event handler to run code when the form is submitted. By default, the browser sends the form data to the current URL and refreshes the page. Calling `e.preventDefault()` in the event handler overrides this behavior. If you also pass a function to `action`, React runs it after `onSubmit` unless `onSubmit` calls `e.preventDefault()`.

```js
export default function Search() {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const query = formData.get('query');
    alert(`You searched for '${query}'`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="query" />
      <button type="submit">Search</button>
    </form>
  );
}
```

### Handling form submission with an action prop

Pass a function to the `action` prop to run it when the form is submitted. React calls the function with a `FormData` object containing the values of every input with a `name` attribute. Inputs can be uncontrolled; you don't need `value`/`onChange` pairs, an `onSubmit` handler, or `e.preventDefault()`.

When you pass a function to `action`, React:

- Runs the function in a Transition.
- Makes the pending state available to child components via `useFormStatus`.
- Propagates any errors to the nearest Error Boundary.
- Resets the form's uncontrolled fields when the function succeeds (see "Preserving form values after an Action" below).

If you handle submission manually, you can request the same reset behavior with `requestFormReset`.

```js
export default function Search() {
  function search(formData) {
    const query = formData.get('query');
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

### Handling form submission with a Server Function

A `<form>`'s `action` prop can run a Server Function (a function marked with `'use server'`) when the user submits the form. Users can submit that form before JavaScript loads or when JavaScript is disabled. React calls the Server Function with the form's `FormData` and includes every input with a `name` attribute.

```jsx
import { addComment } from './actions.js';

function CommentForm() {
  return (
    <form action={addComment}>
      <textarea name="comment" />
      <button type="submit">Comment</button>
    </form>
  );
}
```

```js
// actions.js
'use server';

export async function addComment(formData) {
  const comment = formData.get('comment');
  // ...
}
```

#### Passing extra data to an Action

An Action receives the submitted `FormData`. To include data the user did not enter, such as an ID from props, use one of these approaches:

- Hidden fields add the value to `FormData`. The value appears in the HTML, and `formData.get` returns a string. Users can submit the form before JavaScript loads.
- Binding with `bind` passes the value as an argument to a Server Function, before `formData`. The argument keeps its type, so a number stays a number. It must be serializable. Users can submit the form before JavaScript loads.
- A function in the component reads props and state directly. It runs after JavaScript loads, then calls a Server Function with those values.

The client sends hidden field values and bound arguments. Check on the server that the logged-in user is allowed to perform the Action (see the Security section of the `'use server'` page).

Hidden fields: in a Server Component, render an `<input type="hidden">` with a `name` and `value`. React includes that value in the `FormData` passed to the Action. React also includes a submit button's `name` and `value` in `FormData` when that button submits the form.

```jsx
// Server Component
import { updateCart } from './lib.js';

function AddToCart({ productId }) {
  async function addToCart(formData) {
    'use server';
    await updateCart(formData.get('productId'));
  }
  return (
    <form action={addToCart}>
      <input type="hidden" name="productId" value={productId} />
      <button type="submit">Add to Cart</button>
    </form>
  );
}
```

Binding with `bind`: in a Server Component, call `bind` on the Server Function and pass the bound function to `action`. Pass `null` as the first argument to `bind`. Each argument after `null` comes before the `formData` argument React passes when the form is submitted.

```jsx
// Server Component
import { updateCart } from './lib.js';

function AddToCart({ productId }) {
  async function addToCart(productId, formData) {
    'use server';
    await updateCart(productId);
  }
  const addProductToCart = addToCart.bind(null, productId);
  return (
    <form action={addProductToCart}>
      <button type="submit">Add to Cart</button>
    </form>
  );
}
```

When the form is submitted, React calls `addProductToCart(formData)`, which calls `addToCart(productId, formData)`. If you also use `useActionState`, the Server Function receives `productId`, `previousState`, and `formData`, in that order. Define that function in a separate file and bind it from the Client Component.

A function in the component: define the function passed to `action` in the Client Component so it can read the component's props or state. That function passes those values to a Server Function. Because `addToCart` runs in the browser, the component's JavaScript must load before the form can submit.

```jsx
// AddToCart.js
'use client';

import { updateCart } from './actions.js';

function AddToCart({ productId }) {
  async function addToCart(formData) {
    await updateCart(productId, formData);
  }
  return (
    <form action={addToCart}>
      <button type="submit">Add to Cart</button>
    </form>
  );
}
```

```js
// actions.js
'use server';

export async function updateCart(productId, formData) {
  // ...
}
```

### Displaying a pending state during form submission

Call the `useFormStatus` Hook in a component rendered in a `<form>` and read the `pending` property it returns.

```js
import { useFormStatus } from 'react-dom';
import { submitForm } from './actions.js';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

function Form({ action }) {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}

export default function App() {
  return <Form action={submitForm} />;
}
```

The `submitForm` function in `actions.js`:

```js
export async function submitForm(formData) {
  await new Promise((res) => setTimeout(res, 1000));
}
```

### Optimistically updating form data

The `useOptimistic` Hook lets the interface update immediately with the expected outcome before a background operation, like a network request, completes. For example, a message typed into the form can appear in the list with a "Sending..." label before it is actually sent to the server.

```js
import { startTransition, useOptimistic, useState, useRef } from 'react';
import { deliverMessage } from './actions.js';

function Thread({ messages, sendMessage }) {
  const formRef = useRef(null);
  async function formAction(formData) {
    addOptimisticMessage(formData.get('message'));
    formRef.current.reset();
    await sendMessage(formData);
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ]
  );

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    { text: 'Hello there!', sending: false, key: 1 }
  ]);
  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get('message'));
    startTransition(() => {
      setMessages((messages) => [...messages, { text: sentMessage }]);
    });
  }
  return <Thread messages={messages} sendMessage={sendMessage} />;
}
```

The `deliverMessage` function in `actions.js`:

```js
export async function deliverMessage(message) {
  // Simulate a message delivery delay
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}
```

### Handling form submission errors

To handle errors thrown by a function passed to a `<form>`'s `action` prop, wrap the form in an Error Boundary. React displays the boundary's fallback when the function throws.

```js
import { ErrorBoundary } from 'react-error-boundary';

export default function Search() {
  function search() {
    throw new Error('search error');
  }
  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <form action={search}>
        <input name="query" />
        <button type="submit">Search</button>
      </form>
    </ErrorBoundary>
  );
}
```

Handling form submission errors before JavaScript loads: displaying a form submission error message before the JavaScript bundle loads (progressive enhancement) requires that:

1. `<form>` be rendered by a Client Component.
2. The function passed to the `<form>`'s `action` prop be a Server Function.
3. The `useActionState` Hook be used to display the error message.

Define the Server Function in a separate file with the `'use server'` directive. It receives the previous state followed by the submitted `FormData`:

```js
// actions.js
'use server';

import { signUpNewUser } from './api.js';

export async function signup(previousState, formData) {
  const email = formData.get('email');
  try {
    await signUpNewUser(email);
    return null;
  } catch (error) {
    return error.message;
  }
}
```

In a Client Component, pass the Server Function to `useActionState`. Pass the returned Action to the form's `action` prop and render the returned state:

```js
// Signup.js
'use client';

import { useActionState } from 'react';
import { signup } from './actions.js';

export default function Signup() {
  const [message, signupAction] = useActionState(signup, null);
  return (
    <form action={signupAction}>
      <label htmlFor="email">Email: </label>
      <input name="email" id="email" placeholder="react@example.com" />
      <button>Sign up</button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

If the form is submitted before JavaScript loads, React includes the Server Function's returned error message in the server-rendered response.

### Preserving form values after an Action

When a function passed to `action` or `formAction` completes without throwing, React resets the form's uncontrolled fields. To preserve those values, store them with `useState` and pass them to each field's `defaultValue`. Update the state when the Action finishes. React applies the updated defaults before resetting the form, so the fields keep those values.

```js
import { startTransition, useState } from 'react';
import SaveButton from './SaveButton.js';

export default function EditForm() {
  const [title, setTitle] = useState('My draft');

  async function saveAction(formData) {
    await new Promise((res) => setTimeout(res, 1000));
    startTransition(() => {
      setTitle(formData.get('title'));
    });
  }

  return (
    <form action={saveAction}>
      <input name="title" defaultValue={title} />
      <SaveButton />
      <p>Saved title: {title}</p>
    </form>
  );
}
```

The `SaveButton` component in `SaveButton.js`:

```js
import { useFormStatus } from 'react-dom';

export default function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}
```

The call to `setTitle` after `await` needs another `startTransition` to mark it as a Transition update. `saveAction` can also call a Server Function and store its return value:

```js
// actions.js
'use server';

import { saveTitle } from './api.js';

export async function submitTitle(formData) {
  const title = formData.get('title');
  await saveTitle(title);
  return title;
}
```

Add `'use client'` at the top of the component's file, import `submitTitle`, and replace `saveAction`. The rest of the form stays the same:

```js
import { submitTitle } from './actions.js';

async function saveAction(formData) {
  const savedTitle = await submitTitle(formData);
  startTransition(() => {
    setTitle(savedTitle);
  });
}
```

Preserving form values before JavaScript loads: with `useActionState`, React can display a Server Function's returned value before hydration completes, and the form can use those values as its new defaults. The Server Function receives the previous state followed by the submitted `FormData`. In this example, `updateTitle` saves the title and returns `{ title }`, which becomes the new state. Passing `state.title` to `defaultValue` preserves the saved title after the reset:

```js
// actions.js
'use server';

import { saveTitle } from './api.js';

export async function updateTitle(previousState, formData) {
  const title = formData.get('title');
  await saveTitle(title);
  return { title };
}
```

```js
// EditForm.js
'use client';

import { useActionState } from 'react';
import { updateTitle } from './actions.js';

export default function EditForm() {
  const [state, updateTitleAction, isPending] = useActionState(updateTitle, {
    title: 'My draft',
  });

  return (
    <form action={updateTitleAction}>
      <input name="title" defaultValue={state.title} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

Other ways to control form resets:

- Keep values only when validation fails. Return the same state shape from every submission. When validation fails, include the submitted `FormData` and read each field with `state.submitted?.get('title') ?? ''`. When validation succeeds, set that `FormData` to `null` so the reset clears those fields (see the `useActionState` page, "Displaying validation errors and preserving form values").
- Skip the reset with `onSubmit`. Handle the submission in `onSubmit`, call `e.preventDefault()`, and run the Action inside `startTransition`. Because the form's `action` does not run, React does not reset the form.
- Reset at a specific moment. Call the form element's `reset()` method to immediately reset uncontrolled fields to their default values. To schedule a reset as part of an Action or Transition, call `requestFormReset` from `react-dom` instead.
- Reset the form and the component state together. Change the `key` of the component that renders the form. React recreates the component and its DOM, which resets the fields and any local state.

### Handling multiple submission types

A form can have more than one submit button, each running a different Action. A button without `formAction` runs the form's `action`; a button with `formAction` runs its own Action instead. The form below publishes an article by default, but its Save draft button stores the current content without publishing it. It uses `useActionState` to preserve the saved draft:

```js
import { useActionState } from 'react';

export default function ArticleForm() {
  // Preserve the saved draft after submission
  const [formState, dispatchFormState] = useActionState((state, payload) => {
    const content = payload.data.get('content');
    switch (payload.type) {
      case 'save':
        alert(`Your draft of '${content}' was saved!`);
        return payload.data;
      case 'publish':
        alert(`'${content}' was published!`);
        return new FormData();
      default:
        return state;
    }
  }, new FormData());

  function publish(formData) {
    dispatchFormState({
      type: 'publish',
      data: formData,
    });
  }

  function save(formData) {
    dispatchFormState({
      type: 'save',
      data: formData,
    });
  }

  return (
    <form action={publish}>
      <textarea
        name="content"
        rows={4}
        cols={40}
        defaultValue={formState?.get('content') || ''}
      />
      <br />
      <button type="submit" name="button" value="submit">Publish</button>
      <button formAction={save}>Save draft</button>
    </form>
  );
}
```

## Options / Props

`<form>` supports all [common element props](./common.md).

| Name | Type | Description |
| --- | --- | --- |
| action | string or function | A string containing a URL, or a function. If you pass a URL, the form behaves like a standard HTML form. If you pass a function, it handles the submission. When a function is passed, React runs it in a Transition following the Action prop pattern. The function may be async and React calls it with a single argument containing the `FormData` of the submitted form. A `formAction` prop on a `<button>`, `<input type="submit">`, or `<input type="image">` overrides this `action`. |
| method | string | A string that specifies the HTTP method to use when `action` is a URL. Defaults to `get`. |
| onSubmit | function | An `Event` handler function. Fires when the form is submitted. |

## Notes

- Source: https://react.dev/reference/react-dom/components/form (react.dev commit `46a54e0592729712b7640308b53268e84fdc7c9f`, fetched 2026-11-14). Section headings and some prose are condensed here; code snippets are verbatim from the commit (the source's Sandpack files are shown as separate fenced blocks with the file name in the preceding sentence).
- When a function is passed to `action` or `formAction` the HTTP method will be POST regardless of the value of the `method` prop.
- When a function is passed to `action` or `formAction`, React resets all uncontrolled field elements after the Action succeeds. Returning a validation error instead of throwing also triggers this reset; to keep a submitted value, store it in state and pass it to the field's `defaultValue` (see "Preserving form values after an Action").
- `onSubmit` works in every version of React and gives direct access to the submit event. Starting in React 19, the `action` prop is the preferred API: React runs the submission in a Transition and manages pending state and concurrency across multiple submissions, and you can also use optimistic updates, Error Boundaries, and Server Functions (which `onSubmit` does not support).
- A Server Function passed to `<form action>` lets users submit forms without JavaScript enabled or before the code has loaded. When `<form>` is rendered by a Server Component and a Server Function is passed to `action`, the form is progressively enhanced.
- Hidden field values and bound arguments are sent by the client, so they are client-controlled input. The official examples (`updateCart`, `addComment`, `saveTitle`, `signUpNewUser`) omit authentication and authorization; check the caller's permissions on the server in real code.
- Built-in React DOM `<form action>`. Not the same as react-hook-form (`useForm`), nor the `<Form>` components of react-router and nextjs-app.
- Changes since the earlier pin `046f17d`: the page was rewritten upstream (new sections for `onSubmit` handling, passing extra data, preserving form values, other ways to control form resets; `method` and `onSubmit` are now listed props; troubleshooting entry "My form fields are cleared after submission").

## Related

- [input](./input.md)
- [textarea](./textarea.md)
- [select](./select.md)
- [useFormStatus](../dom-apis/useFormStatus.md)
- [requestFormReset](../dom-apis/requestFormReset.md)
- [useActionState](../hooks/useActionState.md)
- [useOptimistic](../hooks/useOptimistic.md)
