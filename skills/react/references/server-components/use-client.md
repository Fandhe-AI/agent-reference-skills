---
source: https://react.dev/reference/rsc/use-client
---

# use client

`'use client'` lets you mark what code runs on the client.

## Signature / Usage

Add `'use client'` at the top of a file to mark the module and its transitive dependencies as client code.

```js
'use client';

import { useState } from 'react';
import { formatDate } from './formatters';
import Button from './button';

export default function RichTextEditor({ timestamp, text }) {
  const date = formatDate(timestamp);
  // ...
  const editButton = <Button />;
  // ...
}
```

When a file marked with `'use client'` is imported from a Server Component, compatible bundlers treat the module import as a boundary between server-run and client-run code. As dependencies of `RichTextEditor`, `formatDate` and `Button` are also evaluated on the client regardless of whether their modules contain a `'use client'` directive. A single module may be evaluated on the server when imported from server code and on the client when imported from client code.

### Building with interactivity and state

```js
'use client';

import { useState } from 'react';

export default function Counter({initialValue = 0}) {
  const [countValue, setCountValue] = useState(initialValue);
  const increment = () => setCountValue(countValue + 1);
  const decrement = () => setCountValue(countValue - 1);
  return (
    <>
      <h2>Count Value: {countValue}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </>
  );
}
```

A component that renders UI without interaction does not need to be a Client Component:

```js
import { readFile } from 'node:fs/promises';
import Counter from './Counter';

export default async function CounterContainer() {
  const initialValue = await readFile('/path/to/counter_value');
  return <Counter initialValue={initialValue} />
}
```

### Using client APIs

Components that use browser-only APIs (web storage, audio and video, device hardware, DOM) must be Client Components:

```js
'use client';

import {useRef, useLayoutEffect} from 'react';

export default function Circle() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    context.reset();
    context.beginPath();
    context.arc(100, 75, 50, 0, 2 * Math.PI);
    context.stroke();
  });
  return <canvas ref={ref} />;
}
```

### Using third-party libraries

Third-party components that use any of the following React APIs must run on the client:

- `createContext`
- `react` and `react-dom` Hooks, excluding `use` and `useId`
- `forwardRef`
- `memo`
- `startTransition`
- client APIs, e.g. DOM insertion or native platform views

If a library has not been updated for React Server Components (no `'use client'` markers of its own), or a component needs props like event handlers that can only be specified on the client, add your own Client Component file between the third-party Client Component and your Server Component.

## Notes

- `'use client'` is for use with React Server Components.
- Snippet corrected: the original imports useEffect but calls useLayoutEffect.
- `'use client'` must be at the very beginning of a file, above any imports or other code (comments are OK). It must be written with single or double quotes, not backticks.
- When a `'use client'` module is imported from another client-rendered module, the directive has no effect.
- When a component module contains a `'use client'` directive, any usage of that component is guaranteed to be a Client Component. However, a component can still be evaluated on the client even if it does not have the directive.
- A component usage is a Client Component if it is defined in a module with the `'use client'` directive or is a transitive dependency of such a module. Otherwise, it is a Server Component.
- Code marked for client evaluation is not limited to components: all code in the Client module sub-tree is sent to and run by the client.
- When a server-evaluated module imports values from a `'use client'` module, the values must be a React component or a supported serializable prop value to be passed to a Client Component. Any other use throws an exception.
- `'use client'` defines the boundary on the module dependency tree, not the render tree. A Server Component (e.g. `Copyright`) can be rendered as `children` of a Client Component because JSX can be passed as props; a parent-child render relationship does not guarantee the same render environment.
- Server Components advantages: reduce the code sent and run by the client; can access the local filesystem and may have low latency for data fetches.
- Server Components limitations: cannot support interaction (event handlers like `onClick` only in Client Components); cannot use most Hooks, because they do not persist in memory after render and cannot have their own state.
- Serializable props from Server to Client Components: primitives (string, number, bigint, boolean, undefined, null, symbols registered via `Symbol.for`); iterables of serializable values (String, Array, Map, Set, TypedArray and ArrayBuffer); Date; plain objects with serializable properties; Server Functions; Client or Server Component elements (JSX); Promises.
- Not supported as props: functions not exported from client-marked modules or marked with `'use server'`; classes; instances of any class other than the built-ins, or objects with a null prototype; symbols not registered globally (e.g. `Symbol('my new symbol')`).
- Scope: React's own directive. Next.js `'use client'` behavior in the App Router belongs to nextjs-app; see also tanstack-start and react-router.

## Related

- [use server](./use-server.md)
- [Directives](./directives.md)
- [Server Components](./server-components.md)
- [Server Functions](./server-functions.md)
