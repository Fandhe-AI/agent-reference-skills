---
source: https://react.dev/reference/react/useId
---

# useId

`useId` is a React Hook for generating unique IDs that can be passed to accessibility attributes.

## Signature / Usage

```js
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  // ...
```

`const id = useId()` takes no parameters and returns a unique ID string associated with this particular `useId` call in this particular component.

```js
<>
  <input type="password" aria-describedby={passwordHintId} />
  <p id={passwordHintId}>
</>
```

## Notes

- Call it only at the top level of your component or your own Hooks.
- `useId` should not be used to generate cache keys for `use()`. The ID is stable when a component is mounted but may change during rendering. Cache keys should be generated from your data.
- `useId` should not be used to generate keys in a list. Keys should be generated from your data.
- `useId` currently cannot be used in async Server Components.

## Related

- [use](../apis/use.md)
