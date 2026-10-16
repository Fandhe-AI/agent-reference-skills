---
source: https://react.dev/reference/react/captureOwnerStack
---

# captureOwnerStack

`captureOwnerStack` reads the current Owner Stack in development and returns it as a string if available.

## Signature / Usage

```js
const stack = captureOwnerStack();
```

```js
import * as React from 'react';

function Component() {
  if (process.env.NODE_ENV !== 'production') {
    const ownerStack = React.captureOwnerStack();
    console.log(ownerStack);
  }
}
```

Parameters: `captureOwnerStack` does not take any parameters.

Returns: `string | null`. Owner Stacks are available in:

- Component render
- Effects (e.g. `useEffect`)
- React's event handlers (e.g. `<button onClick={...} />`)
- React error handlers (React Root options `onCaughtError`, `onRecoverableError`, and `onUncaughtError`)

If no Owner Stack is available, `null` is returned.

## Notes

- Owner Stacks are only available in development. `captureOwnerStack` will always return `null` outside of development, and is only exported in development builds (it is `undefined` in production builds). In files bundled for both, use a namespace import (`import * as React from 'react'`) and access it conditionally, not a named import.
- The Owner Stack is different from the Component Stack (e.g. `errorInfo.componentStack` in `onUncaughtError`). For an error thrown in `SubComponent`, rendered as `main > Navigation / Component > fieldset > SubComponent`, the Component Stack lists `SubComponent`, `fieldset`, `Component`, `main`, `React.Suspense`, `App`, while the Owner Stack only reads `at Component`, since only `Component` created the node containing `SubComponent`.
- The Owner Stack is `null` when called outside of a React controlled function, e.g. in a `setTimeout` callback, after a `fetch` call or in a custom DOM event handler. Capture it earlier, e.g. in the Effect body.
- Typical use: when intercepting `console.error` calls to highlight them in an error overlay, call `captureOwnerStack` to include the Owner Stack.

```js
import { captureOwnerStack } from "react";

const originalConsoleError = console.error;
console.error = function patchedConsoleError(...args) {
  originalConsoleError.apply(console, args);
  const ownerStack = captureOwnerStack();
  onConsoleError({
    consoleMessage: args[0],
    ownerStack,
  });
};
```

## Related

- [createRoot](../dom-apis/createRoot.md)
- [hydrateRoot](../dom-apis/hydrateRoot.md)
