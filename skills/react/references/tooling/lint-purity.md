---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/purity
---

# purity

Validates that components/hooks are pure by checking that they do not call known-impure functions.

## Signature / Usage

```js
// ❌ Math.random() in render
function Component() {
  const id = Math.random(); // Different every render
  return <div key={id}>Content</div>;
}

// ❌ Date.now() for values
function Component() {
  const timestamp = Date.now(); // Changes every render
  return <div>Created at: {timestamp}</div>;
}

// ✅ Stable IDs from initial state
function Component() {
  const [id] = useState(() => crypto.randomUUID());
  return <div key={id}>Content</div>;
}
```

## Notes

- React components must be pure functions - given the same props, they should always return the same JSX. When components use functions like `Math.random()` or `Date.now()` during render, they produce different output each time, breaking React's assumptions and causing bugs like hydration mismatches, incorrect memoization, and unpredictable behavior.
- In general, any API that returns a different value for the same inputs violates this rule. Usual examples: `Math.random()`, `Date.now()` / `new Date()`, `crypto.randomUUID()`, `performance.now()`.
- Showing the current time: move the impure function outside of render.

```js
function Clock() {
  const [time, setTime] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Current time: {time}</div>;
}
```

## Related

- [globals](./lint-globals.md)
- [Components and Hooks must be pure](../rules-of-react/components-and-hooks-must-be-pure.md)
