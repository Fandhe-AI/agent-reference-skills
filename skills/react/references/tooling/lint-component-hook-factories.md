---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/component-hook-factories
---

# component-hook-factories

Validates against higher order functions defining nested components or hooks. Components and hooks should be defined at the module level.

## Signature / Usage

```js
// ❌ Factory function creating components
function createComponent(defaultValue) {
  return function Component() {
    // ...
  };
}

// ❌ Component defined inside component
function Parent() {
  function Child() {
    // ...
  }

  return <Child />;
}

// ❌ Hook factory function
function createCustomHook(endpoint) {
  return function useData() {
    // ...
  };
}

// ✅ Component defined at module level
function Component({ defaultValue }) {
  // ...
}

// ✅ Custom hook at module level
function useData(endpoint) {
  // ...
}
```

## Notes

- Defining components or hooks inside other functions creates new instances on every call. React treats each as a completely different component, destroying and recreating the entire component tree, losing all state, and causing performance problems.
- Dynamic component behavior: instead of a factory such as `makeButton(color)`, pass JSX as children.

```js
// ✅ Better: Pass JSX as children
function Button({color, children}) {
  return (
    <button style={{backgroundColor: color}}>
      {children}
    </button>
  );
}

function App() {
  return (
    <>
      <Button color="red">Red</Button>
      <Button color="blue">Blue</Button>
    </>
  );
}
```

## Related

- [static-components](./lint-static-components.md)
- [eslint-plugin-react-hooks](./eslint-plugin-react-hooks.md)
