---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/use-memo
---

# use-memo

Validates that the `useMemo` hook is used with a return value.

## Signature / Usage

```js
// ❌ No return value
function Component({ data }) {
  const processed = useMemo(() => {
    data.forEach(item => console.log(item));
    // Missing return!
  }, [data]);

  return <div>{processed}</div>; // Always undefined
}

// ✅ Returns computed value
function Component({ data }) {
  const processed = useMemo(() => {
    return data.map(item => item * 2);
  }, [data]);

  return <div>{processed}</div>;
}
```

## Notes

- `useMemo` is for computing and caching expensive values, not for side effects. Without a return value, `useMemo` returns `undefined`, which defeats its purpose and likely indicates you're using the wrong hook.
- Side effects when dependencies change: if the side effect needs to happen in response to user interaction, colocate it with the event handler:

```js
// ✅ Good: Side effects in event handlers
function Component({user}) {
  const handleClick = () => {
    analytics.track('ButtonClicked', {userId: user.id});
    // Other click logic...
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

- If the side effect synchronizes React state with some external state (or vice versa), use `useEffect`:

```js
// ✅ Good: Synchronization in useEffect
function Component({theme}) {
  useEffect(() => {
    localStorage.setItem('preferredTheme', theme);
    document.body.className = theme;
  }, [theme]);

  return <div>Current theme: {theme}</div>;
}
```

## Related

- [useMemo](../hooks/useMemo.md)
- [useEffect](../hooks/useEffect.md)
