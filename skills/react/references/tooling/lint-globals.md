---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/globals
---

# globals

Validates against assignment/mutation of globals during render, part of ensuring that side effects must run outside of render.

## Signature / Usage

```js
// ❌ Global counter
let renderCount = 0;
function Component() {
  renderCount++; // Mutating global
  return <div>Count: {renderCount}</div>;
}

// ❌ Modifying window properties
function Component({userId}) {
  window.currentUser = userId; // Global mutation
  return <div>User: {userId}</div>;
}

// ✅ Use state for counters
function Component() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(c => c + 1);
  };

  return (
    <button onClick={handleClick}>
      Clicked: {clickCount} times
    </button>
  );
}

// ✅ Synchronize external state with React
function Component({title}) {
  useEffect(() => {
    document.title = title; // OK in effect
  }, [title]);

  return <div>Page: {title}</div>;
}
```

## Notes

- Global variables exist outside React's control. When you modify them during render, you break React's assumption that rendering is pure. This can cause components to behave differently in development vs production, break Fast Refresh, and make your app impossible to optimize with features like React Compiler.
- Other invalid patterns: pushing to a global array (`events.push(event)`) and cache manipulation during render (`cache[id] = fetchData(id)`).
- Valid alternative for global values: use context (`const user = useContext(UserContext);`).

## Related

- [purity](./lint-purity.md)
- [Components and Hooks must be pure](../rules-of-react/components-and-hooks-must-be-pure.md)
