---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-render
---

# set-state-in-render

Validates against unconditionally setting state during render, which can trigger additional renders and potential infinite render loops.

## Signature / Usage

```js
// ❌ Unconditional setState directly in render
function Component({value}) {
  const [count, setCount] = useState(0);
  setCount(value); // Infinite loop!
  return <div>{count}</div>;
}

// ✅ Derive during render
function Component({items}) {
  const sorted = [...items].sort(); // Just calculate it in render
  return <ul>{sorted.map(/*...*/)}</ul>;
}

// ✅ Conditionally derive state from props and state from previous renders
function Component({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) { // This condition makes it valid
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
```

## Notes

- Calling `setState` during render unconditionally triggers another render before the current one finishes. This creates an infinite loop that crashes your app.
- Other valid patterns: set state in an event handler; derive from props instead of setting state (`const name = user?.name || '';`).
- Syncing state to a prop: clamping during render (`if (count > max) { setCount(max); }`) triggers an infinite loop once `count` exceeds `max`. Move the logic to the event where the state is first set:

```js
// ✅ Clamp when updating
function Counter({max}) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(current => Math.min(current + 1, max));
  };

  return <button onClick={increment}>{count}</button>;
}
```

- In rare cases, you may need to adjust state based on information from previous renders. For those, follow the "storing information from previous renders" pattern on the `useState` page of setting state conditionally.

## Related

- [useState](../hooks/useState.md)
- [set-state-in-effect](./lint-set-state-in-effect.md)
