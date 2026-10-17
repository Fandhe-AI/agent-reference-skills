---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/rules-of-hooks
---

# rules-of-hooks

Validates that components and hooks follow the Rules of Hooks.

## Signature / Usage

```js
function Component({ isSpecial, shouldFetch, fetchPromise }) {
  // ✅ Hooks at top level
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  if (!isSpecial) {
    return null;
  }

  if (shouldFetch) {
    // ✅ `use` can be conditional
    const data = use(fetchPromise);
    return <div>{data}</div>;
  }

  return <div>{name}: {count}</div>;
}
```

```js
// ❌ Hook in condition
if (isLoggedIn) {
  const [user, setUser] = useState(null);
}

// ❌ Hook after early return
if (!data) return <Loading />;
const [processed, setProcessed] = useState(data);

// ❌ Hook in callback
<button onClick={() => {
  const [clicked, setClicked] = useState(false);
}}/>

// ❌ `use` in try/catch
try {
  const data = use(promise);
} catch (e) {
  // error handling
}

// ❌ Hook at module level
const globalState = useState(0); // Outside component
```

## Options / Props

Custom effect hooks can be configured using shared ESLint settings (available in `eslint-plugin-react-hooks` 6.1.1 and later):

```js
{
  "settings": {
    "react-hooks": {
      "additionalEffectHooks": "(useMyEffect|useCustomEffect)"
    }
  }
}
```

| Name | Type | Description |
| --- | --- | --- |
| `settings["react-hooks"].additionalEffectHooks` | regex string | Regex pattern matching custom hooks that should be treated as effects. This allows `useEffectEvent` and similar event functions to be called from your custom effect hooks. |

This shared configuration is used by both `rules-of-hooks` and `exhaustive-deps` rules, ensuring consistent behavior across all hook-related linting.

## Notes

- React relies on the order in which hooks are called to correctly preserve state between renders. When hooks are called conditionally or in loops, React loses track of which state corresponds to which hook call, leading to bugs like state mismatches and "Rendered fewer/more hooks than expected" errors.
- Common violations: hooks in conditions (`if`/`else`, ternary, `&&`/`||`); hooks in loops (`for`, `while`, `do-while`); hooks after early returns; hooks in callbacks/event handlers; hooks in async functions; hooks in class methods; hooks at module level.
- The `use` hook is different from other React hooks: it can be called conditionally and in loops (`if (shouldFetch) { const data = use(fetchPromise); }`). However, `use` still can't be wrapped in try/catch and must be called inside a component or hook.
- Conditional data fetching: call the hook unconditionally and check the condition inside (`useEffect(() => { if (isLoggedIn) { fetchUserData(); } }, [isLoggedIn]);`). There are better ways to fetch data rather than in a useEffect; consider TanStack Query, useSWR, or React Router 6.4+ for data fetching.
- Conditional state initialization: always call `useState`, conditionally set the initial value (`useState(userType === 'admin' ? adminPerms : userPerms)`).
- This is React's own lint rule; Biome's `useHookAtTopLevel` (see the biome skill) is a separate implementation.

## Related

- [Rules of Hooks](../rules-of-react/rules-of-hooks.md)
- [use](../apis/use.md)
- [exhaustive-deps](./lint-exhaustive-deps.md)
