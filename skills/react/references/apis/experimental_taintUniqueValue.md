---
source: https://react.dev/reference/react/experimental_taintUniqueValue
---

# experimental_taintUniqueValue

`taintUniqueValue` lets you prevent unique values from being passed to Client Components like passwords, keys, or tokens.

## Signature / Usage

```js
taintUniqueValue(errMessage, lifetime, value)
```

```js
import {experimental_taintUniqueValue} from 'react';

experimental_taintUniqueValue(
  'Do not pass secret keys to the client.',
  process,
  process.env.SECRET_KEY
);
```

Returns: `undefined`.

If the tainted value's lifespan is tied to an object, the `lifetime` should be the object that encapsulates the value:

```js
import {experimental_taintUniqueValue} from 'react';

export async function getUser(id) {
  const user = await db`SELECT * FROM users WHERE id = ${id}`;
  experimental_taintUniqueValue(
    'Do not pass a user session token to the client.',
    user,
    user.session.token
  );
  return user;
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `message` | string | The message displayed in the Error thrown if `value` is passed to a Client Component. |
| `lifetime` | object | Any object that indicates how long `value` should be tainted. `value` is blocked from being sent to any Client Component while this object still exists. For example, `globalThis` blocks the value for the lifetime of an app. Typically an object whose properties contain `value`. |
| `value` | string \| bigint \| TypedArray | Must be a unique sequence of characters or bytes with high entropy such as a cryptographic token, private key, hash, or a long password. |

## Notes

- Experimental only: this API is experimental and is not available in a stable version of React yet. Try it with `react@experimental`, `react-dom@experimental`, `eslint-plugin-react-hooks@experimental`. Experimental versions may contain bugs; don't use them in production.
- Server Components only: this API is only available inside React Server Components.
- Deriving new values from tainted values can compromise protection: uppercasing, concatenating into a larger string, converting to base64, substringing, etc. produce untainted values unless you explicitly call `taintUniqueValue` on them.
- Do not use it to protect low-entropy values such as PIN codes or phone numbers; an attacker could infer which value is tainted by enumeration.
- Do not rely solely on tainting for security. Mistakes such as using a global store outside of React, without the corresponding lifetime object, can cause the tainted value to become untainted.
- Combine with the `server-only` package to keep secrets in helper files that can only be imported on the server. A tainted value also throws when sent to a Client Component with a Server Function.
- To prevent passing an object containing sensitive data, see `experimental_taintObjectReference`.
- React Server Components behavior here is React's own; framework-specific behavior is covered by the nextjs-app, tanstack-start and react-router skills.

## Related

- [experimental_taintObjectReference](./experimental_taintObjectReference.md)
- Server Functions
- use client
