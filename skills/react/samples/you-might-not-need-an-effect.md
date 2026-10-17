---
source: https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state
---

# You Might Not Need an Effect

Calculate derived values during rendering instead of mirroring them into state with an Effect.

Avoid (redundant state and an unnecessary Effect):

```js
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}
```

Prefer (calculated during rendering):

```js
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ Good: calculated during rendering
  const fullName = firstName + ' ' + lastName;
  // ...
}
```

## Notes

- When something can be calculated from existing props or state, do not put it in state; calculate it during rendering. This avoids an extra cascading render with a stale value.
- For an expensive calculation, the same page recommends wrapping it in `useMemo` instead of storing the result in state (section "Caching expensive calculations").
- The page also covers resetting state when a prop changes, sharing logic between event handlers, sending a POST request, notifying parents, subscribing to an external store, and fetching data.
