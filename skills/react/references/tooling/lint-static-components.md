---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components
---

# static-components

Validates that components are static, not recreated every render. Components that are recreated dynamically can reset state and trigger excessive re-rendering.

## Signature / Usage

```js
// ❌ Component defined inside component
function Parent() {
  const ChildComponent = () => { // New component every render!
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  };

  return <ChildComponent />; // State resets every render
}

// ✅ Components at module level
const ButtonComponent = () => <button>Click</button>;
const TextComponent = () => <div>Text</div>;

function Parent({type}) {
  const Component = type === 'button'
    ? ButtonComponent  // Reference existing component
    : TextComponent;

  return <Component />;
}
```

## Notes

- Components defined inside other components are recreated on every render. React sees each as a brand new component type, unmounting the old one and mounting the new one, destroying all state and DOM nodes in the process.
- Dynamic component creation (`const Component = type === 'button' ? () => <button>Click</button> : () => <div>Text</div>;`) is also invalid.
- Need local state inside an inner component? Pass data as props to a static component instead:

```js
// ✅ Better: Pass props to static component
function ThemedButton({theme}) {
  return (
    <button className={theme}>
      Click me
    </button>
  );
}

function Parent() {
  const [theme, setTheme] = useState('light');
  return <ThemedButton theme={theme} />;
}
```

- If you find yourself wanting to define components inside other components to access local variables, that's a sign you should be passing props instead. This makes components more reusable and testable.

## Related

- [component-hook-factories](./lint-component-hook-factories.md)
