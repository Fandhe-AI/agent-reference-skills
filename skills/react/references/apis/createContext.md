---
source: https://react.dev/reference/react/createContext
---

# createContext

`createContext` lets you create a context that components can provide or read.

## Signature / Usage

```js
const SomeContext = createContext(defaultValue)
```

```js
import { createContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <ThemeContext value={theme}>
      <Page />
    </ThemeContext>
  );
}
```

Returns: a context object. The context object itself does not hold any information; it represents which context other components read or provide. Use `SomeContext` in components above to specify the context value, and call `useContext(SomeContext)` in components below to read it.

- `SomeContext` lets you provide the context value to components.
- `SomeContext.Consumer` is an alternative and rarely used way to read the context value.
- `SomeContext.Provider` is a legacy way to provide the context value before React 19.

## Options / Props

`createContext(defaultValue)` parameter:

| Name | Type | Description |
| --- | --- | --- |
| `defaultValue` | any | The value the context has when there is no matching provider above the reading component. If you don't have any meaningful default value, specify `null`. A "last resort" fallback; static and never changes over time. |

Provider (`<SomeContext value={...}>`) props:

| Name | Type | Description |
| --- | --- | --- |
| `value` | any | The value passed to all components reading this context inside this provider, no matter how deep. A component calling `useContext(SomeContext)` receives the `value` of the innermost corresponding provider above it. |

`SomeContext.Consumer` props:

| Name | Type | Description |
| --- | --- | --- |
| `children` | function | React calls it with the current context value (same algorithm as `useContext()`) and renders the result. Re-runs whenever the context changes. |

## Notes

- Starting in React 19, you can render `<SomeContext>` as a provider. In older versions of React, use `<SomeContext.Provider>`.
- Call `createContext` outside any components. It is common to declare contexts in a separate file and `export` them.
- `SomeContext.Consumer` is the legacy way to read context; newly written code should read context with `useContext()` instead.
- The default value never changes. To make context change over time, add state and wrap components in a context provider.
- Migration (18 → 19): `<SomeContext.Provider>` still works but `<SomeContext>` is the form to use; the upgrade guide's TypeScript note says `createContext()` requires an argument (`createContext(undefined)` passes).

## Related

- [use](./use.md)
- [useContext](../hooks/useContext.md)
