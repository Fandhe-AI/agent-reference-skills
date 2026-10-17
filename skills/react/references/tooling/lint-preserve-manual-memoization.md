---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization
---

# preserve-manual-memoization

Validates that existing manual memoization is preserved by the compiler. React Compiler will only compile components and hooks if its inference matches or exceeds the existing manual memoization.

## Signature / Usage

```js
// ❌ Missing dependencies in useMemo
function Component({ data, filter }) {
  const filtered = useMemo(
    () => data.filter(filter),
    [data] // Missing 'filter' dependency
  );

  return <List items={filtered} />;
}

// ❌ Missing dependencies in useCallback
function Component({ onUpdate, value }) {
  const handleClick = useCallback(() => {
    onUpdate(value);
  }, [onUpdate]); // Missing 'value'

  return <button onClick={handleClick}>Update</button>;
}

// ✅ Complete dependencies
function Component({ data, filter }) {
  const filtered = useMemo(
    () => data.filter(filter),
    [data, filter] // All dependencies included
  );

  return <List items={filtered} />;
}

// ✅ Or let the compiler handle it
function Component({ data, filter }) {
  // No manual memoization needed
  const filtered = data.filter(filter);
  return <List items={filtered} />;
}
```

## Notes

- React Compiler preserves your existing `useMemo`, `useCallback`, and `React.memo` calls. If you've manually memoized something, the compiler assumes you had a good reason and won't remove it. However, incomplete dependencies prevent the compiler from understanding your code's data flow and applying further optimizations.
- Should I remove my manual memoization? You can safely remove it if using React Compiler:

```js
// ✅ Better: Let the compiler optimize
function Component({items, sortBy}) {
  const sorted = [...items].sort((a, b) => {
    return a[sortBy] - b[sortBy];
  });

  return <List items={sorted} />;
}
```

## Related

- [exhaustive-deps](./lint-exhaustive-deps.md)
- [useMemo](../hooks/useMemo.md)
- [useCallback](../hooks/useCallback.md)
- [React Compiler introduction](../compiler/introduction.md)
