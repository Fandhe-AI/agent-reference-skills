---
source: https://react.dev/reference/react/useDebugValue
---

# useDebugValue

`useDebugValue` is a React Hook that lets you add a label to a custom Hook in React DevTools.

## Signature / Usage

```js
import { useDebugValue } from 'react';

function useOnlineStatus() {
  // ...
  useDebugValue(isOnline ? 'Online' : 'Offline');
  // ...
}
```

`useDebugValue(value, format?)` does not return anything. Deferring formatting:

```js
useDebugValue(date, date => date.toDateString());
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| value | any | The value you want to display in React DevTools. |
| format (optional) | function | A formatting function. When the component is inspected, React DevTools will call it with the `value` and display the returned value. If omitted, the original `value` is displayed. |

## Notes

- Call it at the top level of your custom Hook.
- Don't add debug values to every custom Hook. It's most valuable for custom Hooks that are part of shared libraries and that have a complex internal data structure that's difficult to inspect.
- The formatting function lets you avoid running potentially expensive formatting logic unless the component is actually inspected.

## Related

- [useSyncExternalStore](./useSyncExternalStore.md)
- [overview](./overview.md)
