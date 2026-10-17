---
source: https://react.dev/reference/react/useContext
---

# useContext

`useContext` is a React Hook that lets you read and subscribe to context from your component.

## Signature / Usage

```js
import { useContext } from 'react';

function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
```

`const value = useContext(SomeContext)`. Returns the context value for the calling component: the `value` passed to the closest `SomeContext` above the calling component in the tree, or the `defaultValue` passed to `createContext` if there is no such provider. React automatically re-renders components that read some context if it changes.

To provide a value:

```js
function MyPage() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  );
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| SomeContext | context | The context that you've previously created with `createContext`. The context itself does not hold the information, it only represents the kind of information you can provide or read from components. |

## Notes

- Call it only at the top level of your component or your own Hooks.
- `useContext()` always looks for the closest provider above the component that calls it. It does not consider providers in the component from which you're calling `useContext()`.
- React automatically re-renders all the children that use a particular context starting from the provider that receives a different `value`. Values are compared with `Object.is`. Skipping re-renders with `memo` does not prevent the children receiving fresh context values.
- If your build system produces duplicate modules in the output (which can happen with symlinks), this can break context: `SomeContext` used to provide and to read must be exactly the same object (`===`).

## Related

- [createContext](../apis/createContext.md)
- [use](../apis/use.md)
