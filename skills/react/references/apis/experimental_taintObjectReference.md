---
source: https://react.dev/reference/react/experimental_taintObjectReference
---

# experimental_taintObjectReference

`taintObjectReference` lets you prevent a specific object instance from being passed to a Client Component like a `user` object.

## Signature / Usage

```js
experimental_taintObjectReference(message, object);
```

```js
import {experimental_taintObjectReference} from 'react';

export async function getUser(id) {
  const user = await db`SELECT * FROM users WHERE id = ${id}`;
  experimental_taintObjectReference(
    'Do not pass the entire user object to the client. ' +
      'Instead, pick off the specific properties you need for this use case.',
    user,
  );
  return user;
}
```

Returns: `undefined`. Now whenever anyone tries to pass this object to a Client Component, an error is thrown with the passed-in message.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `message` | string | The message displayed as part of the Error thrown if the object gets passed to a Client Component. |
| `object` | object | The object to be tainted. Functions and class instances can be passed (they are already blocked from Client Components, but React's default error message is replaced by yours). When a specific instance of a Typed Array is passed, any other copies of the Typed Array will not be tainted. |

## Notes

- Experimental only: this API is experimental and is not available in a stable version of React yet. Try it with `react@experimental`, `react-dom@experimental`, `eslint-plugin-react-hooks@experimental`. Experimental versions may contain bugs; don't use them in production.
- Server Components only: this API is only available inside React Server Components.
- Recreating or cloning a tainted object creates a new untainted object which may contain sensitive data (`{name: user.name, ssn: user.ssn}` or `{...user}`). It only protects against simple mistakes when the object is passed through to a Client Component unchanged.
- Do not rely on just tainting for security. Tainting is a layer of protection; a secure app will have multiple layers of protection, well designed APIs, and isolation patterns.
- To prevent passing a key, hash or token, see `experimental_taintUniqueValue`.
- React Server Components behavior here is React's own; framework-specific behavior is covered by the nextjs-app, tanstack-start and react-router skills.

## Related

- [experimental_taintUniqueValue](./experimental_taintUniqueValue.md)
- [Server Components](../server-components/server-components.md)
- [use client](../server-components/use-client.md)
